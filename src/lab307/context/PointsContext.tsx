import { createContext, Dispatch, FC, SetStateAction, useContext, useState } from "react";

type ContextValue = {
    xc: number | undefined
    setXc: Dispatch<SetStateAction<number | undefined>>
    yr: number | undefined
    setYr: Dispatch<SetStateAction<number | undefined>>
    xm: number | undefined
    setXm: Dispatch<SetStateAction<number | undefined>>
    ym: number | undefined
    setYm: Dispatch<SetStateAction<number | undefined>>
}

const PointsContext = createContext<ContextValue | null>(null)

export const usePointsContext = () => useContext(PointsContext) as ContextValue

export const PointsContextProvider: FC = ({ children }) => {

    const [ xc, setXc ] = useState(undefined)
    const [ yr, setYr ] = useState(undefined)
    const [ xm, setXm ] = useState(undefined)
    const [ ym, setYm ] = useState(undefined)

    const value = {
        xc,
        setXc,
        yr,
        setYr,
        xm,
        setXm,
        ym,
        setYm,
    }

    return (
        <PointsContext.Provider value={value}>
            {children}
        </PointsContext.Provider>
    )
}