// React
import { createContext, useState } from "react";

// Types
import { IContextProviderProps } from "../models/IContextProviderProps";
import { IFilterContext, MFilters } from "../models/IFilterContext";

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

    const filterProducts = (products: any) => {
        return products.filter((p: any) => {
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
