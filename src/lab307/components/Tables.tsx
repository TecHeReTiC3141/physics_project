import clsx from "clsx";
import { FirstTable, SecondTable, ThirdTable } from "./tableComponents";
import { TableNumber, useTableData } from "../context";
import { createWordDocument } from "../utils/export";
import { useTranslation } from 'react-i18next';

export function Tables() {
    const { t } = useTranslation();
    const tabs = {  [TableNumber.FIRST]: t('tables.tab1'), [TableNumber.SECOND]: t('tables.tab2'), [TableNumber.THIRD]: t('tables.tab3') };
    const tables = {
        [TableNumber.FIRST]: <FirstTable />,
        [TableNumber.SECOND]: <SecondTable />,
        [TableNumber.THIRD]: <ThirdTable />,
    }

    const { selectedTable, setSelectedTable, firstTableData, secondTableData, thirdTableData,  } = useTableData()

    return (
        <div className="w-full text-center flex flex-col gap-y-3">
            <h3 className="text-2xl select-none">{t('tables.getMeasurements')}</h3>
            <div className="flex gap-x-3 justify-start">
                {Object.entries(tabs).map(([ tab, tabName ]) => (
                    <button role="tab" key={tab} className={clsx("button-outline text-2xl", +tab === selectedTable && "button-filled")}
                            onClick={() => setSelectedTable(+tab as TableNumber)}>{tabName}</button>
                ))}
                <div className="flex-1" />
                <button className="button-filled" onClick={() => createWordDocument(firstTableData, secondTableData, thirdTableData)}>{t('tables.export')}</button>
            </div>
            <div className="w-full border-2 border-primary rounded-xl px-8 py-6">
                {tables[selectedTable]}
            </div>
        </div>
    )
}
