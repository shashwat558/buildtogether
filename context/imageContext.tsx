"use client";

import React, { createContext, useContext, useState } from "react";



export interface ImageContextType {
    base64Image: string;
    setBase64Image: React.Dispatch<React.SetStateAction<string>>;
}

const imageContext = createContext<ImageContextType | undefined>(undefined);

export const ImageProvider = ({children}: {children: React.ReactNode}) => {
    const [base64Image, setBase64Image] = useState<string>("");

    return <imageContext.Provider value={{ base64Image, setBase64Image }}>
        {children}
    </imageContext.Provider>
}


export function useImage(){
    return useContext(imageContext);
}