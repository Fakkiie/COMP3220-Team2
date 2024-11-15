import pool from './db.js';

//what our wardmap uses to allow the count of requests made in a department,
//whenever i set the sql query to request, ward it still gives me department no idea why
//but we will pull department until we can fix that
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const query = `
      SELECT department, ward, COUNT(*) as count
      FROM servicerequests
      GROUP BY department, ward;
    `;
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching grouped requests:', error);
    res.status(500).json({ error: 'Failed to fetch grouped requests' });
  }
}
