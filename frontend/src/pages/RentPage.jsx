import { useState } from 'react';
import { motion } from 'framer-motion';
import WaBtn from '../components/WaBtn.jsx';

export default function RentPage({ setPage }) {
    const [form, setForm] = useState({ name: '', phone: '', location: '', type: 'Apartment', budget: 'Under ₹20,000' });

    const steps = [
        { n: '01', title: 'Tell Us Your Needs', desc: 'Share your preferred location, budget, and property type.' },
        { n: '02', title: 'We Shortlist', desc: 'Our agents curate verified options that match your criteria.' },
        { n: '03', title: 'Move In', desc: 'Schedule visits, finalise the deal, and move in with full documentation support.' },
    ];

    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: 'var(--sp-9) 0' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Rentals</div>
                        <h1 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>Find a Rental Property</h1>
                        <p style={{ color: 'var(--ivory-3)', maxWidth: 520, lineHeight: 1.7 }}>Looking for a place to rent? Tell us your requirements and our agents will find the perfect match within days.</p>
                    </motion.div>
                </div>
            </div>

            <div className="container" style={{ padding: 'var(--sp-10) var(--sp-7)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--sp-10)', alignItems: 'start' }}>
                {/* Form */}
                <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--ivory)', marginBottom: 'var(--sp-6)' }}>Submit Your Requirement</h2>
                    <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-7)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
                        <div className="form-grid-2">
                            <div className="field-group"><label className="field-label">Name</label><input className="field-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" /></div>
                            <div className="field-group"><label className="field-label">Phone</label><input className="field-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" /></div>
                        </div>
                        <div className="field-group"><label className="field-label">Preferred Location</label><input className="field-input" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="e.g. Indiranagar, Whitefield" /></div>
                        <div className="form-grid-2">
                            <div className="field-group"><label className="field-label">Property Type</label><select className="field-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Apartment</option><option>Villa</option><option>Independent House</option><option>Studio</option></select></div>
                            <div className="field-group"><label className="field-label">Monthly Budget</label><select className="field-input" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}><option>Under ₹20,000</option><option>₹20k – ₹40k</option><option>₹40k – ₹80k</option><option>Above ₹80k</option></select></div>
                        </div>
                        <motion.button className="btn btn-primary btn-lg" onClick={() => { alert('Requirement submitted successfully!'); setPage('home'); }} whileTap={{ scale: 0.97 }}>Submit Requirement</motion.button>
                        <div style={{ textAlign: 'center', color: 'var(--ivory-4)', fontSize: '0.8125rem' }}>Or chat directly with us</div>
                        <WaBtn property="Rent requirement" full />
                    </div>
                </div>

                {/* Process */}
                <div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.8rem', color: 'var(--ivory)', marginBottom: 'var(--sp-7)' }}>How It Works</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
                        {steps.map((s, i) => (
                            <motion.div key={s.n} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }} style={{ display: 'flex', gap: 'var(--sp-5)', alignItems: 'flex-start' }}>
                                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: 'var(--champagne)', fontWeight: 500, paddingTop: 4, flexShrink: 0, minWidth: 28 }}>{s.n}</div>
                                <div>
                                    <div style={{ fontWeight: 600, color: 'var(--ivory)', marginBottom: 4, fontSize: '0.9375rem' }}>{s.title}</div>
                                    <div style={{ color: 'var(--ivory-3)', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
