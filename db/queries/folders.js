import db from "#db/client";

/** Returns all folders. */
export async function getFolders() {
  const sql = `
    SELECT *
    FROM folders
    ORDER BY id;
  `;

  const { rows } = await db.query(sql);
  return rows;
}

/** Returns a folder with its files, or undefined if not found. */
export async function getFolder(id) {
  const sql = `
    SELECT folders.*,
      COALESCE(
        json_agg(files ORDER BY files.id)
          FILTER (WHERE files.id IS NOT NULL),
        '[]'::json
      ) AS files
    FROM folders
    LEFT JOIN files ON files.folder_id = folders.id
    WHERE folders.id = $1
    GROUP BY folders.id;
  `;

  const {
    rows: [folder],
  } = await db.query(sql, [id]);

  return folder;
}
