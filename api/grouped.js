import pool from './db.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  try {
    const query = `
      SELECT ward, department, COUNT(*) as count
      FROM servicerequests
      GROUP BY ward, department;

    `;
    const { rows } = await pool.query(query);
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error fetching grouped requests:', error);
    res.status(500).json({ error: 'Failed to fetch grouped requests' });
  }
}
