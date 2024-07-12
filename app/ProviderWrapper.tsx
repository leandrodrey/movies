'use client'
import {FC, ReactNode} from "react";
import UserProvider from "@/context/UserProvider";


interface ProviderWrapperProps {
    children: ReactNode
}

const ProviderWrapper: FC<ProviderWrapperProps> = ({children}) => {
    return (
        <>
            <UserProvider>
                {children}
            </UserProvider>
        </>
    )
}

export default ProviderWrapper;
