import { Transaction } from 'sequelize'
import { ProfileDto } from '../dto/profile'
import { Profile } from '../models'
import { IProfile } from '../types/profile'

export class ProfileRepo {
    async getById(id: number): Promise<IProfile> {
        const res: Profile | null = await Profile.findOne({
            where: { id },
        })

        if (res === null) {
            throw new Error(`Could not find profile with id ${id}`)
        }

        return ProfileDto.fromEntity(res)
    }

    async update(
        entity: Partial<IProfile>,
        where: Partial<IProfile>,
        transaction?: Transaction
    ): Promise<void> {
        await Profile.update(
            { ...entity, updatedAt: new Date() },
            {
                where: where,
                ...(transaction && { transaction }),
            }
        )
    }
}
