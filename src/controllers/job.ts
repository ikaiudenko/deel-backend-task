import { Request, Response } from 'express'
import { IQuery } from '../types/query'
import { JobService } from '../services/job'

export class JobController {
    readonly jobService: JobService

    constructor() {
        this.jobService = new JobService()
    }

    async getUnpaidList(req: Request, res: Response) {
        const profileId = req.profile.dataValues.id
        const jobs = await this.jobService.getUnpaidList(
            profileId,
            req.query as unknown as IQuery
        )

        return res.json(jobs)
    }

    async pay(req: Request, res: Response) {
        const profileId = req.profile.dataValues.id
        const { id } = req.params

        try {
            await this.jobService.pay(Number(id), profileId)
            return res.status(201).json()
        } catch (err) {
            return res.status(500).json({ message: (err as Error)?.message })
        }
    }
}
