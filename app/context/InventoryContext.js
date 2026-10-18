"use client";

import { createContext, useContext, useState } from "react";
import { sampleMaterials } from "@/data/sampleMaterials";

const InventoryContext = createContext(null);

export function InventoryProvider({ children }) {
    const [materials, setMaterials] = useState(sampleMaterials);
    const [checkResults, setCheckResults] = useState(null);

    return (
        <InventoryContext.Provider
            value={{
                materials,
                setMaterials,
                checkResults,
                setCheckResults,
            }}
        >
            {children}
        </InventoryContext.Provider>
    );   
}

export function useInventory() {
    const context = useContext(InventoryContext);

    if (context === null) {
        throw new Error(
            "useInventory must be used inside InventoryProvider."
        );
    }

    return context;
}