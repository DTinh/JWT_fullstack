import { where } from 'sequelize';
import db from '../models/index';

const getGroup = async () => {
    try {
        let data = await db.Group.findAll({
            order: [
                ['name', 'ASC']
            ]
        });
        return {
            errCode: 0,
            errMessage: 'get group success',
            data
        }
    } catch (e) {
        console.log(e);
        return {
            errCode: 1,
            errMessage: 'something wrongs with services',
            data: []
        }
    }
}

module.exports = {
    getGroup
}