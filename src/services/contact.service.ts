import { ContactMessage } from '../models/ContactMessage';
import { ApiError } from '../utils/apiError';

export const createMessage = async (data: any) => {
  const message = await ContactMessage.create(data);
  return message;
};

export const getMessages = async (query: any) => {
  const { page = 1, limit = 20, isRead } = query;
  const filter: any = {};

  if (isRead !== undefined) {
    filter.isRead = isRead === 'true';
  }

  const messages = await ContactMessage.find(filter)
    .sort({ createdAt: -1 })
    .skip((Number(page) - 1) * Number(limit))
    .limit(Number(limit));

  const total = await ContactMessage.countDocuments(filter);

  return { messages, total, page: Number(page), limit: Number(limit) };
};

export const markAsRead = async (id: string) => {
  const message = await ContactMessage.findByIdAndUpdate(id, { isRead: true }, { new: true });
  if (!message) {
    throw new ApiError(404, 'Message not found');
  }
  return message;
};

export const deleteMessage = async (id: string) => {
  const message = await ContactMessage.findByIdAndDelete(id);
  if (!message) {
    throw new ApiError(404, 'Message not found');
  }
};
