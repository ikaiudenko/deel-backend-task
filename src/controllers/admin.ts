import { Request, Response } from 'express'
import { AdminService } from '../services/admin'
import { AdminQueryParams } from '../types/admin'

export class AdminController {
    private readonly adminService: AdminService

    constructor() {
        this.adminService = new AdminService()
    }

    async getBestProfession(req: Request, res: Response) {
        try {
            const data = await this.adminService.getBestProfession(
                req.query as unknown as AdminQueryParams
            )
            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message })
        }
    }

    async getBestClients(req: Request, res: Response) {
        try {
            const data = await this.adminService.getBestClients(
                req.query as unknown as AdminQueryParams
            )
            return res.status(200).json(data)
        } catch (err) {
            return res.status(500).json({ message: (err as Error).message })
        }
    }
}
