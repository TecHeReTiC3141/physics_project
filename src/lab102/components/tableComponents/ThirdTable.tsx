import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTableData } from "../../context";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';

function ThirdTable() {
    const { thirdTableData, thirdTablePointer, setThirdTablePointer, deleteThirdTableEntry } = useTableData()
    const { t } = useTranslation('lab102');
    return (
        <>
            <Modal id="second-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center">{t('thirdTable.instructionTitle')}</h3>
                    <ul className="list-decimal pl-4 pt-4">
                        {(t('thirdTable.instructionList', { returnObjects: true }) as string[]).map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-2xl">{t('thirdTable.taskTitle')}</h3>
                    <div className="flex items-center gap-x-3 -translate-x-1/2">
                        <h4 className="text-xl text-center">{t('thirdTable.tableTitle')}</h4>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                    <div/>
                </div>
                <div className="w-full flex justify-end">
                    <button className="button-outline w-[360px] text-nowrap" onClick={deleteThirdTableEntry}>{t('thirdTable.clearRow')}</button>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                        <colgroup>
                            <col span={1} className="w-12"/>
                            <col span={4} className="w-60"/>
                            <col span={2} className="w-60"/>
                        </colgroup>
                        <thead className="bg-background py-2 ">
                        <tr className="text-center border-2 border-accent rounded-xl ">
                            <th className="py-2 border-2 border-accent" rowSpan={2}>{t('thirdTable.n')}</th>
                            <th className="py-2 border-2 border-accent" colSpan={4}>{t('thirdTable.measured')}</th>
                            <th className="py-2 border-2 border-accent" colSpan={2}>{t('thirdTable.calculated')}</th>
                        </tr>
                        <tr className="text-center border-2 border-accent rounded-xl text-lg">
                            <th className="py-2 border-2 border-accent">{t('thirdTable.x1')}</th>
                            <th className="py-2 border-2 border-accent">{t('thirdTable.x2')}</th>
                            <th className="py-2 border-2 border-accent">{t('thirdTable.t1')}</th>
                            <th className="py-2 border-2 border-accent">{t('thirdTable.t2')}</th>
                            <th className="py-2 border-2 border-accent">{t('thirdTable.dx')}</th>
                            <th className="py-2 border-2 border-accent">{t('thirdTable.deviation')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            thirdTableData.map((entry, index) => (
                                <tr onClick={() => setThirdTablePointer(index)}
                                    key={index}
                                    className={clsx("text-center border-2 border-accent rounded-xl cursor-pointer",
                                        index === thirdTablePointer && 'bg-primary/50')}>
                                    <th className="py-2 border-2 border-accent font-normal">{index + 1}</th>
                                    <th className="py-2 border-2 border-accent font-bold">{entry.x1}</th>
                                    <th className="py-2 border-2 border-accent font-bold">{entry.x2}</th>
                                    <th className="py-2 border-2 border-accent font-normal">{entry.t1}</th>
                                    <th className="py-2 border-2 border-accent font-normal">{entry.t2}</th>
                                    <th className="py-2 border-2 border-accent font-bold">{entry.dx}</th>
                                    <th className="py-2 border-2 border-accent font-normal">{entry.deviation}</th>
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

export { ThirdTable }