import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTableData } from "../../context";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';

function FourthTable() {
    const { fourthTableData, fourthTablePointer, setFourthTablePointer, deleteFourthTableEntry } = useTableData()
    const { t } = useTranslation('lab102');
    return (
        <>
            <Modal id="second-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center">{t('fourthTable.instructionTitle')}</h3>
                    <ul className="list-decimal pl-4 pt-4">
                        {(t('fourthTable.instructionList', { returnObjects: true }) as string[]).map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-2xl">{t('fourthTable.taskTitle')}</h3>
                    <div className="flex items-center gap-x-3 -translate-x-1/2">
                        <h4 className="text-xl text-center">{t('fourthTable.tableTitle')}</h4>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                    text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                    <div/>
                </div>
                <div className="w-full flex justify-end">
                    <button className="button-outline w-[360px] text-nowrap" onClick={deleteFourthTableEntry}>{t('fourthTable.clearRow')}</button>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                        <colgroup>
                            <col className="w-28"/>
                            <col className="w-56"/>
                            <col className="w-52"/>
                            <col className="w-56"/>
                            <col className="w-56"/>
                            <col className="w-56"/>
                        </colgroup>
                        <thead className="bg-background py-2 ">
                        <tr className="text-center border-2 text-lg border-accent rounded-xl ">
                            <th className="py-2 border-2 border-accent">{t('fourthTable.np')}</th>
                            <th className="py-2 border-2 border-accent">{t('fourthTable.h')}</th>
                            <th className="py-2 border-2 border-accent">{t('fourthTable.hp')}</th>
                            <th className="py-2 border-2 border-accent">{t('fourthTable.n')}</th>
                            <th className="py-2 border-2 border-accent">{t('fourthTable.t1')}</th>
                            <th className="py-2 border-2 border-accent">{t('fourthTable.t2')}</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            fourthTableData.map((entry, index) => (
                                <>
                                    <tr className="text-center border-2 border-accent rounded-xl">
                                        <th className="py-2 border-2 border-accent font-bold"
                                            rowSpan={6}>{entry.np}</th>
                                        <th className="py-2 border-2 border-accent font-bold" rowSpan={6}>{entry.h}</th>
                                        <th className="py-2 border-2 border-accent font-bold"
                                            rowSpan={6}>{entry.hp}</th>
                                    </tr>
                                    {entry.measuring.map((measure, innerIndex) => (
                                        <tr className={clsx("cursor-pointer", index * 5 + innerIndex === fourthTablePointer && "bg-primary/50")}
                                            onClick={() => setFourthTablePointer(index * 5 + innerIndex)}>
                                            <th className="py-2 border-2 border-accent font-normal">{measure.number}</th>
                                            <th className="py-2 border-2 border-accent font-normal">{measure.t1}</th>
                                            <th className="py-2 border-2 border-accent font-normal">{measure.t2}</th>
                                        </tr>
                                    ))}
                                </>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    )
}

export { FourthTable }