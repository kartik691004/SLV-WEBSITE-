import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
    AreaChart, Area, CartesianGrid,
} from 'recharts';
import { useData } from '../DataContext.jsx';
import Logo from '../components/Logo.jsx';
import Badge from '../components/Badge.jsx';
import StarRating from '../components/StarRating.jsx';
import { API_BASE, waLink } from '../utils.js';

// ─── SIDEBAR ITEM ICONS ────────────────────────────────────────────────────────
const Icon = {
    overview: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>,
    add:      () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>,
    listings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
    calls:    () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.62-.62a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" /></svg>,
    booked:   () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" /></svg>,
    reviews:  () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" /></svg>,
    messages: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
    settings: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3" /><path d="M19.07 4.93l-1.41 1.41M4.93 4.93l1.41 1.41M4.93 19.07l1.41-1.41M19.07 19.07l-1.41-1.41M12 2v2M12 20v2M2 12h2M20 12h2" /></svg>,
};

// ─── TOOLTIP ──────────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
        <div style={{ background: 'var(--charcoal-3)', border: '1px solid var(--stone-2)', borderRadius: 'var(--r-md)', padding: '10px 14px', fontFamily: 'var(--font-body)', fontSize: '0.8125rem' }}>
            <div style={{ color: 'var(--ivory-3)', marginBottom: 4 }}>{label}</div>
            {payload.map(p => (
                <div key={p.name} style={{ color: p.color || 'var(--champagne)', fontWeight: 600 }}>{p.value}</div>
            ))}
        </div>
    );
};

// ─── STATUS COLOR ─────────────────────────────────────────────────────────────
const statusColor = s => ({ Pending: 'var(--amber)', Contacted: 'var(--blue)', Completed: 'var(--green)' }[s] || 'var(--ivory-4)');
const statusBadge = s => ({ Pending: 'badge-amber', Contacted: 'badge-blue', Completed: 'badge-green' }[s] || 'badge-stone');

export default function AdminDashboard({ setPage }) {
    const { properties, setProperties, reviews, setReviews, messages, setMessages, token, setToken } = useData();

    const [tab, setTab] = useState('overview');
    const [images, setImagesState] = useState([]);
    const [videos, setVideosState] = useState([]);

    // Automatically load all admin datasets on mount / when token is available
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!token) return;
            try {
                // Fetch Properties (Admin view)
                const propRes = await axios.get(API_BASE + '/properties', { headers: { Authorization: `Bearer ${token}` } });
                if (propRes.data?.data?.properties) {
                    setProperties(propRes.data.data.properties.map(p => ({
                        ...p, id: p._id,
                        priceNum: p.price,
                        price: '₹' + p.price.toLocaleString(),
                        img: p.images?.[0] || p.img || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
                        categories: p.listedFor || ['Sale'],
                        badge: p.status === 'Available' ? 'New' : p.status,
                    })));
                }

                // Fetch Reviews (All status)
                const reviewRes = await axios.get(API_BASE + '/reviews', { headers: { Authorization: `Bearer ${token}` } });
                if (reviewRes.data?.data?.reviews) {
                    setReviews(reviewRes.data.data.reviews.map(r => ({
                        ...r, id: r._id,
                        name: r.customerName || r.name,
                        review: r.message || r.review,
                        initials: (r.customerName || r.name || 'U').substring(0, 2).toUpperCase(),
                        date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                    })));
                }



                // Fetch Messages
                const msgRes = await axios.get(API_BASE + '/contact', { headers: { Authorization: `Bearer ${token}` } });
                if (msgRes.data?.data?.messages) {
                    setMessages(msgRes.data.data.messages);
                }
            } catch (e) {
                console.error('Error auto-loading dashboard data:', e);
            }
        };

        fetchDashboardData();
    }, [token]);
    const [form, setForm] = useState({
        title: '', type: 'Apartment', categories: ['Rent'], price: '', location: 'Whitefield',
        address: '', bhk: '2', area: '', furnished: 'Semi-Furnished', parking: true,
        description: '', amenities: '', status: 'Available', possession: 'Ready to Move',
    });

    const sidebarItems = [
        { key: 'overview', label: 'Dashboard' },
        { key: 'add',      label: 'Add Property' },
        { key: 'listings', label: 'All Properties' },
        { key: 'booked',   label: 'Booked / Sold' },
        { key: 'reviews',  label: 'Reviews' },
        { key: 'messages', label: 'Messages' },
        { key: 'settings', label: 'Settings' },
    ];

    // ── Category toggle (multi-select for listing type)
    const toggleAdminCat = cat => {
        setForm(f => {
            const has = f.categories.includes(cat);
            if (has && f.categories.length === 1) return f;
            return { ...f, categories: has ? f.categories.filter(c => c !== cat) : [...f.categories, cat] };
        });
    };

    // ── Publish property
    const handlePublish = async () => {
        if (!form.title || !form.price || !form.location) {
            alert('Title, Price and Location are required.');
            return;
        }
        try {
            const fd = new FormData();
            fd.append('title', form.title);
            fd.append('description', form.description || 'Beautiful property listed by SLV Enterprises.');
            fd.append('price', String(form.price).replace(/[^0-9]/g, '') || '0');
            fd.append('category', form.categories[0] || 'Rent');
            fd.append('location', form.location);
            fd.append('address', form.address || form.location);
            fd.append('bhk', form.bhk || '2');
            fd.append('area', form.area || '1200');
            fd.append('furnished', form.furnished);
            fd.append('parking', form.parking ? 'true' : 'false');
            fd.append('possession', form.possession);
            fd.append('status', form.status);
            (form.amenities ? form.amenities.split(',').map(s => s.trim()).filter(Boolean) : [])
                .forEach(a => fd.append('amenities', a));
            images.forEach(f => fd.append('images', f));
            videos.forEach(f => fd.append('videos', f));

            await axios.post(API_BASE + '/properties', fd, {
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
            });

            const res = await axios.get(API_BASE + '/properties/public');
            if (res.data?.data) {
                setProperties((res.data.data.properties || []).map(p => ({
                    ...p, id: p._id,
                    priceNum: p.price,
                    price: '₹' + p.price.toLocaleString(),
                    img: p.images?.[0] || p.img || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
                    categories: p.listedFor || ['Sale'],
                    badge: p.status === 'Available' ? 'New' : p.status,
                })));
            }

            setForm({ title: '', type: 'Apartment', categories: ['Rent'], price: '', location: 'Whitefield', address: '', bhk: '2', area: '', furnished: 'Semi-Furnished', parking: true, description: '', amenities: '', status: 'Available', possession: 'Ready to Move' });
            setImagesState([]);
            setVideosState([]);
            setTab('listings');
        } catch (err) {
            console.error('Publish error:', err);
            alert('Error publishing property: ' + (err.response?.data?.message || err.message));
        }
    };

    // ── Recharts data
    const statusData = [
        { name: 'Available', count: properties.filter(p => p.status === 'Available').length, fill: '#22C55E' },
        { name: 'Booked', count: properties.filter(p => p.status === 'Booked Today').length, fill: '#60A5FA' },
        { name: 'Sold', count: properties.filter(p => p.status === 'Sold').length, fill: '#F59E0B' },
    ];

    // Current page label
    const currentLabel = sidebarItems.find(i => i.key === tab)?.label || '';

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--charcoal)', paddingTop: 'var(--nav-h)' }}>
            {/* ── SIDEBAR ──────────────────────────────────────────── */}
            <aside className="admin-sidebar">
                <div style={{ padding: '16px 20px 20px', borderBottom: '1px solid var(--stone)', marginBottom: 8 }}>
                    <Logo size="sm" />
                    <div style={{ fontSize: '0.6875rem', color: 'var(--ivory-4)', marginTop: 6, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Admin Portal</div>
                </div>

                <nav style={{ flexGrow: 1, padding: '8px 0' }}>
                    {sidebarItems.map(item => {
                        const IconComp = Icon[item.key];
                        const isActive = tab === item.key;
                        return (
                            <motion.button
                                key={item.key}
                                onClick={() => setTab(item.key)}
                                className={`sidebar-item${isActive ? ' active' : ''}`}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="sidebar-icon">{IconComp && <IconComp />}</span>
                                {item.label}
                                {item.key === 'messages' && (messages || []).filter(m => !m.isRead).length > 0 && (
                                    <span style={{ marginLeft: 'auto', background: 'var(--champagne)', color: '#0A0A0B', borderRadius: 'var(--r-full)', fontSize: '0.625rem', fontWeight: 700, padding: '2px 7px', minWidth: 18, textAlign: 'center' }}>
                                        {(messages || []).filter(m => !m.isRead).length}
                                    </span>
                                )}
                            </motion.button>
                        );
                    })}
                </nav>

                <div style={{ padding: '12px 0', borderTop: '1px solid var(--stone)' }}>
                    <motion.button
                        onClick={() => { localStorage.removeItem('slv_token'); setToken(null); setPage('home'); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%', padding: '10px 20px', background: 'none', border: 'none', color: 'var(--ivory-4)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', borderLeft: '3px solid transparent', transition: 'all 0.2s', fontFamily: 'inherit' }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.background = 'var(--red-dim)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--ivory-4)'; e.currentTarget.style.background = 'none'; }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" /></svg>
                        Logout
                    </motion.button>
                </div>
            </aside>

            {/* ── MAIN CONTENT ─────────────────────────────────────── */}
            <main className="admin-content">
                {/* Top bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--sp-8)' }}>
                    <div>
                        <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 4 }}>
                            Admin Portal
                        </div>
                        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '2rem', fontWeight: 400, color: 'var(--ivory)', lineHeight: 1 }}>
                            {currentLabel}
                        </h1>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-4)' }}>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--ivory-4)', fontFamily: "'JetBrains Mono', monospace" }}>
                            {new Date().toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-md)', padding: '8px 14px' }}>
                            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--champagne)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0A0A0B', fontSize: '0.8125rem' }}>A</div>
                            <div>
                                <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--ivory)' }}>Admin</div>
                                <div style={{ fontSize: '0.6875rem', color: 'var(--ivory-4)' }}>SLV Enterprises</div>
                            </div>
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={tab}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >

                        {/* ══ OVERVIEW ═══════════════════════════════════════ */}
                        {tab === 'overview' && (
                            <div>
                                {/* KPI Strip */}
                                <div className="kpi-strip" style={{ marginBottom: 'var(--sp-7)' }}>
                                    {[
                                        { label: 'Total Properties', val: properties.length, trend: '+3', up: true },
                                        { label: 'Active Listings',  val: properties.filter(p => p.status === 'Available').length, trend: '+2', up: true },
                                        { label: 'Sold',             val: properties.filter(p => p.status === 'Sold').length, trend: '+1', up: true },
                                        { label: 'Reviews',          val: reviews.length, trend: null, up: null },
                                        { label: 'Messages',         val: (messages || []).length, trend: null, up: null },
                                    ].map((k, i) => (
                                        <div key={i} className="kpi-item">
                                            <div className="kpi-value">{k.val}</div>
                                            <div className="kpi-label">{k.label}</div>
                                            {k.trend && (
                                                <div className={`kpi-trend ${k.up ? 'up' : 'down'}`}>
                                                    {k.up ? '↑' : '↓'} {k.trend} this week
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>

                                {/* Charts row */}
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-6)', marginBottom: 'var(--sp-7)' }}>
                                    {/* Property status bar chart */}
                                    <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-6)' }}>
                                        <div style={{ marginBottom: 'var(--sp-5)' }}>
                                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 4 }}>Property Status</div>
                                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--ivory)' }}>Distribution</div>
                                        </div>
                                        <ResponsiveContainer width="100%" height={180}>
                                            <BarChart data={statusData} barSize={36}>
                                                <CartesianGrid strokeDasharray="3 3" stroke="var(--stone)" vertical={false} />
                                                <XAxis dataKey="name" tick={{ fill: 'var(--ivory-4)', fontSize: 11 }} axisLine={false} tickLine={false} />
                                                <YAxis tick={{ fill: 'var(--ivory-4)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                                                <Tooltip content={<CustomTooltip />} />
                                                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                                    {statusData.map((entry, idx) => (
                                                        <rect key={idx} fill={entry.fill} />
                                                    ))}
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>

                                    {/* Recent activity (Messages) */}
                                    <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-6)' }}>
                                        <div style={{ marginBottom: 'var(--sp-5)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 4 }}>Recent Messages</div>
                                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--ivory)' }}>Inquiries</div>
                                            </div>
                                            <motion.button onClick={() => setTab('messages')} className="btn btn-ghost btn-sm" whileTap={{ scale: 0.97 }}>View All</motion.button>
                                        </div>
                                        <div>
                                            {(messages || []).slice(0, 4).map(m => (
                                                <div key={m._id || m.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0', borderBottom: '1px solid var(--stone-3)' }}>
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.875rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--ivory-4)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{m.subject || m.message}</div>
                                                    </div>
                                                    <span className={`badge ${m.isRead ? 'badge-stone' : 'badge-amber'}`}>{m.isRead ? 'Read' : 'New'}</span>
                                                </div>
                                            ))}
                                            {(messages || []).length === 0 && <div style={{ color: 'var(--ivory-4)', fontSize: '0.875rem', padding: 'var(--sp-4) 0' }}>No messages.</div>}
                                        </div>
                                    </div>
                                </div>

                                {/* Recent properties table */}
                                <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                                    <div style={{ padding: 'var(--sp-5) var(--sp-6)', borderBottom: '1px solid var(--stone)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <div>
                                            <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 2 }}>Portfolio</div>
                                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--ivory)' }}>Recent Properties</div>
                                        </div>
                                        <motion.button onClick={() => setTab('listings')} className="btn btn-ghost btn-sm" whileTap={{ scale: 0.97 }}>View All</motion.button>
                                    </div>
                                    <table className="data-table">
                                        <thead>
                                            <tr>
                                                <th>Property</th>
                                                <th>Location</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {properties.slice(0, 5).map(p => (
                                                <tr key={p.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <img src={p.img} alt="" style={{ width: 44, height: 36, objectFit: 'cover', borderRadius: 'var(--r-sm)', flexShrink: 0 }} />
                                                            <span style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.875rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</span>
                                                        </div>
                                                    </td>
                                                    <td style={{ color: 'var(--ivory-3)', fontSize: '0.875rem' }}>{p.location}</td>
                                                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem', color: 'var(--champagne)' }}>{p.price}</td>
                                                    <td><Badge status={p.status} /></td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* ══ ADD PROPERTY ══════════════════════════════════ */}
                        {tab === 'add' && (
                            <div style={{ maxWidth: 900 }}>
                                <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-7)' }}>

                                    {/* Section: Property Info */}
                                    <div style={{ marginBottom: 'var(--sp-7)' }}>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'var(--ivory)', marginBottom: 'var(--sp-5)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--stone)' }}>Property Information</div>
                                        <div className="form-grid-2" style={{ marginBottom: 'var(--sp-4)' }}>
                                            <div className="field-group">
                                                <label className="field-label">Property Title *</label>
                                                <input className="field-input" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Luxury 3BHK Villa" />
                                            </div>
                                            <div className="field-group">
                                                <label className="field-label">Property Type</label>
                                                <select className="field-input" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
                                                    {['Apartment', 'Villa', 'Penthouse', 'Row House', 'Independent House', 'Commercial', 'Plot'].map(t => <option key={t}>{t}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-grid-2" style={{ marginBottom: 'var(--sp-4)' }}>
                                            <div className="field-group">
                                                <label className="field-label">Price *</label>
                                                <input className="field-input" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="e.g. ₹2.5 Cr or ₹45,000/mo" />
                                            </div>
                                            <div className="field-group">
                                                <label className="field-label">Location</label>
                                                <select className="field-input" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))}>
                                                    {['Whitefield', 'Electronic City', 'Indiranagar', 'Koramangala', 'HSR Layout', 'Marathahalli', 'Sarjapur Road'].map(l => <option key={l}>{l}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="field-group">
                                            <label className="field-label">Full Address</label>
                                            <input className="field-input" value={form.address} onChange={e => setForm(p => ({ ...p, address: e.target.value }))} placeholder="Street, Area, Landmark" />
                                        </div>
                                    </div>

                                    {/* Section: Details & Specs */}
                                    <div style={{ marginBottom: 'var(--sp-7)' }}>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'var(--ivory)', marginBottom: 'var(--sp-5)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--stone)' }}>Details & Specifications</div>
                                        <div className="form-grid-3" style={{ marginBottom: 'var(--sp-4)' }}>
                                            <div className="field-group">
                                                <label className="field-label">BHK</label>
                                                <select className="field-input" value={form.bhk} onChange={e => setForm(p => ({ ...p, bhk: e.target.value }))}>
                                                    {['1', '2', '3', '4', '5', 'N/A'].map(b => <option key={b}>{b}</option>)}
                                                </select>
                                            </div>
                                            <div className="field-group">
                                                <label className="field-label">Area (sqft)</label>
                                                <input className="field-input" value={form.area} onChange={e => setForm(p => ({ ...p, area: e.target.value }))} placeholder="e.g. 1800" />
                                            </div>
                                            <div className="field-group">
                                                <label className="field-label">Furnishing</label>
                                                <select className="field-input" value={form.furnished} onChange={e => setForm(p => ({ ...p, furnished: e.target.value }))}>
                                                    {['Fully Furnished', 'Semi-Furnished', 'Unfurnished', 'Bare Shell'].map(f => <option key={f}>{f}</option>)}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="form-grid-2" style={{ marginBottom: 'var(--sp-4)' }}>
                                            <div className="field-group">
                                                <label className="field-label">Possession</label>
                                                <select className="field-input" value={form.possession} onChange={e => setForm(p => ({ ...p, possession: e.target.value }))}>
                                                    {['Ready to Move', 'Within 1 Month', 'Within 3 Months', 'Within 6 Months', 'Under Construction'].map(s => <option key={s}>{s}</option>)}
                                                </select>
                                            </div>
                                            <div className="field-group">
                                                <label className="field-label">Listing Status</label>
                                                <select className="field-input" value={form.status} onChange={e => setForm(p => ({ ...p, status: e.target.value }))}>
                                                    {['Available', 'Booked Today', 'Sold'].map(s => <option key={s}>{s}</option>)}
                                                </select>
                                            </div>
                                        </div>

                                        {/* List For: multi-category */}
                                        <div className="field-group">
                                            <label className="field-label">List Property For</label>
                                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                                                {[
                                                    { key: 'Sale', color: 'var(--champagne)' },
                                                    { key: 'Rent', color: 'var(--green)' },
                                                    { key: 'Lease', color: 'var(--blue)' },
                                                ].map(opt => {
                                                    const active = (form.categories || []).includes(opt.key);
                                                    return (
                                                        <motion.button
                                                            key={opt.key}
                                                            onClick={() => toggleAdminCat(opt.key)}
                                                            style={{
                                                                padding: '8px 18px', borderRadius: 'var(--r-sm)',
                                                                fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer',
                                                                border: `1px solid ${active ? opt.color : 'var(--stone)'}`,
                                                                background: active ? `${opt.color}14` : 'var(--charcoal-3)',
                                                                color: active ? opt.color : 'var(--ivory-3)',
                                                                transition: 'all 0.2s', fontFamily: 'inherit',
                                                            }}
                                                            whileTap={{ scale: 0.96 }}
                                                        >
                                                            {active && '✓ '}{opt.key}
                                                        </motion.button>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Section: Description & Amenities */}
                                    <div style={{ marginBottom: 'var(--sp-7)' }}>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'var(--ivory)', marginBottom: 'var(--sp-5)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--stone)' }}>Description & Amenities</div>
                                        <div className="field-group" style={{ marginBottom: 'var(--sp-4)' }}>
                                            <label className="field-label">Description</label>
                                            <textarea className="field-input" rows={4} value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} placeholder="Describe the property..." />
                                        </div>
                                        <div className="field-group">
                                            <label className="field-label">Amenities (comma separated)</label>
                                            <input className="field-input" value={form.amenities} onChange={e => setForm(p => ({ ...p, amenities: e.target.value }))} placeholder="Swimming Pool, Gym, 24/7 Security" />
                                        </div>
                                    </div>

                                    {/* Section: Media */}
                                    <div style={{ marginBottom: 'var(--sp-7)' }}>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.25rem', color: 'var(--ivory)', marginBottom: 'var(--sp-5)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--stone)' }}>Media</div>

                                        {/* Images */}
                                        <div className="field-group" style={{ marginBottom: 'var(--sp-5)' }}>
                                            <label className="field-label">Images ({images.length} selected)</label>
                                            <input type="file" multiple accept="image/*" id="admin-images-upload" style={{ display: 'none' }}
                                                onChange={e => setImagesState(prev => [...prev, ...Array.from(e.target.files || [])])} />
                                            <label htmlFor="admin-images-upload" className="drop-zone">
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--champagne)" strokeWidth="1.5" style={{ marginBottom: 8 }}>
                                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                                                </svg>
                                                <div style={{ color: 'var(--champagne)', fontWeight: 600, fontSize: '0.875rem', marginBottom: 4 }}>Upload Property Images</div>
                                                <div style={{ color: 'var(--ivory-4)', fontSize: '0.8125rem' }}>Click to browse files</div>
                                            </label>
                                            {images.length > 0 && (
                                                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 'var(--sp-3)' }}>
                                                    {images.map((f, i) => (
                                                        <div key={i} style={{ position: 'relative', width: 80, height: 70, borderRadius: 'var(--r-sm)', overflow: 'hidden', border: '1px solid var(--stone-2)' }}>
                                                            <img src={URL.createObjectURL(f)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                            <button onClick={() => setImagesState(p => p.filter((_, idx) => idx !== i))} style={{ position: 'absolute', top: 3, right: 3, background: 'var(--red)', border: 'none', borderRadius: '50%', color: '#fff', width: 18, height: 18, fontSize: 10, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>×</button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        {/* Videos */}
                                        <div className="field-group">
                                            <label className="field-label">Videos ({videos.length} selected)</label>
                                            <input type="file" multiple accept="video/*" id="admin-videos-upload" style={{ display: 'none' }}
                                                onChange={e => setVideosState(prev => [...prev, ...Array.from(e.target.files || [])])} />
                                            <label htmlFor="admin-videos-upload" className="drop-zone" style={{ paddingTop: 'var(--sp-4)', paddingBottom: 'var(--sp-4)' }}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--ivory-4)" strokeWidth="1.5" style={{ marginBottom: 8 }}>
                                                    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                                </svg>
                                                <div style={{ color: 'var(--ivory-3)', fontWeight: 600, fontSize: '0.875rem', marginBottom: 4 }}>Upload Property Videos</div>
                                                <div style={{ color: 'var(--ivory-4)', fontSize: '0.8125rem' }}>{videos.length > 0 ? `${videos.length} video(s) selected` : 'Click to browse files'}</div>
                                            </label>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div style={{ display: 'flex', gap: 'var(--sp-3)', paddingTop: 'var(--sp-4)', borderTop: '1px solid var(--stone)' }}>
                                        <motion.button className="btn btn-ghost" whileTap={{ scale: 0.97 }}>Save Draft</motion.button>
                                        <motion.button onClick={handlePublish} className="btn btn-primary btn-lg" whileTap={{ scale: 0.97 }}>
                                            Publish Property
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                                        </motion.button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* ══ ALL LISTINGS ══════════════════════════════════ */}
                        {tab === 'listings' && (
                            <div>
                                <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                                    <table className="data-table" style={{ tableLayout: 'auto' }}>
                                        <thead>
                                            <tr>
                                                <th>Property</th>
                                                <th>Location</th>
                                                <th>Categories</th>
                                                <th>Price</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {properties.map(p => (
                                                <tr key={p.id}>
                                                    <td>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                            <img src={p.img} alt="" style={{ width: 52, height: 42, objectFit: 'cover', borderRadius: 'var(--r-sm)', flexShrink: 0, border: '1px solid var(--stone)' }} />
                                                            <div>
                                                                <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.875rem', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
                                                                <div style={{ fontSize: '0.75rem', color: 'var(--ivory-4)' }}>{p.bhk ? `${p.bhk} BHK · ` : ''}{p.area} sqft</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={{ color: 'var(--ivory-3)', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{p.location}</td>
                                                    <td>
                                                        <div style={{ display: 'flex', gap: 4 }}>
                                                            {(p.categories || [p.category]).map(c => (
                                                                <span key={c} className="badge badge-stone" style={{ fontSize: '0.625rem' }}>{c}</span>
                                                            ))}
                                                        </div>
                                                    </td>
                                                    <td style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8125rem', color: 'var(--champagne)', whiteSpace: 'nowrap' }}>{p.price}</td>
                                                    <td>
                                                        {/* 3-way status toggle */}
                                                        <div className="status-toggle">
                                                            {['Available', 'Booked Today', 'Sold'].map(opt => {
                                                                const isActive = p.status === opt;
                                                                const colors = {
                                                                    Available: { c: 'var(--green)', bg: 'var(--green-dim)', border: 'rgba(34,197,94,0.3)' },
                                                                    'Booked Today': { c: 'var(--blue)', bg: 'var(--blue-dim)', border: 'rgba(96,165,250,0.3)' },
                                                                    Sold: { c: 'var(--amber)', bg: 'var(--amber-dim)', border: 'rgba(245,158,11,0.3)' },
                                                                }[opt];
                                                                return (
                                                                    <button
                                                                        key={opt}
                                                                        onClick={() => setProperties(prev => prev.map(x => x.id === p.id ? { ...x, status: opt } : x))}
                                                                        className="status-toggle-btn"
                                                                        style={{
                                                                            background: isActive ? colors.bg : 'transparent',
                                                                            color: isActive ? colors.c : 'var(--ivory-4)',
                                                                            borderColor: isActive ? colors.border : 'transparent',
                                                                            fontFamily: 'inherit',
                                                                        }}
                                                                    >
                                                                        {opt === 'Available' ? '✓' : opt === 'Booked Today' ? '⏳' : '★'} {opt.replace(' Today', '')}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <button
                                                            onClick={() => setProperties(prev => prev.filter(x => x.id !== p.id))}
                                                            style={{ background: 'var(--red-dim)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--r-sm)', padding: '6px 10px', color: 'var(--red)', cursor: 'pointer', fontSize: '0.8rem', transition: 'all 0.2s' }}
                                                            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.2)'; }}
                                                            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red-dim)'; }}
                                                        >
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" /></svg>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {properties.length === 0 && (
                                        <div style={{ padding: 'var(--sp-9)', textAlign: 'center', color: 'var(--ivory-4)' }}>No properties found.</div>
                                    )}
                                </div>
                            </div>
                        )}


                        {/* ══ BOOKED / SOLD ═════════════════════════════════ */}
                        {tab === 'booked' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-8)' }}>
                                {/* Booked Today */}
                                <div>
                                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--blue)', marginBottom: 'var(--sp-4)' }}>Booked Today</h2>
                                    {properties.filter(p => p.status === 'Booked Today').map(p => (
                                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--charcoal-2)', border: '1px solid rgba(96,165,250,0.2)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-4)', marginBottom: 'var(--sp-3)' }}>
                                            <img src={p.img} alt="" style={{ width: 64, height: 52, objectFit: 'cover', borderRadius: 'var(--r-sm)', border: '1px solid var(--stone)' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.9375rem', marginBottom: 2 }}>{p.title}</div>
                                                <div style={{ fontSize: '0.8125rem', color: 'var(--ivory-4)' }}>{p.location} · {p.price}</div>
                                            </div>
                                            <button onClick={() => setProperties(prev => prev.map(x => x.id === p.id ? { ...x, status: 'Sold' } : x))}
                                                style={{ background: 'var(--amber-dim)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 'var(--r-sm)', padding: '8px 16px', color: 'var(--amber)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, fontFamily: 'inherit' }}>
                                                Mark Sold
                                            </button>
                                        </div>
                                    ))}
                                    {!properties.some(p => p.status === 'Booked Today') && (
                                        <div style={{ color: 'var(--ivory-4)', fontSize: '0.875rem', padding: 'var(--sp-5)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)' }}>No booked properties.</div>
                                    )}
                                </div>

                                {/* Sold */}
                                <div>
                                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--champagne)', marginBottom: 'var(--sp-4)' }}>Sold Properties</h2>
                                    {properties.filter(p => p.status === 'Sold').map(p => (
                                        <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-4)', marginBottom: 'var(--sp-3)' }}>
                                            <img src={p.img} alt="" style={{ width: 64, height: 52, objectFit: 'cover', borderRadius: 'var(--r-sm)', filter: 'grayscale(0.4)', border: '1px solid var(--stone)' }} />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontWeight: 600, color: 'var(--ivory-3)', fontSize: '0.9375rem', marginBottom: 2 }}>{p.title}</div>
                                                <div style={{ fontSize: '0.8125rem', color: 'var(--ivory-4)' }}>{p.location} · {p.price}</div>
                                            </div>
                                            <Badge status="Sold" />
                                            <button onClick={() => setProperties(prev => prev.filter(x => x.id !== p.id))}
                                                style={{ background: 'var(--red-dim)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 'var(--r-sm)', padding: '8px 14px', color: 'var(--red)', cursor: 'pointer', fontSize: '0.8125rem', fontFamily: 'inherit' }}>
                                                Archive
                                            </button>
                                        </div>
                                    ))}
                                    {!properties.some(p => p.status === 'Sold') && (
                                        <div style={{ color: 'var(--ivory-4)', fontSize: '0.875rem', padding: 'var(--sp-5)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)' }}>No sold properties.</div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ══ REVIEWS ═══════════════════════════════════════ */}
                        {tab === 'reviews' && (
                            <div>
                                <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
                                    <motion.button
                                        className="btn btn-ghost-champagne"
                                        whileTap={{ scale: 0.97 }}
                                        onClick={async () => {
                                            if (token) {
                                                try {
                                                    const res = await axios.get(API_BASE + '/reviews', { headers: { Authorization: `Bearer ${token}` } });
                                                    if (res.data?.data?.reviews) {
                                                        setReviews(res.data.data.reviews.map(r => ({
                                                            ...r, id: r._id,
                                                            name: r.customerName || r.name,
                                                            review: r.message || r.review,
                                                            initials: (r.customerName || r.name || 'U').substring(0, 2).toUpperCase(),
                                                            date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                                                        })));
                                                    }
                                                } catch (e) { console.error('Fetch reviews error:', e); }
                                            }
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>
                                        Refresh Reviews
                                    </motion.button>
                                </div>

                                {reviews.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: 'var(--sp-11)', color: 'var(--ivory-4)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)' }}>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--stone-2)', marginBottom: 'var(--sp-3)' }}>★</div>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--ivory-3)' }}>No reviews found</div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                                        {reviews.map(r => (
                                            <div key={r.id} className={`list-row${r.isApproved ? '' : ' pending'}`} style={{ background: 'var(--charcoal-2)' }}>
                                                {/* Avatar */}
                                                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: 'var(--champagne)', fontSize: '1rem', flexShrink: 0 }}>
                                                    {r.initials}
                                                </div>
                                                {/* Content */}
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 4 }}>
                                                        <span style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.875rem' }}>{r.name}</span>
                                                        <span className={`badge ${r.isApproved ? 'badge-green' : 'badge-amber'}`}>{r.isApproved ? 'Approved' : 'Pending'}</span>
                                                        <StarRating rating={r.rating} />
                                                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--ivory-4)' }}>{r.date}</span>
                                                    </div>
                                                    <p style={{ fontSize: '0.875rem', color: 'var(--ivory-3)', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 'var(--sp-3)' }}>"{r.review}"</p>
                                                    <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                                                        {r.isApproved ? (
                                                            <button onClick={async () => {
                                                                if (token) {
                                                                    try {
                                                                        await axios.put(API_BASE + '/reviews/' + r.id + '/approve', { isApproved: false }, { headers: { Authorization: `Bearer ${token}` } });
                                                                        setReviews(prev => prev.map(x => x.id === r.id ? { ...x, isApproved: false } : x));
                                                                    } catch (e) { console.error(e); }
                                                                }
                                                            }} style={{ background: 'var(--amber-dim)', border: '1px solid rgba(245,158,11,0.25)', borderRadius: 'var(--r-sm)', padding: '5px 12px', color: 'var(--amber)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit' }}>
                                                                Unapprove
                                                            </button>
                                                        ) : (
                                                            <button onClick={async () => {
                                                                if (token) {
                                                                    try {
                                                                        await axios.put(API_BASE + '/reviews/' + r.id + '/approve', { isApproved: true }, { headers: { Authorization: `Bearer ${token}` } });
                                                                        setReviews(prev => prev.map(x => x.id === r.id ? { ...x, isApproved: true } : x));
                                                                    } catch (e) { console.error(e); }
                                                                }
                                                            }} style={{ background: 'var(--green-dim)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 'var(--r-sm)', padding: '5px 12px', color: 'var(--green)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit' }}>
                                                                Approve
                                                            </button>
                                                        )}
                                                        <button onClick={async () => {
                                                            if (token) {
                                                                try {
                                                                    await axios.delete(API_BASE + '/reviews/' + r.id, { headers: { Authorization: `Bearer ${token}` } });
                                                                    setReviews(prev => prev.filter(x => x.id !== r.id));
                                                                } catch (e) { console.error(e); }
                                                            }
                                                        }} style={{ background: 'var(--red-dim)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--r-sm)', padding: '5px 12px', color: 'var(--red)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit' }}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ══ MESSAGES ══════════════════════════════════════ */}
                        {tab === 'messages' && (
                            <div>
                                <div style={{ display: 'flex', gap: 'var(--sp-3)', marginBottom: 'var(--sp-6)' }}>
                                    <motion.button
                                        className="btn btn-ghost-champagne"
                                        whileTap={{ scale: 0.97 }}
                                        onClick={async () => {
                                            if (token) {
                                                try {
                                                    const res = await axios.get(API_BASE + '/contact', { headers: { Authorization: `Bearer ${token}` } });
                                                    if (res.data?.data?.messages) setMessages(res.data.data.messages);
                                                } catch (e) { console.error('Fetch messages error:', e); }
                                            }
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10" /><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" /></svg>
                                        Refresh Messages
                                    </motion.button>
                                </div>

                                {(messages || []).length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: 'var(--sp-11)', color: 'var(--ivory-4)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)' }}>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--stone-2)', marginBottom: 'var(--sp-3)' }}>✉</div>
                                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--ivory-3)' }}>No messages yet</div>
                                        <div style={{ fontSize: '0.875rem', marginTop: 'var(--sp-2)' }}>Messages from the Contact page will appear here.</div>
                                    </div>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 1, border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                                        {(messages || []).map(m => {
                                            const mid = m._id || m.id;
                                            return (
                                                <div key={mid} className={`list-row${!m.isRead ? ' unread' : ''}`} style={{ background: 'var(--charcoal-2)' }}>
                                                    {/* Avatar */}
                                                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: m.isRead ? 'var(--charcoal-3)' : 'var(--champagne-dim)', border: `1px solid ${m.isRead ? 'var(--stone)' : 'var(--champagne-20)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: m.isRead ? 'var(--ivory-4)' : 'var(--champagne)', fontSize: '1rem', flexShrink: 0 }}>
                                                        {(m.name || 'U').charAt(0).toUpperCase()}
                                                    </div>
                                                    {/* Content */}
                                                    <div style={{ flex: 1, minWidth: 0 }}>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)', marginBottom: 4 }}>
                                                            <span style={{ fontWeight: m.isRead ? 500 : 700, color: m.isRead ? 'var(--ivory-2)' : 'var(--ivory)', fontSize: '0.875rem' }}>{m.name}</span>
                                                            {!m.isRead && <span className="badge badge-champ" style={{ fontSize: '0.5625rem' }}>New</span>}
                                                            <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: 'var(--ivory-4)', fontFamily: "'JetBrains Mono', monospace" }}>
                                                                {m.createdAt ? new Date(m.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' }) : ''}
                                                            </span>
                                                        </div>
                                                        <div style={{ fontSize: '0.8125rem', color: 'var(--ivory-4)', marginBottom: 6 }}>
                                                            {m.phone && <span style={{ marginRight: 12 }}>📞 {m.phone}</span>}
                                                            {m.email && <span>✉ {m.email}</span>}
                                                        </div>
                                                        <p style={{ fontSize: '0.875rem', color: 'var(--ivory-3)', lineHeight: 1.6, marginBottom: 'var(--sp-3)', background: 'var(--charcoal)', borderRadius: 'var(--r-sm)', padding: '10px 14px', border: '1px solid var(--stone-3)' }}>{m.message}</p>
                                                        <div style={{ display: 'flex', gap: 'var(--sp-2)' }}>
                                                            {!m.isRead && (
                                                                <button onClick={async () => {
                                                                    if (token) {
                                                                        try {
                                                                            await axios.put(API_BASE + '/contact/' + mid + '/read', {}, { headers: { Authorization: `Bearer ${token}` } });
                                                                            setMessages(prev => prev.map(x => (x._id || x.id) === mid ? { ...x, isRead: true } : x));
                                                                        } catch (e) {}
                                                                    }
                                                                }} style={{ background: 'var(--green-dim)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: 'var(--r-sm)', padding: '5px 12px', color: 'var(--green)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit' }}>
                                                                    ✓ Mark Read
                                                                </button>
                                                            )}
                                                            {m.phone && <a href={`tel:${m.phone}`} style={{ background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', borderRadius: 'var(--r-sm)', padding: '5px 12px', color: 'var(--champagne)', fontSize: '0.75rem', fontWeight: 600 }}>📞 Call</a>}
                                                            {m.email && <a href={`mailto:${m.email}`} style={{ background: 'var(--blue-dim)', border: '1px solid rgba(96,165,250,0.25)', borderRadius: 'var(--r-sm)', padding: '5px 12px', color: 'var(--blue)', fontSize: '0.75rem', fontWeight: 600 }}>✉ Email</a>}
                                                            <button onClick={async () => {
                                                                if (token) {
                                                                    try {
                                                                        await axios.delete(API_BASE + '/contact/' + mid, { headers: { Authorization: `Bearer ${token}` } });
                                                                        setMessages(prev => prev.filter(x => (x._id || x.id) !== mid));
                                                                    } catch (e) {}
                                                                }
                                                            }} style={{ marginLeft: 'auto', background: 'var(--red-dim)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 'var(--r-sm)', padding: '5px 12px', color: 'var(--red)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'inherit' }}>
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* ══ SETTINGS ══════════════════════════════════════ */}
                        {tab === 'settings' && (
                            <div style={{ maxWidth: 560 }}>
                                <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-7)' }}>
                                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.3rem', color: 'var(--ivory)', marginBottom: 'var(--sp-6)', paddingBottom: 'var(--sp-4)', borderBottom: '1px solid var(--stone)' }}>Business Settings</div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', marginBottom: 'var(--sp-7)' }}>
                                        {[
                                            { label: 'Business Name', val: 'SLV Enterprises' },
                                            { label: 'Phone Number', val: '+91 8618327882' },
                                            { label: 'Location', val: 'Bangalore, Karnataka' },
                                            { label: 'Email', val: 'info@slventerprises.in' },
                                        ].map(s => (
                                            <div key={s.label} className="field-group">
                                                <label className="field-label">{s.label}</label>
                                                <input className="field-input" defaultValue={s.val} />
                                            </div>
                                        ))}
                                    </div>
                                    <motion.button className="btn btn-primary btn-lg" whileTap={{ scale: 0.97 }} onClick={() => alert('Settings saved!')}>
                                        Save Settings
                                    </motion.button>
                                </div>
                            </div>
                        )}

                    </motion.div>
                </AnimatePresence>
            </main>
        </div>
    );
}
