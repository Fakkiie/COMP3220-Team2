import express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';
import groupedHandler from './grouped.js';
import addServiceHandler from './addServiceRequest.js'; 

//imports our db config
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5007;

//opens cors to anything so our get and post works
app.use(cors({
  origin: '*',
}));
app.use(express.json()); 

//defines our routes
app.get('/api/grouped', groupedHandler);
app.post('/api/addServiceRequest', addServiceHandler); 

//starts server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
