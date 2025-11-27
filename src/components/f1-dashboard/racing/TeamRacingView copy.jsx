import styles from "./TeamRacingView.module.css";

export default function TeamRacingView({
  circuit,
  supervisors,
  consultants,
  allSupervisors = [],
}) {
  // Calculate total points target from allocation
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

  // Calculate total points for a supervisor (now from pre-calculated data)
  const calculatePoints = (supervisor) => {
    return supervisor.points?.totalPoints || 0;
  };

  // Get points breakdown from supervisor data
  const getPointsBreakdown = (supervisor) => {
    return {
      creditPoints: supervisor.points?.creditPoints || 0, // Combined loans + credit cards
      myWorldPoints: supervisor.points?.myWorldPoints || 0,
      policyPoints: supervisor.points?.funeralPoints || 0,
      investmentPoints: supervisor.points?.investmentPoints || 0,
    };
  };

  // Calculate achievement percentage based on points
  const calculateAchievement = (supervisor) => {
    const totalPoints = calculatePoints(supervisor);
    return Math.min((totalPoints / POINTS_TARGET) * 100, 100);
  };

  // Calculate contribution percentages for each category
  const calculateContributions = (supervisor) => {
    const totalPoints = calculatePoints(supervisor);
    if (totalPoints === 0)
      return { credit: 0, myWorld: 0, policies: 0, investments: 0 };

    const breakdown = getPointsBreakdown(supervisor);

    return {
      credit: (breakdown.creditPoints / totalPoints) * 100,
      myWorld: (breakdown.myWorldPoints / totalPoints) * 100,
      policies: (breakdown.policyPoints / totalPoints) * 100,
      investments: (breakdown.investmentPoints / totalPoints) * 100,
    };
  };

  const getPerformanceColor = (achievement) => {
    if (achievement >= 100) return "#22c55e";
    if (achievement >= 80) return "#3b82f6";
    if (achievement >= 60) return "#f59e0b";
    if (achievement >= 40) return "#f97316";
    return "#ef4444";
  };

  const getStatusBadge = (achievement) => {
    if (achievement >= 100) return { text: "100%+", color: "#22c55e" };
    if (achievement >= 80)
      return { text: `${achievement.toFixed(1)}%`, color: "#3b82f6" };
    if (achievement >= 60)
      return { text: `${achievement.toFixed(1)}%`, color: "#f59e0b" };
    if (achievement >= 40)
      return { text: `${achievement.toFixed(1)}%`, color: "#f97316" };
    return { text: `${achievement.toFixed(1)}%`, color: "#ef4444" };
  };

  // Single unified racing progress bar
  const RacingProgressBar = ({ supervisor }) => {
    const achievement = calculateAchievement(supervisor);
    const points = calculatePoints(supervisor);
    const breakdown = getPointsBreakdown(supervisor);

    const totalPoints = points;

    // Calculate percentages of total points for each category
    const creditPercentage =
      totalPoints > 0 ? (breakdown.creditPoints / totalPoints) * 100 : 0;
    const myWorldPercentage =
      totalPoints > 0 ? (breakdown.myWorldPoints / totalPoints) * 100 : 0;
    const policyPercentage =
      totalPoints > 0 ? (breakdown.policyPoints / totalPoints) * 100 : 0;
    const investmentPercentage =
      totalPoints > 0 ? (breakdown.investmentPoints / totalPoints) * 100 : 0;

    // Calculate sales achievement percentage
    const { salesActual, salesTarget } = getSalesData(supervisor);
    const salesAchievement =
      salesTarget > 0 ? (salesActual / salesTarget) * 100 : 0;

    const colors = {
      credit: "#3b82f6", // Blue (combined loans + credit cards)
      myWorld: "#f59e0b", // Yellow
      policies: "#8b5cf6", // Purple
      investments: "#22c55e", // Green
      creditCombined: "linear-gradient(135deg, #3b82f6 5%, #22c55e 90%)",
    };

    return (
      <div className={styles.racingProgressContainer}>
        {/* DUAL PERFORMANCE BADGES - ABOVE THE PROGRESS BAR */}
        <div className={styles.dualBadges}>
          {/* Points Achievement Badge */}
          <div
            className={styles.performanceBadge}
            style={{
              backgroundColor: getPerformanceColor(achievement),
            }}
          >
            {achievement.toFixed(1)}% Points - {points.toFixed(1)}
          </div>

          {/* Credit Combined Achievement Badge (Sales Target) */}
          <div
            className={styles.creditCombinedBadge}
            style={{
              backgroundImage: colors.creditCombined,
            }}
          >
            {salesAchievement.toFixed(1)}% Combined-Sales-Target
          </div>
        </div>

        {/* SINGLE UNIFIED PROGRESS BAR */}
        <div className={styles.trackContainer}>
          <div className={styles.performanceTrack}>
            {/* Background for remaining track */}
            <div className={styles.trackBackground} />

            {/* Color-coded progress - ONLY ONE BAR */}
            <div
              className={styles.progressFill}
              style={{ width: `${achievement}%` }}
            >
              {/* Credit segment (combined loans + cards) */}
              {creditPercentage > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${creditPercentage}%`,
                    backgroundColor: colors.credit,
                  }}
                />
              )}

              {/* MyWorld segment */}
              {myWorldPercentage > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${myWorldPercentage}%`,
                    backgroundColor: colors.myWorld,
                    left: `${creditPercentage}%`,
                  }}
                />
              )}

              {/* Policies segment */}
              {policyPercentage > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${policyPercentage}%`,
                    backgroundColor: colors.policies,
                    left: `${creditPercentage + myWorldPercentage}%`,
                  }}
                />
              )}

              {/* Investments segment */}
              {investmentPercentage > 0 && (
                <div
                  className={styles.progressSegment}
                  style={{
                    width: `${investmentPercentage}%`,
                    backgroundColor: colors.investments,
                    left: `${
                      creditPercentage + myWorldPercentage + policyPercentage
                    }%`,
                  }}
                />
              )}
            </div>

            {/* Car positioned at achievement percentage (POINTS BASED) */}
            <div
              className={styles.vehiclePosition}
              style={{
                left: `${achievement}%`,
              }}
            >
              <span className={styles.vehicleIcon}>🏎️</span>
            </div>
          </div>
        </div>

        {/* Color Legend - Shows contribution breakdown */}
        <div className={styles.colorLegend}>
          <div className={styles.legendTitle}>Points Breakdown:</div>
          <div className={styles.legendItems}>
            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors.credit }}
              />
              <span className={styles.legendText}>Credit Cards & Loans</span>
              <span className={styles.legendValue}>
                {breakdown.creditPoints.toFixed(1)} pts (
                {creditPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors.myWorld }}
              />
              <span className={styles.legendText}>MyWorld</span>
              <span className={styles.legendValue}>
                {breakdown.myWorldPoints.toFixed(1)} pts (
                {myWorldPercentage.toFixed(1)}%)
              </span>
            </div>
            <div className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: colors.policies }}
              />
              <span className={styles.legendText}>Policies</span>
              <span className={styles.legendValue}>
                {breakdown.policyPoints.toFixed(1)} pts (
                {policyPercentage.toFixed(1)}%)
              </span>
            </div>
            {investmentPercentage > 0 && (
              <div className={styles.legendItem}>
                <span
                  className={styles.legendColor}
                  style={{ backgroundColor: colors.investments }}
                />
                <span className={styles.legendText}>Investments</span>
                <span className={styles.legendValue}>
                  {breakdown.investmentPoints.toFixed(1)} pts (
                  {investmentPercentage.toFixed(1)}%)
                </span>
              </div>
            )}
          </div>

          {/* Points Summary */}
          <div className={styles.pointsSummary}>
            <span className={styles.totalPoints}>
              🏆 Total: {points.toFixed(1)} points
               ({achievement.toFixed(1)}%)
            </span>
            <span className={styles.salesAchievement}>
              💰 Sales: {salesAchievement.toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Helper function to get supervisor name
  const getSupervisorName = (supervisor) => {
    return (
      supervisor.supervisorName ||
      supervisor["Supervisor Name"] ||
      supervisor.name ||
      "Unknown"
    );
  };

  // Helper function to get team size
  const getTeamSize = (supervisor) => {
    return supervisor.teamSize || supervisor.team_size || 0;
  };

  // Helper function to get sales data - FIXED to check salesActual/salesTarget first
  const getSalesData = (supervisor) => {
    const salesActual =
      supervisor.salesActual || // NEW: Check this first
      supervisor.totalSalesActual ||
      supervisor.TotalSalesVal ||
      supervisor.total_sales ||
      0;
    const salesTarget =
      supervisor.salesTarget || // NEW: Check this first
      supervisor.totalSalesTarget ||
      supervisor.SalesValTarget ||
      supervisor.team_target ||
      1;

    return { salesActual, salesTarget };
  };

  // Championship Standings
  if (
    circuit === "Championship" &&
    allSupervisors &&
    allSupervisors.length > 0
  ) {
    const rankedSupervisors = allSupervisors
      .map((supervisor) => ({
        ...supervisor,
        points: calculatePoints(supervisor),
        achievement: calculateAchievement(supervisor),
      }))
      .sort((a, b) => b.points - a.points);

    return (
      <div className={styles.container}>
        <div className={styles.championshipTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Position</div>
            <div className={styles.headerCell}>Driver (Supervisor)</div>
            <div className={styles.headerCell}>Circuit</div>
            <div className={styles.headerCell}>Team Size</div>
            <div className={styles.headerCell}>Points</div>
            <div className={styles.headerCell}>Achievement</div>
            <div className={styles.headerCell}>Sales</div>
            <div className={styles.headerCell}>Target</div>
          </div>

          <div className={styles.tableBody}>
            {rankedSupervisors.map((supervisor, index) => {
              const supervisorName = getSupervisorName(supervisor);
              const achievement = supervisor.achievement;
              const teamSize = getTeamSize(supervisor);
              const { salesActual, salesTarget } = getSalesData(supervisor);
              const circuit = supervisor.circuit || "Unknown";

              return (
                <div
                  key={supervisor.id || index}
                  className={styles.tableRow}
                  data-testid={`championship-row-${index}`}
                >
                  <div className={styles.tableCell}>
                    <div className={styles.positionContainer}>
                      <span
                        className={styles.positionNumber}
                        style={{ color: getPerformanceColor(achievement) }}
                      >
                        {index + 1}
                      </span>
                      {index < 3 && <span className={styles.trophy}>🏆</span>}
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    <div className={styles.driverInfo}>
                      <div className={styles.driverName}>{supervisorName}</div>
                      <div className={styles.teamMeta}>
                        Team Size: {teamSize} | Points:{" "}
                        {supervisor.points.toFixed(1)}
                      </div>
                    </div>
                  </div>
                  <div className={styles.tableCell}>
                    <span
                      className={styles.circuitBadge}
                      style={{
                        color:
                          circuit.toLowerCase() === "monaco"
                            ? "#FF6B35"
                            : "#4ECDC4",
                      }}
                    >
                      {circuit}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <span>{teamSize}</span>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={styles.pointsAmount}>
                      {supervisor.points.toFixed(1)}
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <span
                      className={styles.achievementRate}
                      style={{ color: getPerformanceColor(achievement) }}
                    >
                      {achievement.toFixed(1)}%
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={styles.salesAmount}>
                      R{(salesActual / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className={styles.tableCell}>
                    <span className={styles.targetAmount}>
                      R{(salesTarget / 1000000).toFixed(1)}M
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Show circuit-specific racing view
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.trackInfo}>
          <h3 className={styles.circuitName}>🏁 Live Positions - {circuit}</h3>
          <div className={styles.liveTiming}>
            <span className={styles.liveIndicator}>⚫</span>
            Live Timing | Target: 500 Points
          </div>
        </div>
      </div>

      <div className={styles.racingBoard}>
        {(supervisors || []).map((supervisor, index) => {
          const supervisorName = getSupervisorName(supervisor);
          const teamSize = getTeamSize(supervisor);
          const { salesActual, salesTarget } = getSalesData(supervisor);

          return (
            <div
              key={supervisor.id || index}
              className={styles.driverRow}
              data-testid={`driver-row-${index}`}
            >
              <div className={styles.positionSection}>
                <div className={styles.positionNumber}>{index + 1}</div>
              </div>

              <div className={styles.driverInfo}>
                <div className={styles.driverName}>{supervisorName}</div>
                <div className={styles.teamInfo}>
                  Team Size: {teamSize} | Points:{" "}
                  {calculatePoints(supervisor).toFixed(1)}/500
                </div>
              </div>

              <RacingProgressBar supervisor={supervisor} />

              <div className={styles.salesData}>
                <div className={styles.currentSales}>
                  R{(salesActual / 1000000).toFixed(1)}M
                </div>
                <div className={styles.targetSales}>
                  Target: R{(salesTarget / 1000000).toFixed(1)}M
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.finishLine}>
        <div className={styles.finishText}>🏁 FINISH LINE - 500 POINTS 🏁</div>
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
