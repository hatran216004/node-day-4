const pool = require('@/config/database');

/*
  {
    "id": 62,
    "title": "Post 02",
    "slug": "post-02",
    "description": "Description 02",
    "content": "Content 02",
    "status": "published",
    "published_at": "2026-01-08T22:17:56.000Z",
    "deleted_at": null,
    "created_at": "2026-01-08T22:17:56.000Z",
    "updated_at": "2026-01-08T22:17:56.000Z",
    "user_id": 2
  }
*/

class Post {
  async findAll(limit, offset, filters = {}) {
    let query = 'SELECT * FROM posts ';
    const conditions = [];
    const values = [];

    Object.entries(filters).map(([key, value]) => {
      if (value !== undefined && value !== null) {
        conditions.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (conditions.length > 0) {
      query += ` where ${conditions.join(' and ')}`;
    }

    query += ' ORDER BY created_at limit ? offset ?';

    const [rows] = await pool.query(query, [...values, limit, offset]);
    return rows;
  }

  async count() {
    const [rows] = await pool.query('SELECT count(*) as total FROM posts;');
    return rows[0].total;
  }
}

module.exports = new Post();
