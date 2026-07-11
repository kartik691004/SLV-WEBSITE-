import { Property } from '../models/Property';
import { ScheduleRequest } from '../models/ScheduleRequest';
import { Review } from '../models/Review';
import { ContactMessage } from '../models/ContactMessage';

export const getDashboardStats = async () => {
  const totalProperties = await Property.countDocuments({ isDeleted: false });
  const totalActiveListings = await Property.countDocuments({ status: 'Available', isDeleted: false });
  const totalSoldProperties = await Property.countDocuments({ status: 'Sold', isDeleted: false });

  // Scheduled calls today
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const scheduledCallsToday = await ScheduleRequest.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay },
  });

  const pendingScheduleRequests = await ScheduleRequest.countDocuments({ status: 'Pending' });

  const totalReviews = await Review.countDocuments();
  const pendingReviews = await Review.countDocuments({ isApproved: false });

  const totalMessages = await ContactMessage.countDocuments();
  const unreadMessages = await ContactMessage.countDocuments({ isRead: false });

  return {
    totalProperties,
    totalActiveListings,
    totalSoldProperties,
    scheduledCallsToday,
    pendingScheduleRequests,
    totalReviews,
    pendingReviews,
    totalMessages,
    unreadMessages,
  };
};
