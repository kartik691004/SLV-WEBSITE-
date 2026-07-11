import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { API_BASE, MOCK_PROPERTIES, MOCK_REVIEWS, normalizeProperty, normalizeReview } from './utils.js';

export const DataContext = createContext(null);
export const useData = () => useContext(DataContext);

export function DataProvider({ children }) {
    const [properties, setProperties] = useState(MOCK_PROPERTIES);
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const [messages, setMessages] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('slv_token') || null);

    useEffect(() => {
        const fetchPublicData = async () => {
            try {
                const res = await axios.get(API_BASE + '/properties/public');
                if (res.data?.data?.properties?.length > 0) {
                    setProperties(res.data.data.properties.map(normalizeProperty));
                }
            } catch (err) {
                // Keep mock properties when the public API is unavailable.
            }

            try {
                const res = await axios.get(API_BASE + '/reviews/public');
                if (res.data?.data?.reviews?.length > 0) {
                    setReviews(res.data.data.reviews.map(normalizeReview));
                }
            } catch (err) {
                // Keep mock reviews when the public API is unavailable.
            }
        };

        fetchPublicData();
    }, []);

    const login = async (email, password) => {
        const res = await axios.post(API_BASE + '/auth/login', { email, password });
        if (res.data?.data?.token) {
            setToken(res.data.data.token);
            localStorage.setItem('slv_token', res.data.data.token);
            return;
        }

        throw new Error('Invalid credentials');
    };

    const value = useMemo(() => ({
        properties,
        setProperties,
        reviews,
        setReviews,
        messages,
        setMessages,
        token,
        setToken,
        login,
    }), [properties, reviews, messages, token]);

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
}
