import dotenv from 'dotenv';
import { connectDB } from '../src/config/db';
import app from '../src/app';

// Load environment variables
dotenv.config();

// Initialize DB connection for serverless function
// Vercel serverless functions are stateless, so we connect per cold start
connectDB().catch(console.error);

export default app;
