import styles from './UeberUns.module.css';
import SEO from './SEO';

export default function UeberUns() {
  return (
    <>
      <SEO
        title="Über uns – GlowTrack, deine Gewichtsverlaufs‑App"
        description="Behalte dein Gewicht mühelos im Blick mit GlowTrack. Lern jetzt mehr über unser Team und unsere Ziele."
        name="GlowTrack"
        type="website"
      />
      <div className={styles.card}>
        <div className={styles.cardContent}>
          <h1>Über uns</h1>
          <h2>Wer wir sind</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <h2>Unsere Mission</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
      </div>
    </>
  );
}
