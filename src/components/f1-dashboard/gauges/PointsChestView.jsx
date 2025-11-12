import React from "react";
import styles from "./PointsChest.module.css";
// import localFont from "@next/font/local";
// import localFont from "next/font/local";

export default function PointsChestView() {
  // const BungeeShadeRegular = localFont({
  //   src: "/public/fonts/BungeeShade-Regular.ttf",
  //   variable: "--font-BungeeShade-Regular",
  // });

  // const poppins = localFont({
  //   src: "../public/fonts/Poppins-Regular.woff2",
  //   variable: "--font-poppins",
  // });

  // const roboto = localFont({
  //   src: "../public/fonts/Roboto-Regular.woff2",
  //   variable: "--font-roboto",
  // });

  const chestData = [
    {
      title: "Credit",
      points: 500,
      pointsAvailable: 4500,
      image: "/credit-chest.png",
    },
    {
      title: "MyWorld",
      points: 800,
      pointsAvailable: 4500,
      image: "/treasure-chest.png",
    },
    {
      title: "Funeral",
      points: 250,
      pointsAvailable: 4500,
      image: "/funeral-chest.png",
    },
    {
      title: "Investments",
      points: 600,
      pointsAvailable: 4500,
      image: "/investment-chest.png",
    },
  ];

  return (
    <div className={styles.container}>
      {chestData.map((item, index) => (
        <div key={index} className={styles.gridItem}>
          {/* <h2 className={styles.itemTitle}>{item.title}</h2> */}
          <h2 className={`${styles.itemTitle} ${styles.FastOne}`}>
            {item.title}
          </h2>
          <h3 className={styles.p_available}>
            {item.pointsAvailable} Available
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

          <div className={styles.pointsDisplay}>{item.points} Redeemed</div>
        </div>
      ))}
    </div>
  );
}
