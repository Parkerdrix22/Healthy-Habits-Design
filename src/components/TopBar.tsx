import type { ChildName } from '../data';

const children: ChildName[] = ['Avery', 'Jordan'];

interface TopBarProps {
  pageTitle: string;
  activeChild: ChildName;
  setActiveChild: (child: ChildName) => void;
  onMenuToggle: () => void;
}

function TopBar({ pageTitle, activeChild, setActiveChild, onMenuToggle }: TopBarProps) {
  return (
    <header className="topbar">
      <button className="icon-button" onClick={onMenuToggle} aria-label="Toggle Menu">
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <div className="page-title">{pageTitle}</div>
      <div className="child-toggle" role="tablist" aria-label="Select child">
        {children.map((child) => (
          <button
            key={child}
            className={`child-pill${activeChild === child ? ' is-active' : ''}`}
            onClick={() => setActiveChild(child)}
          >
            {child}
          </button>
        ))}
      </div>
    </header>
  );
}

export default TopBar;
