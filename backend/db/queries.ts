const pool = require("./pool");

export async function getAllMessages(limit:number,offset:number) {
    try {
      const result = await pool.query('SELECT *, COUNT(*) OVER() AS total_count FROM messages ORDER BY posted DESC LIMIT $1 OFFSET $2' ,[limit,offset]);
  
      return result;
    } catch (err) {
      console.error('Database query error:', err);
      throw err;
    }
  }
  export async function searchUsername(username:string) {
   try{
        const query =`
        SELECT *
        FROM messages
        WHERE username ILIKE $1        
        `;
        const values = [`%${username}%`];
        const result = await pool.query(query,values);
        return result.rows;
   }
   catch(err){
    console.error('Database search error:', err);
    throw err;
   }
  }

export async function insertMessage(username:string,message:string,posted:string,timeZone:string) {
  await pool.query("INSERT INTO messages (username,message,posted,time_zone) VALUES ($1,$2,$3,$4)", [username,message,posted,timeZone]);
}

