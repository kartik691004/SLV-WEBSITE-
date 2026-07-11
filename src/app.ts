import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

const app: Express = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: '*' })); // Can be restricted to frontend URL in production

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Logging
app.use(morgan('dev'));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

import authRoutes from './routes/auth.routes';
import propertyRoutes from './routes/property.routes';
import reviewRoutes from './routes/review.routes';
import dashboardRoutes from './routes/dashboard.routes';
import contactRoutes from './routes/contact.routes';
import { errorHandler } from './middlewares/error.middleware';

// Default Route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to SLV Enterprises API' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/properties', propertyRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/contact', contactRoutes);

// 404 Route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

export default app;
