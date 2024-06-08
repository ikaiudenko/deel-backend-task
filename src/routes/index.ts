import { Router } from 'express'
import { ContractController } from '../controllers/contract'
import { JobController } from '../controllers/job'
import { BalanceController } from '../controllers/balance'
import { AdminController } from '../controllers/admin'
import { ProfileMiddleware as profile } from '../middleware/profile'

export default class MainRouter {
    readonly router: Router
    private readonly contractController: ContractController
    private readonly jobController: JobController
    private readonly balanceController: BalanceController
    private readonly adminController: AdminController

    constructor() {
        // Initialize controllers objects
        this.contractController = new ContractController()
        this.jobController = new JobController()
        this.balanceController = new BalanceController()
        this.adminController = new AdminController()

        // Initialize router object
        this.router = Router({ mergeParams: true })
        this.initRoutes()
    }

    private initRoutes() {
        this.router
            .route('/contracts/:id')
            .get(profile.getProfile, (req, res) =>
                this.contractController.getById(req, res)
            )
        this.router
            .route('/contracts')
            .get(profile.getProfile, (req, res) =>
                this.contractController.getActiveList(req, res)
            )
        this.router
            .route('/jobs/unpaid')
            .get(profile.getProfile, (req, res) =>
                this.jobController.getUnpaidList(req, res)
            )
        this.router
            .route('/jobs/:id/pay')
            .post(profile.getProfile, (req, res) =>
                this.jobController.pay(req, res)
            )
        this.router
            .route('/balances/deposit/:userId')
            .post(profile.getProfile, (req, res) =>
                this.balanceController.deposit(req, res)
            )
        this.router
            .route('/admin/best-profession')
            .get((req, res) => this.adminController.getBestProfession(req, res))
        this.router
            .route('/admin/best-clients')
            .get((req, res) => this.adminController.getBestClients(req, res))
    }
}
