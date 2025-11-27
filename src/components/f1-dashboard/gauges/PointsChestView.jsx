import React from "react";
import styles from "./PointsChest.module.css";

export default function PointsChestView({ pointsData }) {
  // Calculate cumulative points for each category
  const calculateCategoryPoints = () => {
    if (!pointsData || Object.keys(pointsData).length === 0) {
      return {
        credit: 0,
        myWorld: 0,
        funeral: 0,
        investment: 0,
      };
    }

    const totals = {
      credit: 0,
      myWorld: 0,
      funeral: 0,
      investment: 0,
    };

    console.log("=== CALCULATING CATEGORY POINTS ===");
    Object.entries(pointsData).forEach(([name, supervisor]) => {
      console.log(`${name}:`, {
        credit: supervisor.creditPoints,
        myWorld: supervisor.myWorldPoints,
        funeral: supervisor.funeralPoints,
        investment: supervisor.investmentPoints,
      });

      totals.credit += supervisor.creditPoints || 0;
      totals.myWorld += supervisor.myWorldPoints || 0;
      totals.funeral += supervisor.funeralPoints || 0;
      totals.investment += supervisor.investmentPoints || 0;
    });

    console.log("Raw totals before rounding:", totals);
    return totals;
  };

  const categoryTotals = calculateCategoryPoints();

  const chestData = [
    {
      title: "Credit",
      points: Number(categoryTotals.credit.toFixed(0)),
      pointsAvailable: 4500,
      image: "/credit-chest.png",
    },
    {
      title: "MyWorld",
      points: Number(categoryTotals.myWorld.toFixed(0)),
      pointsAvailable: 4500,
      image: "/treasure-chest.png",
    },
    {
      title: "Funeral",
      points: Number(categoryTotals.funeral.toFixed(0)),
      pointsAvailable: 4500,
      image: "/funeral-chest.png",
    },
    {
      title: "Investments",
      points: Number(categoryTotals.investment.toFixed(0)),
      pointsAvailable: 4500,
      image: "/investment-chest.png",
    },
  ];

  // Log remainders to console
  console.log("=== POINTS CHEST REMAINDERS ===");
  chestData.forEach((chest) => {
    const remainder = chest.pointsAvailable - chest.points;
    console.log(
      `${chest.title}: ${chest.points} redeemed / ${chest.pointsAvailable} available = ${remainder} remaining`
    );
  });

  return (
    <div className={styles.container}>
      {chestData.map((item, index) => (
        <div key={index} className={styles.gridItem}>
          <h2 className={`${styles.itemTitle} ${styles.Slackey}`}>
            {item.title}
          </h2>
          <h3 className={`${styles.p_available} ${styles.Slackey}`}>
            {item.pointsAvailable} Pit Credits
          </h3>

          <div className={styles.chestWrapper}>
            <div className={styles.chestIcon}>
              <img
                src={item.image}
                alt={`${item.title} Chest`}
                className={styles.chestImage}
              />
            </div>
          </div>

          <div className={`${styles.pointsDisplay} ${styles.Slackey}`}>
            {item.points} Redeemed
          </div>
        </div>
      ))}
    </div>
  );
}
