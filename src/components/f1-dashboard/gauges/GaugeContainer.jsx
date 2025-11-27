// --- UPDATED GaugeContainer.jsx ---
import GaugeDisplay from "./GaugeDisplay";
import GaugeMetrics from "./GaugeMetrics";
import styles from "./GaugeContainer.module.css";
import PointsChestView from "./PointsChestView";

export default function GaugeContainer({ data }) {
  if (!data || !data.companyMetrics) return null;

  const { companyMetrics } = data;

  const gaugeData = [
    {
      title: "Credit",
      currentValue: companyMetrics.totalSalesActual,
      targetValue: companyMetrics.totalSalesTarget,
      averageAchievement: companyMetrics.salesAchievement,
      valueType: "currency",
    },
    {
      title: "MyWorld",
      currentValue: companyMetrics.totalMyWorldFundedVol,
      targetValue: companyMetrics.totalMyWorldTarget,
      averageAchievement: companyMetrics.myWorldAchievement,
      valueType: "volume",
    },
    {
      title: "Funeral",
      currentValue: companyMetrics.totalFuneralVol,
      targetValue: companyMetrics.totalFuneralTarget,
      averageAchievement: companyMetrics.funeralAchievement,
      valueType: "volume",
    },
    {
      title: "Investments", // UPDATED
      currentValue: companyMetrics.totalInvestSales,
      targetValue: companyMetrics.totalInvestTarget,
      averageAchievement: companyMetrics.investAchievement,
      valueType: "currency",
    },
  ];

  return (
    <>
      <h2 className={`${styles.title} ${styles.Slackey}`}>
        PERFORMANCE TARGET OVERVIEW
      </h2>

      <div className={styles.container}>
        <div className={styles.gaugesGrid}>
          {gaugeData.map((g, i) => (
            <div key={i} className={styles.gaugeItem}>
              <GaugeDisplay
                title={g.title}
                currentValue={g.currentValue}
                targetValue={g.targetValue}
                averageAchievement={g.averageAchievement}
                valueType={g.valueType}
              />
            </div>
          ))}
        </div>
      </div>

      <h3 className={`${styles.title} ${styles.Slackey}`}>Championship Pool</h3>

      <div className={styles.container}>
        <PointsChestView pointsData={data.pointsData} />
      </div>
    </>
  );
}
