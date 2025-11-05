import { useMemo } from 'react';
import styles from './CircuitDrivers.module.css';

export default function CircuitDrivers({ consultants, trackPath, viewBox }) {
  const driverPositions = useMemo(() => {
    if (!consultants || consultants.length === 0) return [];
    
    // Take top 10 performers to show on track
    const topPerformers = consultants.slice(0, 10);
    
    return topPerformers.map((consultant, index) => {
      // Calculate position along track based on performance rank
      const progressPercentage = (index + 1) / topPerformers.length;
      const angle = progressPercentage * 360; // Distribute around track
      
      // Calculate position on track (simplified circular positioning)
      const centerX = 400; // Center of viewBox
      const centerY = 300;
      const radius = 150;
      
      const x = centerX + radius * Math.cos((angle - 90) * Math.PI / 180);
      const y = centerY + radius * Math.sin((angle - 90) * Math.PI / 180);
      
      const achievementRate = consultant.salesAchievement || consultant.achievementRate || 0;
      const consultantName = consultant.consultantName || consultant.name || 'Unknown';
      
      const performanceColor = achievementRate >= 120 ? '#22c55e' :
                               achievementRate >= 100 ? '#3b82f6' :
                               achievementRate >= 80 ? '#f59e0b' :
                               achievementRate >= 60 ? '#f97316' : '#ef4444';
      
      return {
        id: consultant.id,
        name: consultantName,
        position: index + 1,
        achievementRate: achievementRate,
        x,
        y,
        color: performanceColor,
        speed: Math.max(achievementRate / 10, 1) // Animation speed based on performance
      };
    });
  }, [consultants, trackPath, viewBox]);

  return (
    <div className={styles.container}>
      <svg 
        viewBox={viewBox}
        className={styles.driversSvg}
      >
        {driverPositions.map((driver, index) => (
          <g key={driver.id} className={styles.driverGroup}>
            {/* Car icon */}
            <circle
              cx={driver.x}
              cy={driver.y}
              r="8"
              fill={driver.color}
              stroke="#ffffff"
              strokeWidth="2"
              className={styles.carIcon}
              style={{
                animationDelay: `${index * 0.2}s`,
                animationDuration: `${4 / driver.speed}s`
              }}
            />
            
            {/* Position number */}
            <text
              x={driver.x}
              y={driver.y + 2}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="8"
              fontWeight="bold"
              className={styles.positionText}
            >
              {driver.position}
            </text>
            
            {/* Driver name (visible on hover) */}
            <text
              x={driver.x}
              y={driver.y - 15}
              textAnchor="middle"
              fill="#ffffff"
              fontSize="10"
              fontWeight="600"
              className={styles.driverName}
            >
              {driver.name.split(' ')[0]}
            </text>
            
            {/* Performance indicator */}
            <text
              x={driver.x}
              y={driver.y + 25}
              textAnchor="middle"
              fill={driver.color}
              fontSize="9"
              fontWeight="bold"
              className={styles.performanceText}
            >
              {driver.achievementRate.toFixed(0)}%
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}