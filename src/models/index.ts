import { Model, ENUM, TEXT, DECIMAL, BOOLEAN, DATE, STRING } from 'sequelize'
import sequelize from '../config/db'

export class Contract extends Model {}
Contract.init(
    {
        terms: {
            type: TEXT,
            allowNull: false,
        },
        status: {
            type: ENUM('new', 'in_progress', 'terminated'),
        },
    },
    {
        sequelize: sequelize.getInstance(),
        modelName: 'Contract',
    }
)

export class Job extends Model {}
Job.init(
    {
        description: {
            type: TEXT,
            allowNull: false,
        },
        price: {
            type: DECIMAL(12, 2),
            allowNull: false,
        },
        paid: {
            type: BOOLEAN,
            defaultValue: false,
        },
        paymentDate: {
            type: DATE,
        },
    },
    {
        sequelize: sequelize.getInstance(),
        modelName: 'Job',
    }
)

export class Profile extends Model {}
Profile.init(
    {
        firstName: {
            type: STRING,
            allowNull: false,
        },
        lastName: {
            type: STRING,
            allowNull: false,
        },
        profession: {
            type: STRING,
            allowNull: false,
        },
        balance: {
            type: DECIMAL(12, 2),
        },
        type: {
            type: ENUM('client', 'contractor'),
        },
    },
    {
        sequelize: sequelize.getInstance(),
        modelName: 'Profile',
    }
)

Profile.hasMany(Contract, { as: 'Contractor', foreignKey: 'ContractorId' })
Profile.hasMany(Contract, { as: 'Client', foreignKey: 'ClientId' })

Contract.belongsTo(Profile, { as: 'Contractor', foreignKey: 'ContractorId' })
Contract.belongsTo(Profile, { as: 'Client', foreignKey: 'ClientId' })

Contract.hasMany(Job, { as: 'Jobs', foreignKey: 'ContractId' })
Job.belongsTo(Contract, { as: 'Contract', foreignKey: 'ContractId' })
