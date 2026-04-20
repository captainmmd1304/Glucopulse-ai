import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

const app: Application = express();

// Security Middlewares
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || '*' }));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check Endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Backend is healthy!' });
});

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Welcome to GlucoPulse API' });
});

// Apps Routes Mount
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import clinicalRoutes from './routes/clinical.routes';
import predictRoutes from './routes/predict.routes';

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/clinical', clinicalRoutes);
app.use('/api/v1/predict', predictRoutes);

// Global 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Route Not Found - ${req.originalUrl}`,
  });
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});

export default app;
