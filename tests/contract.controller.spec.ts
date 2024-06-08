import request from 'supertest'

import { server as app } from '../src/index'
import { ContractStatus, IContract } from '../src/types/contract'

describe('ContractController', () => {
    afterEach(() => app.close())

    describe('getById', () => {
        it('should get by id', async () => {
            const response = await request(app)
                .get('/contracts/4')
                .set('content-type', 'application/json')
                .set('profile_id', '2')

            expect(response.status).toBe(200)
            expect(response.body).toEqual(
                expect.objectContaining({
                    id: 4,
                    terms: 'bla bla bla',
                    status: 'in_progress',
                    ContractorId: 7,
                    ClientId: 2,
                })
            )
        })

        it('should return 404', async () => {
            const response = await request(app)
                .get('/contracts/100')
                .set('content-type', 'application/json')
                .set('profile_id', '2')

            expect(response.status).toBe(404)
        })

        it('should not return a contract if profile not found', async () => {
            const response = await request(app)
                .get('/contracts/4')
                .set('content-type', 'application/json')
                .set('profile_id', '100')

            expect(response.status).toBe(401)
        })
    })

    describe('getActiveList', () => {
        it('should return list of active contracts', async () => {
            const response = await request(app)
                .get('/contracts')
                .set('content-type', 'application/json')
                .set('profile_id', '2')

            const res: IContract[] = response.body
            const status = [...new Set(res.map((i) => i.status))]
            expect(response.status).toBe(200)
            expect(res).toBeInstanceOf(Array)
            expect(status.includes(ContractStatus.Terminated)).toEqual(false)
        })

        it('should not return list of active contracts if profile not found', async () => {
            const response = await request(app)
                .get('/contracts')
                .set('content-type', 'application/json')
                .set('profile_id', '100')

            expect(response.status).toBe(401)
        })
    })
})
