import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import clsx from "clsx";
import { useTableData } from "../../context";
import { usePointsContext } from "../../context/PointsContext.tsx";
import { useTranslation } from 'react-i18next';

function SecondTable() {
    const { t } = useTranslation();
    const { xm, ym } = usePointsContext()
    const {
        secondTableData,
        deleteSecondTableEntry,
        secondTablePointer,
        setSecondTablePointer,
        appendSecondTableEntry
    } = useTableData()

    return (
        <>
            <Modal id="second-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center mb-2 text-accent">{t('secondTable.instructionTitle')}</h3>
                    <ol className="list-decimal pl-4 pt-4 text-gray-800">
                        <li>{t('secondTable.instruction1')}</li>
                        <li>{t('secondTable.instruction2')}</li>
                    </ol>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between">
                    <button className="button-outline px-4 text-nowrap disabled:opacity-60"
                            onClick={() => appendSecondTableEntry({ xm, ym })}
                            disabled={xm !== undefined || ym !== undefined}>
                        {t('secondTable.takeMeasurement')}
                    </button>
                    <div/>
                    <div className="flex gap-x-16 items-start">
                        <button className="button-outline px-4" onClick={deleteSecondTableEntry}>{t('secondTable.clearRow')}
                        </button>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                </div>
                <h4 className="text-xl text-center">{t('tables.tab2')}</h4>

                <div className="w-full overflow-x-auto">
                    <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                        <colgroup>
                            <col className="w-28"/>
                            <col className="w-56"/>
                            <col className="w-52"/>
                            <col className="w-56"/>
                            <col className="w-56"/>
                        </colgroup>
                        <thead className="bg-background py-2 ">
                        <tr className="text-center border-2 text-lg border-accent rounded-xl ">
                            {(t('tableHeaders.second', { returnObjects: true }) as string[]).map((header, idx) => (
                                <th key={idx} className="py-2 border-2 border-accent">{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            secondTableData.map((entry, index) => (
                                <tr key={index}
                                    className={clsx("text-center border-2 border-accent rounded-xl", index === secondTablePointer && 'bg-primary/50')}
                                    onClick={() => setSecondTablePointer(index)}>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.xm?.toFixed(1) ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.ym?.toFixed(1) ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}/>
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

export { SecondTable }
