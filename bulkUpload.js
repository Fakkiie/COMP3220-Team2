import { sql } from '@vercel/postgres';
import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

//loads our .env variables
dotenv.config({ path: '.env.development.local' }); 

//determines our file path and batch size
const csvFilePath = path.join(process.cwd(), 'data', 'AllServiceRequests_YTD.csv');
const BATCH_SIZE = 500;

async function bulkUpload() {
  const results = [];

  //reads and parses the csv
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => {
      results.push(row);
    })
    .on('end', async () => {
      console.log('CSV file successfully processed.');

      try {
        //adds data in batches 
        for (let i = 0; i < results.length; i += BATCH_SIZE) {
          const batch = results.slice(i, i + BATCH_SIZE);

          //sql query and values array for batch insertion
          const values = [];
          const queryValues = batch.map((row, index) => {
            values.push(
              row['Department'],
              row['Block/Address'],
              row['Street'],
              row['Ward'],
              row['Method Received'],
              row['Created Date']
            );
            const offset = index * 6;
            return `($${offset + 1}, $${offset + 2}, $${offset + 3}, $${offset + 4}, $${offset + 5}, TO_TIMESTAMP($${offset + 6}, 'MON DD, YYYY HH:MI:SS PM'))`;
          });

          //final query with all batch values
          const query = `
            INSERT INTO ServiceRequests (
              department,
              blockaddress,
              street,
              ward,
              methodreceived,
              createddate
            ) VALUES ${queryValues.join(', ')};
          `;

          await sql.query(query, values);

          console.log(`Inserted batch ${Math.ceil((i + 1) / BATCH_SIZE)}`);
        }

        console.log('Bulk upload complete.');
      } catch (error) {
        console.error('Error during bulk upload:', error.message);
      }
    })
    .on('error', (error) => {
      console.error('Error reading the CSV file:', error.message);
    });
}

//runs the func
bulkUpload();
