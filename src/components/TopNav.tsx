import Notifications from './Notifications';
import ProfileButton from './ProfileButton';
import Title from './Title';
import styles from './TopNav.module.css';

function TopNav() {
  return (
    <div className={styles.navBar}>
      {' '}
      {/*Flex display-direction row*/}
      <Notifications />
      <Title />
      <ProfileButton />
    </div>
  );
}

export default TopNav;
