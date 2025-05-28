import { Modal } from "../../components";

function Header() {
    return (
        <header className="w-full flex justify-between items-center pt-9 select-none">
            <div/>
            <h2 className="text-3xl fond-bolder text-center">
                Симулятор лабораторной работы 3.07<br/>
                “Изучение свойств ферромагнетика”
            </h2>
            <div className="flex flex-col gap-y-3 ">
                <a href="https://study.physics.itmo.ru/course/format/tiles/mod_view.php?cmid=8572" target="_blank"
                   className="button-outline">Методичка</a>
                <button className="button-outline"
                        onClick={() => (document.getElementById('instruction-modal') as HTMLDialogElement).showModal()}>Общая инструкция</button>
                <Modal id="instruction-modal">
                  <div className="max-w-lg p-2">
                    <h3 className="text-2xl font-bold text-accent mb-2">Общая инструкция к установке</h3>
                    <p className="mb-2 text-gray-700">Сайт симулирует работу установки для выполнения лабораторной работы по физике <span className="font-semibold">3.07 — Изучение свойств ферромагнетика</span></p>
                    <p className="mb-4 text-gray-700">Сайт содержит таблицы, в которых уже есть часть данных, с помощью установки необходимо снять оставшиеся данные и занести в таблицы.</p>
                    <h4 className="text-lg font-semibold text-accent mb-1">Порядок работы с установкой в общем случае:</h4>
                    <div className="mb-3">
                      <h5 className="font-bold text-accent mb-1">Генератор:</h5>
                      <ol className="list-decimal pl-6 text-gray-800 mb-2">
                        <li>Включаем генератор напряжения <span className="font-semibold">(индикатор — генератор включен)</span></li>
                        <li>Выбираем поле ввода для частоты с помощью кнопки слева от символа "Гц"</li>
                        <li>Вводим значение частоты с помощью цифрового блока</li>
                        <li>Выбираем поле ввода для напряжения с помощью кнопки слева от символа "Вт"</li>
                        <li>Вводим значение напряжения с помощью цифрового блока</li>
                        <li>Выбираем синусоидальный режим с помощью кнопки <span className="font-mono bg-gray-100 px-1 rounded">sine</span></li>
                        <li>Включаем подачу напряжения на канал 2 с помощью кнопки <span className="font-mono bg-gray-100 px-1 rounded">output</span> сверху от <span className="font-mono bg-gray-100 px-1 rounded">CH1</span></li>
                      </ol>
                    </div>
                    <div className="mb-3">
                      <h5 className="font-bold text-accent mb-1">Осциллограф:</h5>
                      <ol className="list-decimal pl-6 text-gray-800 mb-2">
                        <li>Включаем осциллограф кнопкой питания <span className="font-semibold">(индикаторы активных элементов загорятся)</span></li>
                        <li>Задаём с помощью регуляторов значения <span className="font-mono bg-gray-100 px-1 rounded">position</span> и <span className="font-mono bg-gray-100 px-1 rounded">scale</span> для каждого канала</li>
                        <li>Если всё сделано правильно, на осциллографе появится петля гистерезиса</li>
                      </ol>
                    </div>
                    <div className="mb-3">
                      <h5 className="font-bold text-accent mb-1">Снятие данных:</h5>
                      <ol className="list-decimal pl-6 text-gray-800 mb-2">
                        <li>Проверяем текущую активную строку в таблице — именно в неё запишутся снятые данные (строка подсвечивается синим цветом)</li>
                        <li>Если выбрана неверная строка — нажатием нужно выбрать верную</li>
                        <li>Чтобы снять результаты, нужно нажать на кнопку <span className="font-mono bg-gray-100 px-1 rounded">Снять результаты</span></li>
                        <li>Для очистки строки можно воспользоваться кнопкой удаления и перезаписать данные</li>
                        <li>Когда измерения закончены — нажмите на кнопку экспорта для получения заполненных таблиц в формате Word</li>
                      </ol>
                    </div>
                  </div>
                </Modal>
            </div>
        </header>
    )
}

export { Header }