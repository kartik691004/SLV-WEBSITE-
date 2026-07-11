import { Admin, IAdmin } from '../models/Admin';
import { ApiError } from '../utils/apiError';
import { generateToken } from '../utils/jwt';

export const registerAdmin = async (data: Partial<IAdmin>) => {
  const existingAdmin = await Admin.findOne({ email: data.email });
  if (existingAdmin) {
    throw new ApiError(400, 'Admin already exists');
  }

  const admin = await Admin.create(data);
  const token = generateToken({ id: admin._id });

  return { admin: { id: admin._id, name: admin.name, email: admin.email }, token };
};

export const loginAdmin = async (email: string, password: string) => {
  const admin = await Admin.findOne({ email }).select('+password');
  if (!admin) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isMatch = await admin.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const token = generateToken({ id: admin._id });
  return { admin: { id: admin._id, name: admin.name, email: admin.email }, token };
};
