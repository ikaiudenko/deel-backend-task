import { Contract } from '../models'
import { IContract } from '../types/contract'

export class ContractDto {
    static fromEntity(entity: Contract): IContract {
        return {
            id: entity.dataValues.id,
            terms: entity.dataValues.terms,
            status: entity.dataValues.status,
            createdAt: entity.dataValues.createdAt,
            updatedAt: entity.dataValues.updatedAt,
            ContractorId: entity.dataValues.ContractorId,
            ClientId: entity.dataValues.ClientId,
        }
    }
}
