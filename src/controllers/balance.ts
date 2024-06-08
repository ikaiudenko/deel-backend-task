import { Request, Response } from 'express'
import { BalanceService } from '../services/balance'
import { depositReq } from '../validators/balance'

export class BalanceController {
    private readonly balanceService: BalanceService

    constructor() {
        this.balanceService = new BalanceService()
    }

    async deposit(req: Request, res: Response) {
        const { userId } = req.params
        const { error, value } = depositReq.validate(req.body)

        if (error) {
            return res.status(400).json({ error: error.details[0].message })
        }

        try {
            await this.balanceService.deposit(Number(userId), value.amount)
            return res.status(201).json()
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message })
        }
    }
}
