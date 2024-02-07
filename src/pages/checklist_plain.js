// import React from 'react'
// import React, { useState, useEffect } from "react";
// import Footer from "@/components/Footer";
import CheckListHeader from "@/components/CheckListHeader";
import styles from "../styles/CheckListPlain.module.css";
import VoiceToText from "@/components/VoiceToText";


export default function Checklist_Plain() {
  return (
    <>
       <CheckListHeader />
        <div className={styles.open_section}>
          <h1 className={styles.headline}>
            <mark className={styles.mark}>COMPLIANCE CHECK LIST</mark>
          </h1>
        </div>
        <div className={styles.table_section}>
        <h1>FIRST CALL</h1>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className="">ALERT LEVEL</th>
                  <th className={styles.row_name}>COMPLIANCE TOPIC</th>
                  <th className={styles.row_job}>COMPLIANCE STATEMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Regulatory Statement</td>
                  <td>### ### ,
                    African Bank is an authorized Financial Services and Credit Provider.
                    It holds Professional Indemnity and Fidelity Insurance Cover, and as a standard procedure
                    all our calls are recorded for quality and security purposes.
                    I am a Representative working under supervision for Long Term Insurance,
                    including short-term and long-term deposits. MORE WORDS</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Information Processing</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Debt Control</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Credit Check</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>
              </tbody>              
            </table>
        </div>
        </div>





      <div className={styles.table_section}>
        <h1>FIRST CALL (FUNERAL COVER)</h1>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className="">ALERT LEVEL</th>
                  <th className={styles.row_name}>COMPLIANCE TOPIC</th>
                  <th className={styles.row_job}>COMPLIANCE STATEMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Regulatory Statement</td>
                  <td>### ### ,
                    African Bank is an authorized Financial Services and Credit Provider.
                    It holds Professional Indemnity and Fidelity Insurance Cover, and as a standard procedure
                    all our calls are recorded for quality and security purposes.
                    I am a Representative working under supervision for Long Term Insurance,
                    including short-term and long-term deposits. MORE WORDS</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Information Processing</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Debt Control</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Credit Check</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>
              </tbody>              
            </table>
        </div>
        </div>




      <div className={styles.table_section}>
        <h1>SECOND CALL (REAL OFFER)</h1>
          <div className={styles.table}>
            <table>
              <thead>
                <tr>
                  <th className="">ALERT LEVEL</th>
                  <th className={styles.row_name}>COMPLIANCE TOPIC</th>
                  <th className={styles.row_job}>COMPLIANCE STATEMENT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Regulatory Statement</td>
                  <td>### ### ,
                    African Bank is an authorized Financial Services and Credit Provider.
                    It holds Professional Indemnity and Fidelity Insurance Cover, and as a standard procedure
                    all our calls are recorded for quality and security purposes.
                    I am a Representative working under supervision for Long Term Insurance,
                    including short-term and long-term deposits. MORE WORDS</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Information Processing</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Debt Control</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>Credit Check</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>

                <tr>
                  <td className={styles.alert_red}></td>
                  <td>0</td>
                  <td>statement here</td>
                </tr>
              </tbody>              
            </table>
        </div>
        </div>
    </>
  )
}
