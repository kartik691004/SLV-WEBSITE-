import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from '../config/cloudinary';
import { ApiError } from '../utils/apiError';
import fs from 'fs';
import path from 'path';

// Check if Cloudinary is genuinely configured (not placeholders)
const isCloudinaryConfigured =
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_KEY !== 'your_cloudinary_api_key' &&
  process.env.CLOUDINARY_NAME &&
  process.env.CLOUDINARY_NAME !== 'your_cloudinary_name';

// 1. Local storage fallback setup
const localUploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(localUploadDir)) {
  fs.mkdirSync(localUploadDir, { recursive: true });
}

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, localUploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// 2. Storage selection
const storage = isCloudinaryConfigured
  ? new CloudinaryStorage({
      cloudinary: cloudinary,
      params: async (req, file) => {
        return {
          folder: 'slv-enterprises/properties',
          resource_type: 'auto',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'avi', 'mkv'],
        };
      },
    })
  : localStorage;

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Please upload only images or videos') as any, false);
  }
};

const multerUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 70 * 1024 * 1024, // 70MB limit
  },
});

const originalFields = multerUpload.fields([
  { name: 'images', maxCount: 15 },
  { name: 'videos', maxCount: 6 },
]);

export const upload = {
  fields: (fieldsArray: any) => {
    return (req: any, res: any, next: any) => {
      originalFields(req, res, (err: any) => {
        if (err) return next(err);

        // If local storage was used, translate disk file.path into public web url path
        if (!isCloudinaryConfigured && req.files) {
          const files = req.files as { [fieldname: string]: Express.Multer.File[] };
          const protocol = req.protocol;
          const host = req.get('host');

          Object.keys(files).forEach((fieldname) => {
            files[fieldname] = files[fieldname].map((file) => {
              file.path = `${protocol}://${host}/uploads/${file.filename}`;
              return file;
            });
          });
        }

        next();
      });
    };
  }
};
