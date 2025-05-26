import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import clsx from "clsx";
import { useTableData } from "../../context";

function SecondTable() {

    const { secondTableData, deleteSecondTableEntry, secondTablePointer, setSecondTablePointer } = useTableData()

    return (
        <>
            <Modal id="second-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center">Инструкция к таблице 2</h3>
                    <p className="py-4">В таблицу УЖЕ внесены корректные данные, вносить новые данные не нужно!</p>
                    <p className="py-4">Внесенные данные:</p>
                    <ul className="list-decimal pl-4">
                        <li>Точки: 𝑥 = 0,22 м и 𝑥′ = 1,0 м, с учетом приборной
                            погрешности
                        </li>
                        <li>Вертикальные координаты ℎ0 и ℎ′ (расстояние от края линейки на
                            рельсе до опорной поверхности), с учетом приборной погрешности.
                        </li>
                    </ul>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between items-center">
                    <div className="w-full flex justify-between">
                        <button className="button-outline px-4 text-nowrap">
                            Снять измерения
                        </button>
                        <div/>
                        <div className="flex gap-x-16 items-start">
                            <button className="button-outline px-4" onClick={deleteSecondTableEntry}>Очистить
                                выделенную строку
                            </button>
                            <button className="btn btn-sm cursor-pointer bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                                    onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                                <FaQuestion/>
                            </button>
                        </div>
                    </div>
                </div>
                <h4 className="text-xl text-center">Таблица 2</h4>

                <div className="w-full overflow-x-auto">
                    <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                        <colgroup>
                            <col span={1} className="w-60"/>
                            <col span={1} className="w-60"/>
                            <col span={1} className="w-60"/>
                            <col span={1} className="w-60"/>
                            <col span={1} className="w-60"/>
                        </colgroup>
                        <thead className="bg-background py-2 ">
                        <tr className="text-center border-2 border-accent rounded-xl ">
                            <th className="py-2 border-2 border-accent">X_m, дел</th>
                            <th className="py-2 border-2 border-accent">Y_m, дел</th>
                            <th className="py-2 border-2 border-accent">H_m, A/м</th>
                            <th className="py-2 border-2 border-accent">B_m, Тл</th>
                            <th className="py-2 border-2 border-accent">μ_m</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            secondTableData.map((entry, index) => (
                                <tr key={index}
                                    className={clsx("text-center border-2 border-accent rounded-xl", index === secondTablePointer && 'bg-primary/50')}
                                    onClick={() => setSecondTablePointer(index)}>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry?.xm || ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry?.ym || ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry?.hm || ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry?.bm || ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold h-11"
                                        rowSpan={6}>{entry?.um || ''}</td>

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
