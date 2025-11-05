import Footer from "@/components/Footer";
import styles from "../styles/Home.module.css";
import Header from "@/components/HomePageHeader";
import HomePageHeader from "@/components/HomePageHeader";
// import ExcelProcessorPoints from "@/services/f1-dashboard/excelProcessorPoints";
import LeagueTableView from "@/components/LeagueTableView";

export default function Home() {
  return (
    <>
      <LeagueTableView />
    </>
  );
}
