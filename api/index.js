import express from 'express';
import cors from 'cors'; // Import the CORS package
import dotenv from 'dotenv';
import groupedHandler from './grouped.js';
import serviceHandler from './service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5007;


app.use(cors({
  origin: '*',
}));

// Define routes
app.get('/api/grouped', groupedHandler);
app.get('/api/service', serviceHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
