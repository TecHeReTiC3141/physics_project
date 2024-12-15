import { FaQuestion } from "react-icons/fa6";
import { Modal } from "../Modal.tsx";

function SecondTable() {

    return (
        <>
            <Modal id="second-table-instruction-modal">
                <h3 className="font-bold text-lg">Какая-то инструкция!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
            </Modal>
        <div className="w-full flex flex-col gap-y-3 items-center">
            <div className="w-full flex justify-between items-center">

                <h3 className="text-2xl select-none">Задание 1</h3>
                <div className="flex items-center gap-x-3 -translate-x-1/2">
                    <h4 className="text-xl text-cent8er">Таблица 2</h4>
                    <button className="btn btn-sm bg-background hover:bg-background border-accent hover:border-accent
                        text-accent font-bold btn-circle p-1.5 text-xl flex items-center justify-center"
                            onClick={() => (document.getElementById('second-table-instruction-modal') as HTMLDialogElement).showModal()}><FaQuestion/>
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
                    <th className="py-2 border-2 border-accent">x, м</th>
                            <th className="py-2 border-2 border-accent">x^'i, м</th>
                            <th className="py-2 border-2 border-accent">h_0, мм</th>
                            <th className="py-2 border-2 border-accent">h_0^', мм</th>
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
