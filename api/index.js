import express from 'express';
import cors from 'cors'; // Import CORS

const app = express();
const PORT = process.env.PORT || 5008;

app.use(cors());

app.get('/api/grouped', groupedHandler);
app.get('/api/service', serviceHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
