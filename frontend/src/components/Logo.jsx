import { motion } from 'framer-motion';

export default function Logo({ size = 'md', onClick }) {
    const sizes = { sm: { wordmark: '1rem', tag: '0.5rem', gap: 8 }, md: { wordmark: '1.125rem', tag: '0.5625rem', gap: 10 }, lg: { wordmark: '1.375rem', tag: '0.625rem', gap: 12 } };
    const s = sizes[size] || sizes.md;
    return (
        <motion.div
            onClick={onClick}
            whileTap={{ scale: 0.98 }}
            style={{ display: 'flex', alignItems: 'center', gap: s.gap, cursor: onClick ? 'pointer' : 'default', userSelect: 'none' }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: s.wordmark, fontWeight: 500, letterSpacing: '0.04em', color: 'var(--ivory)', lineHeight: 1 }}>
                    SLV
                    <span style={{ color: 'var(--champagne)', marginLeft: 4, fontWeight: 300 }}>—</span>
                </div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: s.tag, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ivory-4)', lineHeight: 1 }}>
                    Enterprises
                </div>
            </div>
        </motion.div>
    );
}
