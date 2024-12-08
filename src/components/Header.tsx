import logo from '../../public/favicon/logo.png'
import { Modal } from "./Modal.tsx";

function Header() {
    return (
        <header className="w-full flex justify-between items-center pt-9 select-none">
            <button className="btn btn-circle btn-lg">
                <img src={logo} />
            </button>
            <h2 className="text-3xl fond-bolder text-center">
                Лабораторная работа 1.02<br />
                “Движение на наклонной плоскости”
            </h2>
            <div className="flex flex-col gap-y-3 ">
                <a href="https://study.physics.itmo.ru/course/format/tiles/mod_view.php?cmid=2666" target="_blank"
                   className="button-outline">Методичка</a>
                <button className="button-outline" onClick={() => (document.getElementById('instruction-modal') as HTMLDialogElement).showModal()}>Инструкция
                </button>
                <Modal id="instruction-modal">
                    <h3 className="font-bold text-lg">Какая-то инструкция!</h3>
                    <p className="py-4">Press ESC key or click outside to close</p>
                </Modal>
            </div>
        </header>
    )
}

export { Header }