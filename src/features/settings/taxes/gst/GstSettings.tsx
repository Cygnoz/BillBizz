import { useState } from "react";
import CalenderIcon from "../../../../assets/icons/CalenderIcon";
import Button from "../../../../Components/Button";

type GstSettingsProps = {};

function GstSettings({ }: GstSettingsProps) {
  const [isGstRegistered, setIsGstRegistered] = useState(false);

  const handleToggle = () => {
    setIsGstRegistered(!isGstRegistered);
  };

  return (
    <div>
      <p className="text-textColor font-bold">GST Settings</p>
      <div className="p-6 mt-4 rounded-lg" style={{
        background: 'linear-gradient(89.66deg, #E3E6D5 -0.9%, #F7E7CE 132.22%)',
      }}>
        <div className="flex justify-between items-center">
          <p className="text-base text-dropdownText">Is your business registered for GST?</p>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isGstRegistered} onChange={handleToggle} />
              <div className={`w-11 h-6 rounded-full shadow-inner transition-colors ${isGstRegistered ? 'bg-checkBox' : 'bg-dropdownBorder'}`}></div>
              <div className={`dot absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${isGstRegistered ? 'transform translate-x-full left-2' : 'left-1'}`}></div>
            </div>
            <div className="ml-3 text-textColor  text-sm">{isGstRegistered ? 'Yes' : 'Yes'}</div>
          </label>
        </div>
      </div>
      <div>
        {isGstRegistered && (
          <div className="p-6 rounded-lg bg-white mt-4 flex justify-between gap-4">
            <div className="text-[#495160] text-sm w-[50%]">
              <div>
                <label htmlFor="">GSTIN <span className="text-xs">(Maximum 15 Digits)</span></label>
                <input type="text"
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                  placeholder="Name" />
              </div>
              <div className="mt-5">
                <label htmlFor="">Business Trade Name</label>
                <input type="text"
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                  placeholder="Name" />
              </div>
              <div className="mt-5">
                <label className="block mb-1.5 text-dropdownText font-semibold">Composite Scheme</label>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-[#97998E] bg-white h-5 w-5 " id="checkbox3" />
                  <label htmlFor="" className="mt-0.5">
                  My business is registered for Composition Scheme.
                  </label>
                </div>
              </div>
              <div className="mt-5">
                <label className="block mb-1.5 text-dropdownText font-semibold">Import / Export</label>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-[#97998E] bg-white h-5 w-5 " id="checkbox3" />
                  <label htmlFor="" className="mt-0.5">
                  My business is involved in SEZ / Overseas Trading
                  </label>
                </div>
              </div>

            </div>
            {/*  */}
            <div className="text-[#495160] text-sm w-[50%]">
              <div>
                <label htmlFor="">Business Legal Name</label>
                <input type="text"
                  className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                  placeholder="Name" />
              </div>
              <div className="mt-5">
                <label htmlFor="" className="block mb-1">
                 GST Registered On
                </label>
                <div className="relative w-full">
                  <div className="pointer-events-none absolute inset-y-0  flex items-center px-3 text-gray-700 w-[100%]">
                    <CalenderIcon color="#818894" />
                  </div>
                  <input
                    type="text"
                    className=" text-sm w-[100%] ps-9 rounded-md text-start bg-white border border-slate-300  h-9 p-2"
                    placeholder="Select Date"
                  />
                </div>
                <div className="mt-5">
                <label className="block mb-1.5 text-dropdownText font-semibold">Reverse Charge</label>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-[#97998E] bg-white h-5 w-5 " id="checkbox3" />
                  <label htmlFor="" className="mt-0.5">
                  My business is registered for Composition Scheme.
                  </label>
                </div>
              </div>
                <div className="mt-5">
                <label className="block mb-1.5 text-dropdownText font-semibold">Digital Services</label>
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="accent-[#97998E] bg-white h-5 w-5 " id="checkbox3" />
                  <label htmlFor="" className="mt-0.5">
               Track sale of digital services to overseas customers
                  </label>
                </div>
                <p className="w-[95%] mt-3 text-xs">Enabling this option will let you record and track export of digital services to individuals</p>
                <div className="flex justify-end mt-6">
                  <Button size="sm" className="text-sm  pl-10 pr-10">Save</Button>
                </div>
              </div>
              </div>
            </div>
          </div>
          
        )}
      </div>
    </div>
  );
}

export default GstSettings;