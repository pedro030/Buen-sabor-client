import { createContext, useState } from "react";

export const FiltersContext = createContext([]);

export function FiltersProvider({ children }: any) {
    const [filters, setFilters] = useState({
        category: 0,
        minPrice: 0,
        maxPrice: 20000
    })

    return (
        <FiltersContext.Provider value={{
            filters,
            setFilters
        }}>
            {children}
        </FiltersContext.Provider>
    )
}
