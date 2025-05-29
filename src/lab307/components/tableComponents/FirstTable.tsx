import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTableData } from "../../context";
import clsx from "clsx";
import { usePointsContext } from "../../context/PointsContext.tsx";
import { useTranslation } from 'react-i18next';


export function FirstTable() {
    const { t } = useTranslation();
    const { xc, yr } = usePointsContext()
    const {
        firstTableData,
        firstTablePointer,
        setFirstTablePointer,
        deleteFirstTableEntry,
        appendFirstTableEntry
    } = useTableData()

    return (
        <>
            <Modal id="first-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center mb-2 text-accent">{t('firstTable.instructionTitle')}</h3>
                    <ol className="list-decimal pl-4 pt-4 text-gray-800">
                        <li>{t('firstTable.instruction1')}</li>
                        <li>{t('firstTable.instruction2')}</li>
                        <li>{t('firstTable.instruction3')}</li>
                        <li>{t('firstTable.instruction4')}</li>
                    </ol>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between">
                    <button className="button-outline px-4 text-nowrap disabled:opacity-60"
                            onClick={() => appendFirstTableEntry({ xc, yr })}
                            disabled={xc !== undefined || yr !== undefined}>
                        {t('firstTable.takeMeasurement')}
                    </button>
                    <div/>
                    <div className="flex gap-x-16 items-start">
                        <button className="button-outline px-4" onClick={deleteFirstTableEntry}>{t('firstTable.clearRow')}
                        </button>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('first-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                </div>
                <h4 className="text-xl text-center">{t('tables.tab1')}</h4>

                <div className="w-full overflow-x-auto">
                    <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                        <colgroup>
                            <col className="w-28"/>
                            <col className="w-56"/>
                            <col className="w-52"/>
                            <col className="w-56"/>
                        </colgroup>
                        <thead className="bg-background py-2 ">
                        <tr className="text-center border-2 text-lg border-accent rounded-xl ">
                            {(t('tableHeaders.first', { returnObjects: true }) as string[]).map((header, idx) => (
                                <th key={idx} className="py-2 border-2 border-accent">{header}</th>
                            ))}
                        </tr>

                        </thead>
                        <tbody>
                        {
                            firstTableData.map((entry, index) => (
                                <tr key={index}
                                    className={clsx("text-center border-2 border-accent rounded-xl", index === firstTablePointer && 'bg-primary/50')}
                                    onClick={() => setFirstTablePointer(index)}>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.xc?.toFixed(1) ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.yr?.toFixed(1) ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}/>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}/>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}
