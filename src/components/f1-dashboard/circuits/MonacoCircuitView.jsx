import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import TrackVisualization from './TrackVisualization';
import LiveTimingBoard from './LiveTimingBoard';
import CircuitInfoCard from './CircuitInfoCard';
import CircuitStatsCard from './CircuitStatsCard';
// FastestLapsCard removed during cleanup
import TrackConditionsCard from './TrackConditionsCard';
import TopPerformersCard from './TopPerformersCard';
import styles from './TrackVisualization.module.css';

const CircuitConfigs = {
  monaco: {
    length: "3.337 km",
    laps: "78 laps",
    corners: "19 corners",
    altitude: "7m above sea level"
  },
  kyalami: {
    length: "4.522 km", 
    laps: "70 laps",
    corners: "16 corners",
    altitude: "1,665m above sea level"
  }
};

export default function MonacoCircuitView({ data }) {
  const monacoConfig = CircuitConfigs.monaco;
  
  const monacoSupervisors = useMemo(() => {
    if (!data?.supervisors) return [];
    return data.supervisors
      .filter(supervisor => supervisor.circuit && supervisor.circuit.toLowerCase() === 'monaco')
      .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0));
  }, [data]);

  const monacoStats = useMemo(() => {
    if (!monacoSupervisors.length) return null;
    
    const totalTarget = monacoSupervisors.reduce((sum, supervisor) => sum + (supervisor.totalSalesTarget || supervisor.salesValTarget || 0), 0);
    const totalSales = monacoSupervisors.reduce((sum, supervisor) => sum + (supervisor.totalSalesActual || supervisor.totalSalesVal || 0), 0);
    const achievement = totalTarget > 0 ? (totalSales / totalTarget) * 100 : 0;
    
    return {
      totalTarget,
      totalSales,
      achievement,
      teamCount: monacoSupervisors.length,
      consultantCount: monacoSupervisors.reduce((sum, supervisor) => sum + (supervisor.teamSize || supervisor.team_size || 0), 0)
    };
  }, [monacoSupervisors]);

  const fastestLaps = useMemo(() => {
    return monacoSupervisors.slice(0, 3).map(supervisor => ({
      ...supervisor,
      dailyRate: (supervisor.totalSalesActual || supervisor.totalSalesVal || 0) / 31 // Assuming 31 days in month
    }));
  }, [monacoSupervisors]);

  if (!data || monacoSupervisors.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No Monaco Circuit Data Available</h2>
        <p>No supervisors assigned to Monaco circuit or no data available</p>
      </div>
    );
  }

  return (
    <section className={styles.circuitView}>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>🇲🇨 MONACO GRAND PRIX</h2>
          <p className={styles.heroSubtitle}>
            Premium performance tracking on the legendary Monaco circuit
          </p>
        </div>

        <div className={styles.circuitGrid}>
          {/* Track Map Section */}
          <div className={styles.trackSection}>
            <Card className={styles.trackCard}>
              <CardHeader className={styles.trackHeader}>
                <CardTitle>Circuit de Monaco</CardTitle>
                <div className={styles.circuitInfo}>
                  <span>🏁</span>
                  <span>{monacoConfig.length}</span>
                  <span>•</span>
                  <span>{monacoConfig.laps}</span>
                </div>
              </CardHeader>
              
              <CardContent className={styles.trackContent}>
                <TrackVisualization 
                  circuit="monaco"
                  teams={monacoSupervisors}
                  config={monacoConfig}
                  className={styles.monacoTrack}
                />
              </CardContent>
            </Card>

            {/* Live Timing Board */}
            <Card className={styles.timingCard}>
              <CardHeader className={styles.timingHeader}>
                <CardTitle>Live Timing - Monaco</CardTitle>
                <div className={styles.liveIndicator}>
                  <div className={styles.liveDot}></div>
                  <span>Live</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <LiveTimingBoard 
                  teams={monacoSupervisors.slice(0, 10)}
                  circuit="monaco"
                  data-testid="monaco-timing-board"
                />
              </CardContent>
            </Card>
          </div>

          {/* Monaco Statistics Sidebar */}
          <div className={styles.sidebarSection}>
            <CircuitInfoCard 
              circuit="monaco"
              config={monacoConfig}
              stats={monacoStats}
              topSupervisor={monacoSupervisors[0]}
            />

            <CircuitStatsCard 
              circuit="monaco"
              stats={monacoStats}
            />

            {/* FastestLapsCard removed during cleanup */}

            <TrackConditionsCard 
              circuit="monaco"
            />

            <TopPerformersCard 
              teams={monacoSupervisors.slice(0, 3)}
              title="Top Performers"
            />
          </div>
        </div>
      </div>
    </section>
  );
}