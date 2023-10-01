export interface MCategory {
    id: number,
    name: string,
    parentCategory: MCategory | null
}