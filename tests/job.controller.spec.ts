import request from 'supertest'

import { server as app } from '../src/index'

describe('JobController', () => {
    afterEach(() => app.close())

    describe('getUnpaidList', () => {
        it('should get unpaid jobs', async () => {
            const response = await request(app)
                .get('/jobs/unpaid')
                .set('content-type', 'application/json')
                .set('profile_id', '1')

            expect(response.status).toBe(200)
            expect(response.body).toEqual([
                {
                    id: 2,
                    description: 'work',
                    price: 201,
                    paid: false,
                    paymentDate: null,
                    ContractId: 2,
                },
            ])
        })

        it('should return empty list if no unpaid jbs', async () => {
            const response = await request(app)
                .get('/jobs/unpaid')
                .set('content-type', 'application/json')
                .set('profile_id', '3')

            expect(response.status).toBe(200)
            expect(response.body.length).toEqual(0)
        })

        it('should not return jobs if profile not found', async () => {
            const response = await request(app)
                .get('/jobs/unpaid')
                .set('content-type', 'application/json')
                .set('profile_id', '100')

            expect(response.status).toBe(401)
        })
    })

    describe('pay', () => {
        it('should not allow to pay if contract is not found', async () => {
            const response = await request(app)
                .post('/jobs/5/pay')
                .set('content-type', 'application/json')
                .set('profile_id', '2')

            expect(response.body.message).toEqual('Can not find contract')
        })

        it('should not allow to pay if job is not found', async () => {
            const response = await request(app)
                .post('/jobs/6/pay')
                .set('content-type', 'application/json')
                .set('profile_id', '2')

            expect(response.body.message).toEqual('Job is not found')
        })
        it('should not allow to pay if job is not found', async () => {
            const response = await request(app)
                .post('/jobs/1/pay')
                .set('content-type', 'application/json')
                .set('profile_id', '5')

            expect(response.body.message).toEqual(
                'Only clients can pay for contractors'
            )
        })
    })
})
