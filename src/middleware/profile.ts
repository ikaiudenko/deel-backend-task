import express, { NextFunction } from 'express'
import { Profile as Model } from '../models/index'

export class ProfileMiddleware {
    static getProfile = async (
        req: express.Request,
        res: express.Response,
        next: NextFunction
    ) => {
        const profile = await Model.findOne({
            where: { id: req.get('profile_id') || 0 },
        })
        if (!profile) return res.status(401).end()
        req.profile = profile
        next()
    }
}
