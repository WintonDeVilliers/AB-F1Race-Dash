import { useMemo } from 'react';
import CircuitDrivers from './CircuitDrivers';
import styles from './CircuitTrack.module.css';

export default function CircuitTrack({ circuit, consultants, teams }) {
  const trackConfig = useMemo(() => {
    if (circuit === 'Monaco') {
      return {
        viewBox: "0 0 800 600",
        trackPath: "M 100 400 Q 150 350 200 400 Q 250 450 300 400 Q 400 300 500 350 Q 600 400 650 300 Q 700 200 650 150 Q 600 100 500 150 Q 400 200 300 150 Q 200 100 150 150 Q 100 200 100 300 L 100 400",
        length: "3.337 km",
        laps: 31,
        color: "#ff6b35"
      };
    } else {
      return {
        viewBox: "0 0 800 600", 
        trackPath: "M 150 450 Q 200 400 300 450 Q 400 500 500 450 Q 600 400 650 350 Q 700 300 650 250 Q 600 200 550 250 Q 500 300 450 250 Q 400 200 350 250 Q 300 300 250 250 Q 200 200 150 250 Q 100 300 150 350 L 150 450",
        length: "4.261 km", 
        laps: 28,
        color: "#e53e3e"
      };
    }
  }, [circuit]);

  return (
    <div className={styles.container}>
      <div className={styles.trackWrapper}>
        <svg 
          viewBox={trackConfig.viewBox} 
          className={styles.trackSvg}
        >
          {/* Track background */}
          <path
            d={trackConfig.trackPath}
            fill="none"
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth="40"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Racing line */}
          <path
            d={trackConfig.trackPath}
            fill="none"
            stroke={trackConfig.color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.racingLine}
          />
          
          {/* Track markers */}
          <circle cx="100" cy="400" r="8" fill="#22c55e" className={styles.startFinish} />
          <text x="100" y="430" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="bold">
            START/FINISH
          </text>
        </svg>
        
        <CircuitDrivers 
          consultants={consultants}
          trackPath={trackConfig.trackPath}
          viewBox={trackConfig.viewBox}
        />
      </div>
      
      <div className={styles.trackInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Track Length</span>
          <span className={styles.infoValue}>{trackConfig.length}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Race Laps</span>
          <span className={styles.infoValue}>{trackConfig.laps}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoLabel}>Active Cars</span>
          <span className={styles.infoValue}>{Math.min(consultants.length, 10)}</span>
        </div>
      </div>
    </div>
  );
}