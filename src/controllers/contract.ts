import { Request, Response } from 'express'
import { ContractService } from '../services/contract'
import { IQuery } from '../types/query'

export class ContractController {
    private readonly contractService: ContractService

    constructor() {
        this.contractService = new ContractService()
    }

    async getById(req: Request, res: Response) {
        const profileId = req.profile.dataValues.id
        const { id } = req.params

        try {
            const contract = await this.contractService.getById(
                Number(id),
                profileId
            )

            if (contract) {
                return res.json(contract)
            }

            return res.status(404).end()
        } catch (err) {
            return res.status(500).end({ message: (err as Error).message })
        }
    }

    async getActiveList(req: Request, res: Response) {
        try {
            const profileId = req.profile.dataValues.id
            const contracts = await this.contractService.getActiveList(
                profileId,
                req.query as unknown as IQuery
            )

            return res.json(contracts)
        } catch (err) {
            return res.status(500).end({ message: (err as Error).message })
        }
    }
}
