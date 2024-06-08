import { Profile } from '../models'
import {
    IBestClient,
    IBestPriceEntity,
    IBestProfession,
    IBestProfessionEntity,
} from '../types/admin'
import { IProfile } from '../types/profile'

export class ProfileDto {
    static fromEntity(entity: Profile): IProfile {
        return {
            id: entity.dataValues.id,
            firstName: entity.dataValues.firstName,
            lastName: entity.dataValues.lastName,
            profession: entity.dataValues.profession,
            balance: entity.dataValues.balance,
            type: entity.dataValues.type,
            createdAt: entity.dataValues.createdAt,
            updatedAt: entity.dataValues.updatedAt,
        }
    }

    static createBestProfession(
        entity: IBestProfessionEntity
    ): IBestProfession {
        return {
            id: entity.id,
            profession: entity.profession,
            price: entity.price,
        }
    }

    static createBestClient(entity: IBestPriceEntity): IBestClient {
        return {
            id: entity.id,
            fullName: `${entity.firstName} ${entity.lastName}`,
            price: entity.price,
        }
    }
}
