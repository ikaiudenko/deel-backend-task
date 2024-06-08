import { FindOptions, WhereOptions } from 'sequelize'
import { ContractDto } from '../dto/contract'
import { Contract } from '../models'
import { IContract } from '../types/contract'
import { Repository } from './repository'

export class ContractRepo extends Repository {
    async getById(where: WhereOptions<IContract>): Promise<IContract | null> {
        const res = await Contract.findOne({ where })

        return res ? ContractDto.fromEntity(res) : null
    }

    async getMany(
        where: WhereOptions<IContract>,
        options: FindOptions
    ): Promise<IContract[]> {
        const res = await Contract.findAll({
            where,
            ...options,
        })

        return res.map((c) => ContractDto.fromEntity(c))
    }
}
