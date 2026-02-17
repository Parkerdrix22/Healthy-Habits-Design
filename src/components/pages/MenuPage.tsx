interface MenuPageProps {
  isActive: boolean;
  navigateTo: (page: string) => void;
}

const menuItems: { page: string; label: string }[] = [
  { page: 'home', label: 'Home' },
  { page: 'diet', label: 'Diet' },
  { page: 'fitness', label: 'Fitness' },
  { page: 'screen', label: 'Screen Time' },
  { page: 'goals', label: 'Goals' },
  { page: 'profile', label: 'Profile & Family' },
  { page: 'login', label: 'Logout' },
];

function MenuPage({ isActive, navigateTo }: MenuPageProps) {
  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="menu">
      <div className="glass card menu-card">
        <h3>Menu</h3>
        {menuItems.map(({ page, label }) => (
          <button
            key={page}
            className="menu-link"
            onClick={() => navigateTo(page)}
          >
            {label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default MenuPage;
