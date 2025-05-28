import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../../../components";
import { useTableData } from "../../context";
import clsx from "clsx";
import { usePointsContext } from "../../context/PointsContext.tsx";


export function FirstTable() {
    const { xc, yr } = usePointsContext()
    const {
        firstTableData,
        firstTablePointer,
        setFirstTablePointer,
        deleteFirstTableEntry,
        appendFirstTableEntry
    } = useTableData()

    return (
        <>
            <Modal id="first-table-instruction-modal">
                <div className="text-start">
                    <h3 className="text-3xl font-bold text-center mb-2 text-accent">Инструкция к таблице 1</h3>
                    <ol className="list-decimal pl-4 pt-4 text-gray-800">
                        <li>Подберите такие значения коэффициентов усиления 𝐾𝑥, 𝐾𝑦 регуляторами «ВОЛЬТ/ДЕЛ», чтобы
                            сигналы в каждом из каналов занимали по вертикали существенную часть экрана (при
                            необходимости можно немного уменьшить амплитуду выходного сигнала генератора).
                        </li>
                        <li>С помощью ручек смещения сигнала каналов по вертикали расположите петлю так, чтобы ее центр
                            совпал с началом координат на экране. При правильном выборе масштабов по осям петля должна
                            иметь максимальные размеры, но не выходить за пределы экрана.
                        </li>
                        <li>Зафиксируйте координаты <b>X_c</b> и <b>Y_r</b> пересечения петли гистерезиса с осями
                            координат с помощью кнопки <span className="font-mono bg-gray-100 px-1 rounded">Снять измерения</span>.
                        </li>
                        <li>Вычислите коэффициенты 𝛼 и 𝛽. Определите коэрцитивную силу <b>𝐻𝑐</b> и остаточную
                            индукцию <b>𝐵𝑟</b> для исследуемого образца.
                        </li>
                    </ol>
                </div>
            </Modal>
            <div className="w-full flex flex-col gap-y-3 items-center">
                <div className="w-full flex justify-between">
                    <button className="button-outline px-4 text-nowrap"
                            onClick={() => appendFirstTableEntry({ xc, yr })}
                            disabled={firstTableData.length >= 1 && Number.isNaN(xc) || Number.isNaN(yr)}>
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
                                        rowSpan={6}>{entry.xc?.toFixed(1) ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}>{entry.yr?.toFixed(1) ?? ''}</td>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}/>
                                    <td className="py-2 border-2 border-accent font-bold  h-11"
                                        rowSpan={6}/>
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
