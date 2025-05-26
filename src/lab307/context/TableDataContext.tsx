import { createContext, Dispatch, FC, SetStateAction, useCallback, useContext, useEffect, useState } from "react";

export enum TableNumber {
  FIRST = 1,
  SECOND = 2,
  THIRD = 3
}

type StoredTableData = {
  firstTableData: FirstTableEntry[],
  secondTableData: SecondTableEntry[]
  thirdTableData: ThirdTableEntry[],
  selectedTable: TableNumber
}

export type FirstTableEntry = Partial<{
  xc: number
  yr: number
  hc: number
  rc: number
}>

export type SecondTableEntry = Partial<{
  xm: number
  ym: number
  hm: number
  rm: number
  um: number
}>

export type ThirdTableEntry = Partial<{
  u: number
  x: number
  kx: number
  h: number
  y: number
  ky: number
  b: number
  um: number
}>

type ContextValue = {
  selectedTable: TableNumber,
  setSelectedTable: Dispatch<SetStateAction<TableNumber>>,
  secondTableData: SecondTableEntry[],
  setSecondTableData: Dispatch<SetStateAction<SecondTableEntry[]>>,
  thirdTableData: ThirdTableEntry[],
  setThirdTableData: Dispatch<SetStateAction<ThirdTableEntry[]>>,
  firstTableData: FirstTableEntry[],
  setFirstTableData: Dispatch<SetStateAction<FirstTableEntry[]>>
  secondTablePointer: number,
  setSecondTablePointer: Dispatch<SetStateAction<number>>,
  thirdTablePointer: number,
  setThirdTablePointer: Dispatch<SetStateAction<number>>,
  firstTablePointer: number,
  setFirstTablePointer: Dispatch<SetStateAction<number>>,
  appendSecondTableEntry: (data: SecondTableEntry) => void,
  deleteSecondTableEntry: () => void,
  appendThirdTableEntry: (data: ThirdTableEntry) => void,
  deleteThirdTableEntry: () => void,
  appendFirstTableEntry: (data: FirstTableEntry) => void,
  deleteFirstTableEntry: () => void
}

const TableDataContext = createContext<ContextValue | null>(null)

export const useTableData = (): ContextValue => {
  const context = useContext(TableDataContext);
  if (!context) {
    throw new Error('useTableData must be used within a TableDataProvider')
  }
  return context;
}

const appendEntry = <T extends object>(newEntry: T, data: T[], setData: Dispatch<SetStateAction<T[]>>, pointer: number, setPointer: Dispatch<SetStateAction<number>>) => {
  setData(prev => prev.map((entry, index) =>
    index === pointer ? newEntry : entry))
  setPointer(prev => Math.min(data.length - 1, prev + 1))
}

const deleteEntry = <T extends object>(setData: Dispatch<SetStateAction<T[]>>, pointer: number) => {
  setData(prev => prev.map((entry, index) =>
    index === pointer ? {} : entry))
}

export const TableDataProvider: FC = ({ children }) => {
  const [ selectedTable, setSelectedTable ] = useState(TableNumber.FIRST)
  const [ firstTableData, setFirstTableData ] = useState<FirstTableEntry[]>([ {} ]);
  const [ secondTableData, setSecondTableData ] = useState<SecondTableEntry[]>([ {} ]);
  const [ thirdTableData, setThirdTableData ] = useState<ThirdTableEntry[]>(Array.from({ length: 10 }).map(() => ({})));
  const [ secondTablePointer, setSecondTablePointer ] = useState(0);
  const [ thirdTablePointer, setThirdTablePointer ] = useState(0);
  const [ firstTablePointer, setFirstTablePointer ] = useState(0);

  const appendFirstTableEntry = useCallback((newEntry: FirstTableEntry) => {
    appendEntry(newEntry, firstTableData, setFirstTableData, firstTablePointer, setFirstTablePointer)
  }, [ firstTablePointer, firstTableData ])

  const deleteFirstTableEntry = useCallback(() => deleteEntry(setFirstTableData, firstTablePointer), [ firstTablePointer ])

  const appendSecondTableEntry = useCallback((newEntry: SecondTableEntry) => {
    appendEntry(newEntry, secondTableData, setSecondTableData, secondTablePointer, setSecondTablePointer)
  }, [ secondTableData, secondTablePointer ])

  const deleteSecondTableEntry = useCallback(() => deleteEntry(setSecondTableData, secondTablePointer), [ thirdTablePointer ])

  const appendThirdTableEntry = useCallback((newEntry: ThirdTableEntry) => {
    appendEntry(newEntry, thirdTableData, setThirdTableData, thirdTablePointer, setThirdTablePointer)
  }, [ thirdTablePointer, thirdTableData ])

  const deleteThirdTableEntry = useCallback(() => deleteEntry(setThirdTableData, thirdTablePointer), [ thirdTablePointer ])

  useEffect(() => {
    const tableData = JSON.parse(localStorage.getItem("tableData-lab307")) as StoredTableData
    if (!tableData) return
    setSecondTableData(tableData.secondTableData)
    setThirdTableData(tableData.thirdTableData)
    setFirstTableData(tableData.firstTableData)
    setSelectedTable(tableData.selectedTable)
  }, []);

  useEffect(() => {
    localStorage.setItem("tableData-lab307", JSON.stringify({
      secondTableData,
      thirdTableData,
      firstTableData,
      selectedTable
    }))
  }, [ secondTableData, firstTableData, selectedTable, thirdTableData ])

  const value: ContextValue = {
    selectedTable,
    setSelectedTable,
    secondTableData,
    setSecondTableData,
    thirdTableData,
    setThirdTableData,
    firstTableData,
    setFirstTableData,
    secondTablePointer,
    setSecondTablePointer,
    thirdTablePointer,
    setThirdTablePointer,
    firstTablePointer,
    setFirstTablePointer,
    appendSecondTableEntry,
    deleteSecondTableEntry,
    appendThirdTableEntry,
    deleteThirdTableEntry,
    appendFirstTableEntry,
    deleteFirstTableEntry
  }

  console.log("tables", value)

  return (
    <TableDataContext.Provider value={value}>
      {children}
    </TableDataContext.Provider>
  )
}