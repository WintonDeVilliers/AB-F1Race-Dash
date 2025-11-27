import { useMemo, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import styles from "../../../styles/RacingComponents.module.css";

export default function PitCrewView({ consultants }) {
  console.log(consultants);
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const AUTO_ADVANCE_INTERVAL = 5000; // 5 seconds per page
  const MEMBERS_PER_PAGE = 8;

  const groupedConsultants = useMemo(() => {
    if (!consultants || consultants.length === 0) return {};

    return consultants.reduce((groups, consultant) => {
      const supervisorName = consultant.supervisorName || "Unknown Supervisor";
      if (!groups[supervisorName]) {
        groups[supervisorName] = [];
      }
      groups[supervisorName].push(consultant);
      return groups;
    }, {});
  }, [consultants]);

  const teamEntries = Object.entries(groupedConsultants);
  const totalTeams = teamEntries.length;

  // Get current team data
  const [currentSupervisor, currentTeamMembers] =
    teamEntries[currentTeamIndex] || [];
  const sortedMembers = useMemo(() => {
    if (!currentTeamMembers) return [];
    return [...currentTeamMembers].sort(
      (a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0)
    );
  }, [currentTeamMembers]);

  // Calculate pagination for current team
  const totalPagesForTeam = Math.ceil(sortedMembers.length / MEMBERS_PER_PAGE);
  const startIndex = currentPageIndex * MEMBERS_PER_PAGE;
  const endIndex = startIndex + MEMBERS_PER_PAGE;
  const currentPageMembers = sortedMembers.slice(startIndex, endIndex);

  // Auto-advance functionality
  useEffect(() => {
    if (!isAutoPlaying || totalTeams === 0) return;

    const interval = setInterval(() => {
      // If there's a next page in current team, go to it
      if (currentPageIndex < totalPagesForTeam - 1) {
        setCurrentPageIndex((current) => current + 1);
      }
      // Otherwise, go to next team and reset to first page
      else {
        setCurrentTeamIndex((current) => (current + 1) % totalTeams);
        setCurrentPageIndex(0);
      }
    }, AUTO_ADVANCE_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalTeams, currentPageIndex, totalPagesForTeam]);

  // Reset page index when team changes
  useEffect(() => {
    setCurrentPageIndex(0);
  }, [currentTeamIndex]);

  const getPerformanceIcon = (salesAchievement) => {
    if (salesAchievement >= 120) return "⭐";
    if (salesAchievement >= 100) return "🏆";
    if (salesAchievement >= 80) return "🔥";
    if (salesAchievement >= 60) return "⚡";
    return "🔧";
  };

  const getPerformanceColor = (salesAchievement) => {
    if (salesAchievement >= 120) return "#22c55e";
    if (salesAchievement >= 100) return "#3b82f6";
    if (salesAchievement >= 80) return "#f59e0b";
    if (salesAchievement >= 60) return "#f97316";
    return "#ef4444";
  };

  const handlePrevious = () => {
    // If there's a previous page in current team, go to it
    if (currentPageIndex > 0) {
      setCurrentPageIndex((current) => current - 1);
    }
    // Otherwise, go to previous team and last page
    else {
      const prevTeamIndex = (currentTeamIndex - 1 + totalTeams) % totalTeams;
      const prevTeamMembers = teamEntries[prevTeamIndex]?.[1] || [];
      const prevTeamPages = Math.ceil(
        prevTeamMembers.length / MEMBERS_PER_PAGE
      );

      setCurrentTeamIndex(prevTeamIndex);
      setCurrentPageIndex(prevTeamPages - 1);
    }
  };

  const handleNext = () => {
    // If there's a next page in current team, go to it
    if (currentPageIndex < totalPagesForTeam - 1) {
      setCurrentPageIndex((current) => current + 1);
    }
    // Otherwise, go to next team and first page
    else {
      setCurrentTeamIndex((current) => (current + 1) % totalTeams);
      setCurrentPageIndex(0);
    }
  };

  const handlePlayPause = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const goToTeamPage = (teamIndex, pageIndex = 0) => {
    setCurrentTeamIndex(teamIndex);
    setCurrentPageIndex(pageIndex);
  };

  if (!consultants || consultants.length === 0) {
    return null;
  }

  if (totalTeams === 0) {
    return (
      <div className={styles.pitCrewView}>
        <div className={styles.emptyState}>
          <h2>No Team Data Available</h2>
          <p>Consultant information will appear here once loaded.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pitCrewView}>
      <div className={styles.pitCrewContainer}>
        {/* Global Carousel Controls */}
        <div className={styles.globalCarouselHeader}>
          {/* <h2 className={styles.sectionTitle}>TEAM RACING CHAMPIONSHIP</h2> */}
          <p className={styles.sectionSubtitle}>
            Consultant Performance Dashboard
          </p>

          <div className={styles.globalControls}>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              className={styles.carouselButton}
            >
              <ChevronLeft className={styles.carouselIcon} />
            </Button>

            <div className={styles.teamIndicator}>
              <span className={styles.teamCounter}>
                Team {currentTeamIndex + 1} of {totalTeams}
                <span className={styles.pageCounter}>
                  • Page {currentPageIndex + 1} of {totalPagesForTeam}
                </span>
              </span>
              <span className={styles.teamName}>{currentSupervisor}</span>
              <span className={styles.memberCounter}>
                Showing {currentPageMembers.length} of {sortedMembers.length}{" "}
                members
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              className={styles.carouselButton}
            >
              <ChevronRight className={styles.carouselIcon} />
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePlayPause}
              className={styles.playPauseButton}
            >
              {isAutoPlaying ? (
                <Pause className={styles.carouselIcon} />
              ) : (
                <Play className={styles.carouselIcon} />
              )}
            </Button>
          </div>
        </div>

        {/* Current Team Card */}
        <Card className={styles.pitCrewCard}>
          <CardHeader className={styles.pitCrewCardHeader}>
            <CardTitle>
              🏎️ Driver: {currentSupervisor}
              <span className={styles.teamSize}>
                ({sortedMembers.length} Crew Members • {totalPagesForTeam} Page
                {totalPagesForTeam !== 1 ? "s" : ""})
              </span>
            </CardTitle>

            <div className={styles.crewStats}>
              Avg Performance:{" "}
              {(
                sortedMembers.reduce(
                  (sum, m) => sum + (m.salesAchievement || 0),
                  0
                ) / sortedMembers.length
              ).toFixed(1)}
              % | Total Apps:{" "}
              {sortedMembers.reduce(
                (sum, m) => sum + (m.real_apps_vol || 0),
                0
              )}
            </div>
          </CardHeader>

          <CardContent>
            {/* Page-level Pagination Controls */}
            {totalPagesForTeam > 1 && (
              <div className={styles.pageControls}>
                <div className={styles.pageNavigation}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPageIndex(Math.max(0, currentPageIndex - 1))
                    }
                    disabled={currentPageIndex === 0}
                    className={styles.pageButton}
                  >
                    <ChevronLeft className={styles.carouselIcon} />
                    Previous Page
                  </Button>

                  <span className={styles.pageIndicator}>
                    Page {currentPageIndex + 1} of {totalPagesForTeam}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCurrentPageIndex(
                        Math.min(totalPagesForTeam - 1, currentPageIndex + 1)
                      )
                    }
                    disabled={currentPageIndex === totalPagesForTeam - 1}
                    className={styles.pageButton}
                  >
                    Next Page
                    <ChevronRight className={styles.carouselIcon} />
                  </Button>
                </div>
              </div>
            )}

            {/* Members Grid */}
            <div className={styles.crewGrid}>
              {currentPageMembers.map((consultant, index) => {
                const globalIndex = startIndex + index;
                return (
                  <div
                    key={consultant.id}
                    className={styles.crewMember}
                    style={{
                      borderColor: getPerformanceColor(
                        consultant.salesAchievement || 0
                      ),
                      backgroundColor: `${getPerformanceColor(
                        consultant.salesAchievement || 0
                      )}15`,
                    }}
                    data-testid={`crew-member-${consultant.id}`}
                  >
                    <div className={styles.memberHeader}>
                      <span className={styles.memberIcon}>
                        {getPerformanceIcon(consultant.salesAchievement || 0)}
                      </span>
                      <span className={styles.memberPosition}>
                        #{globalIndex + 1}
                      </span>
                    </div>

                    <div className={styles.memberInfo}>
                      <div
                        className={styles.memberName}
                        data-testid={`member-name-${consultant.id}`}
                      >
                        {consultant.consultantName}
                      </div>
                      <div className={styles.memberSales}>
                        Target: R
                        {((consultant.salesTarget || 0) / 1000000).toFixed(1)}M
                      </div>
                      <div className={styles.memberSales}>
                        Real Apps Target: {consultant.appsTarget || "N/A"}
                      </div>
                      <br />
                      <div className={styles.memberSales}>
                        KRA Financial Metrics
                      </div>
                      <div className={styles.memberSales}>
                        Disbursed Credit Sales:
                      </div>
                      <div
                        className={styles.memberAchievement}
                        style={{
                          color: getPerformanceColor(
                            consultant.salesAchievement || 0
                          ),
                        }}
                      >
                        {(consultant.salesAchievement || 0).toFixed(1)}%
                      </div>
                    </div>

                    <div className={styles.memberStats}>
                      <div className={styles.memberAchievement}>
                        Real Apps Achievement:
                      </div>
                      <div
                        className={styles.memberAchievement}
                        style={{
                          color: getPerformanceColor(
                            consultant.appsAchievement || 0
                          ),
                        }}
                      >
                        {(consultant.appsAchievement || 0).toFixed(1)}%
                      </div>
                      <div className={styles.memberSales}>
                        Estimated Weighted Score:
                      </div>
                      <div className={styles.memberPerformance}>
                        Performance: {consultant.performanceLevel || "Unknown"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Team Progress Dots */}
            <div className={styles.teamProgressDots}>
              {teamEntries.map(([supervisor], index) => (
                <button
                  key={supervisor}
                  className={`${styles.teamDot} ${
                    index === currentTeamIndex ? styles.teamDotActive : ""
                  }`}
                  onClick={() => goToTeamPage(index)}
                >
                  <span className={styles.teamDotLabel}>
                    {supervisor.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>

            {/* Page Progress Dots */}
            {totalPagesForTeam > 1 && (
              <div className={styles.pageProgressDots}>
                {Array.from({ length: totalPagesForTeam }, (_, i) => (
                  <button
                    key={i}
                    className={`${styles.pageDot} ${
                      i === currentPageIndex ? styles.pageDotActive : ""
                    }`}
                    onClick={() => setCurrentPageIndex(i)}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
