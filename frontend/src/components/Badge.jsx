export default function Badge({ status }) {
    const isAvailable = status === 'Available';
    const isSold = status === 'Sold';
    const isBooked = status === 'Booked Today';
    const isPremium = ['Featured', 'Premium', 'Luxury', 'Hot', 'New', 'Commercial'].includes(status);

    let cls = 'badge badge-stone';
    if (isAvailable) cls = 'badge badge-green';
    if (isSold)      cls = 'badge badge-red';
    if (isBooked)    cls = 'badge badge-amber';
    if (isPremium)   cls = 'badge badge-champ';

    return <span className={cls}>{status}</span>;
}
