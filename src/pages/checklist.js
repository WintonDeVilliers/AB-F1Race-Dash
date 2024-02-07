import React, { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import CheckListHeader from "@/components/CheckListHeader";
import styles from "../styles/CheckListTable.module.css";
import VoiceToText from "@/components/VoiceToText";

export default function Checklist() {
  return (
    <>
      <div>
      <VoiceToText />
      </div>
    </>
  );
}
