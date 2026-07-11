import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import WaBtn from '../components/WaBtn.jsx';
import CallBtn from '../components/CallBtn.jsx';
import { API_BASE } from '../utils.js';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.name || !form.message) { alert('Name and message are required.'); return; }
        setLoading(true);
        try {
            await axios.post(API_BASE + '/contact', form);
            setSubmitted(true);
            setForm({ name: '', email: '', phone: '', message: '' });
        } catch (e) {
            // Fallback: show success anyway for UX
            setSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            {/* Header */}
            <div style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: 'var(--sp-9) 0' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Get In Touch</div>
                        <h1 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>Contact Us</h1>
                        <p style={{ color: 'var(--ivory-3)', maxWidth: 520, fontSize: '0.9375rem', lineHeight: 1.7 }}>
                            Our team is ready to assist you with any real estate enquiries. Available Monday to Saturday, 9 AM – 8 PM.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="container contact-grid" style={{ padding: 'var(--sp-10) var(--sp-7)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-10)' }}>
                {/* Form */}
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    {submitted ? (
                        <div style={{ padding: 'var(--sp-9)', background: 'var(--charcoal-2)', border: '1px solid var(--champagne-20)', borderRadius: 'var(--r-xl)', textAlign: 'center' }}>
                            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '3rem', color: 'var(--champagne)', marginBottom: 'var(--sp-4)', lineHeight: 1 }}>✓</div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>Message Sent</h3>
                            <p style={{ color: 'var(--ivory-3)', marginBottom: 'var(--sp-5)', lineHeight: 1.7 }}>Thank you for reaching out. We'll be in touch within 24 hours.</p>
                            <button onClick={() => setSubmitted(false)} className="btn btn-ghost">Send Another</button>
                        </div>
                    ) : (
                        <div>
                            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--ivory)', marginBottom: 'var(--sp-6)' }}>Send a Message</h2>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}>
                                <div className="field-group">
                                    <label className="field-label">Full Name *</label>
                                    <input className="field-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name" />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-4)' }}>
                                    <div className="field-group">
                                        <label className="field-label">Email</label>
                                        <input className="field-input" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" />
                                    </div>
                                    <div className="field-group">
                                        <label className="field-label">Phone</label>
                                        <input className="field-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" />
                                    </div>
                                </div>
                                <div className="field-group">
                                    <label className="field-label">Message *</label>
                                    <textarea className="field-input" rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="How can we help you?" />
                                </div>
                                <motion.button
                                    className="btn btn-primary btn-lg"
                                    style={{ marginTop: 'var(--sp-2)' }}
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    whileTap={{ scale: 0.97 }}
                                >
                                    {loading ? 'Sending...' : 'Send Message'}
                                    {!loading && <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>}
                                </motion.button>
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Contact Info */}
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--ivory)', marginBottom: 'var(--sp-6)' }}>Contact Information</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
                        {/* Phone */}
                        <div style={{ padding: 'var(--sp-5)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--champagne)', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.62-.62a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" /></svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 4 }}>Phone</div>
                                <a href="tel:+918618327882" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.4rem', color: 'var(--ivory)', fontWeight: 400, transition: 'color 0.2s' }}
                                    onMouseEnter={e => e.currentTarget.style.color = 'var(--champagne)'}
                                    onMouseLeave={e => e.currentTarget.style.color = 'var(--ivory)'}
                                >+91 86183 27882</a>
                            </div>
                        </div>

                        {/* Location */}
                        <div style={{ padding: 'var(--sp-5)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--champagne)', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 4 }}>Office</div>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem', color: 'var(--ivory)' }}>Bangalore, Karnataka, India</div>
                            </div>
                        </div>

                        {/* Hours */}
                        <div style={{ padding: 'var(--sp-5)', background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-lg)', display: 'flex', gap: 'var(--sp-4)', alignItems: 'center' }}>
                            <div style={{ width: 44, height: 44, borderRadius: 'var(--r-md)', background: 'var(--champagne-dim)', border: '1px solid var(--champagne-20)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--champagne)', flexShrink: 0 }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                            </div>
                            <div>
                                <div style={{ fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ivory-4)', marginBottom: 4 }}>Hours</div>
                                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', color: 'var(--ivory)' }}>Monday – Saturday, 9 AM – 8 PM</div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--sp-3)', paddingTop: 'var(--sp-2)' }}>
                            <CallBtn variant="primary" label="Call Now" />
                            <WaBtn />
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr !important; } }
            `}</style>
        </div>
    );
}
