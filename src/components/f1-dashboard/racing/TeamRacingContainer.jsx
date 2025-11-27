// --- FINAL FIXED TeamRacingContainer.jsx ---
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

  // -------------------------------------------------------------
  // AUTO-CYCLE (restored EXACTLY as your original version)
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isAutoCycling) return;

    const startCycle = () => {
      const cycle = () => {
        setActiveCircuit("TopConsultants");

        cycleTimeoutRef.current = setTimeout(() => {
          setActiveCircuit("Monaco");

          cycleTimeoutRef.current = setTimeout(() => {
            setActiveCircuit("Kyalami");

            cycleTimeoutRef.current = setTimeout(() => {
              setActiveCircuit("Las Vegas");

              cycleTimeoutRef.current = setTimeout(() => {
                setActiveCircuit("Championship");
                setScrollPosition("top");

                cycleTimeoutRef.current = setTimeout(() => {
                  // Scroll down animation (6 sec)
                  const startPos = window.pageYOffset;
                  const endPos =
                    document.body.scrollHeight - window.innerHeight;
                  const distance = endPos - startPos;
                  const duration = 6000;
                  let start = null;

                  function stepDown(ts) {
                    if (!start) start = ts;
                    const progress = ts - start;
                    const pct = Math.min(progress / duration, 1);

                    const ease =
                      pct < 0.5
                        ? 2 * pct * pct
                        : 1 - Math.pow(-2 * pct + 2, 2) / 2;

                    window.scrollTo(0, startPos + distance * ease);

                    if (progress < duration) requestAnimationFrame(stepDown);
                  }

                  requestAnimationFrame(stepDown);
                  setScrollPosition("bottom");

                  scrollTimeoutRef.current = setTimeout(() => {
                    // Scroll UP (6 sec)
                    const start2 = window.pageYOffset;
                    const end2 = 0;
                    const dist2 = start2 - end2;
                    const dur2 = 6000;
                    let startT = null;

                    function stepUp(ts) {
                      if (!startT) startT = ts;
                      const prog = ts - startT;
                      const pct2 = Math.min(prog / dur2, 1);

                      const ease2 =
                        pct2 < 0.5
                          ? 2 * pct2 * pct2
                          : 1 - Math.pow(-2 * pct2 + 2, 2) / 2;

                      window.scrollTo(0, start2 - dist2 * ease2);

                      if (prog < dur2) requestAnimationFrame(stepUp);
                    }

                    requestAnimationFrame(stepUp);
                    setScrollPosition("top");

                    scrollTimeoutRef.current = setTimeout(() => cycle(), 8000);
                  }, 8000);
                }, 5000);
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

  // -------------------------------------------------------------
  // CORRECT SORTING (MATCHES CHAMPIONSHIP TABLE)
  // -------------------------------------------------------------
  const sortByPoints = (a, b) =>
    (b.points?.totalPoints || 0) - (a.points?.totalPoints || 0);

  // -------------------------------------------------------------
  // FILTER BY CIRCUIT + SORT BY POINTS
  // -------------------------------------------------------------
  // Supervisors
  const monacoSupervisors = data.supervisors
    .filter((s) => s.circuit === "Monaco")
    .sort(sortByPoints);

  const kyalamiSupervisors = data.supervisors
    .filter((s) => s.circuit === "Kyalami")
    .sort(sortByPoints);

  const lasVegasSupervisors = data.supervisors
    .filter((s) => s.circuit === "Las Vegas")
    .sort(sortByPoints);

  // Consultants
  const monacoConsultants = data.consultants
    .filter((c) => c.circuit === "Monaco")
    .sort(sortByPoints);

  const kyalamiConsultants = data.consultants
    .filter((c) => c.circuit === "Kyalami")
    .sort(sortByPoints);

  const lasVegasConsultants = data.consultants
    .filter((c) => c.circuit === "Las Vegas")
    .sort(sortByPoints);

  // Top 5
  const topConsultants = [...data.consultants].sort(sortByPoints).slice(0, 5);

  // -------------------------------------------------------------
  // ORIGINAL TopConsultantsView (untouched, only animation added)
  // -------------------------------------------------------------
  function TopConsultantsView({ consultants }) {
    const getPitCrewImage = (consultant, index) => {
      const pitMember = pitMemberImage.find(
        (pit) =>
          pit.pitMemberName.toLowerCase() ===
          consultant.consultantName?.toLowerCase()
      );

      const fallback = pitMemberImage[index % pitMemberImage.length];
      return (
        pitMember?.pitMemberImage || fallback?.pitMemberImage || "/OT_IMG.png"
      );
    };

    return (
      <div className={styles.topConsultants}>
        <h2>Top 5 Consultants - Pit Crew</h2>

        <div className={styles.consultantGrid}>
          {consultants.map((c, i) => (
            <div
              key={i}
              className={`${styles.consultantCard} ${styles.rowAnimate}`}
            >
              <img
                src={getPitCrewImage(c, i)}
                alt={c.consultantName}
                className={styles.consultantImage}
              />
              <p className={styles.consultantName}>{c.consultantName}</p>
              <p className={styles.consultantScore}>
                {c.salesAchievement?.toFixed(2)}%
              </p>
              <span className={styles.circuitBadgeSmall}>{c.circuit}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // RENDER
  // -------------------------------------------------------------
  return (
    <div className={styles.container}>
      <div className={styles.circuitTabs}>
        <button
          className={`${styles.tabButton} ${
            activeCircuit === "TopConsultants" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("TopConsultants")}
        >
          👥 Top 5 Consultants
        </button>

        <button
          className={`${styles.tabButton} ${
            activeCircuit === "Monaco" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("Monaco")}
        >
          🏎️ Monaco Circuit
        </button>

        <button
          className={`${styles.tabButton} ${
            activeCircuit === "Kyalami" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("Kyalami")}
        >
          🏎️ Kyalami Circuit
        </button>

        <button
          className={`${styles.tabButton} ${
            activeCircuit === "Las Vegas" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("Las Vegas")}
        >
          🏎️ Las Vegas Circuit
        </button>

        <button
          className={`${styles.tabButton} ${
            activeCircuit === "Championship" ? styles.active : ""
          }`}
          onClick={() => handleManualTabClick("Championship")}
        >
          🏆 Complete Standings
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

      {activeCircuit === "Las Vegas" && (
        <TeamRacingView
          circuit="Las Vegas"
          supervisors={lasVegasSupervisors}
          consultants={lasVegasConsultants}
        />
      )}

      {activeCircuit === "Championship" && (
        <TeamRacingView
          circuit="Championship"
          allSupervisors={[...data.supervisors].sort(sortByPoints)}
        />
      )}

      <div className={styles.cycleControls}>
        <button
          className={styles.cycleButton}
          onClick={() => setIsAutoCycling(!isAutoCycling)}
        >
          {isAutoCycling ? "⏸️ Pause Auto-Cycle" : "▶️ Resume Auto-Cycle"}
        </button>
      </div>
    </div>
  );
}
