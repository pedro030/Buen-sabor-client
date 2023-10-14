// React
import { createContext, useState } from "react";

// Types
import { IContextProviderProps } from "../models/IContextProviderProps";
import { IFilterContext, MFilters } from "../models/IFilterContext";
import { MProduct } from "../models/MProduct";

export const FiltersContext = createContext<IFilterContext>({
    filters: {
        category: "all",
        minPrice: 0,
        maxPrice: 20000,
        search: ""
    },
    setFilters: () => {},
    filterProducts: () => []
});

export function FiltersProvider({ children }: IContextProviderProps) {
    const [filters, setFilters] = useState<MFilters>({
        category: "all",
        minPrice: 0,
        maxPrice: 20000,
        search: ""
    })

    // Filter Products
    const filterProducts = (products: MProduct[]) => {
        return products.filter((p: MProduct) => {
            return (
                (
                    p.price >= filters.minPrice &&
                    p.price <= filters.maxPrice
                )
                &&
                (
                    filters.category === "all" ||
                    p.subcategory.name == filters.category
                )
                &&
                (
                    p.name.toLowerCase().includes(filters.search.toLowerCase())
                )
            )
        })
    }

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters,
            filterProducts
        }}>
            {children}
        </FiltersContext.Provider>
    )
}
