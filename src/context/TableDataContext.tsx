import { createContext, Dispatch, FC, SetStateAction, useCallback, useContext, useState } from "react";
import { SecondTableDto } from "../utils/logic/thirdTable.ts";

export enum TableNumber {
    SECOND = 2,
    THIRD = 3,
    FOURTH = 4
}

export type ThirdTableEntry = {
    x1: number
    x2: number
    t1: number | null
    t2: number | null
    dx: number
    deviation: number | null
}

export type FourthTableEntry = {
    np: number
    h: number
    hp: number
    measuring: ({ number: number, t1: number | null, t2: number | null })[]
}

const defaultThirdTableData = [
    {
        x1: .15,
        x2: .40,
        t1: null,
        t2: null,
        dx: .25,
        deviation: null
    },
    {
        x1: .15,
        x2: .50,
        t1: null,
        t2: null,
        dx: .35,
        deviation: null
    },
    {
        x1: .15,
        x2: .70,
        t1: null,
        t2: null,
        dx: .55,
        deviation: null
    },
    {
        x1: .15,
        x2: .90,
        t1: null,
        t2: null,
        dx: .75,
        deviation: null
    },
    {
        x1: .15,
        x2: 1.10,
        t1: null,
        t2: null,
        dx: .95,
        deviation: null
    },
]

const defaultFourthTableData = [
    {
        np: 1,
        h: 187,
        hp: 198,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            },
            {
                number: 2,
                t1: null,
                t2: null
            },
            {
                number: 3,
                t1: null,
                t2: null
            },
            {
                number: 4,
                t1: null,
                t2: null
            },
            {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    }, {
        np: 2,
        h: 206,
        hp: 187,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            },
            {
                number: 2,
                t1: null,
                t2: null
            },
            {
                number: 3,
                t1: null,
                t2: null
            },
            {
                number: 4,
                t1: null,
                t2: null
            },
            {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    }, {
        np: 3,
        h: 214,
        hp: 188,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            },
            {
                number: 2,
                t1: null,
                t2: null
            },
            {
                number: 3,
                t1: null,
                t2: null
            },
            {
                number: 4,
                t1: null,
                t2: null
            },
            {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    },
    {
        np: 4,
        h: 223,
        hp: 188,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            }, {
                number: 2,
                t1: null,
                t2: null
            }, {
                number: 3,
                t1: null,
                t2: null
            }, {
                number: 4,
                t1: null,
                t2: null
            }, {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    }, {
        np: 5,
        h: 232,
        hp: 189,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            }, {
                number: 2,
                t1: null,
                t2: null
            }, {
                number: 3,
                t1: null,
                t2: null
            }, {
                number: 4,
                t1: null,
                t2: null
            }, {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    },
]

type ContextValue = {
    selectedTable: TableNumber,
    setSelectedTable: Dispatch<SetStateAction<TableNumber>>,
    thirdTableData: ThirdTableEntry[],
    setThirdTableData: Dispatch<SetStateAction<ThirdTableEntry[]>>,
    fourthTableData: FourthTableEntry[],
    setFourthTableData: Dispatch<SetStateAction<FourthTableEntry[]>>
    thirdTablePointer: number,
    setThirdTablePointer: Dispatch<SetStateAction<number>>,
    fourthTablePointer: number,
    setFourthTablePointer: Dispatch<SetStateAction<number>>,
    appendThirdTableEntry: (data: SecondTableDto) => void
    deleteThirdTableEntry: () => void
}

const TableDataContext = createContext<ContextValue | null>(null)

export const useTableData = (): ContextValue => {
    const context = useContext(TableDataContext);
    if (!context) {
        throw new Error('useTableData must be used within a TableDataProvider')
    }
    return context;
}

export const TableDataProvider: FC = ({ children }) => {
    const [ selectedTable, setSelectedTable ] = useState(TableNumber.SECOND)
    const [ thirdTableData, setThirdTableData ] = useState<ThirdTableEntry[]>(defaultThirdTableData);
    const [ fourthTableData, setFourthTableData ] = useState<FourthTableEntry[]>(defaultFourthTableData);
    const [ thirdTablePointer, setThirdTablePointer ] = useState(0);
    const [ fourthTablePointer, setFourthTablePointer ] = useState(0);

    const appendThirdTableEntry = useCallback(({ t1, t2, deviation }: SecondTableDto) => {
        setThirdTableData(prev => prev.map((entry, index) =>
            index === thirdTablePointer ? { ...entry, t1, t2, deviation } : entry))
        setThirdTablePointer(prev => Math.min(thirdTableData.length - 1, prev + 1))
    }, [thirdTablePointer, thirdTableData])

  const deleteThirdTableEntry = useCallback(() => {
        setThirdTableData(prev => prev.map((entry, index) =>
            index === thirdTablePointer ? { ...entry, t1: null, t2: null, deviation: null } : entry))
    }, [thirdTablePointer])

    const value = {
        selectedTable,
        setSelectedTable,
        thirdTableData,
        setThirdTableData,
        fourthTableData,
        setFourthTableData,
        thirdTablePointer,
        setThirdTablePointer,
        fourthTablePointer,
        setFourthTablePointer,
        appendThirdTableEntry,
        deleteThirdTableEntry
    }

    return (
        <TableDataContext.Provider value={value}>
            {children}
        </TableDataContext.Provider>
    )
}