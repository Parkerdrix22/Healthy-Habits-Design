interface LoginPageProps {
  isActive: boolean;
  navigateTo: (page: string) => void;
}

function LoginPage({ isActive, navigateTo }: LoginPageProps) {
  return (
    <section className={`page${isActive ? ' is-active' : ''}`} data-page="login">
      <div className="login-wrap">
        <div className="glass card login-card">
          <h2>Welcome to Healthy Habits</h2>
          <label className="input-label">Email</label>
          <input className="input" placeholder="you@example.com" />
          <label className="input-label">Password</label>
          <input className="input" type="password" placeholder="********" />
          <button className="primary-button" onClick={() => navigateTo('home')}>Sign In</button>
          <button className="ghost-button">Forgot password?</button>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
