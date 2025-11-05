import CircuitTrack from './CircuitTrack';
import CircuitInfo from './CircuitInfo';
import LiveTiming from './LiveTiming';
import styles from './CircuitContainer.module.css';

export default function CircuitContainer({ data, circuit = 'Monaco' }) {
  if (!data || !data.supervisors || !data.consultants) {
    return null;
  }

  // Filter supervisors (drivers) by circuit
  const circuitSupervisors = data.supervisors.filter(supervisor => 
    supervisor.circuit === circuit
  );

  // Get all consultants (pit crew) for this circuit and sort by performance
  const circuitConsultants = data.consultants
    .filter(consultant => consultant.circuit === circuit)
    .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0));

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {circuit === 'Monaco' ? 'CIRCUIT DE MONACO' : 'KYALAMI GRAND PRIX CIRCUIT'}
        </h2>
        <p className={styles.subtitle}>
          Team Racing Championship • {circuit} Division
        </p>
      </div>

      <div className={styles.layout}>
        <div className={styles.trackSection}>
          <CircuitTrack 
            circuit={circuit}
            consultants={circuitConsultants}
            supervisors={circuitSupervisors}
          />
        </div>
        
        <div className={styles.infoSection}>
          <CircuitInfo 
            circuit={circuit}
            teams={circuitSupervisors}
            consultants={circuitConsultants}
          />
        </div>
      </div>

      <div className={styles.timingSection}>
        <LiveTiming 
          circuit={circuit}
          consultants={circuitConsultants}
        />
      </div>
    </div>
  );
}