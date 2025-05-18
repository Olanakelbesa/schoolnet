"use client";

import React, { useEffect } from "react";
import ClientQuestionnaire from "../components/client-questionnaire";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

function ParentQuestionnairePage() {
  

  return (
    <div>
      <ClientQuestionnaire />
    </div>
  );
}

export default ParentQuestionnairePage;
