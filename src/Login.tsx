import { useState } from 'react';

import styles from './login.module.css';

interface LoginProps {
  inputLabel: string;
  placeholderText: string;
  type?: string;
}

const bubbligabubblor = [
  { id: 1, left: '7%', duration: '6s', delay: '0s' },
  { id: 2, left: '20%', duration: '8s', delay: '2s' },
  { id: 3, left: '27%', duration: '5.5s', delay: '1s' },
  { id: 4, left: '38%', duration: '7.5s', delay: '3.5s' },
  { id: 5, left: '50%', duration: '6.7s', delay: '0.5s' },
  { id: 6, left: '58%', duration: '8.5s', delay: '2.5s' },
  { id: 7, left: '67%', duration: '5.8s', delay: '4s' },
  { id: 8, left: '76%', duration: '7.2s', delay: '1.5s' },
  { id: 9, left: '83%', duration: '6.2s', delay: '3s' },
  { id: 10, left: '92%', duration: '7.8s', delay: '0.67s' }
];

type pages = 'login' | 'signup' | 'password';

// Huvudsida för inloggning / skapa konton
function Login() {
  const [currentView, setCurrentView] = useState<pages>('login');

  return (
    <div className={styles.page}>
      {/* bubbligabubblor hälsningar ttssa */}
      <div className={styles.bubbles}>
        {bubbligabubblor.map((bubble) => (
          <span
            key={bubble.id}
            className={styles.bubble}
            style={{
              left: bubble.left,
              animationDuration: bubble.duration,
              animationDelay: bubble.delay
            }}
          />
        ))}
      </div>

      <div className={styles.middle}>
        <h1 className={styles.title}>🍻 GARGASNEA 🍻</h1>

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

      <label className={styles.checkboxLabel}>
        <input type="checkbox" className={styles.checkbox} />
        LÄS TOS(det finns ingen)
      </label>

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
