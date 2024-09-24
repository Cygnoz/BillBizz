import CheveronLeftIcon from "../../../../assets/icons/CheveronLeftIcon";
import CehvronDown from "../../../../assets/icons/CehvronDown";
import Button from "../../../../Components/Button";
import { useEffect, useRef, useState } from "react";
import SearchBar from "../../../../Components/SearchBar";
import CirclePlus from "../../../../assets/icons/circleplus";
import NewCustomerModal from "../../../Customer/CustomerHome/NewCustomerModal";
import NewPaymentMadeOrderTable from "./NewPaymentMadeOrderTable";
import Upload from "../../../../assets/icons/Upload";
import UserRound from "../../../../assets/icons/user-round";

type Props = {};

const NewPaymentMade = ({}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  // const [selected, setSelected] = useState<string | null>(null);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<string | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = (key: string | null) => {
    setOpenDropdownIndex(key === openDropdownIndex ? null : key);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownIndex(null);
    }
  };

  useEffect(() => {
    if (openDropdownIndex !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdownIndex]);

  return (
    <div className="px-8">
      <div className="flex gap-5">
        <div className="flex justify-center items-center h-11 w-11 bg-tertiary_main rounded-full">
          <CheveronLeftIcon />
        </div>

        <div className="flex justify-center items-center">
          <h4 className="font-bold text-xl text-textColor ">Bill Payment</h4>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 py-5 rounded-lg">
        <div className="col-span-8">
          <div className="bg-secondary_main p-5 min-h-max rounded-xl relative ">
            <p className="text-textColor text-xl font-bold"></p>
            <div className=" mt-5 space-y-6">
              <div className="cols-span-12">
                <div className="col-span-5">
                  <label className="block text-sm mb-1 text-labelColor">
                    Select Supplier
                  </label>
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown("supplier")}
                  >
                    <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500 flex">
  <p className="w-3/4">Select or add Supplier</p>
</div>

                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {openDropdownIndex === "supplier" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2 -m-9 w-[40%] space-y-1"
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Select Supplier"
                      />
                      <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-lightPink">
                        <div className="col-span-2 flex items-center justify-center">
                          <img
                            src="https://i.postimg.cc/MHdYrGVP/Ellipse-43.png"
                            alt=""
                          />
                        </div>
                        <div className="col-span-10 flex">
                          <div>
                            <p className="font-bold text-sm">Smart world</p>
                            <p className="text-xs text-gray-500">
                              Phone: 9643287899
                            </p>
                          </div>
                          <div className="ms-auto text-2xl cursor-pointer relative -mt-2 pe-2">
                            &times;
                          </div>
                        </div>
                      </div>
                      <div className="hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4">
                        <NewCustomerModal page="purchase" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="cols-12">
              <p className="font-bold inline-flex items-center" style={{ color: '#820000' }}>
<UserRound color="#820000"/>  See vendor details
</p>
 </div>


             
             

              <div className="grid grid-cols-2 gap-4">
              <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Payment Date
                  </label>
                  <input
                    placeholder="Value"
                    type="date"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                </div>

                <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Payment Made
                  </label>
                  <input
                    placeholder="Value"
                    type="text"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Payment ID
                  </label>

                  
                  <div
                    className="relative w-full"
                    onClick={() => toggleDropdown("warehouseAddress")}
                  >
                    <div className="items-center flex appearance-none w-full h-9 text-zinc-400 bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                      <p>31/05/24</p>
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {openDropdownIndex === "warehouseAddress" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2 -m-9 w-[40%] space-y-1"
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Select Supplier"
                      />

                      <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg bg-lightPink">
                        <div className="col-span-2 flex items-center justify-center">
                          <img
                            src="https://i.postimg.cc/3xX2LBpS/Ellipse-43-1.png"
                            alt=""
                          />
                        </div>
                        <div className="col-span-10 flex ">
                          <div>
                            <p className="font-normal text-sm">Electronics</p>
                            <p className="text-xs text-textColor">
                              Karnataka Yoga <br />
                              Sanga, Bangalore <br />
                              683576
                            </p>
                          </div>
                          <div className="ms-auto text-xl cursor-pointer relative -mt-2">
                            &times;
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-12 gap-1 p-2 hover:bg-gray-100 cursor-pointe border border-slate-400 rounded-lg py-4">
                        <div className="col-span-2 flex items-center justify-center">
                          <CirclePlus color="darkRed" size="18" />
                        </div>
                        <div className="col-span-10    text-sm flex gap-2 items-center">
                          <p className="text-darkRed">
                            <b>Add new Address</b>
                          </p>
                          <div className="ms-auto text-xl cursor-pointer relative -mt-2">
                            &times;
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="">
                  <label className="block text-sm mb-1 text-labelColor">
                    Payment ID New 
                  </label>
                  <input
                    placeholder="Value"
                    type="text"
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                  />
                  {openDropdownIndex === "warehouseAddress" && (
                    <div
                      ref={dropdownRef}
                      className="absolute z-10 bg-white  shadow  rounded-md mt-1 p-2 -m-9 w-[40%] space-y-1"
                    >
                      <SearchBar
                        searchValue={searchValue}
                        onSearchChange={setSearchValue}
                        placeholder="Select Supplier"
                      />

                     
                    </div>
                  )}
                </div>
              </div>
            
            </div>


            <div className="grid grid-cols-2 gap-4  mt-3">
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Shipment Preference
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                      Cash
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>


              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Paid  Through
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                      18/09/2024
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
          
      
            </div>

            {/* <label className="block text-sm mb-1 text-labelColor mt-5">
              Payment Mode
            </label>
            <div className="grid grid-cols-2 bg-red-500 gap-4">
              <div>
                <input
                  placeholder="Cash"
                  type="text"
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-9"
                />
              </div>

              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Purchase Order Date
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                      18/09/2024
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
            </div> */}
            <div className="grid grid-cols-2 gap-4  mt-3">
              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Shipment Preference
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                      Cash
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>


              <div>
                <label className="block text-sm mb-1 text-labelColor">
                  Paid  Through
                </label>
                <div className="relative w-full">
                  <select className="block appearance-none w-full h-9  text-zinc-400 bg-white border border-inputBorder text-sm  pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                      18/09/2024
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
          
      
            </div>
            <p className="font-bold mt-4">Unpaid Bill</p>
            <NewPaymentMadeOrderTable />
            <button className="mt-1">
           
            </button>{" "}
            <br />
            <div className="text-sm">
              <label htmlFor="" className="">
                Notes
                <input
                  name=""
                  id=""
                  placeholder="Add a Note"
                  className="border-inputBorder w-full text-sm border rounded  p-2 h-[57px] mt-2 "
                />
              </label>
            </div>
            <div className="text-sm mt-3">
              <label className="block mb-1">
                Attachments
                <div className="border-dashed border border-neutral-300 p-2 rounded flex flex-col gap-2 justify-center items-center">
  <span className="text-center inline-flex items-center gap-2">
    <Upload /> 
    Upload File 
  </span>
  <div className="text-center">
    Maximum File Size: 1 MB
  </div>
</div>



                <p className="text-xs mt-1 text-gray-600">
                 
                </p>
                <input
                  type="file"
                  className="hidden"
                  value=""
                  name="documents"
                  // onChange={(e)=>handleFileChange(e)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-secondary_main p-5 text-sm rounded-xl space-y-4 text-textColor">
            <div className="grid grid-cols-12 pb-4  text-dropdownText border-b-2 border-slate-200">
              <div className="col-span-9 mt-5">
                <p>Amount Paid</p>
              </div>
              <div className="col-span-3 mt-5">
                <p className="text-base">0.00</p>
              </div>

              <div className="col-span-9 mt-1">
                <p>Amount Used for Payments</p>
              </div>
              <div className="col-span-3 mt-1">
                <p className="text-base">0.00</p>
              </div>

              <div className="col-span-9">
                <p> Amount Refunded</p>
              </div>
              <div className="col-span-3">
                <p className="text-base"> 0.00</p>
              </div>

              <div className="col-span-9 mt-1">
                <p className="text-base">Amount in Excess</p>
              </div>
              <div className="col-span-3 mt-1">
                <p className="text-base">0.00</p>
              </div>
            </div>

            <div className="flex gap-4 pt-3 justify-end">
              {" "}
              <Button variant="secondary" size="sm">
                Cancel
              </Button>
              <Button variant="primary" size="sm">
                Save
              </Button>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPaymentMade;