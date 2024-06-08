import { Op } from 'sequelize'
import { ContractStatus, IContract } from '../types/contract'
import { IQuery } from '../types/query'
import { BaseService } from './basic'
import { ContractRepo } from '../repositories/contract'

export class ContractService extends BaseService {
    private readonly repo: ContractRepo

    constructor() {
        super()
        this.repo = new ContractRepo()
    }

    getById(id: number, profileId: number): Promise<IContract | null> {
        return this.repo.getById({
            id,
            ...this.profileQuery(profileId),
        })
    }

    async getActiveList(
        profileId: number,
        query?: IQuery
    ): Promise<IContract[]> {
        const offset = Number(query?.offset) || 0
        const limit = Number(query?.limit) || 10

        return this.repo.getMany(
            {
                ...this.profileQuery(profileId),
                status: { [Op.ne]: ContractStatus.Terminated },
            },
            { offset, limit }
        )
    }
}
