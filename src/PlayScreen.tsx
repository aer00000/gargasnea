import type { CSSProperties } from 'react';

import foam from './assets/foam.svg';
import styles from './PlayScreen.module.css';

const BUBBLE_COUNT = 75;

const BUBBLES = Array.from({ length: BUBBLE_COUNT }, (_, index) => ({
  id: `bubble-${String(index)}`,
  left: `${(Math.random() * 100).toFixed(1)}%`,
  size: `${(0.25 + Math.random() * 0.5).toFixed(2)}vw`,
  duration: `${(2.2 + Math.random() * 1.8).toFixed(2)}s`,
  delay: `${(Math.random() * 2.5).toFixed(2)}s`
}));

function PlayScreen() {
  return (
    <div className={styles.mainScreen}>
      <div className={styles.buttonContainer}>
        <button className={`${styles.lobbyButton} ${styles.hostButton}`}>
          Host Lobby
        </button>
        <button className={`${styles.lobbyButton} ${styles.hostButton}`}>
          Join Lobby
        </button>
      </div>
      <div className={styles.liquid}>
        <img src={foam} className={styles.foam} />
        <div className={styles.beer} />
        {BUBBLES.map((bubble) => (
          <span
            key={bubble.id}
            className={styles.bubble}
            style={
              {
                '--left': bubble.left,
                '--size': bubble.size,
                '--duration': bubble.duration,
                '--delay': bubble.delay
              } as CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PlayScreen;
