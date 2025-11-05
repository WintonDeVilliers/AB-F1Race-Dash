import { useState, useEffect, useRef } from "react";
import TeamRacingView from "./TeamRacingView";
import styles from "./TeamRacingContainer.module.css";

import { pitMemberImage } from "../../../../data/game_data";

export default function TeamRacingContainer({ data }) {
  const [activeCircuit, setActiveCircuit] = useState("TopConsultants");
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [scrollPosition, setScrollPosition] = useState("top");
  const cycleTimeoutRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  // Auto-cycling logic: Top 5 Consultants (5s) → Monaco (5s) → Kyalami (5s) → Championship (5s + scroll) → Scroll Down (6s) → Scroll Up (6s) → Repeat
  useEffect(() => {
    if (!isAutoCycling) return;

    const startCycle = () => {
      const cycle = () => {
        // Top 5 Consultants - 5 seconds
        setActiveCircuit("TopConsultants");
        console.log("Auto-cycle: Top 5 Consultants - 5s");

        cycleTimeoutRef.current = setTimeout(() => {
          // Monaco Circuit - 5 seconds
          setActiveCircuit("Monaco");
          console.log("Auto-cycle: Monaco Circuit - 5s");

          cycleTimeoutRef.current = setTimeout(() => {
            // Kyalami Circuit - 5 seconds
            setActiveCircuit("Kyalami");
            console.log("Auto-cycle: Kyalami Circuit - 5s");

            cycleTimeoutRef.current = setTimeout(() => {
              // Championship - 5 seconds
              setActiveCircuit("Championship");
              setScrollPosition("top");
              console.log("Auto-cycle: Championship Standings - 5s");

              cycleTimeoutRef.current = setTimeout(() => {
                // Scroll Down - slow custom animation
                console.log("Auto-cycle: Scrolling down - slow");
                const startPosition = window.pageYOffset;
                const targetPosition =
                  document.body.scrollHeight - window.innerHeight;
                const distance = targetPosition - startPosition;
                const duration = 6000; // 6 seconds
                let start = null;

                function smoothScrollDown(timestamp) {
                  if (!start) start = timestamp;
                  const progress = timestamp - start;
                  const percentage = Math.min(progress / duration, 1);

                  const easeInOutQuad =
                    percentage < 0.5
                      ? 2 * percentage * percentage
                      : 1 - Math.pow(-2 * percentage + 2, 2) / 2;

                  window.scrollTo(0, startPosition + distance * easeInOutQuad);

                  if (progress < duration) {
                    requestAnimationFrame(smoothScrollDown);
                  }
                }

                requestAnimationFrame(smoothScrollDown);
                setScrollPosition("bottom");

                scrollTimeoutRef.current = setTimeout(() => {
                  // Scroll Up - slow custom animation
                  console.log("Auto-cycle: Scrolling up - slow");
                  const startPos = window.pageYOffset;
                  const targetPos = 0;
                  const dist = startPos - targetPos;
                  const dur = 6000;
                  let startTime = null;

                  function smoothScrollUp(timestamp) {
                    if (!startTime) startTime = timestamp;
                    const prog = timestamp - startTime;
                    const perc = Math.min(prog / dur, 1);

                    const ease =
                      perc < 0.5
                        ? 2 * perc * perc
                        : 1 - Math.pow(-2 * perc + 2, 2) / 2;

                    window.scrollTo(0, startPos - dist * ease);

                    if (prog < dur) {
                      requestAnimationFrame(smoothScrollUp);
                    }
                  }

                  requestAnimationFrame(smoothScrollUp);
                  setScrollPosition("top");

                  scrollTimeoutRef.current = setTimeout(() => {
                    // Repeat cycle
                    cycle();
                  }, 8000);
                }, 8000);
              }, 5000);
            }, 5000);
          }, 5000);
        }, 5000);
      };

      cycle();
    };

    startCycle();

    return () => {
      if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [isAutoCycling]);

  const handleManualTabClick = (circuit) => {
    setIsAutoCycling(false);
    setActiveCircuit(circuit);
    console.log(`Manual tab click: ${circuit} - Auto-cycling stopped`);

    if (cycleTimeoutRef.current) clearTimeout(cycleTimeoutRef.current);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
  };

  if (!data || !data.supervisors || !data.consultants) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.loadingSpinner}></div>
          <p>Loading Team Racing Data...</p>
        </div>
      </div>
    );
  }

  // Sort supervisors by circuit
  const monacoSupervisors = data.supervisors
    .filter((supervisor) => supervisor.circuit === "Monaco")
    .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0));

  const kyalamiSupervisors = data.supervisors
    .filter((supervisor) => supervisor.circuit === "Kyalami")
    .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0));

  const monacoConsultants = data.consultants
    .filter((consultant) => consultant.circuit === "Monaco")
    .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0));

  const kyalamiConsultants = data.consultants
    .filter((consultant) => consultant.circuit === "Kyalami")
    .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0));

  // Top 5 Consultants overall
  const topConsultants = [...data.consultants]
    .sort((a, b) => (b.salesAchievement || 0) - (a.salesAchievement || 0))
    .slice(0, 5);

  // Inline TopConsultants view
  // Basic implementation in TopConsultantsView
  function TopConsultantsView({ consultants }) {
    // Helper function to get F1 pit crew image
    const getPitCrewImage = (consultant, index) => {
      // Try to match by name first
      const pitMember = pitMemberImage.find(
        (pit) =>
          pit.pitMemberName.toLowerCase() ===
          consultant.consultantName?.toLowerCase()
      );

      // If no name match, use index-based mapping (cycling through available images)
      const fallbackPitMember = pitMemberImage[index % pitMemberImage.length];

      return (
        pitMember?.pitMemberImage ||
        fallbackPitMember?.pitMemberImage ||
        "/OT_IMG.png"
      );
    };

    return (
      <div className={styles.topConsultants}>
        <h2>Top 5 Consultants - Pit Crew</h2>
        <div className={styles.consultantGrid}>
          {consultants.map((c, i) => (
            <div key={c.id || i} className={styles.consultantCard}>
              <img
                src={getPitCrewImage(c, i)}
                alt={c.consultantName || c.name}
                className={styles.consultantImage}
              />
              <p className={styles.consultantName}>{c.consultantName}</p>
              <p className={styles.consultantScore}>
                {c.salesAchievement?.toFixed(2)}%
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.circuitTabs}>
        <button
          className={`${styles.tabButton} ${
            activeCircuit === "TopConsultants" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("TopConsultants")}
          data-testid="top-consultants-tab"
        >
          👥 Top 5 Consultants
        </button>
        <button
          className={`${styles.tabButton} ${
            activeCircuit === "Monaco" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("Monaco")}
          data-testid="monaco-tab"
        >
          🏎️ Monaco Circuit
        </button>
        <button
          className={`${styles.tabButton} ${
            activeCircuit === "Kyalami" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("Kyalami")}
          data-testid="kyalami-tab"
        >
          🏎️ Kyalami Circuit
        </button>
        <button
          className={`${styles.tabButton} ${
            activeCircuit === "Championship" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("Championship")}
          data-testid="championship-tab"
        >
          🏆 Complete Standings
        </button>
      </div>

      <div className={styles.cycleControls}>
        <button
          className={styles.cycleButton}
          onClick={() => setIsAutoCycling(!isAutoCycling)}
          data-testid="cycle-control"
        >
          {isAutoCycling ? "⏸️ Pause Auto-Cycle" : "▶️ Resume Auto-Cycle"}
        </button>
      </div>

      {activeCircuit === "TopConsultants" && (
        <TopConsultantsView consultants={topConsultants} />
      )}

      {activeCircuit === "Monaco" && (
        <TeamRacingView
          circuit="Monaco"
          supervisors={monacoSupervisors}
          consultants={monacoConsultants}
        />
      )}

      {activeCircuit === "Kyalami" && (
        <TeamRacingView
          circuit="Kyalami"
          supervisors={kyalamiSupervisors}
          consultants={kyalamiConsultants}
        />
      )}

      {activeCircuit === "Championship" && (
        <TeamRacingView
          circuit="Championship"
          allSupervisors={
            data.supervisors
              ? [...data.supervisors].sort(
                  (a, b) =>
                    (b.salesAchievement || 0) - (a.salesAchievement || 0)
                )
              : []
          }
        />
      )}
    </div>
  );
}
