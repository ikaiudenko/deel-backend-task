import { Op } from 'sequelize'
import { Contract, Job } from '../models'
import { ContractStatus } from '../types/contract'
import { IQuery } from '../types/query'
import { BaseService } from '../services/basic'
import { IJob } from '../types/job'
import { JobDto } from '../dto/job'
import { ProfileService } from './profile'
import { ContractService } from './contract'
import { JobRepo } from '../repositories/job'

export class JobService extends BaseService {
    private readonly repo: JobRepo
    readonly profileService: ProfileService
    readonly contractService: ContractService

    constructor() {
        super()
        this.repo = new JobRepo()
        this.profileService = new ProfileService()
        this.contractService = new ContractService()
    }

    async getUnpaid(id: number): Promise<IJob> {
        return this.repo.findOne({
            id,
            paid: 0,
        })
    }
    async getUnpaidList(profileId: number, query?: IQuery): Promise<IJob[]> {
        const offset = Number(query?.offset) || 0
        const limit = Number(query?.limit) || 10
        const res = await Job.findAll({
            where: {
                paid: 0,
            },
            include: [
                {
                    model: Contract,
                    as: 'Contract',
                    where: {
                        ...this.profileQuery(profileId),
                        status: {
                            [Op.ne]: ContractStatus.Terminated,
                        },
                    },
                    required: true,
                },
            ],
            offset,
            limit,
        })

        return res.map((job) => JobDto.fromEntity(job))
    }

    async pay(jobId: number, profileId: number) {
        const job = await this.getUnpaid(jobId)
        const contract = await this.contractService.getById(
            job.ContractId,
            profileId
        )

        if (!contract) {
            throw new Error('Can not find contract')
        }
        if (contract.ClientId !== profileId) {
            throw new Error('Only clients can pay for contractors')
        }

        const clientBalance = await this.profileService.getBalance(profileId)
        const priceToPay = clientBalance - job.price
        const contractorBalance = await this.profileService.getBalance(
            contract.ContractorId
        )

        if (priceToPay < 0) {
            throw new Error('Available blanace is not enough for payment')
        }

        const payTransaction = await this.db.transaction()

        try {
            await this.repo.update(
                { paid: 1, paymentDate: new Date() },
                { id: jobId },
                payTransaction
            )
            await this.profileService.updateBalance(
                contract.ClientId,
                priceToPay,
                payTransaction
            )
            await this.profileService.updateBalance(
                contract.ContractorId,
                contractorBalance + job.price,
                payTransaction
            )
            await payTransaction.commit()
        } catch (error) {
            console.error(error)
            await payTransaction.rollback()
            throw new Error('Can not pay job')
        }
    }
}
