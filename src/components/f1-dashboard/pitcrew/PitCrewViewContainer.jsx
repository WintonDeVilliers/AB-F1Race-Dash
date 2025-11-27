import PitCrewView from "./PitCrewView";
// import styles from './PitCrewContainer.module.css';

export default function PitCrewViewContainer({ data }) {
  if (!data || !data.consultants) {
    return null;
  }
  return (
    <div>
      <PitCrewView consultants={data.consultants} />
    </div>
  );
}
