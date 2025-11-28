import { useState, useEffect } from "react";
import DashboardLayout from "./dashboard/DashboardLayout";
import NoDataMessage from "./dashboard/NoDataMessage";
import GaugeContainer from "./gauges/GaugeContainer";
import PitCrewPage from "./PitCrewPage";
import TeamRacingContainer from "./racing/TeamRacingContainer";
import MonacoCircuitView from "./circuits/MonacoCircuitView";
import KyalamiCircuitView from "./circuits/KyalamiCircuitView";
import PitCrewHighlights from "./pitcrew/PitCrewHighlights";

export default function MainDashboard({ data }) {
  const [activeTab, setActiveTab] = useState("total");

  // Debug logging
  useEffect(() => {
    console.log("MainDashboard received data:", data);
    console.log("Active tab:", activeTab);
  }, [data, activeTab]);

  if (!data) {
    return (
      <DashboardLayout>
        <NoDataMessage message="Book1.xlsx not found in public folder" />
      </DashboardLayout>
    );
  }

  const renderTabContent = () => {
    console.log(`Rendering tab content for: ${activeTab}`);

    switch (activeTab) {
      case "total":
        return (
          <>
            <GaugeContainer data={data} />
            {/* <PitCrewContainer data={data} /> */}
          </>
        );
      case "team":
        return <TeamRacingContainer data={data} />;
      case "pitcrew":
        return (
          <>
            <PitCrewPage data={data} />
          </>
        );
      case "monaco":
        return <MonacoCircuitView data={data} />;
      case "kyalami":
        return <KyalamiCircuitView data={data} />;
      default:
        return (
          <>
            <GaugeContainer data={data} />
            {/* <PitCrewContainer data={data} /> */}
          </>
        );
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderTabContent()}
    </DashboardLayout>
  );
}
