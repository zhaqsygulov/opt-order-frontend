import React, { useEffect, useState } from "react";
import WelcomeStep from "./WelcomeStep";
import ContextCheckStep from "./ContextCheckStep";
import ClientSettingsStep from "./ClientSettingsStep";
import CatalogLinkStep from "./CatalogLinkStep"; // ← возможно, тоже забыто

export default function Wizard() {
  const [step, setStep] = useState(0);
  const [contextData, setContextData] = useState(null);

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const steps = [
  <WelcomeStep onNext={next} />,
  <ContextCheckStep onNext={next} setContextData={setContextData} />,
  <ClientSettingsStep onNext={next} contextData={contextData} />,
  <CatalogLinkStep onNext={next} contextData={contextData} />,
];

  

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-4 text-gray-500">Шаг {step + 1} из {steps.length}</div>
      {steps[step]}
    </div>
  );
}
