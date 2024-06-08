import { ContractStatus } from '../types/contract'
import { ProfileService } from './profile'
import { BaseService } from './basic'
import { Contract, Job } from '../models'
import { Op } from 'sequelize'

export class BalanceService extends BaseService {
    private readonly profileService: ProfileService

    constructor() {
        super()
        this.profileService = new ProfileService()
    }

    async deposit(userId: number, amount: number) {
        const balance = await this.profileService.getBalance(userId)
        const [results] = await Job.findAll({
            attributes: [[this.db.fn('SUM', this.db.col('price')), 'total']],
            include: [
                {
                    model: Contract,
                    as: 'Contract',
                    attributes: [],
                    where: {
                        ClientId: userId,
                        status: { [Op.ne]: ContractStatus.Terminated },
                    },
                    required: true,
                },
            ],
            where: { paid: 0 },
        })
        const total = results?.dataValues.total || 0

        if (total === 0) {
            throw new Error(`Deposit is allowed if active jobs exist`)
        }

        if (!this.isDepositeAllowed(total, amount)) {
            throw new Error(
                `Max deposit amount is ${this.calAllowedDeposit(total)}`
            )
        }
        const newBalance = balance + amount

        await this.profileService.updateBalance(userId, newBalance)
    }

    private isDepositeAllowed(total: number, amount: number): boolean {
        return amount <= this.calAllowedDeposit(total) && total > 0
    }

    private calAllowedDeposit(total: number): number {
        return total * 0.25
    }
}
