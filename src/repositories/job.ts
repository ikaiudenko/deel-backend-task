import { Transaction, WhereOptions } from 'sequelize'
import { IJob } from '../types/job'
import { Job } from '../models'
import { JobDto } from '../dto/job'

export class JobRepo {
    async findOne(where: WhereOptions<IJob>): Promise<IJob> {
        const job = await Job.findOne({ where })

        if (!job) {
            throw new Error(`Job is not found`)
        }

        return JobDto.fromEntity(job)
    }

    async update(
        entity: Partial<IJob>,
        where: WhereOptions<IJob>,
        transaction?: Transaction
    ): Promise<void> {
        await Job.update(
            { ...entity, updatedAt: new Date() },
            {
                where,
                ...(transaction && { transaction }),
            }
        )
    }
}
