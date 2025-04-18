import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import leoProfanity from 'leo-profanity';
import {getAllMessages,insertMessage} from './db/queries';


// Initialize the Express app
const app = express();
const PORT = 5000;
leoProfanity.loadDictionary('en');



const allowedOrigins = [
  'http://localhost:5173',
  'https://minimessageboard-production.up.railway.app',
  'https://mini-message-board-vert.vercel.app'
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

app.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 6;
    const offset = (page - 1) * limit;

    const result = await getAllMessages(limit, offset);
    console.log('✅ DB result:', result);

    const messages = result.rows;
    const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].total_count, 10) : 0;

    res.json({ messages, totalPages: Math.ceil(totalCount / limit), totalCount });
  } catch (err: any) {
    console.error('❌ Error fetching usernames:', err.message || err);
    res.status(500).json({ error: 'Failed to fetch usernames' });
  }
});
app.post('/new', async (req, res) => {
  try {
    const { user, message, posted, timeZone } = req.body; 

    const normalize = (text: string) =>
      text.toLowerCase().replace(/[^a-z]/gi, '');
    
    if (
      leoProfanity.check(normalize(user)) ||
      leoProfanity.check(normalize(message))
    ) {
       res.status(400).json({ error: 'Explicit language is not allowed' });
       return;
    }
    
    const result = await insertMessage(user, message, posted, timeZone);
     res.status(201).json({ 
      message: 'Form submitted successfully!', 
      insertedRow: result.rows[0] 
    });
  } catch (error) {
    console.error('Error in message submission:', error);
     res.status(500).json({ error: 'Failed to submit message' });
  }
});




app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.message);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
