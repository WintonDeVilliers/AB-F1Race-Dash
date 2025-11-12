import GaugeDisplay from "./GaugeDisplay";
import GaugeMetrics from "./GaugeMetrics";
import styles from "./GaugeContainer.module.css";
import PointsChestView from "./PointsChestView";

export default function GaugeContainer({ data }) {
  if (!data || !data.companyMetrics) {
    return null;
  }

  const { companyMetrics } = data;

  // Debug logging to trace the data flow
  console.log("GaugeContainer received data:", data);
  console.log("GaugeContainer companyMetrics:", companyMetrics);
  console.log(
    "Sales values - Actual:",
    companyMetrics.totalSalesActual,
    "Target:",
    companyMetrics.totalSalesTarget
  );

  // Prepare data for 4 gauges
  const gaugeData = [
    {
      title: "Credit",
      currentValue:
        companyMetrics.totalSalesActual || companyMetrics.currentValue || 0,
      targetValue:
        companyMetrics.totalSalesTarget ||
        companyMetrics.targetValue ||
        240000000,
      averageAchievement:
        companyMetrics.salesAchievement ||
        companyMetrics.overallAchievement ||
        0,
    },
    {
      title: "Funeral",
      currentValue: companyMetrics.totalAppsActual || 0,
      targetValue: companyMetrics.totalAppsTarget || 0,
      averageAchievement: companyMetrics.appsAchievement || 0,
    },
    {
      title: "MyWorld",
      currentValue: companyMetrics.consultantPerformance || 0,
      targetValue: 100,
      averageAchievement: companyMetrics.consultantAchievement || 0,
    },
    {
      title: "Investments",
      currentValue: companyMetrics.supervisorPerformance || 0,
      targetValue: 100,
      averageAchievement: companyMetrics.supervisorAchievement || 0,
    },
  ];

  return (
    <>
      <h2 className={styles.title}>PERFORMANCE TARGET OVERVIEW</h2>
      <div className={styles.container}>
        <div className={styles.header}>
          {/* <p className={styles.subtitle}>
          Real Applications Performance Dashboard
        </p> */}
        </div>

        {/* Always use 2x2 grid, but adjust sizing based on screen size */}
        <div className={styles.gaugesGrid}>
          {gaugeData.map((gauge, index) => (
            <div key={index} className={styles.gaugeItem}>
              <GaugeDisplay
                title={gauge.title}
                currentValue={gauge.currentValue}
                targetValue={gauge.targetValue}
                averageAchievement={gauge.averageAchievement}
              />
            </div>
          ))}
        </div>

        {/* Uncomment if you still need the metrics section */}
        {/* <GaugeMetrics 
        totalConsultants={companyMetrics.totalConsultants}
        totalSupervisors={companyMetrics.totalSupervisors}
        totalRealApps={companyMetrics.totalAppsActual}
        totalTarget={companyMetrics.totalAppsTarget}
        totalSales={companyMetrics.totalSalesActual || companyMetrics.currentValue || 0}
        totalSalesTarget={companyMetrics.totalSalesTarget || companyMetrics.targetValue || 240000000}
        averageAchievement={companyMetrics.salesAchievement || companyMetrics.overallAchievement || 0}
      /> */}
      </div>

      <h3 className={styles.title}> Points REDEEMED Overview</h3>
      <div className={styles.container}>
        <PointsChestView />
      </div>
    </>
  );
}
