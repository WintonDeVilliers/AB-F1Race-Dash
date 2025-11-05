import { useState } from "react";
// import ExcelProcessor from './ExcelProcessor';
import ExcelProcessorPoints from "@/services/f1-dashboard/excelProcessorPoints";
import styles from "../styles/LeagueTableView.module.css";

const LeagueTableView = () => {
  const [teamData, setTeamData] = useState(null);

  // Make sure this function is properly defined
  const handleDataProcessed = (data) => {
    console.log("Data processed successfully:", data);
    if (data && data.teams) {
      setTeamData(data);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.stadiumBackground}>
        <div className={styles.pitchOverlay}></div>

        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>Team Performance League</h1>
            <p className={styles.subtitle}>
              Credit & MyWorld Performance Metrics
            </p>
          </header>

          {/* Ensure onDataProcessed is passed correctly */}
          <ExcelProcessorPoints onDataProcessed={handleDataProcessed} />

          {teamData && teamData.teams && teamData.teams.length > 0 ? (
            <div className={styles.tableWrapper}>
              <div className={styles.tableContainer}>
                <table className={styles.performanceTable}>
                  <thead>
                    <tr>
                      <th className={styles.rankHeader}>Rank</th>
                      <th className={styles.supervisorHeader}>Supervisor</th>
                      <th className={styles.pointsHeader}>MyWorld Funded</th>
                      <th className={styles.pointsHeader}>Credit Loan</th>
                      <th className={styles.pointsHeader}>Credit Card</th>
                      <th className={styles.pointsHeader}>Overdraft</th>
                      <th className={styles.pointsHeader}>Cross Sell/Upsell</th>
                      <th className={styles.pointsHeader}>Game Time</th>
                      <th className={styles.demeritHeader}>
                        Red Alert Demerits
                      </th>
                      <th className={styles.totalHeader}>Total Points</th>
                      <th className={styles.totalHeader}>Final Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamData.teams.map((team, index) => (
                      <tr
                        key={team.supervisor || index}
                        className={styles.tableRow}
                      >
                        <td className={styles.rankCell}>
                          <div className={styles.rankBadge}>{index + 1}</div>
                        </td>
                        <td className={styles.supervisorCell}>
                          <div className={styles.supervisorInfo}>
                            <span className={styles.supervisorName}>
                              {team.supervisor}
                            </span>
                          </div>
                        </td>
                        <td className={styles.pointsCell}>
                          {team.myworldFundedPoints}
                        </td>
                        <td className={styles.pointsCell}>
                          {team.creditLoanPoints}
                        </td>
                        <td className={styles.pointsCell}>
                          {team.creditCardPoints}
                        </td>
                        <td className={styles.pointsCell}>
                          {team.overdraftPoints}
                        </td>
                        <td className={styles.pointsCell}>
                          {team.crossSellPoints}
                        </td>
                        <td className={styles.pointsCell}>
                          {team.gameTimePoints}
                        </td>
                        <td className={styles.demeritCell}>
                          -{team.redAlertDemerits}
                        </td>
                        <td className={styles.totalCell}>{team.totalPoints}</td>
                        <td className={styles.finalCell}>
                          <span className={styles.finalScore}>
                            {team.totalPointsAfterDemerit}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={styles.placeholder}>
              <p>Upload an Excel file to see the team performance data</p>
              <p className={styles.placeholderSub}>
                Supported formats: .xlsx, .xls
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeagueTableView;
