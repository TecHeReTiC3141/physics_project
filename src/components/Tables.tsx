import { useState } from "react";
import clsx from "clsx";
import { FourthTable, SecondTable, ThirdTable } from "./tableComponents";

enum TabIndex {
    'first' = 'first',
    'second' = 'second',
    'third' = 'third',
}

const tabs = { [TabIndex.first]: 'Таблица 2', [TabIndex.second]: 'Таблица 3', [TabIndex.third]: 'Таблица 4' }

function Tables() {
    const [ activeTab, setActiveTab ] = useState<TabIndex>(TabIndex.first);

    const tables = {
        [TabIndex.first]: <SecondTable />,
        [TabIndex.second]: <ThirdTable />,
        [TabIndex.third]: <FourthTable />
    }


    return (
        <div className="w-full text-center flex flex-col gap-y-3">
            <h3 className="text-2xl select-none">Получение измерений</h3>
            <div className="flex gap-x-3 justify-start">
                {Object.entries(tabs).map(([ tab, tabName ]) => (
                    <button role="tab" key={tab} className={clsx("button-outline text-2xl", tab === activeTab && "button-filled")}
                            onClick={() => setActiveTab(tab as TabIndex)}>{tabName}</button>
                ))}
            </div>
            <div className="w-full border-2 border-primary rounded-xl px-8 py-6">
                {tables[activeTab]}
            </div>
        </div>
    )
}

export { Tables }
