export const enum ContractStatus {
    New = 'new',
    InProgress = 'in_progress',
    Terminated = 'terminated',
}
export interface IContract {
    id: number
    terms: string
    status: ContractStatus
    createdAt: Date
    updatedAt: Date
    ContractorId: number
    ClientId: number
}
