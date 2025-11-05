import { useMemo } from "react";
import styles from "./GaugeDisplay.module.css";

export default function GaugeDisplay({
  currentValue,
  targetValue,
  averageAchievement,
  title,
}) {
  const gaugeData = useMemo(() => {
    const percentage = targetValue > 0 ? (currentValue / targetValue) * 100 : 0;
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    // Calculate needle angle (semi-circle from -90° to +90°)
    const needleAngle = -90 + (clampedPercentage / 100) * 180;

    return {
      percentage: clampedPercentage,
      needleAngle,
      currentFormatted: `R${(currentValue / 1000000).toFixed(1)}M`,
      targetFormatted: `R${(targetValue / 1000000).toFixed(1)}M`,
      currentValue: currentValue,
      targetValue: targetValue,
    };
  }, [currentValue, targetValue]);

  return (
    <div className={styles.container}>
      {title && <div className={styles.gaugeTitle}>{title}</div>}

      <div className={styles.gaugeWrapper}>
        <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Progress arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ff6b35"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={`${gaugeData.percentage * 2.51} 251`}
            className={styles.progressArc}
          />

          {/* Center dot */}
          <circle cx="100" cy="100" r="4" fill="#ffffff" />

          {/* Needle */}
          <line
            x1="100"
            y1="100"
            x2="100"
            y2="30"
            stroke="#e53e3e"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${gaugeData.needleAngle} 100 100)`}
            className={styles.needle}
          />
        </svg>

        {/* Current and Target values */}
        <div className={styles.gaugeValues}>
          <div className={styles.valueDisplay}>
            <span className={styles.valueLabel}>Current</span>
            <span className={styles.valueAmount}>
              {gaugeData.currentFormatted}
            </span>
          </div>
          <div className={styles.valueDisplay}>
            <span className={styles.valueLabel}>Target</span>
            <span className={styles.valueAmount}>
              {gaugeData.targetFormatted}
            </span>
          </div>
        </div>
      </div>

      {/* Achievement below the values */}
      <div className={styles.achievement}>
        <div className={styles.achievementLabel}>Achieved</div>
        <div className={styles.achievementValue}>
          {averageAchievement?.toFixed(1) || "0.0"}%
        </div>
      </div>
    </div>
  );
}
