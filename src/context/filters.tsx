import { createContext, useState } from "react";

export const FiltersContext = createContext([]);

export function FiltersProvider({ children }: any) {
    const [filters, setFilters] = useState({
        category: 0,
        minPrice: 0,
        maxPrice: 20000,
        search: ''
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
                    filters.category === 0 ||
                    p.idCategory === filters.category
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
