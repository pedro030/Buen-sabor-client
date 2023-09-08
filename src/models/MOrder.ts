export interface MOrder {
    id: number,
    date: string,
    withdrawalMode: string,
    totalPrice: number,
    paymode: { id: number, paymode: string },
    address: string,
    statusOrder: { id: number, statusType: string },
    products: [] | null
}