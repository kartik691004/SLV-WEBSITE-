import { motion } from 'framer-motion';
import { CALL_NUM } from '../utils.js';

export default function CallBtn({ variant = 'primary', full = false, label = 'Call Now' }) {
    return (
        <motion.a
            href={`tel:${CALL_NUM}`}
            className={`btn btn-${variant}${full ? ' btn-full' : ''}`}
            whileTap={{ scale: 0.98 }}
        >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.68A2 2 0 012.18 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l.62-.62a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
            </svg>
            {label}
        </motion.a>
    );
}
