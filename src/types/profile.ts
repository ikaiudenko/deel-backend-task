export enum ProfileType {
    Contractor = 'contractor',
    Client = 'client',
}
export interface IProfile {
    id: number
    firstName: string
    lastName: string
    profession: string
    balance: number
    type: string
    createdAt: Date
    updatedAt: Date
}
