import styles from "../styles/modules/Header.module.css";

const Header = () => {
  return (
    <div className={styles.container}>
      <img src="mailchimp.png" alt="Mailchimp" className={styles.logo} />
      <h2 className={styles.headline}>&nbsp;Chimpy Comments&nbsp;</h2>
    </div>
  );
};

export default Header;
