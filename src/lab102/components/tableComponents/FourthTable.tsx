import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../Modal.tsx";
import { useTableData } from "../../context";
import clsx from "clsx";


function FourthTable() {

    const { fourthTableData, fourthTablePointer, setFourthTablePointer, deleteFourthTableEntry } = useTableData()
    return (
        <>
            <Modal id="second-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center">Инструкция к таблице 4</h3>
                    <ul className="list-decimal pl-4 pt-4">
                         <li>Установить первые оптические ворота в точке с координатой 𝑥1 = 0,15 м, а вторые – 𝑥2 = 1,10 м.</li>
                         <li>Подложите брусок под левую опору, нажав один раз на иконку “вверх”.</li>
                         <li>Включить блок питания воздушного насоса ВС 4-15.</li>
                         <li>Тележку установить в крайнем левом положении и прижать к электромагниту.</li>
                         <li>Нажать кнопку “пуск” на табло.</li>
                         <li>На дисплее прибора ПКЦ-3 отразятся промежутки времени 𝑡1 и 𝑡2 от начала движения до прохождения ворот. Величины автоматически впишутся в таблицу.</li>
                         <li>Выключите блок питания воздушного насоса ВС 4-15.</li>
                         <li>Последовательно увеличивая число пластин под ножками левой опоры до пяти, для каждого набора пластин выполнить пункты 3-7, результаты будут записываться в таблицу.</li>
                         <li>После окончания всех измерений выключить прибор ПКЦ-3 тумблером на правой боковой панели.</li>
                    </ul>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-2xl">Задание 2</h3>
                    <div className="flex items-center gap-x-3 -translate-x-1/2">
                        <h4 className="text-xl text-center">Таблица 4</h4>

                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                    text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                    <div/>
                </div>
                <div className="w-full flex justify-end">
                    <button className="button-outline w-[360px] text-nowrap" onClick={deleteFourthTableEntry}>Очистить
                        выделенную строку
                    </button>
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
                            <th className="py-2 border-2 border-accent">np</th>
                            <th className="py-2 border-2 border-accent">h, mm</th>
                            <th className="py-2 border-2 border-accent">h', mm</th>
                            <th className="py-2 border-2 border-accent">№</th>
                            <th className="py-2 border-2 border-accent">t1, c</th>
                            <th className="py-2 border-2 border-accent">t2, c</th>
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