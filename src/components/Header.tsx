import logo from '../../public/favicon/logo.png'
import { Modal } from "./Modal.tsx";

function Header() {
    return (
        <header className="w-full flex justify-between items-center pt-9 select-none">
            <button className="btn btn-circle btn-lg">
                <img alt="logo" src={logo as string}/>
            </button>
            <h2 className="text-3xl fond-bolder text-center">
                Симулятор лабораторной работы 1.02<br/>
                “Движение на наклонной плоскости”
            </h2>
            <div className="flex flex-col gap-y-3 ">
                <a href="https://study.physics.itmo.ru/course/format/tiles/mod_view.php?cmid=2666" target="_blank"
                   className="button-outline">Методичка</a>
                <button className="button-outline"
                        onClick={() => (document.getElementById('instruction-modal') as HTMLDialogElement).showModal()}>Инструкция
                </button>
                <Modal id="instruction-modal">
                    <h3 className="font-bold text-lg">Общая инструкция к установке</h3>
                    <p className="py-4">Сайт симулирует работу установки для выполнения лабораторной работы по физике
                        1.02 “Изучение скольжения тележки по наклонной плоскости”. </p>
                    <p className="py-4">Сайт содержит таблицы, в которых уже есть часть данных, с помощью установки
                        необходимо снять оставшиеся данные и занести в таблицы.</p>
                    <p>Порядок работы с установкой в общем случае следующий:</p>
                    <ol className="list-decimal pl-4 pb-4">
                        <li>Сбрасываем текущее состоянии установки кнопкой “сброс” на табло.</li>
                        <li>Выставляем оптические ворота и тележку, перетаскивая мышкой. Устанавливаем количество
                            брусков (пластин) с помощью кнопок около левой опоры.
                        </li>
                        <li>Включаем насос, нажав на его кнопку (зеленый цвет индикатора - насос работает, красны -
                            насос вылключен).
                        </li>
                        <li>Проверяем текущую активную строку в таблице, именно в нее запишутся снятые данные (строка
                            подсвечивается синим цветом).
                        </li>
                        <li>Если выбрана неверная строка - с помощью стрелок нужно выбрать верную.</li>
                        <li>Если вы хотите перезаписать результат - нажать на кнопку сброса около активной строки, после
                            чего снять верные данные
                        </li>
                        <li>Нажать кнопку “пуск” на табло.</li>
                    </ol>
                    <p>Если на табло результат -1 -1, значит вы неверно выставили данные для конкретного эксперимента,
                        перечитайте условия и попробуйте еще раз.
                    </p>
                </Modal>
            </div>
        </header>
    )
}

export { Header }