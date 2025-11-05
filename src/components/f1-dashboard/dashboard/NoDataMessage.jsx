import styles from './NoDataMessage.module.css';

export default function NoDataMessage({ message }) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>🏁</div>
        <h2 className={styles.title}>No Racing Data Available</h2>
        <p className={styles.message}>
          {message || 'Book1.xlsx not found in public folder'}
        </p>
        <div className={styles.instructions}>
          <p>To get started:</p>
          <ol>
            <li>Place your Excel file in the <code>/public/Book1.xlsx</code> location</li>
            <li>The dashboard will automatically detect and process the data</li>
            <li>File is checked every 30 seconds for updates</li>
          </ol>
        </div>
      </div>
    </div>
  );
}