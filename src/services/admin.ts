import { QueryTypes } from 'sequelize'
import { BaseService } from './basic'
import {
    AdminQueryParams,
    IBestPriceEntity,
    IBestProfessionEntity,
} from '../types/admin'
import { ProfileDto } from '../dto/profile'
import { ProfileType } from '../types/profile'

export class AdminService extends BaseService {
    static readonly LIMIT = 2
    static readonly MAX_LIMIT = 10

    async getBestProfession(queryParams?: AdminQueryParams) {
        const { end, start, limit, offset } = this.validateQuery(queryParams)

        const profiles = await this.db.query<IBestProfessionEntity>(
            `
              SELECT Profiles.id, Profiles.profession, SUM(Jobs.price) as price
              FROM Profiles
              JOIN Contracts ON Contracts.ContractorId = Profiles.id
              JOIN Jobs ON Jobs.ContractId = Contracts.id
              WHERE Profiles.type = :type
                AND Jobs.paid = 1
                AND Jobs.paymentDate BETWEEN :start AND :end
              GROUP BY Profiles.id
              ORDER BY price DESC
              LIMIT :limit
              OFFSET :offset
            `,
            {
                replacements: {
                    type: ProfileType.Contractor,
                    paid: 1,
                    start: new Date(start).toISOString(),
                    end: new Date(end).toISOString(),
                    limit: Number(limit),
                    offset: Number(offset),
                },
                type: QueryTypes.SELECT,
            }
        )

        return Array.isArray(profiles)
            ? profiles.map((i) => ProfileDto.createBestProfession(i))
            : []
    }

    async getBestClients(queryParams?: AdminQueryParams) {
        const { end, start, limit, offset } = this.validateQuery(queryParams)
        // const profiles = await Profile.findAll({
        //     attributes: [
        //         'id',
        //         'firstName',
        //         'lastName',
        //         [this.db.fn('SUM', this.db.col('Client.Jobs.price')), 'price'],
        //     ],
        //     include: [
        //         {
        //             model: Contract,
        //             as: 'Client',
        //             include: [
        //                 {
        //                     model: Job,
        //                     as: 'Jobs',
        //                     where: {
        //                         paid: 1,
        //                         paymentDate: {
        //                             [Op.between]: [start, end],
        //                         },
        //                     },
        //                     required: true,
        //                     attributes: ['price'],
        //                 },
        //             ],
        //             required: true,
        //         },
        //     ],
        //     where: {
        //         type: 'client',
        //     },
        //     group: ['Profile.id'],
        //     order: [[this.db.literal('price'), 'DESC']],
        //     offset,
        //     limit,
        //     logging: console.log,
        // })
        // TODO: CONTACT does not work in SQLite.
        const profiles = await this.db.query<IBestPriceEntity>(
            `
              SELECT Profiles.id, Profiles.firstName, Profiles.lastName, SUM(Jobs.price) as price
              FROM Profiles
              JOIN Contracts ON Contracts.ClientId = Profiles.id
              JOIN Jobs ON Jobs.ContractId = Contracts.id
              WHERE Profiles.type = :type
                AND Jobs.paid = 1
                AND Jobs.paymentDate BETWEEN :start AND :end
              GROUP BY Profiles.id
              ORDER BY price DESC
              LIMIT :limit
              OFFSET :offset
            `,
            {
                replacements: {
                    type: ProfileType.Client,
                    paid: 1,
                    start: new Date(start).toISOString(),
                    end: new Date(end).toISOString(),
                    limit: Number(limit),
                    offset: Number(offset),
                },
                type: QueryTypes.SELECT,
            }
        )

        return Array.isArray(profiles)
            ? profiles.map((i) => ProfileDto.createBestClient(i))
            : []
    }

    private validateQuery(queryParams?: AdminQueryParams) {
        const {
            end = new Date(),
            start = new Date(),
            limit = AdminService.LIMIT,
            offset = 0,
        } = queryParams || {}

        if (!Number(limit)) {
            throw new Error(`Limit should be number`)
        }

        if (Number(limit) > AdminService.MAX_LIMIT) {
            throw new Error(
                `Limit can not be greater than ${AdminService.MAX_LIMIT}`
            )
        }

        return {
            end,
            start,
            limit,
            offset,
        }
    }
}
