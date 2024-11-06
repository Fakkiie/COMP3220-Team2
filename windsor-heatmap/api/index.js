import express from 'express';
import dotenv from 'dotenv';
import groupedHandler from './grouped.js';
import serviceHandler from './service.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5009;

app.get('/api/grouped', groupedHandler);
app.get('/api/service', serviceHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
