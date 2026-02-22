import { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import MobileTabBar from './components/MobileTabBar';
import HomePage from './components/pages/HomePage';
import FitnessPage from './components/pages/FitnessPage';
import DietPage from './components/pages/DietPage';
import ScreenTimePage from './components/pages/ScreenTimePage';
import GoalsPage from './components/pages/GoalsPage';
import ProfilePage from './components/pages/ProfilePage';
import MenuPage from './components/pages/MenuPage';
import LoginPage from './components/pages/LoginPage';
import { appData, pageTitles, type PageName, type ChildName } from './data';

function App() {
  const [activePage, setActivePage] = useState<PageName>('home');
  const [activeChild, setActiveChild] = useState<ChildName>('Avery');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
  }, [menuOpen]);

  const navigateTo = useCallback((page: string) => {
    const validPage = (page in pageTitles ? page : 'home') as PageName;
    setActivePage(validPage);
    setMenuOpen(false);
  }, []);

  const toggleMenu = useCallback(() => {
    setMenuOpen(prev => !prev);
  }, []);

  const childData = appData[activeChild];

  return (
    <div className="app">
      <Sidebar activePage={activePage} navigateTo={navigateTo} />
      <main className="main">
        <TopBar
          pageTitle={pageTitles[activePage]}
          activeChild={activeChild}
          setActiveChild={setActiveChild}
          onMenuToggle={toggleMenu}
        />
        <HomePage isActive={activePage === 'home'} data={childData} navigateTo={navigateTo} />
        <FitnessPage isActive={activePage === 'fitness'} data={childData} />
        <DietPage isActive={activePage === 'diet'} data={childData} />
        <ScreenTimePage isActive={activePage === 'screen'} data={childData} />
        <GoalsPage isActive={activePage === 'goals'} activeChild={activeChild} />
        <ProfilePage isActive={activePage === 'profile'} data={childData} />
        <MenuPage isActive={activePage === 'menu'} navigateTo={navigateTo} />
        <LoginPage isActive={activePage === 'login'} navigateTo={navigateTo} />
      </main>
      <MobileTabBar activePage={activePage} navigateTo={navigateTo} />
    </div>
  );
}

export default App;
