import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTranslation } from 'react-i18next';

function SecondTable() {
    const { t } = useTranslation('lab102');
    return (
        <>
            <Modal id="second-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center">{t('secondTable.instructionTitle')}</h3>
                    <p className="py-4">{t('secondTable.instruction1')}</p>
                    <p className="py-4">{t('secondTable.instruction2')}</p>
                    <ul className="list-decimal pl-4">
                        {(t('secondTable.instructionList', { returnObjects: true }) as string[]).map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-2xl select-none">{t('secondTable.taskTitle')}</h3>
                    <div className="flex items-center gap-x-3 -translate-x-1/2">
                        <h4 className="text-xl text-cent8er">{t('secondTable.tableTitle')}</h4>
                        <button className="btn btn-sm bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                    <div/>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                        <colgroup>
                            <col span={1} className="w-60"/>
                            <col span={1} className="w-60"/>
                            <col span={1} className="w-60"/>
                            <col span={1} className="w-60"/>
                        </colgroup>
                        <thead className="bg-background py-2 ">
                        <tr className="text-center border-2 border-accent rounded-xl ">
                            <th className="py-2 border-2 border-accent">{t('secondTable.x')}</th>
                            <th className="py-2 border-2 border-accent">{t('secondTable.xp')}</th>
                            <th className="py-2 border-2 border-accent">{t('secondTable.h0')}</th>
                            <th className="py-2 border-2 border-accent">{t('secondTable.hp0')}</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="text-center border-2 border-accent rounded-xl">
                            <th className="py-2 border-2 border-accent font-normal">0,22 ± 0,005</th>
                            <th className="py-2 border-2 border-accent font-normal">1,00 ± 0,005</th>
                            <th className="py-2 border-2 border-accent font-normal">188 ± 0,5</th>
                            <th className="py-2 border-2 border-accent font-normal">187 ± 0,5</th>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export { SecondTable }
