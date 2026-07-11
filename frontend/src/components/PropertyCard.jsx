import { motion } from 'framer-motion';
import Badge from './Badge.jsx';
import { waLink } from '../utils.js';

export default function PropertyCard({ property, onView }) {
    return (
        <motion.div
            className="prop-card"
            onClick={e => { if (e.target.closest('a')) return; onView(property); }}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'flex', flexDirection: 'column' }}
        >
            {/* Image */}
            <div className="prop-card-img" style={{ height: 260, position: 'relative' }}>
                <img src={property.img} alt={property.title} />
                {/* Gradient overlay */}
                <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 40%, rgba(0,0,0,0.6) 100%)',
                }} />
                {/* Badges top-left */}
                <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Badge status={property.status} />
                    {property.badge && <Badge status={property.badge} />}
                </div>
                {/* Price chip bottom-left */}
                <div style={{
                    position: 'absolute', bottom: 14, left: 14,
                    background: 'rgba(10,10,11,0.85)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 'var(--r-sm)',
                    padding: '5px 12px',
                }}>
                    <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.25rem', fontWeight: 500,
                        color: 'var(--ivory)', lineHeight: 1.2,
                    }}>
                        {property.price}
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <div style={{ marginBottom: 4 }}>
                    <div style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '1.2rem', fontWeight: 500,
                        color: 'var(--ivory)', lineHeight: 1.3,
                        marginBottom: 4,
                    }}>
                        {property.title}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--ivory-3)', fontSize: '0.8125rem' }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
                        </svg>
                        {property.address}
                    </div>
                </div>

                {/* Specs row */}
                <div style={{
                    display: 'flex', gap: 16, padding: '12px 0',
                    borderTop: '1px solid var(--stone-3)', borderBottom: '1px solid var(--stone-3)',
                    margin: '14px 0',
                }}>
                    {property.bhk && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8125rem', color: 'var(--ivory-3)' }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            </svg>
                            {property.bhk} BHK
                        </div>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.8125rem', color: 'var(--ivory-3)' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                        </svg>
                        {property.area} sqft
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--ivory-4)' }}>{property.furnished}</div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <motion.button
                        onClick={e => { e.stopPropagation(); onView(property); }}
                        className="btn btn-ghost"
                        style={{ flex: 1, fontSize: '0.8125rem' }}
                        whileTap={{ scale: 0.97 }}
                    >
                        View Details
                    </motion.button>
                    <motion.a
                        href={waLink(`Hello SLV Enterprises, I am interested in: ${property.title}`)}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-whatsapp"
                        style={{ flex: 1, fontSize: '0.8125rem' }}
                        whileTap={{ scale: 0.97 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        Enquire
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}
