import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTableData } from "../../context";
import clsx from "clsx";

function ThirdTable() {
    const { thirdTableData, thirdTablePointer, setThirdTablePointer, deleteThirdTableEntry } = useTableData()

    return (
        <>
            <Modal id="third-table-instruction-modal">
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
                <div className="w-full flex justify-between">
                    <button className="button-outline px-4 text-nowrap">
                        Снять измерения
                    </button>
                    <div/>
                    <div className="flex gap-x-16 items-start">
                        <button className="button-outline px-4" onClick={deleteThirdTableEntry}>Очистить
                            выделенную строку
                        </button>
                        <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                onClick={() => (document.getElementById('third-table-instruction-modal') as HTMLDialogElement).showModal()}>
                            <FaQuestion/>
                        </button>
                    </div>
                </div>
                <h4 className="text-xl text-center">Таблица 3</h4>

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
                            <th className="py-2 border-2 border-accent">U, В</th>
                            <th className="py-2 border-2 border-accent">X, дел</th>
                            <th className="py-2 border-2 border-accent">K_x, В/дел</th>
                            <th className="py-2 border-2 border-accent">Н, А/м</th>
                            <th className="py-2 border-2 border-accent">Y, дел</th>
                            <th className="py-2 border-2 border-accent">K_y, В/дел</th>
                            <th className="py-2 border-2 border-accent">В, Тл</th>
                            <th className="py-2 border-2 border-accent">μ_m</th>
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