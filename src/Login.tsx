import styles from './login.module.css';

//Huvudsida för inloggning / skapa kontos
function Login() {
  return (
    <div className={styles.page}>
      <div className={styles.middle}>
        <h1 className={styles.title}>GARGASNEA🍻</h1>

        <SignupPage/>

      </div>
    </div>
  );
}

//För existerande användare
function LoginPage() {
  return (
    <>
        <TextField inputLabel={'Email'} placeholderText={' gargasnea@gmail.com'}/>
        <TextField inputLabel={'Lösenord'} placeholderText={' ******'} />

        <Buttons textLabel={'Logga in'}/>
        <Buttons textLabel={'Google login'}/>

        <p className={styles.signuptext}>Inget konto? skapa ett <span style={{ textDecoration: 'underline' }}>här</span></p>
    </>
  );
}

//För nya användare
function SignupPage() {
  return (
    <>
      <TextField inputLabel={'Användarnamn'} placeholderText={' joe mama'}/>
      <TextField inputLabel={'Email'} placeholderText={' gargasnea@gmail.com'}/>
      <TextField inputLabel={'Lösenord'} placeholderText={' ******'} />
      <Buttons textLabel={'Skapa konto'}/>
      <p className={styles.signuptext}>Har du redan ett konto? Klicka <span style={{ textDecoration: 'underline' }}>här</span></p>
      <p className={styles.signuptext}>Glömt lösenordet? Klicka <span style={{ textDecoration: 'underline' }}>här</span></p>
    </>
  );
}

//user input för inloggning-N
function TextField({ inputLabel, placeholderText }) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{inputLabel}</label>
      <input className={styles.input} placeholder={placeholderText} />
    </div>
  );
}

//övriga knappar
function Buttons({textLabel}) {
  return (
    <button className={styles.button}>{textLabel}</button>
  );
}

export default Login;
