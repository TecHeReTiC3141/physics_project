import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t, i18n } = useTranslation();
  return (
    <div className="relative max-w-3xl mx-auto mt-16 p-8 bg-white rounded-xl shadow-lg flex flex-col gap-8 before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-8 before:rounded-t-xl before:shadow-[0_-20px_40px_-20px_rgba(33,162,220,0.15)] before:pointer-events-none">
      <h1 className="text-4xl font-bold text-center text-accent mb-2">{t('home.title')}</h1>
      <section>
        <h2 className="text-2xl font-semibold text-accent mb-2">{t('home.projectTitle')}</h2>
        <p className="text-lg text-gray-700">
          {t('home.projectDescription')}
        </p>
        <ol className="list-decimal pl-6 mt-2 text-gray-800">
          <li>{t('home.sim102')}</li>
          <li>{t('home.sim307')}</li>
        </ol>
        <p className="text-gray-700 mt-2">
          {t('home.simulationFeatures')}
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-accent mb-2">{t('home.annotationTitle')}</h2>
        <p className="text-gray-700">
          {t('home.annotationText')}
        </p>
        <ul className="list-disc pl-6 mt-2 text-gray-800">
          <li>{t('home.annotation1')}</li>
          <li>{t('home.annotation2')}</li>
          <li>{t('home.annotation3')}</li>
          <li>{t('home.annotation4')}</li>
        </ul>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-accent mb-2">{t('home.implementationTitle')}</h2>
        <div className="mb-4">
          <h3 className="text-xl font-bold text-accent">{t('home.sim102Title')}</h3>
          <ul className="list-disc pl-6 mt-1 text-gray-800">
            <li><b>{t('home.topic')}:</b> {t('home.sim102Topic')}</li>
            <li><b>{t('home.physicsLaws')}:</b> {t('home.sim102Laws')}</li>
            <li><b>{t('home.experimentalFeatures')}:</b>
              <ul className="list-disc pl-6 mt-1">
                <li>{t('home.sim102Exp1')}</li>
                <li>{t('home.sim102Exp2')}</li>
                <li>{t('home.sim102Exp3')}</li>
                <li>{t('home.sim102Exp4')}</li>
              </ul>
            </li>
            <li><b>{t('home.automation')}:</b> {t('home.sim102Automation')}</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold text-accent">{t('home.sim307Title')}</h3>
          <ul className="list-disc pl-6 mt-1 text-gray-800">
            <li><b>{t('home.topic')}:</b> {t('home.sim307Topic')}</li>
            <li><b>{t('home.experimentalFeatures')}:</b>
              <ul className="list-disc pl-6 mt-1">
                <li>{t('home.sim307Exp1')}</li>
                <li>{t('home.sim307Exp2')}</li>
                <li>{t('home.sim307Exp3')}</li>
                <li>{t('home.sim307Exp4')}</li>
              </ul>
            </li>
            <li><b>{t('home.interface')}:</b> {t('home.sim307Interface')}</li>
          </ul>
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-accent mb-2">{t('home.requirementsTitle')}</h2>
        <ol className="list-decimal pl-6 text-gray-800">
          <li>
            <b>{t('home.mainFeatures')}:</b>
            <ul className="list-disc pl-6 mt-1">
              <li>{t('home.req1')}</li>
              <li>{t('home.req2')}</li>
              <li>{t('home.req3')}</li>
              <li>{t('home.req4')}</li>
              <li>{t('home.req5')}</li>
            </ul>
          </li>
          <li>
            <b>{t('home.ui')}:</b>
            <ul className="list-disc pl-6 mt-1">
              <li>{t('home.req6')}</li>
              <li>{t('home.req7')}</li>
            </ul>
          </li>
        </ol>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-accent mb-2">{t('home.demoTitle')}</h2>
        <ol className="list-decimal pl-6 text-gray-800">
          <li>{t('home.demoApp')}</li>
          <li>{t('home.demoFigma')}</li>
          <li>{t('home.demoGithub')}</li>
          <li>{t('home.demoScreenshots')}</li>
        </ol>
      </section>
      <section>
        <h2 className="text-2xl font-semibold text-accent mb-2">{t('home.contactsTitle')}</h2>
        <p className="text-gray-700 mb-2">{t('home.contactsText')}</p>
      </section>
      <div className="text-center text-xs text-gray-400 mt-4">ITMO University</div>
    </div>
  )
}