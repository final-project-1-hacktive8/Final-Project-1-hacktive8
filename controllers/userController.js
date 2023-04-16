const connection = require('../config/db');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');
const {generateToken, verifyToken} = require('../helpers/jwt');

class UserController {
    static async register(req, res) {
        try {
            const { email, password } = req.body;
            const hash = hashPassword(password);
            const data = await connection.query('INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *', [email, hash]);
            res.status(201).json(data.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
            if (data.rows.length === 0) {
                res.status(404).json({message: 'User Not Found'});
            } else {
                const user = data.rows[0];
                const isValid = comparePassword(password, user.password);
                if (isValid) {
                    const token = generateToken({id: user.id, email: user.email});
                    res.status(200).json({token});
                } else {
                    res.status(400).json({message: 'Wrong Password'});
                }
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    static async getuser(req, res) {
        try {
            const data = await connection.query('SELECT * FROM users');
            res.status(200).json(data.rows);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

module.exports = UserController;