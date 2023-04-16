connection = require('../config/db');
class reflection {
    //create reflection
    static async createReflection(req, res) {
        try {
            const { success, low_point, take_away } = req.body;
            const userid = req.user.id;
            const data = await connection.query('INSERT INTO reflections (success, low_point, take_away, userid) VALUES ($1, $2, $3, $4) RETURNING *', [success, low_point, take_away, userid]);
            res.status(201).json(data.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    //get reflections by user login
    static async getReflections(req, res) {
        try {
            const userid = req.user.id;
            const data = await connection.query('SELECT * FROM reflections WHERE userid = $1', [userid]);
            res.status(200).json(data.rows);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //get reflections by id
    static async getReflectionById(req, res) {
        try {
            const id = req.params.id;
            const data = await connection.query('SELECT * FROM reflections WHERE id = $1', [id]);
            res.status(200).json(data.rows[0]);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //update reflections by id
    static async updateReflection(req, res) {
        try {
            const id = req.params.id;
            const { success, low_point, take_away } = req.body;
            const data = await connection.query('UPDATE reflections SET success = $1, low_point = $2, take_away = $3 WHERE id = $4 RETURNING *', [success, low_point, take_away, id]);
            res.status(200).json(data.rows[0]);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    //delete reflections by id
    static async deleteReflection(req, res) {
        try {
            const id = req.params.id;
            const data = await connection.query('DELETE FROM reflections WHERE id = $1 RETURNING *', [id]);
            res.status(200).json(data.rows[0]);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
module.exports = reflection;