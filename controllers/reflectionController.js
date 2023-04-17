const connection = require('../config/db');



class ReflectionController {
    static async GetAllReflectionsbyId(req,res) {
        try {           
            const loginid = req.user.id;
            const data = await connection.query(`SELECT * FROM reflections WHERE userid = ${loginid}`)
            res.status(202).json(data.rows[0]);
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
        try {
            //ambil data lama
            const oldReflection = await connection.query(`SELECT * FROM reflections WHERE id=$1` [refID]);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
        //update data
        try {
            await connection.query(`UPDATE reflections SET checked=$1 Where id=$2`, [!oldReflection.rows[0].checked,[refID]])
        } catch (err) {
            console.log(error);
            res.status(500).json(error)
        }
    }  
    static async DeleteReflection(req,res) {
        try {
            await connection.query(`DELETE FROM reflections WHERE id=$1`,[refID])
        } catch (err) {
            console.log(error);
            res.status(500).json(error)
        } return;
    }

}
module.exports = ReflectionController;