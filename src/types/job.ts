export interface IJob {
    id: number
    description: string
    price: number
    paid: number | null
    paymentDate: Date | null
    createdDate: Date
    updatedDate: Date
    ContractId: number
}
