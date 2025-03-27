import { DetailSales } from './detail-sales';

export interface Sales {
    idSale?: number,
    salesNumber?: string,
    paymentType: string,
    dateRegistration?: string,
    totalText: string,
    detailSales: DetailSales[]
}
