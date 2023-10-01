import { Dispatch, SetStateAction } from 'react'
import { MProduct } from "./MProduct";

export interface IFilterContext {
    filters: MFilters,
    setFilters: Dispatch<SetStateAction<MFilters>>,
    filterProducts: (products: MProduct[]) => MProduct[],
}

export interface MFilters {
    category: string,
    minPrice: number,
    maxPrice: number,
    search: string
}