import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../Modal.tsx";

type FourthTableEntry = {
    np: number
    h: number
    hp: number
    measuring: ({ number: number, t1: number | null, t2: number | null })[]
}


const data: FourthTableEntry[] = [
    {
        np: 1,
        h: 187,
        hp: 198,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            },
            {
                number: 2,
                t1: null,
                t2: null
            },
            {
                number: 3,
                t1: null,
                t2: null
            },
            {
                number: 4,
                t1: null,
                t2: null
            },
            {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    }, {
        np: 2,
        h: 206,
        hp: 187,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            },
            {
                number: 2,
                t1: null,
                t2: null
            },
            {
                number: 3,
                t1: null,
                t2: null
            },
            {
                number: 4,
                t1: null,
                t2: null
            },
            {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    }, {
        np: 3,
        h: 214,
        hp: 188,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            },
            {
                number: 2,
                t1: null,
                t2: null
            },
            {
                number: 3,
                t1: null,
                t2: null
            },
            {
                number: 4,
                t1: null,
                t2: null
            },
            {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    },
    {
        np: 4,
        h: 223,
        hp: 188,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            }, {
                number: 2,
                t1: null,
                t2: null
            }, {
                number: 3,
                t1: null,
                t2: null
            }, {
                number: 4,
                t1: null,
                t2: null
            }, {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    }, {
        np: 5,
        h: 232,
        hp: 189,
        measuring: [
            {
                number: 1,
                t1: null,
                t2: null
            }, {
                number: 2,
                t1: null,
                t2: null
            }, {
                number: 3,
                t1: null,
                t2: null
            }, {
                number: 4,
                t1: null,
                t2: null
            }, {
                number: 5,
                t1: null,
                t2: null
            },
        ],
    },
]

function FourthTable() {
    return (
        <div className="w-full flex flex-col gap-y-3 items-center">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-2xl">Задание 2</h3>
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
            <h4 className="text-xl text-center">Таблица 4</h4>
            <div className="w-full overflow-x-auto">
                <table className="max-lg:text-sm text-nowrap mx-auto overflow-hidden">
                    <colgroup>
                        <col className="w-24"/>
                        <col className="w-52"/>
                        <col className="w-52"/>
                        <col className="w-52"/>
                        <col className="w-52"/>
                        <col className="w-52"/>
                    </colgroup>
                    <thead className="bg-background py-2 ">
                    <tr className="text-center border-2 border-accent rounded-xl ">
                        <th className="py-3 border-2 border-accent">np</th>
                        <th className="py-3 border-2 border-accent">h, mm</th>
                        <th className="py-3 border-2 border-accent">h', mm</th>
                        <th className="py-3 border-2 border-accent">№</th>
                        <th className="py-3 border-2 border-accent">t1, c</th>
                        <th className="py-3 border-2 border-accent">t2, c</th>
                    </tr>

                    </thead>
                    <tbody>
                    {
                        data.map((entry) => (
                            <>
                            <tr className="text-center border-2 border-accent rounded-xl">
                                <th className="py-3 border-2 border-accent font-normal" rowSpan={6}>{entry.np}</th>
                                <th className="py-3 border-2 border-accent font-normal" rowSpan={6}>{entry.h}</th>
                                <th className="py-3 border-2 border-accent font-normal" rowSpan={6}>{entry.hp}</th>
                            </tr>
                            {entry.measuring.map((measure) => (
                                <tr>
                                    <th className="py-3 border-2 border-accent font-normal">{measure.number}</th>
                                    <th className="py-3 border-2 border-accent font-normal">{measure.t1}</th>
                                    <th className="py-3 border-2 border-accent font-normal">{measure.t2}</th>
                                </tr>
                            ))}

                            </>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { FourthTable }