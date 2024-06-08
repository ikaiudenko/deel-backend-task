import { Sequelize } from 'sequelize'
import sequelize from '../config/db'
import { Op } from 'sequelize'

export class Repository {
    get db(): Sequelize {
        return sequelize.getInstance()
    }
}
