import { Dialect, Sequelize } from 'sequelize'
import dotenv from 'dotenv'

dotenv.config()

export default class Database {
    private static database: Sequelize | null = null

    static getInstance(): Sequelize {
        if (this.database) {
            return this.database
        }
        console.error(process.env.DB_DIALECT)
        this.database = new Sequelize({
            dialect: process.env.DB_DIALECT as Dialect,
            storage: process.env.DB_STORAGE as string,
        })

        return this.database
    }

    private constructor() {}
}
