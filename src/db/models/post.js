const knex = require("../knex");

class Post {
  static async list() {
    const query = "SELECT * FROM posts";
    const { rows } = await knex.raw(query);
    return rows;
  }

  static async create(user_id, title, description) {
    const query = `INSERT INTO posts (user_id, title, description)
          VALUES (?, ?, ?) RETURNING *`;
    const args = [user_id, title, description];
    const { rows } = await knex.raw(query, args);
    const postEntry = rows[0];
    return postEntry;
  }

  static async find(id) {
    const query = "SELECT * FROM posts WHERE id = ?";
    const args = [id];
    const { rows } = await knex.raw(query, args);
    const post = rows[0];
    return post || [];
  }

  static async update(title, description, id) {
    const query =
      "UPDATE posts SET title = ?, description = ? WHERE id = ? RETURNING *";
    const args = [title, description, id];
    console.log(args);
    const { rows } = await knex.raw(query, args);
    return rows;
  }
}

module.exports = Post;
