const connection = require('../config/db');



class ReflectionController {
    static async GetAllReflectionsbyId(req,res) {
        try {           
            const loginid = req.user.id;
            const data = await connection.query(`SELECT * FROM reflections WHERE userid = $1`, [loginid])
            res.status(202).json(data.rows);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
    }

    static async CreateReflection(req,res) {
        try {
            const loginid = req.user.id;
            const { success, low_point, take_away } = req.body; 
            const now = new Date().toISOString();             
            const data = await connection.query(`INSERT INTO reflections(
                success,
                low_point,
                take_away,
                createdat,
                updateat,
                userid)
                VALUES($1,$2,$3,$4,$5,$6) RETURNING *`, [success, low_point, take_away, now, now, loginid]);
            res.status(201).json(data.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    static async UpdateReflection(req,res) {
        const loginid = req.user.id;
        const tableid = req.params.id;
        const { success, low_point, take_away } = req.body; 
        try {
        const oldReflection = await connection.query(`SELECT * FROM reflections WHERE id = $1`, [tableid]);
        if (oldReflection.rowCount === 0) {
            res.status(404).json({ error: 'Reflection not found' });
            return;
        } 
        const updatedReflection = await connection.query(
            `UPDATE reflections SET success = $1, low_point = $2, take_away = $3, updateat = $4 WHERE id = $5 RETURNING *`,
            [success, low_point, take_away, new Date().toISOString(), tableid]
        );

        res.status(200).json(updatedReflection.rows[0]);
        }  catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });   
        }
            
     } 
    static async DeleteReflection(req,res) {
        const loginid = req.user.id;
        const tableid = req.params.id;
        try {
            const reflection = await connection.query(`SELECT * FROM reflections WHERE id = $1`, [tableid]);
            if (reflection.rowCount === 0) {
                res.status(404).json({ error: 'Reflection not found' });
                return;
            }

            await connection.query(`DELETE FROM reflections WHERE id = $1`, [tableid]);
    
            res.status(200).json({ message: 'Reflection deleted successfully' });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}


module.exports = ReflectionController;