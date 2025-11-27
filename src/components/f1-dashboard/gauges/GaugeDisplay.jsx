// --- UPDATED GaugeDisplay.jsx ---
import { useMemo } from "react";
import styles from "./GaugeDisplay.module.css";

export default function GaugeDisplay({
  currentValue,
  targetValue,
  averageAchievement,
  title,
  valueType = "currency", // "currency" or "volume"
}) {
  const gaugeData = useMemo(() => {
    const safeCurrent =
      typeof currentValue === "number"
        ? currentValue
        : parseFloat(currentValue) || 0;
    const safeTarget =
      typeof targetValue === "number"
        ? targetValue
        : parseFloat(targetValue) || 0;

    const percentage = safeTarget > 0 ? (safeCurrent / safeTarget) * 100 : 0;
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);

    // Needle angle (semi-circle from -90° to +90°)
    const needleAngle = -90 + (clampedPercentage / 100) * 180;

    // Format helper for currency to intelligently choose M / k / full value
    const formatCurrencySmart = (val) => {
      const n = Math.abs(val);
      if (n >= 1000000) {
        return `R${(val / 1000000).toFixed(1)}M`;
      } else if (n >= 1000) {
        return `R${(val / 1000).toFixed(1)}k`;
      } else {
        // show full number with thousand separators
        return `R${Math.round(val).toLocaleString()}`;
      }
    };

    let currentFormatted, targetFormatted;

    if (valueType === "currency") {
      currentFormatted = formatCurrencySmart(safeCurrent);
      targetFormatted = formatCurrencySmart(safeTarget);
    } else {
      // Volume / counts — display with locale separators
      currentFormatted = Math.round(safeCurrent).toLocaleString();
      targetFormatted = Math.round(safeTarget).toLocaleString();
    }

    return {
      percentage: clampedPercentage,
      needleAngle,
      currentFormatted,
      targetFormatted,
      currentValue: safeCurrent,
      targetValue: safeTarget,
    };
  }, [currentValue, targetValue, valueType]);

  return (
    <div className={styles.container}>
      {title && (
        <div className={`${styles.gaugeTitle} ${styles.Slackey}`}>{title}</div>
      )}

      <div className={styles.gaugeWrapper}>
        <svg viewBox="0 0 200 120" className={styles.gaugeSvg}>
          <defs>
            <linearGradient
              id="gaugeGradient"
              x1="0%"
              y1="100%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#00ffff" />
              <stop offset="50%" stopColor="#ffff00" />
              <stop offset="100%" stopColor="#ff0000" />
            </linearGradient>
          </defs>

          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Tick marks */}
          {[...Array(20)].map((_, i) => {
            const angle = -90 + i * 18;
            const x1 = 100 + 72 * Math.cos((angle * Math.PI) / 180);
            const y1 = 100 + 72 * Math.sin((angle * Math.PI) / 180);
            const x2 = 100 + 80 * Math.cos((angle * Math.PI) / 180);
            const y2 = 100 + 80 * Math.sin((angle * Math.PI) / 180);
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
            );
          })}

          {/* Progress arc (gradient stroke) */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth="10"
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
            stroke="#fff200ff"
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
          {(
            averageAchievement ??
            (gaugeData.targetValue > 0
              ? (gaugeData.currentValue / gaugeData.targetValue) * 100
              : 0)
          ).toFixed(1)}
          %
        </div>
      </div>
    </div>
  );
}
