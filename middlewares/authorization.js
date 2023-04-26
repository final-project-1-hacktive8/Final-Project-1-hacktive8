connection = require('../config/db');
const authorization = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rows } = await connection.query('SELECT * FROM reflections WHERE id = $1', [id]);
        if (!rows[0]) {
            return res.status(404).json({
                status: 'error',
                message: 'Reflection not found',
            });
        }
        if (rows[0].userid !== req.user.id) {
            return res.status(401).json({
                status: 'Authorization error',
                message: `Error with user id: ${req.user.id} does not have permission to access reflection with id: ${rows[0].userid}`,
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
        console.log(error);
    }
}

module.exports = authorization;