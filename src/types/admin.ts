export interface AdminQueryParams {
    start: string
    end: string
    limit: number
    offset: number
}

export interface IBestClient {
    id: number
    fullName: string
    price: number
}

export interface IBestPriceEntity {
    id: number
    firstName: string
    lastName: string
    price: number
}

export interface IBestProfessionEntity {
    id: number
    profession: string
    price: number
}
export interface IBestProfession extends IBestProfessionEntity {}
