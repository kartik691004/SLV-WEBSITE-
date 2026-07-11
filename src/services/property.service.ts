import { Property, IProperty } from '../models/Property';
import { ApiError } from '../utils/apiError';

export const createProperty = async (data: any, images: string[], videos: string[] = []) => {
  // Generate slug
  const baseSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  let slug = baseSlug;
  let count = 1;
  while (await Property.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  const property = await Property.create({ ...data, slug, images, videos });
  return property;
};

export const getProperties = async (query: any) => {
  const { page = 1, limit = 10, search, category, status, type, minPrice, maxPrice, isFeatured } = query;

  const filter: any = { isDeleted: false };
  if (search) {
    filter.$text = { $search: search };
  }
  if (category) filter.category = category;
  if (status) filter.status = status;
  if (type) filter.type = type;
  if (isFeatured) filter.isFeatured = isFeatured === 'true';
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const properties = await Property.find(filter)
    .sort(search ? { score: { $meta: 'textScore' } } : { createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const total = await Property.countDocuments(filter);

  return { properties, total, page: Number(page), limit: Number(limit) };
};

export const getPropertyBySlugOrId = async (idOrSlug: string) => {
  const property = await Property.findOne({
    $or: [{ _id: idOrSlug.match(/^[0-9a-fA-F]{24}$/) ? idOrSlug : null }, { slug: idOrSlug }],
    isDeleted: false,
  });

  if (!property) {
    throw new ApiError(404, 'Property not found');
  }

  return property;
};

export const updateProperty = async (id: string, data: any, newImages?: string[], newVideos?: string[]) => {
  const property = await Property.findById(id);
  if (!property || property.isDeleted) {
    throw new ApiError(404, 'Property not found');
  }

  if (newImages && newImages.length > 0) {
    data.images = [...property.images, ...newImages];
  }

  if (newVideos && newVideos.length > 0) {
    data.videos = [...(property.videos || []), ...newVideos];
  }

  if (data.title && data.title !== property.title) {
    const baseSlug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    let slug = baseSlug;
    let count = 1;
    while (await Property.findOne({ slug, _id: { $ne: id } })) {
      slug = `${baseSlug}-${count}`;
      count++;
    }
    data.slug = slug;
  }

  Object.assign(property, data);
  await property.save();
  return property;
};

export const deleteProperty = async (id: string, hardDelete = false) => {
  if (hardDelete) {
    await Property.findByIdAndDelete(id);
    return;
  }
  
  const property = await Property.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
  if (!property) {
    throw new ApiError(404, 'Property not found');
  }
};
