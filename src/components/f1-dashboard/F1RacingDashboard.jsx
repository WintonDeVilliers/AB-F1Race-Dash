// --- FINAL FIXED F1RacingDashboard.jsx ---
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import MainDashboard from "./MainDashboard";

export default function F1RacingDashboard({
  salesReportPath = "/Book1.xlsx",
  pointsReportPath = "/PointsReport.xlsx",
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadExcelData = async () => {
      try {
        setLoading(true);

        const salesRes = await fetch(salesReportPath);
        const pointsRes = await fetch(pointsReportPath);

        if (!salesRes.ok) throw new Error(`Failed to fetch sales report`);
        if (!pointsRes.ok) throw new Error(`Failed to fetch points report`);

        const arrayBuffer_salesReport = await salesRes.arrayBuffer();
        const arrayBuffer_pointsReport = await pointsRes.arrayBuffer();

        const workbook_salesReport = XLSX.read(arrayBuffer_salesReport, {
          type: "array",
        });
        const workbook_pointsReport = XLSX.read(arrayBuffer_pointsReport, {
          type: "array",
        });

        const ws_sales =
          workbook_salesReport.Sheets[workbook_salesReport.SheetNames[0]];
        const ws_points =
          workbook_pointsReport.Sheets[workbook_pointsReport.SheetNames[0]];

        const jsonData_Sales = XLSX.utils.sheet_to_json(ws_sales, {
          raw: false,
        });
        const jsonData_Points = XLSX.utils.sheet_to_json(ws_points, {
          raw: false,
        });

        const processedData = processExcelData(jsonData_Sales, jsonData_Points);
        setData(processedData);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadExcelData();
  }, [salesReportPath, pointsReportPath]);

  const parseNumber = (v) => {
    if (!v && v !== 0) return 0;
    const cleaned = String(v).replace(/[^\d.-]/g, "");
    return isNaN(parseFloat(cleaned)) ? 0 : parseFloat(cleaned);
  };

  // NEW CIRCUIT MAPPING
  const getCircuitAssignment = (supervisorName) => {
    const monaco = [
      "Ashley Moyo",
      "Mixo Makhubele",
      "Nonhle Zondi",
      "Rodney Naidu",
      "Samantha Govender",
      "Samuel Masubelele",
      "Taedi Moletsane",
      "Thabo Mosweu",
      "Thobile Phakhathi",
    ];

    const kyalami = [
      "Busisiwe Mabuza",
      "Cindy Visser",
      "Matimba Ngobeni",
      "Mfundo Mdlalose",
      "Mondli Nhlapho",
      "Mosima Moshidi",
      "Salome Baloyi",
      "Shadleigh White",
      "Tshepo Moeketsi",
      "Zwivhuya Magwara",
    ];

    const vegas = ["Lucky Seshabela", "Mfundo Thamane", "Ndodenhle Dlamini"];

    if (vegas.includes(supervisorName)) return "Las Vegas";
    if (monaco.includes(supervisorName)) return "Monaco";
    if (kyalami.includes(supervisorName)) return "Kyalami";

    return supervisorName?.charCodeAt(0) % 2 === 0 ? "Monaco" : "Kyalami";
  };

  const processExcelData = (salesData, pointsData) => {
    if (!salesData || salesData.length === 0) {
      return { supervisors: [], consultants: [], companyMetrics: {} };
    }

    // Build points lookup
    const pointsBySupervisor = {};
    pointsData.forEach((row) => {
      const name = row["Supervisor Name"];
      if (!name) return;

      pointsBySupervisor[name.trim()] = {
        creditPoints: parseNumber(row["Credit Points"]),
        myWorldPoints: parseNumber(row["MyWorld Points"]),
        funeralPoints: parseNumber(row["Funeral Points"]),
        investmentPoints: parseNumber(row["Investment Points"]),
        totalPoints: parseNumber(row["Total Points"]),
      };
    });

    const supervisorGroups = {};
    const consultantsList = [];

    // ---------------------------
    // PROCESS SALES DATA ROWS
    // ---------------------------
    salesData.forEach((row, index) => {
      const supervisorName = (row["Supervisor Name"] || "").trim();
      const consultantName = row["Consultant Name"];

      if (!supervisorName || !consultantName) return;
      if (supervisorName.toLowerCase() === "total") return;

      const salesActual = parseNumber(row["TotalSalesVal"]);
      const salesTarget = parseNumber(row["SalesValTarget"]);

      const appsActual = parseNumber(row["TotalRealAppsVol"]);
      const appsTarget = parseNumber(row["RealAppsTarget"]);

      const myWorldTarget = parseNumber(row["MyWorldTarget"]);
      const myWorldFundedVol = parseNumber(row["MyWorldFundedAccs"]);

      const funeralTarget = parseNumber(row["FuneralTarget"]);
      const funeralVol = parseNumber(row["FuneralVol"]);

      const investSales = parseNumber(row["InvestSalesValue"]);
      const investTarget = parseNumber(row["InvestTarget"]);
      const investApps = parseNumber(row["InvestApplicationVolume"]);

      const salesAchievement =
        salesTarget > 0 ? (salesActual / salesTarget) * 100 : 0;
      const appsAchievement =
        appsTarget > 0 ? (appsActual / appsTarget) * 100 : 0;

      const circuit = getCircuitAssignment(supervisorName);

      const supervisorPoints = pointsBySupervisor[supervisorName] || {
        creditPoints: 0,
        myWorldPoints: 0,
        funeralPoints: 0,
        investmentPoints: 0,
        totalPoints: 0,
      };

      const consultant = {
        id: index + 1,
        consultantName,
        supervisorName,
        circuit,
        salesActual,
        salesTarget,
        appsActual,
        appsTarget,
        salesAchievement,
        appsAchievement,
        myWorldTarget,
        myWorldFundedVol,
        funeralTarget,
        funeralVol,
        investSales,
        investTarget,
        investApps,
        points: supervisorPoints,
      };

      consultantsList.push(consultant);

      if (!supervisorGroups[supervisorName]) {
        supervisorGroups[supervisorName] = {
          supervisorName,
          circuit,
          consultants: [],
          salesActual: 0,
          salesTarget: 0,
          appsActual: 0,
          appsTarget: 0,
          myWorldTarget: 0,
          myWorldFundedVol: 0,
          funeralTarget: 0,
          funeralVol: 0,
          investSales: 0,
          investTarget: 0,
          investApps: 0,
          points: supervisorPoints,
        };
      }

      const g = supervisorGroups[supervisorName];
      g.salesActual += salesActual;
      g.salesTarget += salesTarget;

      g.appsActual += appsActual;
      g.appsTarget += appsTarget;

      g.myWorldTarget += myWorldTarget;
      g.myWorldFundedVol += myWorldFundedVol;

      g.funeralTarget += funeralTarget;
      g.funeralVol += funeralVol;

      g.investSales += investSales;
      g.investTarget += investTarget;
      g.investApps += investApps;

      g.consultants.push(consultant);
    });

    const supervisors = Object.values(supervisorGroups).map((g) => ({
      ...g,
      salesAchievement:
        g.salesTarget > 0 ? (g.salesActual / g.salesTarget) * 100 : 0,
      appsAchievement:
        g.appsTarget > 0 ? (g.appsActual / g.appsTarget) * 100 : 0,
      myWorldAchievement:
        g.myWorldTarget > 0 ? (g.myWorldFundedVol / g.myWorldTarget) * 100 : 0,
      funeralAchievement:
        g.funeralTarget > 0 ? (g.funeralVol / g.funeralTarget) * 100 : 0,
      investAchievement:
        g.investTarget > 0 ? (g.investSales / g.investTarget) * 100 : 0,
      teamSize: g.consultants.length,
    }));

    // ---------------------------------
    // CONSULTANTS INHERIT REAL CIRCUIT
    // ---------------------------------
    const supByName = {};
    supervisors.forEach((s) => {
      supByName[(s.supervisorName || "").trim().toLowerCase()] = s;
    });

    const consultantsWithCircuit = consultantsList.map((c) => {
      const sup = supByName[(c.supervisorName || "").trim().toLowerCase()];
      return {
        ...c,
        circuit: sup ? sup.circuit : getCircuitAssignment(c.supervisorName),
      };
    });

    // ----------------------------
    // COMPANY METRICS (SAFE)
    // ----------------------------
    const totalRow = salesData.find(
      (r) => String(r["ReportMonth"]).trim().toLowerCase() === "total"
    );

    let companyMetrics = null;

    if (totalRow) {
      companyMetrics = {
        totalSalesActual: parseNumber(totalRow["TotalSalesVal"]),
        totalSalesTarget: parseNumber(totalRow["SalesValTarget"]),
        totalAppsActual: parseNumber(totalRow["TotalRealAppsVol"]),
        totalAppsTarget: parseNumber(totalRow["RealAppsTarget"]),
        totalMyWorldTarget: parseNumber(totalRow["MyWorldTarget"]),
        totalMyWorldFundedVol: parseNumber(totalRow["MyWorldFundedAccs"]),
        totalFuneralTarget: parseNumber(totalRow["FuneralTarget"]),
        totalFuneralVol: parseNumber(totalRow["FuneralVol"]),
        totalInvestSales: parseNumber(totalRow["InvestSalesValue"]),
        totalInvestTarget: parseNumber(totalRow["InvestTarget"]),
        totalInvestApps: parseNumber(totalRow["InvestApplicationVolume"]),
      };
    } else {
      companyMetrics = supervisors.reduce(
        (acc, s) => {
          acc.totalSalesActual += s.salesActual || 0;
          acc.totalSalesTarget += s.salesTarget || 0;
          acc.totalAppsActual += s.appsActual || 0;
          acc.totalAppsTarget += s.appsTarget || 0;
          acc.totalMyWorldTarget += s.myWorldTarget || 0;
          acc.totalMyWorldFundedVol += s.myWorldFundedVol || 0;
          acc.totalFuneralTarget += s.funeralTarget || 0;
          acc.totalFuneralVol += s.funeralVol || 0;
          acc.totalInvestSales += s.investSales || 0;
          acc.totalInvestTarget += s.investTarget || 0;
          acc.totalInvestApps += s.investApps || 0;

          return acc;
        },
        {
          totalSalesActual: 0,
          totalSalesTarget: 0,
          totalAppsActual: 0,
          totalAppsTarget: 0,
          totalMyWorldTarget: 0,
          totalMyWorldFundedVol: 0,
          totalFuneralTarget: 0,
          totalFuneralVol: 0,
          totalInvestSales: 0,
          totalInvestTarget: 0,
          totalInvestApps: 0,
        }
      );
    }

    companyMetrics.investAchievement =
      companyMetrics.totalInvestTarget > 0
        ? (companyMetrics.totalInvestSales / companyMetrics.totalInvestTarget) *
          100
        : 0;

    return {
      supervisors,
      consultants: consultantsWithCircuit,
      companyMetrics,
      pointsData: pointsBySupervisor,
    };
  };

  if (loading) return <div>Loading F1 Racing Dashboard...</div>;
  if (error) return <div>Error: {error}</div>;

  return <MainDashboard data={data} />;
}
