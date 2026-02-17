import type { PageName } from '../data';

interface MobileTabBarProps {
  activePage: PageName;
  navigateTo: (page: string) => void;
}

const tabs: { page: PageName; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'diet', label: 'Diet' },
  { page: 'fitness', label: 'Fitness' },
  { page: 'goals', label: 'Goals' },
  { page: 'menu', label: 'More' },
];

function MobileTabBar({ activePage, navigateTo }: MobileTabBarProps) {
  return (
    <nav className="mobile-tabbar" aria-label="Mobile navigation">
      {tabs.map(({ page, label }) => (
        <button
          key={page}
          className={`mobile-tab${activePage === page ? ' is-active' : ''}`}
          onClick={() => navigateTo(page)}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}

export default MobileTabBar;
