import { Transaction } from 'sequelize'
import { IProfile } from '../types/profile'
import { ProfileRepo } from '../repositories/profile'

export class ProfileService {
    private readonly repo: ProfileRepo

    constructor() {
        this.repo = new ProfileRepo()
    }
    async getBalance(id: number): Promise<number> {
        return (await this.getById(id)).balance
    }

    async getById(id: number): Promise<IProfile> {
        return this.repo.getById(id)
    }

    async updateBalance(
        id: number,
        balance: number,
        transaction?: Transaction
    ) {
        await this.repo.update({ balance }, { id }, transaction)
    }
}
