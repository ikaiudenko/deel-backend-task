import { Sequelize } from 'sequelize'
import sequelize from '../config/db'

export class Repository {
    get db(): Sequelize {
        return sequelize.getInstance()
    }
}
