const connection = require('../config/db');

class ReflectionController {
    static async GetAllReflectionsbyId(req,res) {
        try {
            // const userid = req.Userdata (intinya mengambil id user)
            const data = await connection.query(`SELECT * FROM Reflection WHERE userid = $1, ${userid}`);
            res.status(200).json(data.rows);
        } catch {error} {
            console.log(error);
            res.status(404).json(error);
        }
    }

    static async CreateReflection(req,res) {
        try {
            //Kurang ngambil id user terus di input di dalem userid dalam data reflection
            const { success, low_point, take_away } = req.body;
            const data = await connection.query(`INSERT INTO Reflection(success, low_point, take_away) VALUES($1,$2,$3,$4) RETURNING *`, [success, low_point, take_away]);
            res.status(201).json(data.rows[0]);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
    static async UpdateReflection(req,res) {
        try {
            //ambil data lama
            const oldReflection = await connection.query(`SELECT * FROM Reflections WHERE id=$1` [refID]);
        } catch (error) {
            console.log(error);
            res.status(404).json(error);
        }
        //update data
        try {
            await connection.query(`UPDATE Reflection SET checked=$1 Where id=$2`, [!oldReflection.rows[0].checked,[refID]])
        } catch (err) {
            console.log(error);
            res.status(500).json(error)
        }
    }  
    static async DeleteReflection(req,res) {
        try {
            await connection.query(`DELETE FROM Reflection WHERE id=$1`,[refID])
        } catch (err) {
            console.log(error);
            res.status(500).json(error)
        } return;
    }

}
module.exports = ReflectionController;