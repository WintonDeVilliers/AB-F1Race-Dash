// --- CLEAN PATCHED FILE (ONLY animated row transitions added) ---
import styles from "./TeamRacingView.module.css";

export default function TeamRacingView({
  circuit,
  supervisors,
  consultants,
  allSupervisors = [],
}) {
  const pointsAllocation = {
    creditLoansPointsAllocation: "433",
    creditLoansPointsRemainder: "",
    creditCardsPointsAllocation: "157",
    creditCardsPointsRemainder: "",
    myWorldPointsAllocation: "800",
    myWorldPointsRemainder: "",
    funeralCoverPointsAllocation: "794",
    funeralCoverPointsRemainder: "",
    InvestmentsPointsAllocation: "930",
    InvestmentsPointsRemainder: "",
  };

  const POINTS_TARGET =
    parseFloat(pointsAllocation.creditLoansPointsAllocation || 0) +
    parseFloat(pointsAllocation.creditCardsPointsAllocation || 0) +
    parseFloat(pointsAllocation.myWorldPointsAllocation || 0) +
    parseFloat(pointsAllocation.funeralCoverPointsAllocation || 0) +
    parseFloat(pointsAllocation.InvestmentsPointsAllocation || 0);

  const calculatePoints = (sup) => sup.points?.totalPoints || 0;

  const getPointsBreakdown = (sup) => ({
    creditPoints: sup.points?.creditPoints || 0,
    myWorldPoints: sup.points?.myWorldPoints || 0,
    policyPoints: sup.points?.funeralPoints || 0,
    investmentPoints: sup.points?.investmentPoints || 0,
  });

  const calculateAchievement = (sup) => {
    const pts = calculatePoints(sup);
    return Math.min((pts / POINTS_TARGET) * 100, 100);
  };

  const getPerformanceColor = (ach) => {
    if (ach >= 100) return "#22c55e";
    if (ach >= 80) return "#3b82f6";
    if (ach >= 60) return "#f59e0b";
    if (ach >= 40) return "#f97316";
    return "#ef4444";
  };

  const getSalesData = (sup) => {
    const salesActual =
      sup.salesActual ||
      sup.totalSalesActual ||
      sup.TotalSalesVal ||
      sup.total_sales ||
      0;

    const salesTarget =
      sup.salesTarget ||
      sup.totalSalesTarget ||
      sup.SalesValTarget ||
      sup.team_target ||
      1;

    return { salesActual, salesTarget };
  };

  const getSupervisorName = (sup) =>
    sup.supervisorName || sup["Supervisor Name"] || sup.name || "Unknown";

  const getTeamSize = (sup) => sup.teamSize || sup.team_size || 0;

  // --------------------------------
  // ORIGINAL RacingProgressBar (UNTouched)
  // --------------------------------
  const RacingProgressBar = ({ supervisor }) => {
    const achievement = calculateAchievement(supervisor);
    const totalPoints = calculatePoints(supervisor);
    const b = getPointsBreakdown(supervisor);

    const pct = {
      credit: totalPoints > 0 ? (b.creditPoints / totalPoints) * 100 : 0,
      myWorld: totalPoints > 0 ? (b.myWorldPoints / totalPoints) * 100 : 0,
      policies: totalPoints > 0 ? (b.policyPoints / totalPoints) * 100 : 0,
      investments:
        totalPoints > 0 ? (b.investmentPoints / totalPoints) * 100 : 0,
    };

    const colors = {
      credit: "#10bb00ff",
      myWorld: "#004ecdff",
      policies: "#8b5cf6",
      investments: "#f59e0b",
    };

    return (
      <div className={styles.racingProgressContainer}>
        <div className={styles.trackContainer}>
          <div className={styles.performanceTrack}>
            <div className={styles.trackBackground} />

            <div
              className={styles.progressFill}
              style={{ width: `${achievement}%` }}
            >
              {pct.credit > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${pct.credit}%`,
                    backgroundColor: colors.credit,
                  }}
                />
              )}

              {pct.myWorld > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${pct.myWorld}%`,
                    backgroundColor: colors.myWorld,
                    left: `${pct.credit}%`,
                  }}
                />
              )}

              {pct.policies > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${pct.policies}%`,
                    backgroundColor: colors.policies,
                    left: `${pct.credit + pct.myWorld}%`,
                  }}
                />
              )}

              {pct.investments > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${pct.investments}%`,
                    backgroundColor: colors.investments,
                    left: `${pct.credit + pct.myWorld + pct.policies}%`,
                  }}
                />
              )}
            </div>

            <div
              className={styles.vehiclePosition}
              style={{ left: `${achievement}%` }}
            >
              <span className={styles.vehicleIcon}>🏎️</span>
            </div>
          </div>
        </div>

        <div className={styles.colorLegend}>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors.credit }}
              />
              <span className={styles.legendText}>Credit - </span>
              <span className={styles.legendValue}>
                {b.creditPoints.toFixed(1)} pts
              </span>
            </div>

            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors.myWorld }}
              />
              <span className={styles.legendText}>MyWorld - </span>
              <span className={styles.legendValue}>
                {b.myWorldPoints.toFixed(1)} pts
              </span>
            </div>

            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors.policies }}
              />
              <span className={styles.legendText}>Funeral - </span>
              <span className={styles.legendValue}>
                {b.policyPoints.toFixed(1)} pts
              </span>
            </div>

            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors.investments }}
              />
              <span className={styles.legendText}>Investments - </span>
              <span className={styles.legendValue}>
                {b.investmentPoints.toFixed(1)} pts
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // --------------------------------------------
  // CHAMPIONSHIP TABLE (ONLY animation added)
  // --------------------------------------------
  if (circuit === "Championship" && allSupervisors.length > 0) {
    const ranked = allSupervisors
      .map((s) => ({
        ...s,
        points: calculatePoints(s),
        achievement: calculateAchievement(s),
      }))
      .sort((a, b) => b.points - a.points);

    return (
      <div className={styles.container}>
        <div className={styles.championshipTable}>
          <div className={styles.tableHeader}>
            <div>Position</div>
            <div>Driver (Supervisor)</div>
            <div>Circuit</div>
            <div>Team Size</div>
            <div>Points</div>
            <div>Achievement</div>
            <div>Sales</div>
            <div>Target</div>
          </div>

          <div className={styles.tableBody}>
            {ranked.map((sup, i) => {
              const name = getSupervisorName(sup);
              const teamSize = getTeamSize(sup);
              const { salesActual, salesTarget } = getSalesData(sup);

              return (
                <div
                  key={i}
                  className={`${styles.tableRow} ${styles.rowAnimate}`}
                >
                  <div>{i + 1}</div>
                  <div>
                    <div className={styles.driverName}>{name}</div>
                    <div className={styles.teamMeta}>
                      Team Size: {teamSize} | Points: {sup.points.toFixed(1)}
                    </div>
                  </div>

                  <div>{sup.circuit}</div>
                  <div>{teamSize}</div>
                  <div>{sup.points.toFixed(1)}</div>

                  <div style={{ color: getPerformanceColor(sup.achievement) }}>
                    {sup.achievement.toFixed(1)}%
                  </div>

                  <div>R{(salesActual / 1_000_000).toFixed(1)}M</div>
                  <div>R{(salesTarget / 1_000_000).toFixed(1)}M</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // --------------------------------------------
  // CIRCUIT MODE (ONLY animation added)
  // --------------------------------------------
  return (
    <div className={styles.container}>
      <div className={styles.racingBoard}>
        {(supervisors || []).map((sup, i) => {
          const name = getSupervisorName(sup);
          const { salesActual, salesTarget } = getSalesData(sup);

          return (
            <div
              key={i}
              className={`${styles.driverRowGrid} ${styles.rowAnimate}`}
            >
              <div className={styles.positionSection}>
                <div className={styles.positionNumber}>{i + 1}</div>
              </div>

              <div className={styles.driverInfo}>
                <div className={styles.driverName}>{name}</div>
                <div className={styles.legendText_alt}>
                  Target: R{(salesTarget / 1_000_000).toFixed(1)}M
                </div>
              </div>

              <RacingProgressBar supervisor={sup} />

              <div className={styles.salesData}>
                <div className={styles.altText}>
                  Total Points: {calculatePoints(sup).toFixed(1)}
                </div>
                <br />
                <div>Credit Value R{(salesActual / 1_000_000).toFixed(1)}M</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.finishLine}>
        <div className={styles.finishText}>
          🏁 FINISH LINE - {POINTS_TARGET} POINTS 🏁
        </div>
      </div>

      {(!supervisors || supervisors.length === 0) && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🏎️</div>
          <p className={styles.emptyText}>No drivers on {circuit} circuit</p>
        </div>
      )}
    </div>
  );
}
