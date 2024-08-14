import { useState } from "react";
import bgimage from "../../../../assets/Images/Organization-banner.png";
import TaxRateVat from "./TaxRateVat";
import VatSettings from "./VatSettings";


type Props = {}

function VATComponent({}: Props) {
  const [selectedTab, setSelectedTab] = useState<string>("taxRate");
  return (
    <div className="p-5">
    <div
      className="w-full h-[148px] bg-cover bg-center rounded-lg"
      style={{ backgroundImage: `url(${bgimage})` }}
    />
    <div className="mt-5 flex gap-7 rounded-[40px] bg-[#EAEBEB] p-3">
      <button
        className={`px-4 py-2 rounded-[40px] text-sm  ${
          selectedTab === "taxRate" ? "bg-white font-bold text-textColor" : "text-[#585953] font-semibold"
        }`}
        onClick={() => setSelectedTab("taxRate")}
      >
        Tax Rate
      </button>
      <button
        className={`px-4 py-2  rounded-[40px] text-sm  ${
          selectedTab === "gstSettings" ? "bg-white font-bold  text-textColor" : "text-[#585953] font-semibold"
        }`}
        onClick={() => setSelectedTab("gstSettings")}
      >
        VAT Settings
      </button>
    </div>

    <div className="mt-4">
      {selectedTab === "taxRate" ? <TaxRateVat /> : <VatSettings/>}
    </div>
  </div>
  )
}

export default VATComponent