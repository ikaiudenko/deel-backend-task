import { Job } from '../models'
import { IJob } from '../types/job'

export class JobDto {
    static fromEntity(entity: Job): IJob {
        return {
            id: entity.dataValues.id,
            description: entity.dataValues.description,
            price: entity.dataValues.price,
            paid: entity.dataValues.paid,
            paymentDate: entity.dataValues.paymentDate,
            createdDate: entity.dataValues.createdDate,
            updatedDate: entity.dataValues.updatedDate,
            ContractId: entity.dataValues.ContractId,
        }
    }
}
