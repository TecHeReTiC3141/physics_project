import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../Modal.tsx";

type ThirdTableEntry = {
    x1: number
    x2: number
    t1: number | null
    t2: number | null
    dx: number
    deviation: number | null
}

function ThirdTable() {

    const data: ThirdTableEntry[] = [
        {
            x1: .15,
            x2: .40,
            t1: null,
            t2: null,
            dx: .25,
            deviation: null
        },
        {
            x1: .15,
            x2: .50,
            t1: null,
            t2: null,
            dx: .35,
            deviation: null
        },
        {
            x1: .15,
            x2: .70,
            t1: null,
            t2: null,
            dx: .55,
            deviation: null
        },
        {
            x1: .15,
            x2: .90,
            t1: null,
            t2: null,
            dx: .75,
            deviation: null
        },
        {
            x1: .15,
            x2: 1.10,
            t1: null,
            t2: null,
            dx: .95,
            deviation: null
        },
    ]

    // TODO: add pointer for active entry deletion

    return (
        <div className="w-full flex flex-col gap-y-3 items-center">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-2xl">Задание 1</h3>
                <button className="btn bg-background hover:bg-background border-accent hover:border-accent
                    text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                        onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}>
                    <FaQuestion/>
                </button>
                <Modal id="second-table-instruction-modal">
                    <h3 className="font-bold text-lg">Какая-то инструкция!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </Modal>
            </div>
            <h4 className="text-xl text-center">Таблица 3</h4>
            <div className="w-full overflow-x-auto">
                <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                    <colgroup>
                        <col span={1} className="w-12"/>
                        <col span={4} className="w-60"/>
                        <col span={2} className="w-60"/>
                    </colgroup>
                    <thead className="bg-background py-2 ">
                    <tr className="text-center border-2 border-accent rounded-xl ">
                        <th className="py-3 border-2 border-accent" rowSpan={2}>№</th>
                        <th className="py-3 border-2 border-accent" colSpan={4}>Измеренные величины</th>
                        <th className="py-3 border-2 border-accent" colSpan={2}>Рассчитанные величины</th>
                    </tr>
                    <tr className="text-center border-2 border-accent rounded-xl ">
                        <th className="py-3 border-2 border-accent">x1, м</th>
                        <th className="py-3 border-2 border-accent">x2, м</th>
                        <th className="py-3 border-2 border-accent">t1, с</th>
                        <th className="py-3 border-2 border-accent">t2, с</th>
                        <th className="py-3 border-2 border-accent">x2-x1, m</th>
                        <th className="py-3 border-2 border-accent">(t2^2-t1^2) / 2, c^2</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((entry, index) => (
                            <tr className="text-center border-2 border-accent rounded-xl">
                                <th className="py-3 border-2 border-accent font-normal">{index + 1}</th>
                                <th className="py-3 border-2 border-accent font-normal">{entry.x1}</th>
                                <th className="py-3 border-2 border-accent font-normal">{entry.x2}</th>
                                <th className="py-3 border-2 border-accent font-normal">{entry.t1}</th>
                                <th className="py-3 border-2 border-accent font-normal">{entry.t1}</th>
                                <th className="py-3 border-2 border-accent font-normal">{entry.dx}</th>
                                <th className="py-3 border-2 border-accent font-normal">{entry.deviation}</th>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { ThirdTable }