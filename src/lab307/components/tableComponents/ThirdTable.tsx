import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useGameObjects, useTableData } from "../../context";
import clsx from "clsx";
import { useTranslation } from 'react-i18next';
import { usePointsContext } from "../../context/PointsContext.tsx";

const kyMax = 50
const kxMax = 100

function ThirdTable() {
    const { xm, ym } = usePointsContext()
    const { generatorVpp, scaleX, scaleY } = useGameObjects()
    const {
        thirdTableData,
        thirdTablePointer,
        setThirdTablePointer,
        deleteThirdTableEntry,
        appendThirdTableEntry
    } = useTableData()
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
                    <button className="button-outline px-4 text-nowrap disabled:opacity-60" onClick={() => appendThirdTableEntry({
                        x: xm,
                        y: ym,
                        u: +generatorVpp,
                        kx: (scaleX + 1) / 2 * kxMax,
                        ky: (scaleY + 1) / 2 * kyMax
                    })} disabled={xm === undefined && ym === undefined}>
                        {t('thirdTable.takeMeasurement')}
                    </button>
                    <div/>
                    <div className="flex gap-x-16 items-start">
                        <button className="button-outline px-4"
                                onClick={deleteThirdTableEntry}>{t('thirdTable.clearRow')}
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
                                    <th className="py-2 border-2 border-accent h-16 font-bold">{entry.u?.toFixed(1) ?? ''}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-bold">{entry.x?.toFixed(1) ?? ''}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal">{entry.kx?.toFixed(1) ?? ''}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal"/>
                                    <th className="py-2 border-2 border-accent h-16 font-normal">{entry.y?.toFixed(1) ?? ''}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-bold">{entry.ky?.toFixed(1) ?? ''}</th>
                                    <th className="py-2 border-2 border-accent h-16 font-normal"/>
                                    <th className="py-2 border-2 border-accent h-16 font-normal"/>
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