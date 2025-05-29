import { Modal } from "../../components";
import { useTranslation } from "react-i18next";

function Header() {
    const { t, i18n } = useTranslation();
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };
    return (
        <header className="w-full flex justify-between items-center pt-9 select-none">
            <div/>
            <h2 className="text-3xl fond-bolder text-center">
                {t('header.title')}
            </h2>
            <div className="flex flex-col gap-y-3 ">
                <a href="https://study.physics.itmo.ru/course/format/tiles/mod_view.php?cmid=8572" target="_blank"
                   className="button-outline">{t('header.manual')}</a>
                <button className="button-outline"
                        onClick={() => (document.getElementById('instruction-modal') as HTMLDialogElement).showModal()}>{t('header.instruction')}</button>
                <div className="flex gap-2 mt-2">
                    <button className={"button-outline px-2 py-1 text-xs" + (i18n.language === 'ru' ? ' button-filled' : '')} onClick={() => changeLanguage('ru')}>RU</button>
                    <button className={"button-outline px-2 py-1 text-xs" + (i18n.language === 'en' ? ' button-filled' : '')} onClick={() => changeLanguage('en')}>EN</button>
                </div>
                <Modal id="instruction-modal">
                  <div className="max-w-lg p-2">
                    <h3 className="text-2xl font-bold text-accent mb-2">{t('header.modalTitle')}</h3>
                    <p className="mb-2 text-gray-700">{t('header.modalText1')}</p>
                    <p className="mb-4 text-gray-700">{t('header.modalText2')}</p>
                    <h4 className="text-lg font-semibold text-accent mb-1">{t('header.modalOrderTitle')}</h4>
                    <div className="mb-3">
                      <h5 className="font-bold text-accent mb-1">{t('header.generatorTitle')}</h5>
                      <ol className="list-decimal pl-6 text-gray-800 mb-2">
                        {(t('header.generatorList', { returnObjects: true }) as string[]).map((item, idx) => <li key={idx}>{item}</li>)}
                      </ol>
                    </div>
                    <div className="mb-3">
                      <h5 className="font-bold text-accent mb-1">{t('header.oscilographTitle')}</h5>
                      <ol className="list-decimal pl-6 text-gray-800 mb-2">
                        {(t('header.oscilographList', { returnObjects: true }) as string[]).map((item, idx) => <li key={idx}>{item}</li>)}
                      </ol>
                    </div>
                    <div className="mb-3">
                      <h5 className="font-bold text-accent mb-1">{t('header.dataTitle')}</h5>
                      <ol className="list-decimal pl-6 text-gray-800 mb-2">
                        {(t('header.dataList', { returnObjects: true }) as string[]).map((item, idx) => <li key={idx}>{item}</li>)}
                      </ol>
                    </div>
                  </div>
                </Modal>
            </div>
        </header>
    )
}

export { Header }