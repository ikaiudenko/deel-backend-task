import { Op, Sequelize } from 'sequelize'
import sequelize from '../config/db'

export class BaseService {
    profileQuery(profileId: number) {
        return {
            [Op.or]: [{ ContractorId: profileId }, { ClientId: profileId }],
        }
    }

    get db(): Sequelize {
        return sequelize.getInstance()
    }
}
