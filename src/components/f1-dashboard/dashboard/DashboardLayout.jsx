import DashboardHeader from './DashboardHeader';
import styles from './DashboardLayout.module.css';

export default function DashboardLayout({ children, activeTab, setActiveTab }) {
  return (
    <div className={styles.layout}>
      <DashboardHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}