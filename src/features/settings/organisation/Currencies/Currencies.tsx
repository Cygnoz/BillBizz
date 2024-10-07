import { ChangeEvent, useContext, useState } from "react";
import { toast } from "react-hot-toast";
import CehvronDown from "../../../../assets/icons/CehvronDown";
import PlusCircle from "../../../../assets/icons/PlusCircle";
import topImg from "../../../../assets/Images/14.png";
import CurrencyBro from "../../../../assets/Images/Currency-bro 1.png";
import Button from "../../../../Components/Button";
import Modal from "../../../../Components/model/Modal";
import { CurrencyResponseContext } from "../../../../context/ContextShare";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";
import Banner from "../../banner/Banner";
import CurrencyTable from "./CurrencyTable";

interface InputCurrencyData {
  currencyCode: string;
  currencySymbol: string;
  currencyName: string;
  decimalPlaces: string;
  format: string;
}

type Props = {};

const Currencies: React.FC<Props> = () => {
  const [isExchangeRateFields, setIsExchangeRateFields] = useState(false);
  const [enableExchangeRateModal, setEnableExchangeRateModal] = useState(false);
  const [newCurrencyModal, setNewCurrencyModal] = useState(false);
  const [newCurrency, setNewCurrency] = useState<InputCurrencyData>({
    currencyCode: "",
    currencySymbol: "",
    currencyName: "",
    decimalPlaces: "",
    format: "",
  });
  const {setCurrencyResponse}=useContext(CurrencyResponseContext)!;
  const { request: CreateNewCurrency } = useApi("post", 5004);

  const openModal = (
    enableExchangeRateModal = false,
    newCurrencyModal = false
  ) => {
    setEnableExchangeRateModal(enableExchangeRateModal);
    setNewCurrencyModal(newCurrencyModal);
  };

  const closeModal = () => {
    setEnableExchangeRateModal(false);
    setNewCurrencyModal(false);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewCurrency((prevCurrencyAccount) => ({
      ...prevCurrencyAccount,
      [name]: value,
    }));
  };



  const onSubmit = async () => {
    try {
      const url = `${endponits.ADD_CURRENCIES}`;
      const { response, error } = await CreateNewCurrency(url, newCurrency);
      console.log("response",response);
      console.log("Error",error.response);

      if (!error && response) {
        closeModal();
        console.log(response.data);
        
        toast.success(response.data.message	);
        setCurrencyResponse((prevCurrencyResponse: any) => ({
          ...prevCurrencyResponse,
          ...newCurrency,
        }));
       
      } else {
        toast.error(error.response?.data?.message);
      }
    } catch (error) {
      console.error("Error due to add currency!",error);
    }
  };

  return (
    <>
    <div className="m-4 overflow-y-scroll hide-scrollbar text-[#303F58]">
      <Banner seeOrgDetails />
      <div className="p-2 flex items-center ">
        <p className="font-bold text-[15px]">Currencies</p>

        <div className="ml-auto flex gap-4 items-center">
          <label className="flex items-center cursor-pointer">
            <div onClick={() => openModal(true, false)} className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isExchangeRateFields}
              />
              <div
                className={`w-9 h-5 rounded-full shadow-inner transition-colors ${
                  isExchangeRateFields ? "bg-checkBox" : "bg-dropdownBorder"
                }`}
              ></div>
              <div
                className={`dot absolute w-3 h-3 bg-white rounded-full top-1 transition-transform ${
                  isExchangeRateFields
                    ? "transform translate-x-full left-2"
                    : "left-1"
                }`}
              ></div>
            </div>
            <div className="ml-2 text-textColor text-sm">
              Enable Exchange Rate Fields
            </div>
          </label>

          <Modal
            onClose={closeModal}
            open={enableExchangeRateModal}
            className="rounded-lg p-8 w-[546px] h-[160px] text-[#303F58] space-y-8"
          >
            <p className="text-sm">
              The exchange rates for the currencies will automatically be
              fetched in real time
            </p>
            <div className="flex justify-end gap-2 mb-3">
              <Button
                onClick={closeModal}
                variant="secondary"
                className="h-[38px] w-[120px] flex justify-center"
              >
                <p className="text-sm">Cancel</p>
              </Button>
              <Button
                onClick={() => {
                  closeModal(), setIsExchangeRateFields(!isExchangeRateFields);
                }}
                variant="primary"
                className="h-[38px] w-[120px] flex justify-center"
              >
                <p className="text-sm">Ok</p>
              </Button>
            </div>
          </Modal>

          <Button
            onClick={() => openModal(false, true)}
            variant="primary"
            size="sm"
          >
            <PlusCircle size={16} color={"white"} />
            <p className="text-sm">New Currency</p>
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg p-3">
        <CurrencyTable />
      </div>

      <Modal open={newCurrencyModal} onClose={closeModal} className="w-[68%]">
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
            <div
              className="absolute top-0 -right-8 w-[178px] h-[89px]"
              style={{
                backgroundImage: `url(${topImg})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">
                Create New Currency
              </h3>
              <p className="text-dropdownText font-semibold text-sm mt-2">
                Open a new bank account swiftly and securely.
              </p>
            </div>
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>

          <form className="grid grid-cols-12 gap-4">
            <div className="mt-12 col-span-3 justify-items-center ">
              <img alt=""src={CurrencyBro}  />
            </div>
            <div className="col-span-9 space-y-2">
              {/* Currency Code  */}
              <div className="relative w-full mt-3">
                <label className="block text-sm mb-1 text-labelColor" htmlFor="currencyCode">
                  Currency Code
                </label>
                <div className="relative w-full mt-1">
                  <select
                    value={newCurrency.currencyCode}
                    onChange={handleChange}
                    name="currencyCode"
                    id="currencyCode"
                    className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <option value="">Select Currency Code</option>
                    <option value="AED">AED</option>
                    <option value="INR">INR</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm mb-1 text-labelColor" htmlFor="currencySymbol">
                  Currency Symbol
                </label>
                <input
                  type="text"
                  name="currencySymbol"
                  value={newCurrency.currencySymbol}
                  onChange={handleChange}
                  placeholder="Value"
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                />
              </div>

              {/* Currency Name  */}
              <div className="mb-4 mt-4">
                <label className="block text-sm mb-1 text-labelColor">
                  Currency Name
                </label>
                <input
                  type="text"
                  name="currencyName"
                  value={newCurrency.currencyName}
                  onChange={handleChange}
                  placeholder="Value"
                  className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2"
                />
              </div>
              <div className="relative w-full mt-3">
                <label className="block text-sm mb-1 text-labelColor">
                  Decimal Places
                </label>
                <div className="relative w-full mt-1">
                  <select
                    name="decimalPlaces"
                    id="decimalPlaces"
                    onChange={handleChange}
value={newCurrency.decimalPlaces}
                    className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <option value="">Select Decimal Places</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
              <div className="relative w-full mt-3 ">
                <label className="block text-sm mb-1 text-labelColor">
                  Format
                </label>
                <div className="relative w-full mt-1">
                  <select
                    name="format"
                    id="format"
                    onChange={handleChange}
                    value={newCurrency.format}
                    className="block appearance-none w-full text-zinc-400 bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                  >
                    <option value="">Select Format Value</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <Button
                  onClick={closeModal}
                  variant="secondary"
                  className="h-[38px] w-[120px] flex justify-center"
                >
                  <p className="text-sm">Cancel</p>
                </Button>
                <Button
  onClick={
   
    onSubmit
  }
  variant="primary"
  className="h-[38px] w-[120px] flex justify-center"
>
  <p className="text-sm">Save</p>
</Button>

              </div>
            </div>
          </form>
        </div>
      </Modal>
      
    </div>
    {/* <Toaster position="top-center" reverseOrder={true} /> */}
    </>
  );
};

export default Currencies;
