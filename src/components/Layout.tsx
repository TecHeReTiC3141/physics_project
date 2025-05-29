import { Outlet } from "react-router"
import { Footer } from "./Footer.tsx";
import { NavigationSidebar } from "./NavigationSidebar.tsx";
import { useTranslation } from 'react-i18next';

function GlobalHeader() {
  const { i18n } = useTranslation();
  return (
    <div className="w-full flex justify-end items-start pt-4 pr-4 absolute top-[19px] right-8">
      <button
        className="button-outline px-2 py-1 text-xs"
        onClick={() => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')}
      >
        {i18n.language === 'ru' ? 'EN' : 'RU'}
      </button>
    </div>
  );
}

export function Layout() {
  return (
    <div className="h-full min-h-[100vh] flex gap-x-3 justify-between pr-12">
      <NavigationSidebar />
      <div className="flex flex-1 flex-col items-center gap-y-3">
        <GlobalHeader />
        <Outlet/>
        <Footer/>
      </div>
    </div>
  )
}