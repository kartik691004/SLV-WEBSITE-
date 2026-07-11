// ─── SHARED CONSTANTS & UTILITIES ─────────────────────────────────────────────
export const API_BASE = import.meta.env.VITE_API_BASE || "/api/v1";
export const WA_NUM   = "918618327882";
export const CALL_NUM = "+918618327882";

export const waLink = (msg = "Hello SLV Enterprises, I am interested in this property.") =>
    `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;

export const normalizeProperty = p => ({
    ...p,
    id: p._id || p.id,
    priceNum: p.priceNum ?? p.price,
    price: typeof p.price === 'number' ? '₹' + p.price.toLocaleString() : p.price,
    img: p.images?.[0] || p.img || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
    categories: p.listedFor || p.categories || [p.category || 'Sale'],
    badge: p.badge ?? (p.status === 'Available' ? 'New' : p.status),
});

export const normalizeReview = r => {
    const name = r.customerName || r.name || 'Anonymous';
    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    return {
        ...r,
        id: r._id || r.id,
        name,
        rating: r.rating,
        review: r.message || r.review,
        isApproved: r.isApproved,
        initials,
        date: r.createdAt
            ? new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
            : r.date,
    };
};

// ─── MOCK DATA (fallback when API unavailable) ─────────────────────────────────
export const MOCK_PROPERTIES = [
    { id: 1, title: "Luxury 3BHK Villa", type: "Villa", categories: ["Sale"], price: "₹2.8 Cr", priceNum: 28000000, location: "Whitefield", address: "Prestige Shantiniketan, Whitefield", bhk: 3, area: 2200, furnished: "Semi-Furnished", parking: true, status: "Available", badge: "Featured", img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80", amenities: ["Swimming Pool", "Gym", "Clubhouse", "24/7 Security", "Power Backup"], possession: "Ready to Move", listedBy: "Owner" },
    { id: 2, title: "Modern 2BHK Apartment", type: "Apartment", categories: ["Rent", "Lease"], price: "₹32,000/mo", priceNum: 32000, location: "Indiranagar", address: "100 Feet Road, Indiranagar", bhk: 2, area: 1200, furnished: "Fully Furnished", parking: true, status: "Available", badge: "Hot", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80", amenities: ["Gym", "Lift", "24/7 Security", "Power Backup"], possession: "Ready to Move", listedBy: "Owner" },
    { id: 3, title: "Spacious 4BHK Penthouse", type: "Penthouse", categories: ["Lease"], price: "₹85,000/mo", priceNum: 85000, location: "Koramangala", address: "5th Block, Koramangala", bhk: 4, area: 3400, furnished: "Fully Furnished", parking: true, status: "Booked Today", badge: "Premium", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80", amenities: ["Terrace", "Swimming Pool", "Gym", "Concierge", "Valet Parking"], possession: "Ready to Move", listedBy: "Agent" },
    { id: 4, title: "Studio Apartment", type: "Apartment", categories: ["Rent"], price: "₹18,000/mo", priceNum: 18000, location: "Electronic City", address: "Phase 1, Electronic City", bhk: 1, area: 600, furnished: "Fully Furnished", parking: false, status: "Available", badge: null, img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80", amenities: ["Gym", "Lift", "Security"], possession: "Ready to Move", listedBy: "Owner" },
    { id: 5, title: "Premium 3BHK Flat", type: "Apartment", categories: ["Sale", "Rent"], price: "₹1.4 Cr / ₹45,000/mo", priceNum: 14000000, location: "HSR Layout", address: "Sector 2, HSR Layout", bhk: 3, area: 1800, furnished: "Semi-Furnished", parking: true, status: "Available", badge: "New", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80", amenities: ["Clubhouse", "Gym", "Swimming Pool", "Kids Play Area"], possession: "Within 3 Months", listedBy: "Owner" },
    { id: 6, title: "Commercial Office Space", type: "Commercial", categories: ["Lease", "Rent"], price: "₹1,20,000/mo", priceNum: 120000, location: "Marathahalli", address: "Outer Ring Road, Marathahalli", bhk: null, area: 5000, furnished: "Bare Shell", parking: true, status: "Available", badge: "Commercial", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", amenities: ["Power Backup", "DG Set", "Parking", "Lift", "Security"], possession: "Ready to Move", listedBy: "Agent" },
    { id: 7, title: "2BHK Row House", type: "Row House", categories: ["Sale"], price: "₹95 L", priceNum: 9500000, location: "Sarjapur Road", address: "Near Wipro Gate, Sarjapur Rd", bhk: 2, area: 1400, furnished: "Unfurnished", parking: true, status: "Sold", badge: null, img: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80", amenities: ["Garden", "Parking", "Security"], possession: "Ready to Move", listedBy: "Owner" },
    { id: 8, title: "Independent House 5BHK", type: "Independent House", categories: ["Sale"], price: "₹4.5 Cr", priceNum: 45000000, location: "Indiranagar", address: "12th Main, Indiranagar", bhk: 5, area: 4800, furnished: "Semi-Furnished", parking: true, status: "Available", badge: "Luxury", img: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80", amenities: ["Swimming Pool", "Home Theatre", "Terrace Garden", "3 Car Parking", "Staff Quarters"], possession: "Ready to Move", listedBy: "Owner" },
    { id: 9, title: "1BHK Cozy Flat", type: "Apartment", categories: ["Rent"], price: "₹14,000/mo", priceNum: 14000, location: "Marathahalli", address: "Brigade Road, Marathahalli", bhk: 1, area: 650, furnished: "Semi-Furnished", parking: false, status: "Available", badge: null, img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80", amenities: ["Lift", "Security", "Power Backup"], possession: "Ready to Move", listedBy: "Owner" },
    { id: 10, title: "3BHK Gated Community", type: "Apartment", categories: ["Lease", "Sale"], price: "₹60,000/mo / ₹1.8 Cr", priceNum: 18000000, location: "Sarjapur Road", address: "Sobha City, Sarjapur Rd", bhk: 3, area: 1950, furnished: "Fully Furnished", parking: true, status: "Available", badge: "Featured", img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80", amenities: ["Clubhouse", "Pool", "Gym", "24/7 Security", "Kids Area"], possession: "Ready to Move", listedBy: "Owner" },
];

export const MOCK_REVIEWS = [
    { id: 1, name: "Rajesh Kumar", rating: 5, date: "March 2024", review: "SLV Enterprises helped us find our dream home in Whitefield. Absolutely professional and transparent throughout the process. Highly recommend!", initials: "RK" },
    { id: 2, name: "Priya Sharma", rating: 5, date: "Feb 2024", review: "Found a perfect office space in Marathahalli within a week! The team was incredibly responsive and the listings were verified and accurate.", initials: "PS" },
    { id: 3, name: "Arun Nair", rating: 4, date: "Jan 2024", review: "Good experience overall. Got a 3BHK in Koramangala at a very competitive price. The customer support was super convenient.", initials: "AN" },
    { id: 4, name: "Deepa Menon", rating: 5, date: "Dec 2023", review: "Extremely helpful team. They understood exactly what we needed and showed us only relevant properties. Closed our deal in just 10 days!", initials: "DM" },
];
