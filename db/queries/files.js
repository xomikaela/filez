import db from "#db/client";

/** Returns all files with their containing folder's name. */
export async function getFiles() {
  const sql = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders ON files.folder_id = folders.id
    ORDER BY files.id;
  `;

  const { rows } = await db.query(sql);
  return rows;
}

/** Creates and returns a file in the specified folder. */
export async function createFile({ name, size, folder_id }) {
  const sql = `
    INSERT INTO files (name, size, folder_id)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  const {
    rows: [file],
  } = await db.query(sql, [name, size, folder_id]);

  return file;
}
