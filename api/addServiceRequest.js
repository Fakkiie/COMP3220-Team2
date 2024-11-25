import pool from './db.js';

//our add service that upload calls, it will take the values of what is uploaded and post them to our database 
//so that our grouped component call retrive these values
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const {
    serviceRequest,
    department,
    blockaddress,
    street,
    ward,
    methodreceived,
    createddate,
  } = req.body;

  try {
    const query = `
      INSERT INTO servicerequests 
      (request, department, blockaddress, street, ward, methodreceived, createddate)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      serviceRequest,
      department,
      blockaddress,
      street,
      ward,
      methodreceived,
      createddate,
    ];

    const { rows } = await pool.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).json({ error: "Failed to add service request" });
  }
}
