import { motion } from 'framer-motion';
import { useData } from '../DataContext.jsx';
import StarRating from '../components/StarRating.jsx';

export default function ReviewsPage() {
    const { reviews } = useData();
    const approvedReviews = reviews?.filter(r => r.isApproved) || [];

    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: 'var(--sp-9) 0' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Testimonials</div>
                        <h1 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>What Our Clients Say</h1>
                        <p style={{ color: 'var(--ivory-3)', maxWidth: 520, fontSize: '0.9375rem', lineHeight: 1.7 }}>
                            Hear from our clients about their experience finding properties across Bangalore with SLV Enterprises.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ padding: 'var(--sp-9) var(--sp-7)' }}>
                {approvedReviews.length === 0 ? (
                    <div style={{ minHeight: '40vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--sp-4)', textAlign: 'center' }}>
                        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '4rem', color: 'var(--stone-2)', lineHeight: 1 }}>"</div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--ivory)' }}>No reviews yet</h3>
                        <p style={{ color: 'var(--ivory-3)' }}>Be the first to share your experience.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 'var(--sp-5)' }}>
                        {approvedReviews.map((r, i) => (
                            <motion.div
                                key={r.id || i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', padding: 'var(--sp-6)', display: 'flex', flexDirection: 'column' }}
                            >
                                {/* Quote mark */}
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--champagne-20)', lineHeight: 0.8, marginBottom: 'var(--sp-3)', userSelect: 'none' }}>"</div>
                                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--ivory)', lineHeight: 1.65, flexGrow: 1, marginBottom: 'var(--sp-5)' }}>
                                    {r.review}
                                </p>
                                <div style={{ borderTop: '1px solid var(--stone-3)', paddingTop: 'var(--sp-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--sp-3)' }}>
                                        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: 'var(--champagne)', fontSize: '1rem' }}>
                                            {r.initials}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 600, color: 'var(--ivory)', fontSize: '0.875rem' }}>{r.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--ivory-4)' }}>{r.date}</div>
                                        </div>
                                    </div>
                                    <StarRating rating={r.rating} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
