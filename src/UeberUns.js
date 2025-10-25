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
            GlowTrack ist eine intuitive App, die speziell für Frauen zwischen
            18 und 35 Jahren entwickelt wurde, die ihr persönliches
            Wohlfühlgewicht erreichen, halten oder verändern möchten. Unser Team
            besteht aus erfahrenen Expertinnen und Experten aus den Bereichen
            Ernährungswissenschaft, Psychologie, Fitness und App-Entwicklung.
          </p>
          <p>
            Gemeinsam kombinieren wir fundiertes Fachwissen mit modernster
            Technologie, um Frauen auf ihrem individuellen Weg zu begleiten,
            ganz ohne Druck, sondern mit Motivation und einfacher Handhabung.
          </p>
          <h2>Unsere Mission</h2>
          <p>
            Unsere Mission bei GlowTrack ist es, Frauen zu unterstützen, ihr
            ganz persönliches Zielgewicht zu finden und sich in ihrem Körper
            rundum wohlzufühlen. Wir glauben daran, dass jede Frau das Recht
            hat, sich selbstbewusst und zufrieden zu fühlen, unabhängig von
            äußeren Vorgaben.
          </p>
          <p>
            GlowTrack bietet eine unkomplizierte und motivierende Plattform, die
            dabei hilft, Fortschritte sichtbar zu machen und den eigenen Weg zum
            Wohlfühlgewicht nachhaltig zu begleiten.
          </p>
        </div>
      </div>
    </>
  );
}
