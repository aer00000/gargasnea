import { useState } from 'react';

import styles from './login.module.css';

interface LoginProps {
  inputLabel: string;
  placeholderText: string;
  type?: string;
}

type pages = 'login' | 'signup' | 'password';

// Huvudsida för inloggning / skapa konton
function Login() {

  const [currentView, setCurrentView] = useState<pages>('login');

  return (
    <div className={styles.page}>
      <div className={styles.middle}>
        <h1 className={styles.title}>GARGASNEA🍻</h1>

        {/* 3. Rendera rätt komponent baserat på state */}
        {currentView === 'login' && <LoginPage onNavigate={setCurrentView} />}
        {currentView === 'signup' && <SignupPage onNavigate={setCurrentView} />}
        {currentView === 'password' && <PasswordPage onNavigate={setCurrentView} />}
      </div>
    </div>
  );
}

// Prop-typ för de sidor som ska kunna byta vy
interface PageProps {
  onNavigate: (view: pages) => void;
}

// För existerande användare
function LoginPage({ onNavigate }: PageProps) {
  return (
    <>
      <TextField inputLabel={'Email'} placeholderText={' gargasnea@gmail.com'} />
      <TextField inputLabel={'Lösenord'} placeholderText={' ******'} type="password" />

      <Buttons textLabel={'Logga in'} />
      <Buttons textLabel={'Google login'} />

      <p className={styles.signuptext}>
        Inget konto? skapa ett{' '}
        <span
          onClick={() => onNavigate('signup')}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          här
        </span>
      </p>

      <p className={styles.signuptext}>
        Glömt lösenordet? Klicka{' '}
        <span
          onClick={() => onNavigate('password')}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          här
        </span>
      </p>
    </>
  );
}

// För nya användare
function SignupPage({ onNavigate }: PageProps) {
  return (
    <>
      <TextField inputLabel={'Användarnamn'} placeholderText={' joe mama'} />
      <TextField inputLabel={'Email'} placeholderText={' gargasnea@gmail.com'} />
      <TextField inputLabel={'Lösenord'} placeholderText={' ******'} type="password" />

      <Buttons textLabel={'Skapa konto'} />

      <p className={styles.signuptext}>
        Har du redan ett konto? Klicka{' '}
        <span
          onClick={() => onNavigate('login')}
          style={{ textDecoration: 'underline', cursor: 'pointer' }}
        >
          här
        </span>
      </p>
    </>
  );
}

function PasswordPage({ onNavigate }: PageProps) {
  return (
    <>
      <p className={styles.signuptext}>Skulle inte ha glömt lösenordet dumhuvud!</p>

      <h1 className={styles.finger}>🖕</h1>

      <Buttons textLabel={'Gå tillbaka'} onClick={() => onNavigate('login')} />
    </>
  );
}

// User input för inloggning
function TextField({ inputLabel, placeholderText, type = 'text' }: LoginProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{inputLabel}</label>
      <input className={styles.input} type={type} placeholder={placeholderText} />
    </div>
  );
}

// Övriga knappar
function Buttons({ textLabel, onClick }: { textLabel: string; onClick?: () => void }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {textLabel}
    </button>
  );
}

export default Login;
