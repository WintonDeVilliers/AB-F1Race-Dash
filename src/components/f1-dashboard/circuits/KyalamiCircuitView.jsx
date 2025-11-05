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

export default function KyalamiCircuitView({ data }) {
  const kyalamiConfig = CircuitConfigs.kyalami;
  
  const kyalamiSupervisors = useMemo(() => {
    if (!data?.supervisors) return [];
    return data.supervisors
      .filter(supervisor => supervisor.circuit && supervisor.circuit.toLowerCase() === 'kyalami')
      .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0));
  }, [data]);

  const kyalamiStats = useMemo(() => {
    if (!kyalamiSupervisors.length) return null;
    
    const totalTarget = kyalamiSupervisors.reduce((sum, supervisor) => sum + (supervisor.totalSalesTarget || supervisor.salesValTarget || 0), 0);
    const totalSales = kyalamiSupervisors.reduce((sum, supervisor) => sum + (supervisor.totalSalesActual || supervisor.totalSalesVal || 0), 0);
    const achievement = totalTarget > 0 ? (totalSales / totalTarget) * 100 : 0;
    
    return {
      totalTarget,
      totalSales,
      achievement,
      teamCount: kyalamiSupervisors.length,
      consultantCount: kyalamiSupervisors.reduce((sum, supervisor) => sum + (supervisor.teamSize || supervisor.team_size || 0), 0)
    };
  }, [kyalamiSupervisors]);

  const fastestSectors = useMemo(() => {
    const shuffled = [...kyalamiSupervisors].sort(() => Math.random() - 0.5);
    return [
      { sector: 'Sector 1', leader: shuffled[0] },
      { sector: 'Sector 2', leader: shuffled[1] },
      { sector: 'Sector 3', leader: shuffled[2] }
    ].filter(item => item.leader);
  }, [kyalamiSupervisors]);

  if (!data || kyalamiSupervisors.length === 0) {
    return (
      <div className={styles.emptyState}>
        <h2>No Kyalami Circuit Data Available</h2>
        <p>No supervisors assigned to Kyalami circuit or no data available</p>
      </div>
    );
  }

  return (
    <section className={styles.circuitView}>
      <div className={styles.container}>
        {/* Hero Section */}
        <div className={styles.hero}>
          <h2 className={styles.heroTitle}>🇿🇦 KYALAMI GRAND PRIX</h2>
          <p className={styles.heroSubtitle}>
            High-altitude performance on South Africa's legendary racing circuit
          </p>
        </div>

        <div className={styles.circuitGrid}>
          {/* Track Map Section */}
          <div className={styles.trackSection}>
            <Card className={styles.trackCard}>
              <CardHeader className={styles.trackHeader}>
                <CardTitle>Kyalami Grand Prix Circuit</CardTitle>
                <div className={styles.circuitInfo}>
                  <span>🏁</span>
                  <span>{kyalamiConfig.length}</span>
                  <span>•</span>
                  <span>{kyalamiConfig.altitude}</span>
                </div>
              </CardHeader>
              
              <CardContent className={styles.trackContent}>
                <TrackVisualization 
                  circuit="kyalami"
                  teams={kyalamiSupervisors}
                  config={kyalamiConfig}
                  className={styles.kyalamiTrack}
                />
              </CardContent>
            </Card>

            {/* Live Timing Board */}
            <Card className={styles.timingCard}>
              <CardHeader className={styles.timingHeader}>
                <CardTitle>Live Timing - Kyalami</CardTitle>
                <div className={styles.liveIndicator}>
                  <div className={styles.liveDot}></div>
                  <span>Live</span>
                </div>
              </CardHeader>
              
              <CardContent>
                <LiveTimingBoard 
                  teams={kyalamiSupervisors.slice(0, 10)}
                  circuit="kyalami"
                  data-testid="kyalami-timing-board"
                />
              </CardContent>
            </Card>
          </div>

          {/* Kyalami Statistics Sidebar */}
          <div className={styles.sidebarSection}>
            <CircuitInfoCard 
              circuit="kyalami"
              config={kyalamiConfig}
              stats={kyalamiStats}
              topSupervisor={kyalamiSupervisors[0]}
            />

            <CircuitStatsCard 
              circuit="kyalami"
              stats={kyalamiStats}
            />

            {/* FastestLapsCard removed during cleanup */}

            <TrackConditionsCard 
              circuit="kyalami"
            />

            <TopPerformersCard 
              teams={fastestSectors}
              title="Fastest Sectors"
              isKyalami={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
}