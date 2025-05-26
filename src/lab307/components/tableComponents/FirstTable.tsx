import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTableData } from "../../context";
import clsx from "clsx";


export function FirstTable() {
    const { firstTableData, firstTablePointer, setFirstTablePointer, deleteFirstTableEntry } = useTableData()

    return (
        <>
            <Modal id="first-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center">Инструкция к таблице 4</h3>
                    <ul className="list-decimal pl-4 pt-4">
                        <li>Установить первые оптические ворота в точке с координатой 𝑥1 = 0,15 м, а вторые – 𝑥2 = 1,10
                            м.
                        </li>
                        <li>Подложите брусок под левую опору, нажав один раз на иконку “вверх”.</li>
                        <li>Включить блок питания воздушного насоса ВС 4-15.</li>
                        <li>Тележку установить в крайнем левом положении и прижать к электромагниту.</li>
                        <li>Нажать кнопку “пуск” на табло.</li>
                        <li>На дисплее прибора ПКЦ-3 отразятся промежутки времени 𝑡1 и 𝑡2 от начала движения до
                            прохождения ворот. Величины автоматически впишутся в таблицу.
                        </li>
                        <li>Выключите блок питания воздушного насоса ВС 4-15.</li>
                        <li>Последовательно увеличивая число пластин под ножками левой опоры до пяти, для каждого набора
                            пластин выполнить пункты 3-7, результаты будут записываться в таблицу.
                        </li>
                        <li>После окончания всех измерений выключить прибор ПКЦ-3 тумблером на правой боковой панели.
                        </li>
                    </ul>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between">
                    <button className="button-outline px-4 text-nowrap">
                        Снять измерения
                    </button>
                    <div/>
                    <div className="flex gap-x-16 items-start">
                        <button className="button-outline px-4" onClick={deleteFirstTableEntry}>Очистить
                            выделенную строку
                        </button>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('first-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                </div>
                <h4 className="text-xl text-center">Таблица 1</h4>

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
                            <th className="py-2 border-2 border-accent">X_c, дел</th>
                            <th className="py-2 border-2 border-accent">Y_r, дел</th>
                            <th className="py-2 border-2 border-accent">H_c, A/м</th>
                            <th className="py-2 border-2 border-accent">B_r, Тл</th>
                        </tr>

                        </thead>
                        <tbody>
                        {
                            firstTableData.map((entry, index) => (
                                <tr key={index}
                                    className={clsx("text-center border-2 border-accent rounded-xl", index === firstTablePointer && 'bg-primary/50')}
                                    onClick={() => setFirstTablePointer(index)}>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.xc ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.yr ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.hc ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.rc ?? ''}</td>
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
