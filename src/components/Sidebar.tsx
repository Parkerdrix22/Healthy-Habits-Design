import type { PageName } from '../data';

interface SidebarProps {
  activePage: PageName;
  navigateTo: (page: string) => void;
}

const navItems: { page: PageName; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'diet', label: 'Diet' },
  { page: 'fitness', label: 'Fitness' },
  { page: 'screen', label: 'Screen Time' },
  { page: 'goals', label: 'Goals' },
  { page: 'profile', label: 'Profile & Family' },
  { page: 'menu', label: 'Menu' },
];

function Sidebar({ activePage, navigateTo }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">HH</div>
        <div className="brand-text">
          <div className="brand-title">Healthy Habits</div>
          <div className="brand-subtitle">Healthy Life</div>
        </div>
      </div>

      <nav className="nav">
        {navItems.map(({ page, label }) => (
          <button
            key={page}
            className={`nav-link${activePage === page ? ' is-active' : ''}`}
            onClick={() => navigateTo(page)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="ghost-button" onClick={() => navigateTo('login')}>
          Log out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
