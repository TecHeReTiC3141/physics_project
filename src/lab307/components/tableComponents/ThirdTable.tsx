import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTableData } from "../../context";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';

function ThirdTable() {
    const { thirdTableData, thirdTablePointer, setThirdTablePointer, deleteThirdTableEntry } = useTableData()
    const { t } = useTranslation();

    return (
        <>
            <Modal id="third-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center mb-2 text-accent">{t('thirdTable.instructionTitle')}</h3>
                    <ol className="list-decimal pl-4 pt-4 text-gray-800">
                        <li>{t('thirdTable.instruction1')}</li>
                        <li>{t('thirdTable.instruction2')}</li>
                        <li>{t('thirdTable.instruction3')}</li>
                    </ol>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between">
                    <button className="button-outline px-4 text-nowrap">
                        {t('thirdTable.takeMeasurement')}
                    </button>
                    <div/>
                    <div className="flex gap-x-16 items-start">
                        <button className="button-outline px-4" onClick={deleteThirdTableEntry}>{t('thirdTable.clearRow')}
                        </button>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('third-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                </div>
                <h4 className="text-xl text-center">{t('tables.tab3')}</h4>

                <div className="w-full overflow-x-auto">
                <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                        <colgroup>
                            <col className="w-36"/>
                            <col className="w-36"/>
                            <col className="w-36"/>
                            <col className="w-36"/>
                            <col className="w-36"/>
                            <col className="w-36"/>
                            <col className="w-36"/>
                            <col className="w-36"/>
                        </colgroup>
                        <thead className="bg-background py-2 ">
                        <tr className="text-center border-2 border-accent rounded-xl ">
                            {(t('tableHeaders.third', { returnObjects: true }) as string[]).map((header, idx) => (
                                <th key={idx} className="py-2 border-2 border-accent">{header}</th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {
                            thirdTableData.map((entry, index) => (
                                <tr onClick={() => setThirdTablePointer(index)}
                                    key={index}
                                    className={clsx("text-center border-2 border-accent rounded-xl cursor-pointer",
                                        index === thirdTablePointer && 'bg-primary/50')}>
                                    <th className="py-2 border-2 border-accent h-16 font-bold">{entry.u}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-bold">{entry.x}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal">{entry.kx}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal">{entry.h}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal">{entry.y}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-bold">{entry.ky}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal">{entry.b}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal">{entry.um}</th>
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