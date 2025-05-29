import { Modal } from "../../components";
import { useTranslation } from "react-i18next";

function Header() {
    const { t, i18n } = useTranslation('lab102');
    return (
        <header className="w-full flex justify-between items-center pt-9 select-none">
            <div/>
            <h2 className="text-3xl fond-bolder text-center">
                {t('header.title')}<br/>
                {t('header.subtitle')}
            </h2>
            <div className="flex flex-col gap-y-3 ">
                <a href="https://study.physics.itmo.ru/course/format/tiles/mod_view.php?cmid=2666" target="_blank"
                   className="button-outline">{t('header.manual')}</a>
                <button className="button-outline"
                        onClick={() => (document.getElementById('instruction-modal') as HTMLDialogElement).showModal()}>{t('header.instruction')}
                </button>
                <Modal id="instruction-modal">
                    <h3 className="font-bold text-lg">{t('header.modalTitle')}</h3>
                    <p className="py-4">{t('header.modalText1')}</p>
                    <p className="py-4">{t('header.modalText2')}</p>
                    <p>{t('header.modalOrderTitle')}</p>
                    <ol className="list-decimal pl-4 pb-4">
                        {(t('header.modalOrderList', { returnObjects: true }) as string[]).map((item, idx) => <li key={idx}>{item}</li>)}
                    </ol>
                    <p>{t('header.modalResultHint')}</p>
                </Modal>
            </div>
        </header>
    )
}

export { Header }