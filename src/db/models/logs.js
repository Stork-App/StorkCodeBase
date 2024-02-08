const knex = require('../knex');


class Logs {

    static async list(user_id) {
      const query = 'SELECT * FROM logs WHERE user_id = ?';
      const args = [user_id]
      const { rows } = await knex.raw(query,args);
      const logs = rows
      return logs
    }
  
    static async create(mood, abd_pain, back_pain, nausea, fatigue, user_id) {
        const query = `INSERT INTO logs (mood, abd_pain, back_pain, nausea, fatigue, user_id)
          VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
        const args = [mood, abd_pain, back_pain, nausea, fatigue, user_id];
        const { rows } = await knex.raw(query, args);
        const logEntry = rows[0];
        return logEntry; 
    }
    static async findAvg(user_id) {
        const query = `SELECT AVG(mood), AVG(abd_pain), AVG(back_pain), AVG(nausea), AVG(fatigue) FROM logs WHERE user_id = ?`;
        const args = [user_id];
        const { rows } = await knex.raw(query, args);
        return rows[0];
    }

  
  static async update(mood, abd_pain, back_pain, nausea, fatigue,logId, user_id,) {
    const query = "UPDATE logs SET mood = ?, abd_pain = ?, back_pain = ?, nausea = ?, fatigue = ? WHERE id = ? AND user_id = ? RETURNING *;";
    const args = [mood, abd_pain, back_pain, nausea, fatigue, logId, user_id];
       const { rows } = await knex.raw(query, args);
       const log = rows[0];
       return log ? new Logs(log): null
    }
  
  
}


module.exports = Logs;

0