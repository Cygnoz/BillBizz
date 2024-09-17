import { ChangeEvent, useContext, useEffect, useState } from "react";
import Button from "../../../Components/Button";
import CehvronDown from "../../../assets/icons/CehvronDown";
import Upload from "../../../assets/icons/Upload";
import Modal from "../../../Components/model/Modal";
import PlusCircle from "../../../assets/icons/PlusCircle";
import CirclePlus from "../../../assets/icons/circleplus";
import Globe from "../../../assets/icons/Globe";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import { CustomerResponseContext } from "../../../context/ContextShare";
import Pen from "../../../assets/icons/Pen";

type Props = { page: string; customerDataProps?: CustomerData };
type CustomerData = {
  organizationId: string;
  customerType: string;
  salutation: string;
  firstName: string;
  lastName: string;
  companyName: string;
  customerDisplayName: string;
  customerEmail: string;
  workPhone: string;
  mobile: string;
  dob: string;
  cardNumber: string;
  pan: string;
  currency: string;
  openingBalance: string;
  paymentTerms: string;
  enablePortal: boolean;
  documents: string;
  department: string;
  designation: string;
  websiteURL: string;
  taxPreference: string;
  gstTreatment: string;
  gstin_uin: string;
  placeOfSupply: string;
  businessLegalName: string;
  businessTradeName: string;
  vatNumber: string;
  billingAttention: string;
  billingCountry: string;
  billingAddressLine1: string;
  billingAddressLine2: string;
  billingCity: string;
  billingState: string;
  billingPinCode: string;
  billingPhone: string;
  billingFaxNumber: string;
  shippingAttention: string;
  shippingCountry: string;
  shippingAddress1: string;
  shippingAddress2: string;
  shippingCity: string;
  shippingState: string;
  shippingPinCode: string;
  shippingPhone: string;
  shippingFaxNumber: string;
  contactPerson: {
    salutation: string;
    firstName: string;
    lastName: string;
    customerEmail: string;
    mobile: string;
  }[];
  remark: string;
};

const NewCustomerModal = ({ page }: Props) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  const [selected, setSelected] = useState<string | null>(null);
  const [taxselected, setTaxSelected] = useState<string | null>("Taxable");

  const [currencyData, setcurrencyData] = useState<any | []>([]);
  const [countryData, setcountryData] = useState<any | []>([]);
  const [stateList, setStateList] = useState<any | []>([]);
  const [shippingstateList, setshippingStateList] = useState<any | []>([]);
  const [placeOfSupplyList, setPlaceOfSupplyList] = useState<any | []>([]);
  const [activeTab, setActiveTab] = useState<string>("otherDetails");
  const [paymentTerms, setPaymentTerms] = useState<any | []>([]);
  const [gstOrVat, setgstOrVat] = useState<any | []>([]);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const { request: getCountryData } = useApi("get", 5004);
  const { request: getCurrencyData } = useApi("put", 5004);
  const { request: CreateCustomer } = useApi("post", 5002);
  const { request: getPaymentTerms } = useApi("get", 5004);
  const { request: getOrganization } = useApi("put", 5004);
  const { request: getTax } = useApi("put", 5002);
  const { setcustomerResponse } = useContext(CustomerResponseContext)!;
  const [errors, setErrors] = useState({
    salutation: false,
    customerType: false,
    currency: false,
    firstName: false,
    lastName: false,
    cardNumber: false,
    pan: false,
    customerDisplayName: false,
    customerEmail: false,
    workPhone: false,
    mobile: false,
    billingCountry: false,
    billingCity: false,
    billingPhone: false,
    openingBalance: false,
    department: false,
    billingPinCode: false,
    billingFaxNumber: false,
    billingState: false,
    shippingCountry: false,
    shippingPinCode: false,
    shippingFaxNumber: false,
    shippingPhone: false,
    shippingState: false,
    gstin_uin: false,
    gstTreatment: false,
  });
  const [rows, setRows] = useState([
    { salutation: "", firstName: "", lastName: "", email: "", mobile: "" },
  ]);
  const addRow = () => {
    setRows([
      ...rows,
      { salutation: "", firstName: "", lastName: "", email: "", mobile: "" },
    ]);
  };
  const [customerdata, setCustomerData] = useState<CustomerData>({
    organizationId: "INDORG0001",
    customerType: "",
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    customerDisplayName: "",
    customerEmail: "",
    workPhone: "",
    mobile: "",
    dob: "",
    cardNumber: "",
    pan: "",
    currency: "",
    openingBalance: "",
    paymentTerms: "",
    enablePortal: false,
    documents: "",
    department: "",
    designation: "",
    websiteURL: "",
    taxPreference: "Taxable",
    gstTreatment: "",
    gstin_uin: "",
    placeOfSupply: "",
    businessLegalName: "",
    businessTradeName: "",
    vatNumber: "",
    billingAttention: "",
    billingCountry: "",
    billingAddressLine1: "",
    billingAddressLine2: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingPhone: "",
    billingFaxNumber: "",
    shippingAttention: "",
    shippingCountry: "",
    shippingAddress1: "",
    shippingAddress2: "",
    shippingCity: "",
    shippingState: "",
    shippingPinCode: "",
    shippingPhone: "",
    shippingFaxNumber: "",
    contactPerson: [
      {
        salutation: "",
        firstName: "",
        lastName: "",
        customerEmail: "",
        mobile: "",
      },
    ],
    remark: "",
  });

  // console.log(customerdata, "data");

  const getTabClassName = (tabName: string) => {
    return activeTab === tabName
      ? "cursor-pointer font-bold text-darkRed border-darkRed"
      : "cursor-pointer font-bold border-neutral-300";
  };

  // data from radio
  const handleRadioChange = (
    type: string,
    field: "customerType" | "taxPreference"
  ) => {
    if (field === "customerType") {
      setSelected(type);
      setErrors({ ...errors, customerType: false });
    } else if (field === "taxPreference") {
      setTaxSelected(type);
    }

    setCustomerData((prevFormData) => ({
      ...prevFormData,
      [field]: type,
    }));
  };

  //data from table
  const handleRowChange = (
    index: number,
    field: keyof (typeof rows)[number],
    value: string
  ) => {
    const updatedRows = [...rows];
    updatedRows[index][field] = value;
    setRows(updatedRows);

    const updatedContactPerson = updatedRows.map((row) => ({
      salutation: row.salutation,
      firstName: row.firstName,
      lastName: row.lastName,
      customerEmail: row.email,
      mobile: row.mobile,
    }));

    setCustomerData((prevFormData) => ({
      ...prevFormData,
      contactPerson: updatedContactPerson,
    }));
  };

  const handleBillingPhoneChange = (value: string) => {
    setCustomerData((prevData) => ({
      ...prevData,
      billingPhone: value,
    }));
  };

  const handleShippingPhoneChange = (value: string) => {
    setCustomerData((prevData) => ({
      ...prevData,
      shippingPhone: value,
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setCustomerData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const getAdditionalData = async () => {
    try {
      // Fetching currency data
      const Currencyurl = `${endponits.GET_CURRENCY_LIST}`;
      const { response, error } = await getCurrencyData(Currencyurl, {
        organizationId: "INDORG0001",
      });

      if (!error && response) {
        setcurrencyData(response?.data);
      } else {
        console.log(error.response.data, "currency");
      }

      // fetching payment terms
      const paymentTermsUrl = `${endponits.GET_PAYMENT_TERMS}`;
      const { response: paymentTermResponse, error: paymentTermError } =
        await getPaymentTerms(paymentTermsUrl);

      if (!paymentTermError && paymentTermResponse) {
        setPaymentTerms(paymentTermResponse.data);
      } else {
        console.log(paymentTermError.response.data, "payment Terms");
      }

      // get tax data
      const taxUrl = `${endponits.GET_TAX}`;
      const { response: taxResponse, error: taxError } = await getTax(taxUrl, {
        organizationId: "INDORG0001",
      });

      if (!taxError && taxResponse) {
        if (taxResponse) {
          setgstOrVat(taxResponse.data);
        }
      } else {
        console.log(taxError.response.data, "tax");
      }

      // fetching country data
      const CountryUrl = `${endponits.GET_COUNTRY_DATA}`;
      const { response: countryResponse, error: countryError } =
        await getCountryData(CountryUrl, { organizationId: "INDORG0001" });
      if (!countryError && countryResponse) {
        setcountryData(countryResponse?.data[0].countries);
      } else {
        console.log(countryError, "country");
      }
    } catch (error) {
      console.log("Error in fetching additional Data", error);
    }
  };

  //api call
  const handleSubmit = async () => {
    const newErrors = { ...errors };
    if (customerdata.salutation === "") newErrors.salutation = true;
    if (customerdata.firstName === "") newErrors.firstName = true;
    if (customerdata.lastName === "") newErrors.lastName = true;
    if (customerdata.customerEmail === "") newErrors.customerEmail = true;
    if (customerdata.mobile === "") newErrors.mobile = true;
    if (customerdata.customerDisplayName === "")
      newErrors.customerDisplayName = true;
    if (customerdata.pan === "") newErrors.pan = true;
    if (customerdata.billingPhone === "") newErrors.billingPhone = true;
    if (customerdata.billingPinCode === "") newErrors.billingPinCode = true;
    if (customerdata.billingFaxNumber === "") newErrors.billingFaxNumber = true;
    if (customerdata.shippingPinCode === "") newErrors.shippingPinCode = true;
    if (customerdata.shippingPhone === "") newErrors.shippingPhone = true;
    if (customerdata.shippingFaxNumber === "")
      newErrors.shippingFaxNumber = true;
    if (customerdata.workPhone === "") newErrors.workPhone = true;
    if (customerdata.billingCity === "") newErrors.billingCity = true;
    if (customerdata.openingBalance === "") newErrors.openingBalance = true;
    if (customerdata.cardNumber === "") newErrors.cardNumber = true;
    if (customerdata.department === "") newErrors.department = true;
    if (customerdata.billingCountry === "") newErrors.billingCountry = true;
    if (customerdata.shippingCountry === "") newErrors.shippingCountry = true;
    if (customerdata.billingState === "") newErrors.billingState = true;
    if (customerdata.shippingState === "") newErrors.shippingState = true;
    if (customerdata.customerType === "") newErrors.customerType = true;
    if (customerdata.currency === "") newErrors.currency = true;

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }
    try {
      const url = `${endponits.ADD_CUSTOMER}`;
      const { response, error } = await CreateCustomer(url, customerdata);
      if (response && !error) {
        toast.success(response.data.message);
        setModalOpen(false);
        setcustomerResponse((prevCustomerResponse: any) => ({
          ...prevCustomerResponse,
          customerdata,
        }));
        setCustomerData({
          organizationId: "INDORG0001",
          customerType: "",
          salutation: "",
          firstName: "",
          lastName: "",
          companyName: "",
          customerDisplayName: "",
          customerEmail: "",
          workPhone: "",
          mobile: "",
          dob: "",
          cardNumber: "",
          pan: "",
          currency: "",
          openingBalance: "",
          paymentTerms: "",
          enablePortal: false,
          documents: "",
          department: "",
          designation: "",
          websiteURL: "",
          taxPreference: "",
          gstTreatment: "",
          gstin_uin: "",
          placeOfSupply: "",
          businessLegalName: "",
          businessTradeName: "",
          vatNumber: "",
          billingAttention: "",
          billingCountry: "",
          billingAddressLine1: "",
          billingAddressLine2: "",
          billingCity: "",
          billingState: "",
          billingPinCode: "",
          billingPhone: "",
          billingFaxNumber: "",
          shippingAttention: "",
          shippingCountry: "",
          shippingAddress1: "",
          shippingAddress2: "",
          shippingCity: "",
          shippingState: "",
          shippingPinCode: "",
          shippingPhone: "",
          shippingFaxNumber: "",
          contactPerson: [
            {
              salutation: "",
              firstName: "",
              lastName: "",
              customerEmail: "",
              mobile: "",
            },
          ],
          remark: "",
        });
      } else {
        console.log(error);

        toast.error(error.response?.data?.message);
        console.error(
          "Error creating customer:",
          error.response?.data?.message || error.message
        );
      }
    } catch (error) {
      console.error("Unexpected error:");
    }
  };

  const handleCopyAddress = (e: any) => {
    e.preventDefault();
    setCustomerData((prevData) => ({
      ...prevData,
      shippingAttention: customerdata.billingAttention,
      shippingCountry: customerdata.billingCountry,
      shippingAddress1: customerdata.billingAddressLine1,
      shippingAddress2: customerdata.billingAddressLine2,
      shippingCity: customerdata.billingCity,
      shippingState: customerdata.billingState,
      shippingPinCode: customerdata.billingPinCode,
      shippingPhone: customerdata.billingPhone,
      shippingFaxNumber: customerdata.billingFaxNumber,
    }));
  };

  useEffect(() => {
    if (customerdata.billingCountry) {
      const country = countryData.find(
        (c: any) => c.name === customerdata.billingCountry
      );
      if (country) {
        setStateList(country.states || []);
      }
    }

    if (customerdata.shippingCountry) {
      const country = countryData.find(
        (c: any) => c.name === customerdata.shippingCountry
      );
      if (country) {
        setshippingStateList(country.states || []);
      }
    }
  }, [customerdata.shippingCountry, customerdata.billingCountry, countryData]);

  const getOneOrganization = async () => {
    try {
      const url = `${endponits.GET_ONE_ORGANIZATION}`;
      const { response, error } = await getOrganization(url, {
        organizationId: "INDORG0001",
      });

      if (!error && response?.data) {
        setOneOrganization(response.data);
        // console.log(response.data,"org");
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };
  useEffect(() => {
    getAdditionalData();
    getOneOrganization();
    handleplaceofSupply();
  }, []);

  const handleplaceofSupply = () => {
    if (oneOrganization.organizationCountry) {
      const country = countryData.find(
        (c: any) =>
          c.name.toLowerCase() ===
          oneOrganization.organizationCountry.toLowerCase()
      );

      if (country) {
        const states = country.states;
        // console.log("States:", states);

        setPlaceOfSupplyList(states);
      } else {
        console.log("Country not found");
      }
    } else {
      console.log("No country selected");
    }
  };

  return (
    <div>
      {page && (page === "purchase" || page === "sales") ? (
        <div
          className="w-full flex col-span-10 px-4 justify-between"
          onClick={() => setModalOpen(true)}
        >
          <div className="flex items-center space-x-1">
            <CirclePlus color="darkRed" size="18" />
            <p className="text-[#820000] text-sm">
              <b>Add new Customer</b>
            </p>
          </div>
          <div className="col-span-2 text-end text-2xl cursor-pointer relative">
            &times;
          </div>
        </div>
      ) : page && page === "CustomerEdit" ? (
        <Button
          onClick={() => setModalOpen(true)}
          variant="secondary"
          size="sm"
          className="text-[10px] h-6 px-5"
        >
          <Pen color={"#303F58"} />
          Edit
        </Button>
      ) : (
        <Button onClick={() => setModalOpen(true)} variant="primary" size="sm">
          <PlusCircle color="white" />
          <p className="text-sm font-medium">Add Customer</p>
        </Button>
      )}

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        className=""
        style={{ width: "80%" }}
      >
        <>
          <div className="p-5 mt-3">
            <div className="mb-5 flex p-2 rounded-xl bg-CreamBg relative overflow-hidden items-center">
              <div className="relative ">
                <h3 className="text-lg font-bold text-textColor">
                  Add New Customer
                </h3>
              </div>
              <div
                className="ms-auto text-3xl cursor-pointer relative z-10"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </div>
            </div>
            <form
              className="text-slate-600 text-sm overflow-scroll hide-scrollbar space-y-5 p-2"
              style={{ height: "480px" }}
            >
              <div>
                <label
                  className="block text-sm mb-1 text-labelColor"
                  htmlFor=""
                >
                  Customer Type
                </label>
                <div className="flex items-center space-x-4 text-textColor text-sm">
                  <div className="flex gap-2 justify-center items-center">
                    <div className="grid place-items-center mt-1">
                      <input
                        id="Business"
                        type="radio"
                        name="customerType"
                        className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                          selected === "Business"
                            ? "border-8 border-neutral-400"
                            : "border-1 border-neutral-400"
                        }`}
                        checked={selected === "Business"}
                        onChange={() =>
                          handleRadioChange("Business", "customerType")
                        }
                      />
                      <div
                        className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                          selected === "Business"
                            ? "bg-neutral-100"
                            : "bg-transparent"
                        }`}
                      />
                    </div>
                    <label
                      htmlFor="Business"
                      className="text-start font-medium"
                    >
                      Business
                    </label>
                  </div>
                  <div className="flex gap-2 justify-center items-center">
                    <div className="grid place-items-center mt-1">
                      <input
                        id="Individual"
                        type="radio"
                        name="customerType"
                        className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                          selected === "Individual"
                            ? "border-8 border-neutral-400"
                            : "border-1 border-neutral-400"
                        }`}
                        checked={selected === "Individual"}
                        onChange={() =>
                          handleRadioChange("Individual", "customerType")
                        }
                      />
                      <div
                        className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                          selected === "Individual"
                            ? "bg-neutral-100"
                            : "bg-transparent"
                        }`}
                      />
                    </div>
                    <label
                      htmlFor="Individual"
                      className="text-start font-medium"
                    >
                      Individual
                    </label>
                  </div>
                </div>
                {errors.customerType && (
                  <div className="text-red-800 text-xs ms-2 mt-1">
                    Please select a customer type.
                  </div>
                )}
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-2">
                  <label htmlFor="salutation">Salutation</label>
                  <div className="relative w-full">
                    <select
                      name="salutation"
                      className="block appearance-none w-full h-9 mt-1 text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      value={customerdata.salutation}
                      onChange={handleChange}
                      onBlur={() => {
                        if (customerdata.salutation === "") {
                          setErrors({ ...errors, salutation: true });
                        } else {
                          setErrors({ ...errors, salutation: false });
                        }
                      }}
                    >
                      <option value="">Value</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />
                    </div>
                  </div>
                  {errors.salutation && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Please select a salutation
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 col-span-10 gap-4 ">
                  <div>
                    <label htmlFor="firstName" className="text-slate-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                      placeholder="Enter First Name"
                      value={customerdata.firstName}
                      onChange={handleChange}
                      onBlur={() => {
                        if (
                          customerdata.firstName === "" ||
                          !/^[A-Za-z]+$/.test(customerdata.firstName)
                        ) {
                          setErrors({ ...errors, firstName: true });
                        } else {
                          setErrors({ ...errors, firstName: false });
                        }
                      }}
                    />

                    {errors.firstName && (
                      <div className="text-red-800 text-xs ms-2 mt-1">
                        Please enter a valid first name (letters only).
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="lastName" className="text-slate-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                      placeholder="Enter Last Name"
                      value={customerdata.lastName}
                      onChange={handleChange}
                      onBlur={() => {
                        if (
                          customerdata.lastName === "" ||
                          !/^[A-Za-z]+$/.test(customerdata.lastName)
                        ) {
                          setErrors({ ...errors, lastName: true });
                        } else {
                          setErrors({ ...errors, lastName: false });
                        }
                      }}
                    />

                    {errors.lastName && (
                      <div className="text-red-800 text-xs ms-2 mt-1">
                        Please enter a valid Last name (letters only).
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label htmlFor="companyName">Company Name </label>
                  <input
                    type="text"
                    name="companyName"
                    className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Company Name"
                    value={customerdata.companyName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="companyName">Customer Display Name </label>
                  <input
                    required
                    type="text"
                    name="customerDisplayName"
                    className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Display Name"
                    value={customerdata.customerDisplayName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="">Customer Email</label>
                  <input
                    type="text"
                    name="customerEmail"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Email"
                    value={customerdata.customerEmail}
                    onChange={handleChange}
                    onFocus={() =>
                      setErrors({ ...errors, customerEmail: false })
                    }
                    onBlur={() => {
                      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (
                        customerdata.customerEmail === "" ||
                        !emailPattern.test(customerdata.customerEmail)
                      ) {
                        setErrors({ ...errors, customerEmail: true });
                      }
                    }}
                  />
                  {errors.customerEmail && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter a valid Email
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="tel"
                    className="pl-2 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                    placeholder="Enter Card Number"
                    name="cardNumber"
                    value={customerdata.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    onFocus={() => setErrors({ ...errors, cardNumber: false })}
                    onBlur={() => {
                      if (customerdata.cardNumber === "") {
                        setErrors({ ...errors, cardNumber: true });
                      }
                    }}
                  />

                  {errors.cardNumber && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Please enter a valid card number (digits only).
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label htmlFor="">Work Phone</label>
                  <input
                    type="text"
                    name="workPhone"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Value"
                    value={customerdata.workPhone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    onFocus={() => setErrors({ ...errors, workPhone: false })}
                    onBlur={() => {
                      if (customerdata.workPhone === "") {
                        setErrors({ ...errors, workPhone: true });
                      }
                    }}
                  />
                  {errors.workPhone && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter Work Phone
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Value"
                    value={customerdata.mobile}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    onFocus={() => setErrors({ ...errors, mobile: false })}
                    onBlur={() => {
                      if (customerdata.mobile === "") {
                        setErrors({ ...errors, mobile: true });
                      }
                    }}
                  />
                  {errors.mobile && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter Mobile
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="">Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    className="pl-2 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Value"
                    value={customerdata.dob}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4"></div>

              <div className="flex mt-5 px-5">
                <div className="w-[20%] bg-gray-100 p-4">
                  <ul className="h-full   space-y-0 border-gray-300 text-slate-700">
                    <li
                      className={`${getTabClassName(
                        "otherDetails"
                      )} border-r-4  p-2 `}
                      onClick={() => setActiveTab("otherDetails")}
                    >
                      Other Details
                    </li>
                    <li
                      className={`${getTabClassName("taxes")} border-r-4  p-2`}
                      onClick={() => setActiveTab("taxes")}
                    >
                      Taxes
                    </li>
                    <li
                      className={`${getTabClassName(
                        "address"
                      )} border-r-4  p-2`}
                      onClick={() => setActiveTab("address")}
                    >
                      Address
                    </li>
                    <li
                      className={`${getTabClassName(
                        "contactPersons"
                      )} border-r-4  p-2`}
                      onClick={() => setActiveTab("contactPersons")}
                    >
                      Contact Persons
                    </li>
                    <li
                      className={`${getTabClassName("remarks")} border-r-4 p-2`}
                      onClick={() => setActiveTab("remarks")}
                    >
                      Remarks
                    </li>
                  </ul>
                </div>
                <div className=" w-full p-2 ps-16">
                  {activeTab === "otherDetails" && (
                    <div className="space-y-4  p-4 ">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">Opening Balance</label>
                          <input
                            type="text"
                            className="text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                            placeholder="Enter Opening Balance"
                            name="openingBalance"
                            value={customerdata.openingBalance}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*\.?\d*$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            onFocus={() =>
                              setErrors({ ...errors, openingBalance: false })
                            }
                            onBlur={() => {
                              if (customerdata.openingBalance === "") {
                                setErrors({ ...errors, openingBalance: true });
                              }
                            }}
                          />
                          {errors.openingBalance && (
                            <div className="text-red-800 text-xs ms-2 mt-1">
                              Please enter a valid Amount.
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="block mb-1">PAN</label>
                          <input
                            type="text"
                            className="text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                            placeholder="Enter PAN Number"
                            name="pan"
                            value={customerdata.pan}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^[A-Za-z0-9]*$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            onFocus={() => setErrors({ ...errors, pan: false })}
                            onBlur={() => {
                              if (customerdata.pan === "") {
                                setErrors({ ...errors, pan: true });
                              }
                            }}
                          />
                          {errors.pan && (
                            <div className="text-red-800 text-xs ms-2 mt-1">
                              Please enter a valid PAN number (alphanumeric
                              characters only).
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="">
                            <label htmlFor="" className="block mb-1">
                              Currency
                            </label>
                            <div className="relative w-full">
                              <select
                                className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                                name="currency"
                                value={customerdata.currency}
                                onChange={handleChange}
                                onFocus={() =>
                                  setErrors({ ...errors, currency: false })
                                }
                                onBlur={() => {
                                  if (customerdata.currency === "") {
                                    setErrors({ ...errors, currency: true });
                                  }
                                }}
                              >
                                <option value="">Select Currency</option>

                                {currencyData.map(
                                  (item: any, index: number) => (
                                    <option
                                      key={index}
                                      value={item.currencyCode}
                                    >
                                      {item.currencyName} ({item.currencySymbol}
                                      )
                                    </option>
                                  )
                                )}
                              </select>
                              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <CehvronDown color="gray" />
                              </div>
                            </div>
                            {errors.currency && (
                              <div className="text-red-800 text-xs ms-2 mt-1">
                                Please select a currency.
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label htmlFor="" className="block mb-1">
                            Payment Terms
                          </label>
                          <select
                            className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                            name="paymentTerms"
                            value={customerdata.paymentTerms}
                            onChange={handleChange}
                          >
                            <option value="" className="text-gray">
                              Select Payment Terms
                            </option>
                            {paymentTerms &&
                              paymentTerms.map((item: any) => (
                                <option
                                  key={item._id}
                                  value={item.name}
                                  className="text-gray"
                                >
                                  {item.name}
                                </option>
                              ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0  mt-6 right-0 flex items-center px-2 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                      </div>

                      <div className="bg-lightPink p-5 rounded-lg space-y-5">
                        <p className="font-bold text-">Enable Portal?</p>
                        <div className="flex items-center mt-4 gap-1 text-textColor">
                          <input
                            name="enablePortal"
                            checked={customerdata.enablePortal}
                            onClick={(e: any) => handleChange(e)}
                            type="checkbox"
                            className=" h-6 w-5 mx-1 customCheckbox"
                            id=""
                          />
                          <label htmlFor="" className="text-textColor text-sm ">
                            Allow portal access to this customer
                          </label>
                        </div>
                        <div className="relative w-[349px]">
                          <label htmlFor="" className="block mb-1 ">
                            Select Language
                          </label>
                          <select
                            className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                            name="currency"
                            // value={customerdata.}
                            onChange={handleChange}
                          >
                            <option
                              value="Payment On Due"
                              className="text-gray"
                            >
                              English
                            </option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0  mt-6 right-0 flex items-center px-2 text-gray-700">
                            <CehvronDown color="gray" />
                          </div>
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block mb-1">
                          Documents
                          <div className="border-dashed border border-neutral-300 p-2 rounded flex gap-2">
                            <Upload />
                            <span>Upload File</span>
                          </div>
                          <p className="text-xs mt-1 text-gray-600">
                            You Can Upload a Maximum of 10 Files, 10 MB each
                          </p>
                          <input
                            type="file"
                            className="hidden"
                            value={customerdata.documents}
                            name="documents"
                            // onChange={(e)=>handleFileChange(e)}
                          />
                        </label>
                      </div>

                      <div>
                        <label className="block mb-1">Derpartment</label>
                        <input
                          type="text"
                          className=" text-sm w-[49%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                          placeholder="Value"
                          name="department"
                          value={customerdata.department}
                          onChange={handleChange}
                          onBlur={() => {
                            if (
                              customerdata.department === "" ||
                              !/^[A-Za-z]+$/.test(customerdata.department)
                            ) {
                              setErrors({ ...errors, department: true });
                            } else {
                              setErrors({ ...errors, department: false });
                            }
                          }}
                        />
                        {errors.department && (
                          <div className="text-red-800 text-xs ms-2 mt-1">
                            Please enter Department
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block mb-1">Designation</label>

                        <input
                          type="text"
                          className=" text-sm w-[49%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                          placeholder="Value"
                          name="designation"
                          value={customerdata.designation}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="">
                        <label htmlFor="" className="block mb-1">
                          Website
                        </label>
                        <div className="relative w-full">
                          <div className="pointer-events-none absolute inset-y-0  flex items-center px-2 text-gray-700 w-[50%]">
                            <Globe />
                          </div>
                          <input
                            type="text"
                            className=" text-sm w-[49%] ps-9 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                            placeholder="Value"
                            name="websiteURL"
                            value={customerdata.websiteURL}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "taxes" && (
                    <>
                      <div className="mb-3">
                        <label
                          className="block text-sm mb-1 text-labelColor"
                          htmlFor=""
                        >
                          Tax Preference
                        </label>
                        <div className="flex items-center space-x-4 text-textColor text-sm">
                          <div className="flex gap-2 justify-center items-center">
                            <div className="grid place-items-center mt-1">
                              <input
                                id="Taxable"
                                type="radio"
                                name="taxPreference"
                                className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                                  taxselected === "Taxable"
                                    ? "border-8 border-neutral-400"
                                    : "border-1 border-neutral-400"
                                }`}
                                checked={taxselected === "Taxable"}
                                onChange={() =>
                                  handleRadioChange("Taxable", "taxPreference")
                                }
                              />
                              <div
                                className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                                  taxselected === "Taxable"
                                    ? "bg-neutral-100"
                                    : "bg-transparent"
                                }`}
                              />
                            </div>
                            <label
                              htmlFor="Taxable"
                              className="text-start font-medium"
                            >
                              Taxable
                            </label>
                          </div>
                          <div className="flex gap-2 justify-center items-center">
                            <div className="grid place-items-center mt-1">
                              <input
                                id="Tax Exempt"
                                type="radio"
                                name="taxPreference"
                                className={`col-start-1 row-start-1 appearance-none shrink-0 w-5 h-5 rounded-full border ${
                                  taxselected === "Tax Exempt"
                                    ? "border-8 border-neutral-400"
                                    : "border-1 border-neutral-400"
                                }`}
                                checked={taxselected === "Tax Exempt"}
                                onChange={() =>
                                  handleRadioChange(
                                    "Tax Exempt",
                                    "taxPreference"
                                  )
                                }
                              />
                              <div
                                className={`col-start-1 row-start-1 w-2 h-2 rounded-full ${
                                  taxselected === "Tax Exempt"
                                    ? "bg-neutral-100"
                                    : "bg-transparent"
                                }`}
                              />
                            </div>
                            <label
                              htmlFor="Tax Exempt"
                              className="text-start font-medium"
                            >
                              Tax Exempt
                            </label>
                          </div>
                        </div>
                      </div>

                      {customerdata.taxPreference == "Taxable" && (
                        <>
                          {gstOrVat.taxType === "GST" && (
                            <div>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="relative w-full">
                                  <label
                                    htmlFor="gstTreatment"
                                    className="block mb-1"
                                  >
                                    GST Treatment
                                  </label>
                                  <select
                                    className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="gstTreatment"
                                    value={customerdata.gstTreatment}
                                    onChange={handleChange}
                                    onFocus={() =>
                                      setErrors({
                                        ...errors,
                                        gstTreatment: false,
                                      })
                                    }
                                    onBlur={() => {
                                      if (
                                        customerdata.gstTreatment.trim() === ""
                                      ) {
                                        setErrors({
                                          ...errors,
                                          gstTreatment: true,
                                        });
                                      }
                                    }}
                                  >
                                    <option value="" className="text-gray">
                                      Select GST Treatment
                                    </option>
                                    {gstOrVat?.gstTreatment?.map(
                                      (item: any, index: number) => (
                                        <option value={item} key={index}>
                                          {item}
                                        </option>
                                      )
                                    )}
                                  </select>

                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                                    <CehvronDown color="gray" />
                                  </div>

                                  {errors.gstTreatment && (
                                    <div className="text-red-800 text-xs ms-2 mt-1">
                                      Please select a GST Treatment.
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label
                                    htmlFor="gstin_uin"
                                    className="block mb-1"
                                  >
                                    GSTIN/UIN
                                  </label>
                                  <input
                                    type="text"
                                    name="gstin_uin"
                                    className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                    placeholder="GSTIN/UIN"
                                    value={customerdata.gstin_uin}
                                    onChange={(e) => {
                                      const value = e.target.value;
                                      if (/^[A-Za-z0-9]*$/.test(value)) {
                                        handleChange(e);
                                      }
                                    }}
                                    onFocus={() =>
                                      setErrors({ ...errors, gstin_uin: false })
                                    }
                                    onBlur={() => {
                                      if (
                                        customerdata.gstin_uin.trim() === ""
                                      ) {
                                        setErrors({
                                          ...errors,
                                          gstin_uin: true,
                                        });
                                      }
                                    }}
                                  />
                                  {errors.gstin_uin && (
                                    <div className="text-red-800 text-xs ms-2 mt-1">
                                      Please enter a valid GSTIN/UIN
                                      (alphanumeric characters only).
                                    </div>
                                  )}
                                </div>

                                <div>
                                  <label
                                    htmlFor="businessLegalName"
                                    className="block mb-1"
                                  >
                                    Business Legal Name
                                  </label>
                                  <input
                                    type="text"
                                    name="businessLegalName"
                                    className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                    placeholder="Enter Business Legal Name"
                                    value={customerdata.businessLegalName}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div>
                                  <label
                                    htmlFor="businessTradeName"
                                    className="block mb-1"
                                  >
                                    Business Trade Name
                                  </label>
                                  <input
                                    type="text"
                                    name="businessTradeName"
                                    className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                    placeholder="Enter Business Trade Name"
                                    value={customerdata.businessTradeName}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="relative w-full">
                                  <label
                                    htmlFor="placeOfSupply"
                                    className="block mb-1"
                                  >
                                    Place of Supply
                                  </label>
                                  <select
                                    className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="placeOfSupply"
                                    value={customerdata.placeOfSupply}
                                    onChange={handleChange}
                                  >
                                    <option value="" className="text-gray">
                                      Value
                                    </option>
                                    {placeOfSupplyList.length > 0 &&
                                      placeOfSupplyList.map(
                                        (item: any, index: number) => (
                                          <option
                                            key={index}
                                            value={item}
                                            className="text-gray"
                                          >
                                            {item}
                                          </option>
                                        )
                                      )}
                                  </select>
                                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 mt-6 text-gray-700">
                                    <CehvronDown color="gray" />
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                          {gstOrVat.taxType === "VAT" && (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <label
                                  htmlFor="vatNumber"
                                  className="block mb-1"
                                >
                                  VAT Number
                                </label>
                                <input
                                  type="text"
                                  name="vatNumber"
                                  className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                  placeholder="Enter VAT Number"
                                  value={customerdata.vatNumber}
                                  onChange={handleChange}
                                />
                              </div>
                              <div>
                                <label
                                  htmlFor="businessTradeName"
                                  className="block mb-1"
                                >
                                  Business Trade Name
                                </label>
                                <input
                                  type="text"
                                  name="businessTradeName"
                                  className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                  placeholder="Enter Business Trade Name"
                                  value={customerdata.businessTradeName}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {customerdata.taxPreference === "Tax Exempt" && (
                        <div>
                          <label className="block mb-1">Exemption Reason</label>
                          <input
                            type="text"
                            className="pl-2 text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                            placeholder="Value"
                            //  name="billingAttention"
                            //  value={customerdata.billingAttention}
                            //  onChange={handleChange}
                          />
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === "address" && (
                    <>
                      {/* Billing Address */}
                      <div className="space-y-3 p-5 text-sm">
                        <p>
                          <b>Billing Address</b>
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                          {/* Attention */}
                          <div>
                            <label className="block mb-1">Attention</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                              placeholder="Value"
                              name="billingAttention"
                              value={customerdata.billingAttention}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Country */}
                          <div className="relative w-full">
                            <label
                              htmlFor="billingCountry"
                              className="mb-1 block"
                            >
                              Country/Region
                            </label>
                            <select
                              className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="billingCountry"
                              value={customerdata.billingCountry}
                              onChange={handleChange}
                              onFocus={() =>
                                setErrors({ ...errors, billingCountry: false })
                              }
                              onBlur={() => {
                                if (customerdata.billingCountry === "") {
                                  setErrors({
                                    ...errors,
                                    billingCountry: true,
                                  });
                                }
                              }}
                            >
                              <option value="">Select a country</option>
                              {countryData && countryData.length > 0 ? (
                                countryData.map((item: any, index: number) => (
                                  <option key={index} value={item.name}>
                                    {item.name}
                                  </option>
                                ))
                              ) : (
                                <option disabled>No countries available</option>
                              )}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                            {errors.billingCountry && (
                              <div className="text-red-800 text-xs ms-2 mt-1">
                                Please select a country/region.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Address */}
                        <div className="">
                          <label
                            className="text-slate-600 "
                            htmlFor="organizationAddress"
                          >
                            Address
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 1"
                              name="billingAddressLine1"
                              value={customerdata.billingAddressLine1}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 2"
                              name="billingAddressLine2"
                              value={customerdata.billingAddressLine2}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 " htmlFor="">
                              City
                            </label>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Enter City"
                              name="billingCity"
                              value={customerdata.billingCity}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="relative ">
  <label className="text-slate-600" htmlFor="organizationAddress">
    State / Region / County
  </label>
  <div className="relative w-full mt-2">
    <select
      value={customerdata.billingState}
      onChange={handleChange}
      name="billingState"
      id="billingState"
      className="block appearance-none w-full text-[#818894] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
      disabled={!customerdata.billingCountry}
      onFocus={() => setErrors({ ...errors, billingState: false })}
      onBlur={() => {
        if (customerdata.billingState.trim() === "") {
          setErrors({ ...errors, billingState: true });
        }
      }}
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

  {/* Error message for invalid input */}
  {errors.billingState && (
    <div className="text-red-800 text-xs ms-2 mt-1">
      Please select a State / Region / County.
    </div>
  )}
</div>

                        </div>

                        {/* Other fields */}
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div>
                            <label
                              className="text-slate-600"
                              htmlFor="billingPinCode"
                            >
                              Pin / Zip / Post code
                            </label>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Pin / Zip / Post code"
                              type="text"
                              name="billingPinCode"
                              value={customerdata.billingPinCode}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  handleChange(e);
                                }
                              }}
                              onFocus={() =>
                                setErrors({ ...errors, billingPinCode: false })
                              }
                              onBlur={() => {
                                if (customerdata.billingPinCode.trim() === "") {
                                  setErrors({
                                    ...errors,
                                    billingPinCode: true,
                                  });
                                }
                              }}
                            />
                            {errors.billingPinCode && (
                              <div className="text-red-800 text-xs ms-2 mt-1">
                                Please enter a valid Pincode (digits only).
                              </div>
                            )}
                          </div>

                          <div>
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Phone
                            </label>
                            <div className="w-full border-0 mt-2">
                              <PhoneInput
                                inputClass="appearance-none text-[#818894] bg-white border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                inputStyle={{ height: "38px", width: "100%" }}
                                containerStyle={{ width: "100%" }}
                                country={
                                  customerdata.billingCountry
                                    ? customerdata.billingCountry.toLowerCase()
                                    : "in"
                                }
                                value={customerdata.billingPhone}
                                onChange={(value) =>
                                  handleBillingPhoneChange(value)
                                }
                                onBlur={() => {
                                  if (
                                    !customerdata.billingPhone ||
                                    customerdata.billingPhone.length < 10
                                  ) {
                                    setErrors({
                                      ...errors,
                                      billingPhone: true,
                                    });
                                  } else {
                                    setErrors({
                                      ...errors,
                                      billingPhone: false,
                                    });
                                  }
                                }}
                              />
                              {errors.billingPhone && (
                                <div className="text-red-800 text-xs ms-2 mt-1">
                                  Enter a valid phone number
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-2 block">
                              Fax Number
                            </label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-slate-300 h-9 p-2 "
                              placeholder="Enter Fax Number"
                              name="billingFaxNumber"
                              value={customerdata.billingFaxNumber}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  handleChange(e);
                                }
                              }}
                              onFocus={() =>
                                setErrors({
                                  ...errors,
                                  billingFaxNumber: false,
                                })
                              }
                              onBlur={() => {
                                if (
                                  customerdata.billingFaxNumber.trim() === ""
                                ) {
                                  setErrors({
                                    ...errors,
                                    billingFaxNumber: true,
                                  });
                                }
                              }}
                            />
                            {errors.billingFaxNumber && (
                              <div className="text-red-800 text-xs ms-2 mt-1">
                                Please enter a valid Fax Number (digits only).
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Shipping Address */}
                      <div className="space-y-3 p-5 text-sm">
                        <div className="flex">
                          <p>
                            <b>Shipping Address</b>
                          </p>
                          <button
                            className="ml-auto text-gray"
                            onClick={handleCopyAddress}
                          >
                            <b>Copy Billing Address</b>
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          {/* Attention */}
                          <div>
                            <label className="block mb-1">Attention</label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-slate-300 h-9 p-2 "
                              placeholder="Value"
                              name="shippingAttention"
                              value={customerdata.shippingAttention}
                              onChange={handleChange}
                            />
                          </div>

                          {/* Country */}
                          <div className="relative w-full">
  <label htmlFor="" className="mb-1 block">
    Country/Region
  </label>
  <select
    className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm pl-2 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
    name="shippingCountry"
    value={customerdata.shippingCountry}
    onChange={handleChange}
    onFocus={() => setErrors({ ...errors, shippingCountry: false })}
    onBlur={() => {
      if (customerdata.shippingCountry.trim() === "") {
        setErrors({ ...errors, shippingCountry: true });
      }
    }}
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
  <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
    <CehvronDown color="gray" />
  </div>

  {errors.shippingCountry && (
    <div className="text-red-800 text-xs ms-2 mt-1">
      Please select a country/region.
    </div>
  )}
</div>

                        </div>

                        {/* Address */}
                        <div className="">
                          <label
                            className="text-slate-600 "
                            htmlFor="organizationAddress"
                          >
                            Address
                          </label>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 1"
                              name="shippingAddressLine1"
                              value={customerdata.shippingAddress1}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 2"
                              name="shippingAddressLine2"
                              value={customerdata.shippingAddress2}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <label className="text-slate-600 " htmlFor="">
                              City
                            </label>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Enter City"
                              name="shippingCity"
                              value={customerdata.shippingCity}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="relative ">
  <label className="text-slate-600" htmlFor="organizationAddress">
    State / Region / County
  </label>
  <div className="relative w-full mt-2">
    <select
      value={customerdata.shippingState}
      onChange={handleChange}
      name="shippingState"
      id="shippingState"
      className="block appearance-none w-full text-[#818894] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
      disabled={!customerdata.shippingCountry}
      onFocus={() => setErrors({ ...errors, shippingState: false })}
      onBlur={() => {
        if (customerdata.shippingState.trim() === "") {
          setErrors({ ...errors, shippingState: true });
        }
      }}
    >
      <option value="">State / Region / County</option>
      {shippingstateList.length > 0 ? (
        shippingstateList.map((item: any, index: number) => (
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

  {errors.shippingState && (
    <div className="text-red-800 text-xs ms-2 mt-1">
      Please select a state/region/county.
    </div>
  )}
</div>

                        </div>

                        {/* Other fields */}
                        <div className="grid grid-cols-3 gap-4 pt-2">
                          <div>
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Pin / Zip / Post code
                            </label>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 mt-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder=" Pin / Zip / Post code"
                              type="text"
                              name="shippingPinCode"
                              value={customerdata.shippingPinCode}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  handleChange(e);
                                }
                              }}
                              onFocus={() =>
                                setErrors({ ...errors, shippingPinCode: false })
                              }
                              onBlur={() => {
                                if (
                                  customerdata.shippingPinCode.trim() === ""
                                ) {
                                  setErrors({
                                    ...errors,
                                    shippingPinCode: true,
                                  });
                                }
                              }}
                            />
                            {errors.shippingPinCode && (
                              <div className="text-red-800 text-xs ms-2 mt-1">
                                Please enter a valid Pincode (digits only).
                              </div>
                            )}
                          </div>
                          <div>
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              Phone
                            </label>
                            <div className="w-full border-0 mt-2">
                              <PhoneInput
                                inputClass="appearance-none text-[#818894] bg-white border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                inputStyle={{ height: "38px", width: "100%" }}
                                containerStyle={{ width: "100%" }}
                                country={
                                  customerdata.shippingCountry
                                    ? customerdata.shippingCountry.toLowerCase()
                                    : "in"
                                }
                                value={customerdata.shippingPhone}
                                onChange={(value) =>
                                  handleShippingPhoneChange(value)
                                }
                                onBlur={() => {
                                  if (
                                    !customerdata.shippingPhone ||
                                    customerdata.shippingPhone.length < 10
                                  ) {
                                    setErrors({
                                      ...errors,
                                      shippingPhone: true,
                                    });
                                  } else {
                                    setErrors({
                                      ...errors,
                                      shippingPhone: false,
                                    });
                                  }
                                }}
                              />
                              {errors.shippingPhone && (
                                <div className="text-red-800 text-xs ms-2 mt-1">
                                  Enter a valid phone number
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-2 block">
                              Fax Number
                            </label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-slate-300 h-9 p-2 "
                              placeholder="Enter Fax Number"
                              name="shippingFaxNumber"
                              value={customerdata.shippingFaxNumber}
                              onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value)) {
                                  handleChange(e);
                                }
                              }}
                              onFocus={() =>
                                setErrors({
                                  ...errors,
                                  shippingFaxNumber: false,
                                })
                              }
                              onBlur={() => {
                                if (
                                  customerdata.shippingFaxNumber.trim() === ""
                                ) {
                                  setErrors({
                                    ...errors,
                                    shippingFaxNumber: true,
                                  });
                                }
                              }}
                            />
                            {errors.shippingFaxNumber && (
                              <div className="text-red-800 text-xs ms-2 mt-1">
                                Please enter a valid Fax Number (digits only).
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {activeTab === "contactPersons" && (
                    <>
                      <div className="rounded-lg border-2 border-tableBorder mt-5">
                        <table className="min-w-full bg-white rounded-lg relative mb-4 border-dropdownText">
                          <thead className="text-[12px] text-center text-dropdownText">
                            <tr className="bg-lightPink">
                              <th className="py-2 px-5 font-medium border-b border-tableBorder relative">
                                Salutation
                              </th>
                              <th className="py-2 px-5 font-medium border-b border-tableBorder relative">
                                FirstName
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                LastName
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Email Address
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Mobile
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-dropdownText text-center text-[13px]">
                            {rows.map((row, index) => (
                              <tr className="relative text-center" key={index}>
                                <td className="py-2.5 px- border-y border-tableBorder justify-center mt-4 gap-2 items-center flex-1">
                                  <div className="relative w-full">
                                    <select
                                      className="block relative appearance-none w-full h-9 text-[#818894] focus:border-none  bg-white text-sm text-center border-none rounded-md leading-tight"
                                      value={row.salutation}
                                      onChange={(e) =>
                                        handleRowChange(
                                          index,
                                          "salutation",
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value="" className="text-gray">
                                        Select
                                      </option>
                                      <option value="Mr" className="text-gray">
                                        Mr
                                      </option>
                                      <option value="Mrs" className="text-gray">
                                        Mrs
                                      </option>
                                      <option
                                        value="Miss"
                                        className="text-gray"
                                      >
                                        Miss
                                      </option>
                                      <option value="Dr" className="text-gray">
                                        Dr
                                      </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 -right-8 flex items-center px-2 text-gray-700">
                                      <CehvronDown color="gray" />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2.5 px-4  border-y border-tableBorder">
                                  <input
                                    type="text"
                                    value={row.firstName}
                                    className="text-sm w-[100%] text-center rounded-md bg-white h-9 p-2 mx-4 text-[#818894]"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder flex-1">
                                  <input
                                    type="text"
                                    value={row.lastName}
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2 text-[#818894]"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    value={row.email}
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2 text-[#818894]"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "email",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 px-4 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    value={row.mobile}
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2 text-[#818894]"
                                    placeholder="Value"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "mobile",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div
                        className="flex gap-2 text-darkRed font-bold items-center my-4 cursor-pointer"
                        onClick={addRow}
                      >
                        <PlusCircle color={"darkRed"} />
                        Add Contact Person
                      </div>
                    </>
                  )}
                  {activeTab === "remarks" && (
                    <div>
                      <div>
                        <label className="block mb-1">Remarks</label>
                        <textarea
                          rows={3}
                          className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300   p-2 text-[#818894]"
                          placeholder="Value"
                          name="remark"
                          value={customerdata.remark}
                          onChange={(e: any) => handleChange(e)}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="flex justify-end gap-2 mb-3 m-5">
            <Button onClick={handleSubmit} variant="primary" size="sm">
              Save
            </Button>
            <Button
              onClick={() => setModalOpen(false)}
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </>
      </Modal>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default NewCustomerModal;
