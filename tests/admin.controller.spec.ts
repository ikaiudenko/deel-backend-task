import request from 'supertest'

import { server as app } from '../src/index'
import { AdminService } from '../src/services/admin'

describe('AdminController', () => {
    afterEach(() => app.close())

    describe('getBestProfession', () => {
        it('should get best professions', async () => {
            const response = await request(app)
                .get(
                    '/admin/best-profession?start=2020-08-14T23:11:26.737Z&end=2020-08-16T19:11:26.737Z&offset=0&limit=2'
                )
                .set('content-type', 'application/json')

            expect(response.status).toBe(200)
            expect(response.body).toEqual([
                {
                    id: 7,
                    profession: 'Programmer',
                    price: 2020,
                },
                {
                    id: 6,
                    profession: 'Programmer',
                    price: 542,
                },
            ])
        })

        it('should validate max limit', async () => {
            const response = await request(app)
                .get(
                    '/admin/best-profession?start=2020-08-14T23:11:26.737Z&end=2020-08-16T19:11:26.737Z&offset=0&limit=bla'
                )
                .set('content-type', 'application/json')

            expect(response.status).toBe(500)
            expect(response.body.message).toEqual('Limit should be number')
        })

        it('should validate max limit', async () => {
            const response = await request(app)
                .get(
                    '/admin/best-profession?start=2020-08-14T23:11:26.737Z&end=2020-08-16T19:11:26.737Z&offset=0&limit=1000'
                )
                .set('content-type', 'application/json')

            expect(response.status).toBe(500)
            expect(response.body.message).toEqual(
                `Limit can not be greater than ${AdminService.MAX_LIMIT}`
            )
        })
    })

    describe('getBestClients', () => {
        it('should get best clients', async () => {
            const response = await request(app)
                .get(
                    '/admin/best-clients?start=2020-08-10T19:11:26.737Z&end=2020-08-17T19:11:26.737Z&offset=0&limit=4'
                )
                .set('content-type', 'application/json')

            expect(response.status).toBe(200)
            expect(response.body).toEqual([
                {
                    id: 4,
                    fullName: 'Ash Kethcum',
                    price: 2020,
                },
                {
                    id: 2,
                    fullName: 'Mr Robot',
                    price: 442,
                },
                {
                    id: 1,
                    fullName: 'Harry Potter',
                    price: 421,
                },
                {
                    id: 3,
                    fullName: 'John Snow',
                    price: 200,
                },
            ])
        })

        it('should validate max limit', async () => {
            const response = await request(app)
                .get(
                    '/admin/best-clients?start=2020-08-10T19:11:26.737Z&end=2020-08-17T19:11:26.737Z&offset=0&limit=bla'
                )
                .set('content-type', 'application/json')

            expect(response.status).toBe(500)
            expect(response.body.message).toEqual('Limit should be number')
        })

        it('should validate max limit', async () => {
            const response = await request(app)
                .get(
                    '/admin/best-clients?start=2020-08-10T19:11:26.737Z&end=2020-08-17T19:11:26.737Z&offset=0&limit=1000'
                )
                .set('content-type', 'application/json')

            expect(response.status).toBe(500)
            expect(response.body.message).toEqual(
                `Limit can not be greater than ${AdminService.MAX_LIMIT}`
            )
        })
    })
})
