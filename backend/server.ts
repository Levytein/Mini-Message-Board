import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import {Filter} from 'bad-words';
import {getAllMessages,insertMessage} from './db/queries';


// Initialize the Express app
const app = express();
const PORT = 5000;



const allowedOrigins = [
  'http://localhost:5173',
  'https://minimessageboard-production.up.railway.app',
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json()); 

const filter = new Filter();
app.get('/', async (req, res) => {

  try {
    const page = parseInt(req.query.page as string, 10) || 1; 
    const limit = parseInt(req.query.limit as string, 10) || 6; 

    const offset = (page - 1) * limit;
    const result = await getAllMessages(limit,offset); 

    const messages  = result.rows;
    const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].total_count, 10) : 0;
    res.json({messages,
      totalPages:Math.ceil(totalCount / limit),
      totalCount,
    }); 
    
  } catch (err) {
    console.error('Error fetching usernames:', err);
    res.status(500).json({ error: 'Failed to fetch usernames' });
  }
});
app.post('/new', async (req: Request, res: Response) => {
  const { user, message, posted, timeZone } = req.body; 

  if (filter.isProfane(user) || filter.isProfane(message)) {
    res.status(400).json({ error: 'Explicit language is not allowed' });
  }
  
  await insertMessage(user, message, posted, timeZone);
   res.send('Form submitted successfully!');
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


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
