import { useState } from 'react';
import { motion } from 'framer-motion';
import WaBtn from '../components/WaBtn.jsx';

export default function PurchasePage({ setPage }) {
    const [form, setForm] = useState({ name: '', phone: '', locations: '', type: 'Apartment', budget: 'Under ₹50 Lakhs' });
    return (
        <div style={{ paddingTop: 'var(--nav-h)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--charcoal-2)', borderBottom: '1px solid var(--stone)', padding: 'var(--sp-9) 0' }}>
                <div className="container">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <div className="t-eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Buy</div>
                        <h1 className="t-display-lg" style={{ color: 'var(--ivory)', marginBottom: 'var(--sp-3)' }}>Buy a Property</h1>
                        <p style={{ color: 'var(--ivory-3)', maxWidth: 520, lineHeight: 1.7 }}>Tell us your requirements and budget. We will find the best investment opportunities for you.</p>
                    </motion.div>
                </div>
            </div>
            <div className="container" style={{ padding: 'var(--sp-10) var(--sp-7)', maxWidth: 660 }}>
                <div style={{ background: 'var(--charcoal-2)', border: '1px solid var(--stone)', borderRadius: 'var(--r-xl)', padding: 'var(--sp-7)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
                    <div className="form-grid-2">
                        <div className="field-group"><label className="field-label">Name</label><input className="field-input" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your Name" /></div>
                        <div className="field-group"><label className="field-label">Phone</label><input className="field-input" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Phone Number" /></div>
                    </div>
                    <div className="field-group"><label className="field-label">Preferred Locations (comma separated)</label><input className="field-input" value={form.locations} onChange={e => setForm({ ...form, locations: e.target.value })} placeholder="e.g. Marathahalli, Bellandur" /></div>
                    <div className="form-grid-2">
                        <div className="field-group"><label className="field-label">Property Type</label><select className="field-input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}><option>Apartment</option><option>Villa</option><option>Plot</option><option>Commercial</option></select></div>
                        <div className="field-group"><label className="field-label">Budget</label><select className="field-input" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}><option>Under ₹50 Lakhs</option><option>₹50L – ₹1Cr</option><option>₹1Cr – ₹3Cr</option><option>Above ₹3Cr</option></select></div>
                    </div>
                    <motion.button className="btn btn-primary btn-lg" onClick={() => { alert('Requirement submitted successfully!'); setPage('home'); }} whileTap={{ scale: 0.97 }}>Submit Requirement</motion.button>
                    <div style={{ textAlign: 'center', color: 'var(--ivory-4)', fontSize: '0.8125rem' }}>Or chat directly with us on WhatsApp</div>
                    <WaBtn property="Purchase requirement" full />
                </div>
            </div>
        </div>
    );
}
