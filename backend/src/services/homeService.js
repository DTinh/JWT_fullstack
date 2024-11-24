import { where } from "sequelize";
import db from "../models/index";

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let newUser = await db.User.findOne({
                where: {
                    id: 1
                },
                attributes: ['id', 'username', 'email'],
                include: { model: db.Group, attributes: ['name', 'description'], },
                raw: true,
                nest: true
            })

            let roles = await db.Role.findAll({
                include: {
                    model: db.Group,
                    where: { id: 1 }
                },
                raw: true,
                nest: true
            })

            console.log("check newUser", newUser);
            console.log("check roles", roles);

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getAllUser
}