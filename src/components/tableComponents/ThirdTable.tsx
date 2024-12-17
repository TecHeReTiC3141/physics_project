import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../Modal.tsx";
import { useTableData } from "../../context";
import clsx from "clsx";

function ThirdTable() {

    const { thirdTableData, thirdTablePointer, setThirdTablePointer, deleteThirdTableEntry } = useTableData()

    return (
        <>
            <Modal id="second-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center">Инструкция к таблице 3</h3>
                    <ul className="list-decimal pl-4 pt-4">
                        <li>Подложите брусок под левую опору, нажав один раз на иконку “вверх”.</li>
                        <li>Установить первые оптические ворота в точке с координатой 𝑥1 = 0,15 м, а вторые - 𝑥2 = 0,40
                            м.
                        </li>
                        <li>Включить блок питания воздушного насоса ВС 4-15, нажав на кнопку включения.</li>
                        <li>Тележку перетащить в крайнее левое положение и прижать к электромагниту.</li>
                        <li>На табло нажать кнопку пуск (иконка треугольника).</li>
                        <li>Выключить блок питания воздушного насоса ВС 4-15.</li>
                        <li>Установить вторые оптические ворота последовательно в точках 𝑥2 = 0,50; 0,70; 0,90; 1,10 м и
                            для
                            каждого положения оптических ворот выполнить пункты 2–6.
                        </li>
                    </ul>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between items-center">
                    <h3 className="text-2xl">Задание 1</h3>
                    <div className="flex items-center gap-x-3 -translate-x-1/2">
                        <h4 className="text-xl text-center">Таблица 3</h4>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                    <div/>
                </div>
                <div className="w-full flex justify-end">
                    <button className="button-outline w-[360px] text-nowrap" onClick={deleteThirdTableEntry}>Очистить
                        выделенную
                        строку
                    </button>
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
                            <th className="py-2 border-2 border-accent" rowSpan={2}>№</th>
                            <th className="py-2 border-2 border-accent" colSpan={4}>Измеренные величины</th>
                            <th className="py-2 border-2 border-accent" colSpan={2}>Рассчитанные величины</th>
                        </tr>
                        <tr className="text-center border-2 border-accent rounded-xl text-lg">
                            <th className="py-2 border-2 border-accent">x1, м</th>
                            <th className="py-2 border-2 border-accent">x2, м</th>
                            <th className="py-2 border-2 border-accent">t1, с</th>
                            <th className="py-2 border-2 border-accent">t2, с</th>
                            <th className="py-2 border-2 border-accent">x2-x1, m</th>
                            <th className="py-2 border-2 border-accent">(t2^2-t1^2) / 2, c^2</th>
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