import { ChangeEvent, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import { toast, Toaster } from "react-hot-toast";
import CehvronDown from "../../../assets/icons/CehvronDown";
import Plus from "../../../assets/icons/Plus";
import Banner from "../banner/Banner";
import TrashCan from "../../../assets/icons/TrashCan";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Info from "../../../assets/icons/Info";
import Tooltip from "../../../Components/tooltip/Tooltip";

interface InputData {
  organizationLogo: string;
  organizationName: string;
  organizationCountry: string;
  organizationIndustry: string;
  addline1: string;
  addline2: string;
  city: string;
  pincode: string;
  state: string;
  organizationPhNum: string;
  website: string;
  baseCurrency: string;
  fiscalYear: string;
  timeZone: string;
  timeZoneExp: string;
  dateFormat: string;
  dateFormatExp: string;
  dateSplit: string;
  phoneNumberCode: string;
}

const CreateOrganizationForm = () => {
  const [additionalData, setAdditionalData] = useState<any | null>([]);

  // const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const [countryData, setcountryData] = useState<any | []>([]);
  const [currencyData, setcurrencyData] = useState<any | []>([]);
  const [stateList, setStateList] = useState<any | []>([]);
  const { request: getAdditionalData } = useApi("get", 5004);
  const { request: createOrganization } = useApi("post", 5004);
  const { request: getOneOrganization } = useApi("get", 5004);
  const { request: getCurrencyData } = useApi("get", 5004);
  const [tooltipState, setTooltipState] = useState<{ [key: string]: boolean }>({
    industry: false,
    address: false,
    baseCurrency: false,
  });

  const [inputData, setInputData] = useState<InputData>({
    organizationLogo: "",
    organizationName: "",
    organizationCountry: "",
    organizationIndustry: "",
    addline1: "",
    addline2: "",
    city: "",
    pincode: "",
    state: "",
    organizationPhNum: "",
    website: "",
    baseCurrency: "",
    fiscalYear: "",
    timeZone: "",
    timeZoneExp: "",
    dateFormat: "",
    dateFormatExp: "",
    dateSplit: "",
    phoneNumberCode: "",
  });


  const getDropdownList = async () => {
    try {
      const url = `${endponits.GET_ADDITIONAL_DATA}`;
      const { response, error } = await getAdditionalData(url);
      if (!error && response) {
        setAdditionalData(response.data[0]);
        // console.log(response.data[0], "additionalData");
      }
    } catch (error) {
      console.log("Error in fetching Additional data", error);
    }
  };

  const getCountryData = async () => {
    try {
      const url = `${endponits.GET_COUNTRY_DATA}`;
      const { response, error } = await getAdditionalData(url);
      if (!error && response) {
        setcountryData(response.data[0].countries);
        // console.log(response.data[0].countries, "CountryData");
      }
    } catch (error) {
      console.log("Error in fetching country data", error);
    }
  };

  const getcurrencyData = async () => {
    try {
      const url = `${endponits.GET_CURRENCY_LIST}`;
      const { response, error } = await getCurrencyData(url);
      if (!error && response) {
        setcurrencyData(response.data);
        // console.log(response.data, "currencyData");
      }
    } catch (error) {
      console.log("Error in fetching currency data", error);
    }
  };

  const getOrganization = async () => {
    try {
      const url = `${endponits.GET_ONE_ORGANIZATION}`;
      const apiResponse = await getOneOrganization(url);
      const { response, error } = apiResponse;
      if (!error && response?.data) {
        setInputData(response.data);
        setInputData((prevData: any) => ({
          ...prevData,
          organizationName: response.data.organizationName,
          organizationPhNum: Number(response.data.organizationPhNum),
        }));
      } else {
        toast.error(
          error.response.data.message || "Error fetching organization"
        );
      }
    } catch (error) {
      toast.error("Error fetching organization");
      console.error("Error fetching organization:", error);
    }
  };

  const handlePhoneChange = (value: string) => {
    setInputData((prevData) => ({
      ...prevData,
      organizationPhNum: value,
    }));
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const handleFileChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: "organizationLogo"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      // if (key === "organizationLogo") setLogo(file);

      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result as string;
        // console.log("Base64 String:", base64String);
        setInputData((prevDetails: any) => ({
          ...prevDetails,
          [key]: base64String,
        }));
      };

      reader.readAsDataURL(file);
    }
  };

  const selectTimeZone = (e: any) => {
    const selectedZone = e.target.value;

    const selectedTimeZone = additionalData.timezones.find(
      (timezone: any) => timezone.zone === selectedZone
    );

    console.log(selectedTimeZone);

    if (selectedTimeZone) {
      setInputData((prevDetails) => ({
        ...prevDetails,
        timeZone: selectedZone,
        timeZoneExp: selectedTimeZone.timeZone,
      }));
    }
  };

  const selectDateFormat = (e: any) => {
    const selectedFormat = e.target.value;

    const selectedDateFormat = [
      ...additionalData.dateFormats.short,
      ...additionalData.dateFormats.medium,
      ...additionalData.dateFormats.long,
    ].find((dateFormat) => dateFormat.format === selectedFormat);

    console.log(selectedDateFormat);

    if (selectedDateFormat) {
      setInputData((prevDetails: any) => ({
        ...prevDetails,
        dateFormat: selectedFormat,
        dateFormatExp: selectedDateFormat.dateFormat,
      }));
    }
  };

  const handleCreateOrganization = async (e: any) => {
    e.preventDefault();
    try {
      const url = `${endponits.CREATE_ORGANIZATION}`;
      const apiResponse = await createOrganization(url, inputData);
      // console.log(apiResponse, "api response");
      const { response, error } = apiResponse;
      if (!error && response) {
        toast.success(response.data.message);
      } else {
        toast.error(error.response.data.message);
      }
    } catch (error) {
      console.log(error, "Error in creating organization");
    }
  };
  const handleDeleteImage = () => {
    setInputData((prevDetails: any) => ({
      ...prevDetails,
      organizationLogo: "",
    }));
  };
  useEffect(() => {
    getDropdownList();
    getOrganization();
    getCountryData();
    getcurrencyData();
  }, []);

  useEffect(() => {
    if (inputData.organizationCountry) {
      const country = countryData.find(
        (c: any) => c.name === inputData.organizationCountry
      );
      if (country) {
        setStateList(country.states || []);
      }
    }
  }, [inputData.organizationCountry, countryData, inputData.organizationLogo]);

  const handleTooltipToggle = (tooltip: string, state: boolean) => {
    setTooltipState((prevState) => ({
      ...prevState,
      [tooltip]: state,
    }));
  };

  const renderCustomTooltip = (content: string) => {
    return (
      <Tooltip
        fontsize="12px"
        content={content}
        textColor="#ffffff"
        bgColor="#585953"
        arrowColor="transparant"
        width="250px"
      />
    );
  };

  return (
    <div className=" m-4 overflow-y-scroll hide-scrollbar h-auto">
      <Banner seeOrgDetails />

      {/* FORM */}
      <form className="text-slate-800 text-sm">
        <div className="h-56 p-3 border-dashed border-neutral-400  rounded-md mt-5 border bg-white text-textColor w-[403px]">
          {" "}
          <label>
            <div
              className={`bg-lightPink flex h-28 justify-center items-center rounded-lg ${
                inputData.organizationLogo ? "h-[90px] rounded-b-none" : ""
              }`}
            >
              {inputData.organizationLogo ? (
                <div className="">
                  <img
                    src={inputData.organizationLogo}
                    alt=""
                    className="py-0 h-[51px]"
                  />
                </div>
              ) : (
                <>
                  <div className="justify-center flex items-center bg-darkRed text-white  p-1 rounded-full">
                    <Plus color="white" classname="h-3 w-3" />
                  </div>
                  <p className="text-sm ms-2">
                    {" "}
                    Upload Your Organizational Logo
                  </p>
                </>
              )}
              <input
                accept="image/*"
                type="file"
                className="hidden"
                onChange={(e) => handleFileChange(e, "organizationLogo")}
              />
            </div>
          </label>
          {inputData.organizationLogo && (
            <div className="bg-neutral-200 rounded-b-lg h-7 flex items-center justify-end px-4">
              <div onClick={handleDeleteImage}>
                {" "}
                <TrashCan color={"darkRed"} />
              </div>
            </div>
          )}
          <div className="text-center">
            <p className="mt-3 text-base">
              <b>Organization Logo</b>
            </p>
            <p className="text-xs mt-1">
              Preferred Image Dimensions: 240&times;240&times; pixels @ 72 DPI{" "}
              <br />
              Maximum File size 1MB
            </p>
          </div>
        </div>

        <p className="mt-4 text-textColor">
          <b>Organizational Details</b>
        </p>

        <div className="bg-white border-slate-200  border-2 rounded-md mt-4 p-5">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="relative ">
              <label htmlFor="location" className="text-slate-600">
                Organization Location
              </label>
              <div className="relative w-full mt-3">
                <select
                  value={inputData.organizationCountry}
                  onChange={handleInputChange}
                  name="organizationCountry"
                  id="Location"
                  className="block appearance-none w-full   text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                >
                  <option value="">Select a country</option>
                  {countryData && countryData.length > 0 ? (
                    countryData.map((item: any, index: number) => (
                      <option key={index} value={item.name}>
                        {item.name}
                      </option>
                    ))
                  ) : (
                    <option disabled></option>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div className=" ">
              <label
                htmlFor="organizationIndustry"
                className="text-slate-600 flex items-center gap-1"
              >
                <p> Industry </p>
                <div
                  className="mt-1"
                  onMouseEnter={() => handleTooltipToggle("industry", true)}
                  onMouseLeave={() => handleTooltipToggle("industry", false)}
                >
                  <Info size={18} color={"currentColor"} stroke={3} />
                  {tooltipState.industry && (
                    <div className="absolute z-10 -mt-32 -ms-28">
                      {renderCustomTooltip(
                        "Select your industry type to help us fine-tune your experience. If you can't find your industry type from the list of options, you can input your own."
                      )}
                    </div>
                  )}
                </div>
              </label>
              <div className=" w-full mt-2.5 relative">
                <select
                  value={inputData.organizationIndustry}
                  onChange={handleInputChange}
                  name="organizationIndustry"
                  id="organizationIndustry"
                  className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                >
                  <option value="">Select Industry</option>

                  {additionalData.industry &&
                  additionalData.industry.length > 0 ? (
                    additionalData.industry.map((item: any, index: any) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
          </div>
          <div className="pt-3">
            <label
              className="text-slate-600 flex items-center gap-1"
              htmlFor="organizationAddress"
            >
              Organization Address{" "}
              <div
                className="mt-1"
                onMouseEnter={() => handleTooltipToggle("address", true)}
                onMouseLeave={() => handleTooltipToggle("address", false)}
              >
                <Info size={18} color={"currentColor"} stroke={3} />
                {tooltipState.address && (
                  <div className="absolute -mt-24 -ms-28">
                    {renderCustomTooltip(
                      "You can display your organization's address in your preferred style. Edit  it in Settings > Preferences > General."
                    )}
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4 -mt-2 space-y-4 ">
            <div>
              <input
                className="pl-3 text-sm w-[100%] mt-4 placeholder-[#495160] rounded-md text-start bg-white  border border-inputBorder  h-[39px]  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder="Street 1"
                name="addline1"
                value={inputData.addline1}
                onChange={handleInputChange}
              />{" "}
            </div>

            <div>
              <input
                className="pl-3 text-sm w-[100%] placeholder-[#495160] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder="Street 1"
                name="addline2"
                value={inputData.addline2}
                onChange={handleInputChange}
              />{" "}
            </div>
            <div>
              <div className="-mt-4">
                <label className="text-slate-600 " htmlFor="City">
                  City
                </label>
              </div>
              <input
                className="pl-3 text-sm w-[100%] placeholder-[#495160] rounded-md text-start bg-white border border-inputBorder  h-[39px] p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder="Enter City"
                value={inputData.city}
                name="city"
                onChange={handleInputChange}
              />{" "}
            </div>

            <div>
              <div className="-mt-4">
                <label className="text-slate-600 " htmlFor="pincode">
                  Pin / Zip / Post code
                </label>
              </div>
              <input
                className="pl-3 text-sm w-[100%] placeholder-[#495160] rounded-md text-start bg-white border border-inputBorder  h-[39px] p-2 mt-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                placeholder=" Pin / Zip / Post code"
                type="text"
                value={inputData.pincode}
                name="pincode"
                onChange={handleInputChange}
              />{" "}
            </div>
            <div className="relative ">
              <div className="-mt-4">
                <label className="text-slate-600 " htmlFor="state">
                  State / Region / County
                </label>
              </div>
              <div className="relative w-full mt-2">
                <select
                  value={inputData.state}
                  onChange={handleInputChange}
                  name="state"
                  id="state"
                  className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white  focus:border-darkRed"
                  disabled={!inputData.organizationCountry}
                >
                  <option value="">State / Region / County</option>
                  {stateList.length > 0 ? (
                    stateList.map((item: any, index: number) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div>
              <div className="-mt-4">
                <label className="text-slate-600 " htmlFor="organizationPhNum">
                  Phone
                </label>
              </div>
              <div className="flex">
                <div className="relative w-24  mt-2 "></div>
              </div>
              <div className="w-full border-0">
                <PhoneInput
                inputClass="appearance-none text-[#818894] bg-white border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                inputStyle={{ height: "38px", width: "100%" }}
                containerStyle={{ width: "100%" }}
                country={"in"}
                value={inputData.organizationPhNum ? inputData.organizationPhNum:"" }
                onChange={handlePhoneChange}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4">
          <b>Website Address</b>
        </p>
        <div className="bg-white border-slate-200  border-2 rounded-md  mt-4 p-5">
          <label htmlFor="websit" className="text-slate-600">
            Website URL
          </label>
          <input
            type="text"
            placeholder="Value"
            className="pl-3 text-sm w-[100%] placeholder-[#495160] mt-3 rounded-md text-start bg-white border border-inputBorder  h-[39px] p-2  leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
            value={inputData.website}
            name="website"
            onChange={handleInputChange}
          />
        </div>
        <p className="mt-4">
          <b>Financial Settings</b>
        </p>
        <div className="bg-white  border-slate-200  border-2 rounded-md mt-4 p-5">
          <div className="grid grid-cols-2 gap-4 ">
            <div className="relative ">
              <label
                htmlFor="currency"
                className="text-slate-600 flex items-center gap-1"
              >
                Base Currency{" "}
                <div
                  className="mt-1"
                  onMouseEnter={() => handleTooltipToggle("baseCurrency", true)}
                  onMouseLeave={() =>
                    handleTooltipToggle("baseCurrency", false)
                  }
                >
                  <Info size={18} color={"currentColor"} stroke={3} />
                  {tooltipState.baseCurrency && (
                    <div className="absolute z-10 -top-5 left-32">
                      {renderCustomTooltip(
                        "Your transactions and financial reports will be shown in the base currency."
                      )}
                    </div>
                  )}
                </div>
              </label>

              <div className="relative w-full mt-3">
                <select
                  value={inputData.baseCurrency}
                  onChange={handleInputChange}
                  name="baseCurrency"
                  id="currency"
                  className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                >
                  <option value="">Select Currency</option>
                  {currencyData.map((item: any, index: number) => (
                    <option key={index} value={item.currencyCode}>
                      {item.currencyName} ({item.currencySymbol})
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="fiscalYear" className="text-slate-600">
                Financial Year
              </label>

              <div className="relative w-full mt-3">
                <select
                  value={inputData.fiscalYear}
                  onChange={handleInputChange}
                  name="fiscalYear"
                  id="fiscalYear"
                  className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                >
                  <option value="">Select Financial Year</option>

                  {additionalData.financialYear &&
                  additionalData.financialYear.length > 0 ? (
                    additionalData.financialYear.map(
                      (item: any, index: any) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
        <p className="mt-4">
          <b>Preferences</b>
        </p>
        <div className="bg-white  border-slate-200  border-2 rounded-md mt-4 p-5">
          <div className="grid grid-cols-12 gap-4 ">
            <div className="relative col-span-8">
              <label htmlFor="timeZone" className="text-slate-600">
                Time Zone
              </label>
              <div className="relative w-full my-3">
                <select
                  value={inputData.timeZone}
                  name="timeZone"
                  onChange={selectTimeZone}
                  id="timeZone"
                  className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                >
                  <option value="">Select Time Zone</option>
                  {additionalData.timezones &&
                  additionalData.timezones.length > 0 ? (
                    additionalData.timezones.map((item: any, index: any) => (
                      <option key={index} value={item.zone}>
                        {item.zone} - {item.description}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
            <div className="col-span-4"></div>
          </div>
          <div className="grid grid-cols-12 gap-4 mt-1">
            <div className="relative col-span-8 ">
              <label htmlFor="dateformat" className="text-slate-600">
                Date Format
              </label>
              <div className="relative w-full mt-3">
                <select
                  value={inputData.dateFormat}
                  onChange={selectDateFormat}
                  name="dateFormat"
                  id="dateFormat"
                  className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                >
                  <option value="">Select Date Format</option>
                  {additionalData?.dateFormats?.short &&
                  additionalData?.dateFormats.short.length > 0 ? (
                    <>
                      <optgroup label="Short">
                        {additionalData.dateFormats.short.map(
                          (item: any, index: any) => (
                            <option key={`short-${index}`} value={item.format}>
                              {item.format}
                            </option>
                          )
                        )}
                      </optgroup>
                    </>
                  ) : (
                    <></>
                  )}

                  {additionalData?.dateFormats?.medium &&
                  additionalData?.dateFormats.medium.length > 0 ? (
                    <>
                      <optgroup label="Medium">
                        {additionalData.dateFormats.medium.map(
                          (item: any, index: any) => (
                            <option key={`medium-${index}`} value={item.format}>
                              {item.format}
                            </option>
                          )
                        )}
                      </optgroup>
                    </>
                  ) : (
                    <></>
                  )}

                  {additionalData?.dateFormats?.long &&
                  additionalData?.dateFormats.long.length > 0 ? (
                    <>
                      <optgroup label="Long">
                        {additionalData.dateFormats.long.map(
                          (item: any, index: any) => (
                            <option key={`long-${index}`} value={item.format}>
                              {item.format}
                            </option>
                          )
                        )}
                      </optgroup>
                    </>
                  ) : (
                    <></>
                  )}
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
            <div className="relative col-span-4 mt-5">
              <div className="relative w-full mt-3">
                <select
                  value={inputData.dateSplit}
                  onChange={handleInputChange}
                  name="dateSplit"
                  id="dateSplit"
                  className="block appearance-none w-full text-[#495160] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                >
                  <option value="">Select Date Split</option>

                  {additionalData?.dateSplit &&
                  additionalData?.dateSplit.length > 0 ? (
                    additionalData?.dateSplit.map((item: any, index: any) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))
                  ) : (
                    <></>
                  )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <CehvronDown color="gray" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex my-4 gap-4">
          <Button
            variant="primary"
            size="sm"
            onClick={(e) => handleCreateOrganization(e)}
          >
            Save
          </Button>

          <Button variant="secondary" size="sm">
            Cancel
          </Button>
        </div>
      </form>

      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default CreateOrganizationForm;
