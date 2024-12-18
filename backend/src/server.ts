import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow Cross-Origin Resource Sharing
app.use(cors({
  origin: 'http://localhost:5173' // Allow requests from the Vite frontend
}));
app.use(express.json()); // Parse JSON request body

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// --- API Routes ---
app.get('/api/hello', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});

app.get('/api/status', (req: Request, res: Response) => {
  res.json({ status: 'Server is running!', timestamp: new Date() });
});

app.get('/api/message', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
});
// --- Static Files in Production ---
if (process.env.NODE_ENV === 'production') {
  // Serve React static files
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  // Catch-all route for React Router
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
  });
}

// --- Error Handling Middleware ---
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
