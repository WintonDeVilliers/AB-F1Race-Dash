import React from "react";
import PitCrewViewContainer from "./pitcrew/PitCrewViewContainer";

export default function PitCrewPage({ data }) {
  return (
    <div>
      <PitCrewViewContainer data={data} />
    </div>
  );
}
