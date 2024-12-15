import clsx from "clsx";
import { FourthTable, SecondTable, ThirdTable } from "./tableComponents";
import { TableNumber, useTableData } from "../context";

const tabs = { [TableNumber.SECOND]: 'Таблица 2', [TableNumber.THIRD]: 'Таблица 3', [TableNumber.FOURTH]: 'Таблица 4' }

function Tables() {
    const tables = {
        [TableNumber.SECOND]: <SecondTable />,
        [TableNumber.THIRD]: <ThirdTable />,
        [TableNumber.FOURTH]: <FourthTable />
    }

    const { selectedTable, setSelectedTable } = useTableData()
    return (
        <div className="w-full text-center flex flex-col gap-y-3">
            <h3 className="text-2xl select-none">Получение измерений</h3>
            <div className="flex gap-x-3 justify-start">
                {Object.entries(tabs).map(([ tab, tabName ]) => (
                    <button role="tab" key={tab} className={clsx("button-outline text-2xl", +tab === selectedTable && "button-filled")}
                            onClick={() => setSelectedTable(+tab as TableNumber)}>{tabName}</button>
                ))}
                <div className="flex-1" />
                <button className="button-filled">Экспорт</button>
            </div>
            <div className="w-full border-2 border-primary rounded-xl px-8 py-6">
                {tables[selectedTable]}
            </div>
        </div>
    )
}

export { Tables }
