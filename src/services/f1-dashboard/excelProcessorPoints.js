import { useState } from "react";

import styles from "../../styles/ExcelProcessor.module.css";

const ExcelProcessorPoints = ({ onDataProcessed }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  console.log(
    "ExcelProcessorPoints rendered with onDataProcessed:",
    typeof onDataProcessed
  );

  const processExcelData = (file) => {
    console.log("Processing file:", file.name);

    if (!onDataProcessed || typeof onDataProcessed !== "function") {
      console.error(
        "onDataProcessed is not a function. Received:",
        typeof onDataProcessed
      );
      return;
    }

    setIsProcessing(true);

    // Simulate processing the actual Excel structure
    setTimeout(() => {
      try {
        console.log("Simulating data processing...");

        // Mock data based on your Excel structure
        const processedData = {
          teams: [
            {
              supervisor: "Dazlin Theron",
              myworldFundedPoints: 45,
              creditLoanPoints: 120,
              creditCardPoints: 85,
              overdraftPoints: 30,
              crossSellPoints: 65,
              gameTimePoints: 40,
              redAlertDemerits: 5,
              totalPoints: 385,
              totalPointsAfterDemerit: 380,
            },
            {
              supervisor: "Mfundo Mdlalose",
              myworldFundedPoints: 52,
              creditLoanPoints: 135,
              creditCardPoints: 92,
              overdraftPoints: 28,
              crossSellPoints: 72,
              gameTimePoints: 45,
              redAlertDemerits: 8,
              totalPoints: 424,
              totalPointsAfterDemerit: 416,
            },
            {
              supervisor: "Ashley Moyo",
              myworldFundedPoints: 38,
              creditLoanPoints: 110,
              creditCardPoints: 78,
              overdraftPoints: 25,
              crossSellPoints: 58,
              gameTimePoints: 35,
              redAlertDemerits: 3,
              totalPoints: 344,
              totalPointsAfterDemerit: 341,
            },
            {
              supervisor: "Thobile Phakhathi",
              myworldFundedPoints: 48,
              creditLoanPoints: 128,
              creditCardPoints: 88,
              overdraftPoints: 32,
              crossSellPoints: 68,
              gameTimePoints: 42,
              redAlertDemerits: 6,
              totalPoints: 406,
              totalPointsAfterDemerit: 400,
            },
            {
              supervisor: "Cindy Visser",
              myworldFundedPoints: 55,
              creditLoanPoints: 142,
              creditCardPoints: 95,
              overdraftPoints: 35,
              crossSellPoints: 75,
              gameTimePoints: 48,
              redAlertDemerits: 4,
              totalPoints: 450,
              totalPointsAfterDemerit: 446,
            },
          ],
        };

        console.log("Calling onDataProcessed with:", processedData);
        onDataProcessed(processedData);
        console.log("onDataProcessed called successfully");
      } catch (error) {
        console.error("Error processing data:", error);
      } finally {
        setIsProcessing(false);
      }
    }, 1000);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      console.log("File selected:", file.name);
      processExcelData(file);
    } else {
      console.log("No file selected");
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <label className={styles.uploadLabel}>
        Upload Excel File
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className={styles.fileInput}
          disabled={isProcessing}
        />
      </label>
      {isProcessing && (
        <div className={styles.loading}>Processing team data...</div>
      )}
    </div>
  );
};

export default ExcelProcessorPoints;
