import { ChangeEvent, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import Button from "../../../Components/Button";
import Modal from "../../../Components/model/Modal";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import CehvronDown from "../../../assets/icons/CehvronDown";
import Eye from "../../../assets/icons/Eye";
import EyeOff from "../../../assets/icons/EyeOff";
import Globe from "../../../assets/icons/Globe";
import Pen from "../../../assets/icons/Pen";
import PlusCircle from "../../../assets/icons/PlusCircle";
import Trash2 from "../../../assets/icons/Trash2";
import Upload from "../../../assets/icons/Upload";
import { SupplierResponseContext } from "../../../context/ContextShare";
import { SupplierData } from "./SupplierData";

type Props = { supplier?:SupplierData |null};


const EditSupplier = ({ supplier}: Props) => {
  const {request:editSupplier}=useApi('put',5009)
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [countryData, setcountryData] = useState<any | []>([]);
  const [stateList, setStateList] = useState<any | []>([]);
  const [currencyData, setcurrencyData] = useState<any | []>([]);
  const [gstOrVat, setgstOrVat] = useState<any | []>([]);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);
  const [shippingstateList, setshippingStateList] = useState<any | []>([]);
  const [paymentTerms, setPaymentTerms] = useState<any | []>([]);
  const [activeTab, setActiveTab] = useState<string>("otherDetails");
  const [placeOfSupplyList,setPlaceOfSupplyList]=useState<any |[]>([])
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    companyName: false,
    supplierDisplayName: false,
    supplierEmail: false,
    workPhone: false,
    mobile: false,
    billingCity: false,
    billingPhone: false,
  });
  const { request: getCountryData } = useApi("get", 5004);
  const { request: getCurrencyData } = useApi("put", 5004);
  const { request: getPaymentTerms } = useApi("get", 5004);
  const {request:getOrganization}=useApi("put",5004)
  const { request: getTax } = useApi("put", 5009);
  const { setsupplierResponse } = useContext(SupplierResponseContext)!;
  const [rows, setRows] = useState([
    {
      salutation: "",
      firstName: "",
      lastName: "",
      email: "",
      workPhone: "",
      mobile: "",
    },
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      {
        salutation: "",
        firstName: "",
        lastName: "",
        email: "",
        workPhone: "",
        mobile: "",
      },
    ]);
  };

  const [supplierdata, setSupplierData] = useState<SupplierData>({
    _id:"",
    organizationId: "INDORG0001",
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    supplierDisplayName: "",
    supplierEmail: "",
    workPhone: "",
    mobile: "",
    creditDays: "",
    creditLimit: "",
    interestPercentage: "",
    pan: "",
    currency: "",
    openingBalance: "",
    paymentTerms: "",
    tds: "",
    documents: "",
    websiteURL: "",
    department: "",
    designation: "",
    gstTreatment: "",
    gstinUin: "",
    sourceOfSupply: "",
    vatNumber: "",
    msmeType: "",
    msmeNumber: "",
    msmeRegistered: false, // boolean type
    billingAttention: "",
    billingCountry: "",
    billingAddressStreet1: "",
    billingAddressStreet2: "",
    billingCity: "",
    billingState: "",
    billingPinCode: "",
    billingPhone: "",
    billingFaxNum: "",
    shippingAttention: "",
    shippingCountry: "",
    shippingAddressStreet1: "",
    shippingAddressStreet2: "",
    shippingCity: "",
    shippingState: "",
    shippingPinCode: "",
    shippingPhone: "",
    shippingFaxNum: "",
    contactPerson: [
      {
        salutation: "",
        firstName: "",
        lastName: "",
        emailAddress: "",
        workPhone: "",
        mobile: "",
      },
    ],
    bankDetails: [
      {
        accountHolderName: "",
        bankName: "",
        accountNum: "",
        ifscCode: "",
      },
    ],
    remarks: "",
  });

  useEffect(() => {
    setSupplierData(prev => ({ ...prev, ...supplier }));
  }, [supplier]);

  const [showAccountNumbers, setShowAccountNumbers] = useState(
    supplierdata.bankDetails.map(() => false)
  );
  const [showReEnterAccountNumbers, setShowReEnterAccountNumbers] = useState(
    supplierdata.bankDetails.map(() => false)
  );

// check account number
  const [reEnterAccountNumbers, setReEnterAccountNumbers] = useState(
    supplierdata.bankDetails.map(() => "")
  );
  const [isAccountNumberSame, setIsaccountNumbersame] = useState(
    supplierdata.bankDetails.map(() => true)
  );
  
  const handleReEnterAccountNumberChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newReEnterAccountNumbers = [...reEnterAccountNumbers];
    newReEnterAccountNumbers[index] = e.target.value;
    setReEnterAccountNumbers(newReEnterAccountNumbers);
  
    const isMatch = supplierdata.bankDetails[index].accountNum === e.target.value;
    const newIsAccountNumberSame = [...isAccountNumberSame];
    newIsAccountNumberSame[index] = isMatch;
    setIsaccountNumbersame(newIsAccountNumberSame);
  };
  
  // add bank account
  const handleBankDetailsChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    type BankDetailKeys =
      | "accountHolderName"
      | "bankName"
      | "accountNum"
      | "ifscCode";

    const updatedBankDetails = [...supplierdata.bankDetails];
    updatedBankDetails[index][name as BankDetailKeys] = value;

    setSupplierData((prevState) => ({
      ...prevState,
      bankDetails: updatedBankDetails,
    }));
  };
 
  const handleEditSupplier=async()=>{
    const newErrors = { ...errors };
    if (supplierdata.firstName === "") newErrors.firstName = true;
    if (supplierdata.lastName === "") newErrors.lastName = true;
    if (supplierdata.supplierEmail === "") newErrors.supplierEmail = true;
    if (supplierdata.mobile === "") newErrors.mobile = true;
    if (supplierdata.supplierDisplayName === "")
      newErrors.supplierDisplayName = true;
    if (supplierdata.companyName === "") newErrors.companyName = true;
    if (supplierdata.workPhone === "") newErrors.workPhone = true;
    if (supplierdata.billingCity === "") newErrors.billingCity = true;
    if (supplierdata.billingPhone === "") newErrors.billingPhone = true;

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }
    try {
      const url = `${endponits.EDIT_SUPPLIER}/${supplier?._id}`;
      const { response, error } = await editSupplier(url,supplierdata);
      console.log("res",response);
      console.log("err",error);
      if (!error && response) {
        setsupplierResponse(response.data);
        toast.success(response.data.message)
        console.log(response.data);
        
        closeModal()
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  }

  //  bank details change
  useEffect(() => {
    setShowAccountNumbers(supplierdata.bankDetails.map(() => false));
    setShowReEnterAccountNumbers(supplierdata.bankDetails.map(() => false));
  }, [supplierdata.bankDetails]);

  const toggleShowAccountNumber = (index:number) => {
    setShowAccountNumbers((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  const toggleShowReEnterAccountNumber = (index:number) => {
    setShowReEnterAccountNumbers((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

// add new bank account
  const addNewBankAccount = () => {
    if (supplierdata.bankDetails.length < 6) {
      setSupplierData((prevState) => ({
        ...prevState,
        bankDetails: [
          ...prevState.bankDetails,
          {
            accountHolderName: "",
            bankName: "",
            accountNum: "",
            ifscCode: "",
          },
        ],
      }));
    } else {
      toast.error("You can only add up to 6 bank accounts.");
    }
  };

  // delete bank account
  const deleteBankAccount = (index: number) => {
    const updatedBankDetails = supplierdata.bankDetails.filter(
      (_, i) => i !== index
    );
    setSupplierData((prevState) => ({
      ...prevState,
      bankDetails: updatedBankDetails,
    }));
  };

  // handle modal
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // add contact person
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
      emailAddress: row.email,
      workPhone: row.workPhone,
      mobile: row.mobile,
    }));

    setSupplierData((prevFormData) => ({
      ...prevFormData,
      contactPerson: updatedContactPerson,
    }));
  };

  // handle sidebar 
  const getTabClassName = (tabName: string) => {
    return activeTab === tabName
      ? " cursor-pointer font-bold text-darkRed"
      : " cursor-pointer font-bold";
  };

  const getBorderClassName = (tabName: string) => {
    return activeTab === tabName ? "border-darkRed" : "border-neutral-300";
  };
  // console.log(supplierdata);

  // handle phonenumber change
  const handleBillingPhoneChange = (value: string) => {
    setSupplierData((prevData) => ({
      ...prevData,
      billingPhone: value,
    }));
  };

  const handleShippingPhoneChange = (value: string) => {
    setSupplierData((prevData) => ({
      ...prevData,
      shippingPhone: value,
    }));
  };

  // handle input chnage
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setSupplierData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setSupplierData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // get additional data
  const getAdditionalData = async () => {
    try {
      // Fetching currency data
      const Currencyurl = `${endponits.GET_CURRENCY_LIST}`;
      const { response, error } = await getCurrencyData(Currencyurl, {
        organizationId: "INDORG0001",
      });

      if (!error && response) {
        setcurrencyData(response?.data);
        // console.log(response.data, "currencyData");
      }

      const paymentTermsUrl = `${endponits.GET_PAYMENT_TERMS}`;
      const { response: paymentTermResponse, error: paymentTermError } =
        await getPaymentTerms(paymentTermsUrl);

      if (!paymentTermError && paymentTermResponse) {
        setPaymentTerms(paymentTermResponse.data);
        // console.log(paymentTermResponse.data, "paymet terms");
      }

      
      const CountryUrl = `${endponits.GET_COUNTRY_DATA}`;
      const { response: countryResponse, error: countryError } =
        await getCountryData(CountryUrl, { organizationId: "INDORG0001" });
      if (!countryError && countryResponse) {
        // console.log(countryResponse.data[0].countries, "country");

        setcountryData(countryResponse?.data[0].countries);
      } else {
        console.log(countryError, "country");
      }
    } catch (error) {
      console.log("Error in fetching currency data or payment terms", error);
    }
  };

  const getAdditionalInfo=async()=>{
    try {
      const taxUrl = `${endponits.GET_TAX_SUPPLIER}`;
      const { response: taxResponse, error: taxError } = await getTax(taxUrl, {
        organizationId: "INDORG0001",
      });

      if (!taxError && taxResponse) {
        if (taxResponse) {
          // console.log(taxResponse.data.taxType,"tax");

          setgstOrVat(taxResponse.data);
        }
      } else {
        console.log(taxError, "tax");
      }

    } catch (error) {
      
    }
  }
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


  // compy billing address
  const handleCopyAddress = (e: any) => {
    e.preventDefault();
    setSupplierData((prevData) => ({
      ...prevData,
      shippingAttention: supplierdata.billingAttention,
      shippingCountry: supplierdata.billingCountry,
      shippingAddressStreet1: supplierdata.billingAddressStreet1,
      shippingAddressStreet2: supplierdata.billingAddressStreet2,
      shippingCity: supplierdata.billingCity,
      shippingState: supplierdata.billingState,
      shippingPinCode: supplierdata.billingPinCode,
      shippingPhone: supplierdata.billingPhone,
      shippingFaxNum: supplierdata.billingFaxNum,
    }));
  };

  // handle place od supply
  const handleplaceofSupply = () => {
    if (oneOrganization.organizationCountry) {
      const country = countryData.find((c: any) =>
        c.name.toLowerCase() === oneOrganization.organizationCountry.toLowerCase()
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
  

  // console.log(placeOfSupplyList,"place");
  
  // handle country and state 
  useEffect(() => {
    handleplaceofSupply()
    if (supplierdata.billingCountry) {
      const country = countryData.find(
        (c: any) => c.name === supplierdata.billingCountry
      );
      if (country) {
        setStateList(country.states || []);
      }
    }

    if (supplierdata.shippingCountry) {
      const country = countryData.find(
        (c: any) => c.name === supplierdata.shippingCountry
      );
      if (country) {
        setshippingStateList(country.states || []);
      }
    }
  }, [supplierdata.shippingCountry, supplierdata.billingCountry, countryData]);

  useEffect(() => {
    getAdditionalData();
    getAdditionalInfo()
    getOneOrganization()
  }, []);


  return (
    <div>
      
        <Button onClick={openModal} variant="secondary" className="pl-6 pr-6"  size="sm"><Pen size={18} color="#565148" /> <p className="text-sm font-medium">Edit</p></Button>
    

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        className=""
        style={{ width: "80%" }}
      >
        <>
          <div className="p-5 mt-3">
            <div className="mb-5 flex p-2 rounded-xl bg-CreamBg relative overflow-hidden items-center">
              <div className="relative ">
                <h3 className="text-lg font-bold text-textColor">
                  Edit Supplier
                </h3>
              </div>
              <div
                className="ms-auto text-3xl cursor-pointer relative z-10"
                onClick={closeModal}
              >
                &times;
              </div>
            </div>
            <form
              className="text-slate-600 text-sm overflow-scroll hide-scrollbar space-y-5 p-2"
              style={{ height: "480px" }}
            >
              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-2">
                  <label htmlFor="salutation">Salutation</label>
                  <div className="relative w-full">
                    <select
                      name="salutation"
                      value={supplierdata.salutation}
                      onChange={handleChange}
                      className="block appearance-none text-[#818894] w-full h-9 mt-1  bg-white border border-inputBorder text-sm pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    >
                      <option value="Mr" className="text-gray">
                        Mr
                      </option>
                      <option value="Mrs" className="text-gray">
                        Mrs
                      </option>
                      <option value="Ms" className="text-gray">
                        Ms
                      </option>
                      <option value="Dr" className="text-gray">
                        Dr
                      </option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <CehvronDown color="gray" />{" "}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 col-span-10 gap-4 ">
                  <div>
                    <label htmlFor="" className="text-slate-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      className="pl-3 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                      placeholder="Enter First Name"
                      value={supplierdata.firstName}
                      onChange={handleChange}
                      onFocus={() => setErrors({ ...errors, firstName: false })}
                      onBlur={() => {
                        if (supplierdata.firstName === "") {
                          setErrors({ ...errors, firstName: true });
                        }
                      }}
                    />
                    {errors.firstName && (
                      <div className="text-red-800 text-xs ms-2 mt-1">
                        Enter First Name
                      </div>
                    )}
                  </div>

                  <div>
                    <label htmlFor="" className="text-slate-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      className="pl-3 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]  "
                      placeholder="Enter Last Name"
                      value={supplierdata.lastName}
                      onChange={handleChange}
                      onFocus={() => setErrors({ ...errors, lastName: false })}
                      onBlur={() => {
                        if (supplierdata.lastName === "") {
                          setErrors({ ...errors, lastName: true });
                        }
                      }}
                    />
                    {errors.lastName && (
                      <div className="text-red-800 text-xs ms-2 mt-1">
                        Enter Last Name
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="">Company Name </label>
                  <input
                    type="text"
                    name="companyName"
                    className="pl-3 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Company Name"
                    value={supplierdata.companyName}
                    onChange={handleChange}
                    onFocus={() => setErrors({ ...errors, companyName: false })}
                    onBlur={() => {
                      if (supplierdata.companyName === "") {
                        setErrors({ ...errors, companyName: true });
                      }
                    }}
                  />
                  {errors.companyName && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter Company Name
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="companyName">Supplier Display Name </label>
                  <input
                    // required
                    type="text"
                    name="supplierDisplayName"
                    className="pl-3 text-sm w-[100%] mt-1 rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Display Name"
                    value={supplierdata.supplierDisplayName}
                    onChange={handleChange}
                    onFocus={() =>
                      setErrors({ ...errors, supplierDisplayName: false })
                    }
                    onBlur={() => {
                      if (supplierdata.supplierDisplayName === "") {
                        setErrors({ ...errors, supplierDisplayName: true });
                      }
                    }}
                  />
                  {errors.supplierDisplayName && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter Supplier Display Name
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="">Supplier Email</label>
                  <input
                    type="text"
                    name="supplierEmail"
                    className="pl-3 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Email"
                    value={supplierdata.supplierEmail}
                    onChange={handleChange}
                    onFocus={() =>
                      setErrors({ ...errors, supplierEmail: false })
                    }
                    onBlur={() => {
                      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                      if (
                        supplierdata.supplierEmail === "" ||
                        !emailPattern.test(supplierdata.supplierEmail)
                      ) {
                        setErrors({ ...errors, supplierEmail: true });
                      }
                    }}
                  />
                  {errors.supplierEmail && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter a valid Email
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-4">
                <div>
                  <label htmlFor="">Work Phone</label>
                  <input
                    type="text"
                    name="workPhone"
                    className="pl-3 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Work Phone "
                    value={supplierdata.workPhone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    onFocus={() => setErrors({ ...errors, workPhone: false })}
                    onBlur={() => {
                      if (supplierdata.workPhone === "") {
                        setErrors({ ...errors, workPhone: true });
                      }
                    }}
                  />
                  {errors.workPhone && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter A Valid Work Phone
                    </div>
                  )}
                
                </div>
                <div>
                  <label htmlFor="">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    className="pl-3 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter Mobile Number"
                    value={supplierdata.mobile}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) {
                        handleChange(e);
                      }
                    }}
                    onFocus={() => setErrors({ ...errors, mobile: false })}
                    onBlur={() => {
                      if (supplierdata.mobile === "") {
                        setErrors({ ...errors, mobile: true });
                      }
                    }}
                  />
                  {errors.mobile && (
                    <div className="text-red-800 text-xs ms-2 mt-1">
                      Enter a Valid Mobile
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="">Opening Balance</label>
                  <input
                    required
                    className="pl-3 text-sm w-[100%] mt-1  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                    placeholder="Enter opening balance"
                              type="number"
                              name="openingBalance"
                              value={supplierdata.openingBalance}
                              onChange={handleChange}
                    />
                    </div>
              </div>

              <div className="flex mt-5 px-5">
                <div className="w-[20%] bg-gray-100 p-4">
                  <ul className="h-full   space-y-0 border-gray-300 text-slate-700">
                    <li
                      className={`${getTabClassName(
                        "otherDetails"
                      )} border-r-4 ${getBorderClassName("otherDetails")} p-2 `}
                      onClick={() => setActiveTab("otherDetails")}
                    >
                      Other Details
                    </li>
                    <li
                      className={`${getTabClassName(
                        "taxes"
                      )} border-r-4 ${getBorderClassName("taxes")} p-2 `}
                      onClick={() => setActiveTab("taxes")}
                    >
                      Taxes
                    </li>
                    <li
                      className={`${getTabClassName(
                        "address"
                      )} border-r-4 ${getBorderClassName("address")} p-2`}
                      onClick={() => setActiveTab("address")}
                    >
                      Address
                    </li>
                    <li
                      className={`${getTabClassName(
                        "contactPersons"
                      )} border-r-4 ${getBorderClassName(
                        "contactPersons"
                      )} p-2`}
                      onClick={() => setActiveTab("contactPersons")}
                    >
                      Contact Persons
                    </li>

                    <li
                      className={`${getTabClassName(
                        "bankDetails"
                      )} border-r-4 ${getBorderClassName("bankDetails")} p-2`}
                      onClick={() => setActiveTab("bankDetails")}
                    >
                      Bank Details
                    </li>

                    <li
                      className={`${getTabClassName(
                        "remarks"
                      )} border-r-4 ${getBorderClassName("remarks")} p-2`}
                      onClick={() => setActiveTab("remarks")}
                    >
                      Remarks
                    </li>
                  </ul>
                </div>
                <div className="w-full px-16 p-2">
                  {activeTab === "otherDetails" && (
                    <div className="space-y-4  p-4 ">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block mb-1">PAN</label>
                          <input
                            type="text"
                            className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                            placeholder="Enter Pan Number"
                            name="pan"
                            value={supplierdata.pan}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <div className="">
                            <label htmlFor="" className="block mb-1">
                              Currency
                            </label>
                            <div className="relative w-full">
                              <select
                                className="block appearance-none w-full h-9  text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                name="currency"
                                value={supplierdata.currency}
                                onChange={handleChange}
                              >
                                <option value="">Select Currency"</option>
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
                          </div>
                        </div>

                        <div>
                          <label className="block mb-1">Payment Terms</label>
                          <select
                            className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder 
                                 text-sm pl-2 pr-8 rounded-md leading-tight 
                                 focus:outline-none focus:bg-white focus:border-gray-500"
                            name="paymentTerms"
                            value={supplierdata.paymentTerms}
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
                        </div>
                        <div className="">
                          <label htmlFor="" className="block mb-1">
                            TDS
                          </label>
                          <div className="relative w-full">
                            <select className="block appearance-none w-full h-9  text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select a Tax
                              </option>
                              {gstOrVat.tds && gstOrVat.tds.map((item: any, index: number) => (
  <option key={index} value={`${item.name}-${item.value}%`} className="text-gray">
    {item.name} - ({item.value}%)
  </option>
))}

                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block mb-1">Credit Days</label>
                          <input
                            type="text"
                            className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-p p-2 text-[#818894] "
                            placeholder="Enter Credit Days"
                            name="creditDays"
                            value={supplierdata.creditDays}
                            onChange={handleChange}
                          />
                        </div>

                        <div>
                          <label className="block mb-1">Credit Limit</label>
                          <input
                            type="text"
                            className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-p p-2 text-[#818894] "
                            placeholder="Enter Credit Limit"
                            name="creditLimit"
                            value={supplierdata.creditLimit}
                            onChange={handleChange}
                          />
                        </div>
                        <div>
                          <label className="block mb-1">
                            Interest Percentage
                          </label>
                          <input
                            type="text"
                            className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-p p-2 text-[#818894] "
                            placeholder="%"
                            name="interestPercentage"
                            value={supplierdata.interestPercentage}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="mt-4">
                        <label className="block mb-1">Documents</label>
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
                          // value={supplierdata.documents}
                          name="documents"
                          // onChange={(e)=>handleFileChange(e)}
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
                            value={supplierdata.websiteURL}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block mb-1">Department</label>
                        <input
                          type="text"
                          className=" text-sm w-[48%]  rounded-md text-start bg-white border border-slate-300  h-p p-2 text-[#818894]"
                          placeholder="Enter Department"
                          name="department"
                          value={supplierdata.department}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label className="block mb-1">Designation</label>
                        <input
                          type="text"
                          name="designation"
                          className=" text-sm w-[48%]  rounded-md text-start bg-white border border-slate-300  h-p p-2 text-[#818894]"
                          placeholder="Enter Designation"
                          value={supplierdata.designation}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                  {activeTab === "taxes" && (
                    <>
                      <div className="space-y-3 p-5  text-sm">
                        {gstOrVat.taxType == "GST" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="">
                              <label htmlFor="" className="block mb-1">
                                GST Treatment
                              </label>

                              <div className="relative w-full">
                                <select
                                  className="block appearance-none w-full h-9  text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                  name="gstTreatment"
                                  value={supplierdata.gstTreatment}
                                  onChange={handleChange}
                                >
                                  <option value="" className="text-gray">
                                    {" "}
                                    Select a GST treatment
                                  </option>
                                  {gstOrVat?.gstTreatment?.map(
                                    (item: any, index: number) => (
                                      <option value={item} key={index}>
                                        {item}
                                      </option>
                                    )
                                  )}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <CehvronDown color="gray" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block mb-1">
                                Source of Supply
                              </label>

                              <div className="relative w-full">
                                <select className="block appearance-none w-full h-9  text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                  <option value="" className="text-gray">
                                    {" "}
                                    slecet
                                  </option>
                                 {placeOfSupplyList.length>0&& placeOfSupplyList.map((item:any,index:number)=><option key={index} value={item} className="text-gray">
                                   {item}
                                  </option>) }
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <CehvronDown color="gray" />
                                </div>
                              </div>
                            </div>
                            <div>
                              <label className="block mb-1">GSTIN/UIN</label>
                              <input
                                type="text"
                                name="gstinUin"
                                className=" text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300  h-9 p-2 text-[#818894]"
                                placeholder="Enter GSTIN/UIN"
                                value={supplierdata.gstinUin}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        )}

                        {gstOrVat.taxType == "VAT" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="vatNumber" className="block mb-1">
                                VAT Number
                              </label>
                              <input
                                type="text"
                                name="vatNumber"
                                className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                placeholder="Enter VAT Number"
                                value={supplierdata.vatNumber}
                                onChange={handleChange}
                              />
                            </div>
                            {/* <div>
                             <label htmlFor="businessTradeName" className="block mb-1">
                               Business Trade Name
                             </label>
                             <input
                               type="text"
                               name="businessTradeName"
                               className="text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                               placeholder="Enter Business Trade Name"
                               value={supplierdata.businessTradeName}
                               onChange={handleChange}
                             />
                           </div> */}
                          </div>
                        )}

                        <div>
                          <label htmlFor="" className="mb-1 block text-base">
                            MSME Registered?
                          </label>
                          <input
                            type="checkbox"
                            className="customCheckbox h-6 w-6 mt-2"
                            name="msmeRegistered"
                            checked={supplierdata.msmeRegistered}
                            onChange={handleChange}
                          />{" "}
                          <label htmlFor="" className="text-base">
                            The Vendor is MSME Registered
                          </label>
                        </div>
                        <div className="grid grid-cols-2 mt-1 gap-4">
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              MSME/Udyam Registration Type
                            </label>
                            <select 
                            value={supplierdata.msmeType}
                            name="msmeType"
                           onChange={handleChange} 
                            className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm  pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                              <option value="" className="text-gray">
                                {" "}
                                Select the Registration Type
                              </option>
                              {/* {gstOrVat.msmeType &&
                                gstOrVat.msmeType.map(
                                  (item: any, index: number) => (
                                    <option
                                      key={index}
                                      value={item}
                                      className="text-gray"
                                    >
                                      {item}
                                    </option>
                                  )
                                )} */}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-1 block">
                              MSME/Udyam Registration Number
                            </label>
                            <input
                              type="text"
                              className="pl-2 text-sm w-full rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                              placeholder="Enetr MSME/Udyam Registration Number"
                              name="msmeNumber"
                              value={supplierdata.msmeNumber}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>
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
                              placeholder="Enter Attention"
                              name="billingAttention"
                              value={supplierdata.billingAttention}
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
                              name="billingCountry"
                              value={supplierdata.billingCountry}
                              onChange={handleChange}
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
                              name="billingAddressStreet1"
                              value={supplierdata.billingAddressStreet1}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 2"
                              name="billingAddressStreet2"
                              value={supplierdata.billingAddressStreet2}
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
                              value={supplierdata.billingCity}
                              onChange={handleChange}
                              onFocus={() =>
                                setErrors({ ...errors, billingCity: false })
                              }
                              onBlur={() => {
                                if (supplierdata.billingCity === "") {
                                  setErrors({ ...errors, billingCity: true });
                                }
                              }}
                            />
                            {errors.billingCity && (
                              <div className="text-red-800 text-xs ms-2 mt-1">
                                Enter Billing City
                              </div>
                            )}
                          </div>

                          <div className="relative ">
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              State / Region / County
                            </label>
                            <div className="relative w-full mt-2">
                              <select
                                value={supplierdata.billingState}
                                onChange={handleChange}
                                name="billingState"
                                id="billingState"
                                className="block appearance-none w-full text-[#818894] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                disabled={!supplierdata.billingCountry}
                              >
                                <option value="">
                                  Select State / Region / County
                                </option>
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
                              placeholder="Enter Pin / Zip / Post code"
                              type="text"
                              name="billingPinCode"
                              value={supplierdata.billingPinCode}
                              onChange={handleChange}
                            />
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
                                  supplierdata.billingCountry
                                    ? supplierdata.billingCountry.toLowerCase()
                                    : "in"
                                }
                                value={supplierdata.billingPhone}
                                onChange={(value) =>
                                  handleBillingPhoneChange(value)
                                }
                                onBlur={() => {
                                  if (
                                    !supplierdata.billingPhone ||
                                    supplierdata.billingPhone.length < 10
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
                            <select
                              className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="billingFaxNum"
                              value={supplierdata.billingFaxNum}
                              onChange={handleChange}
                            >
                              <option value="" className="text-gray">
                                Select Fax Number
                              </option>
                              <option value="(987) 6543" className="text-gray">
                                (987) 6543
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
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
                              placeholder="Enter Attention"
                              name="shippingAttention"
                              value={supplierdata.shippingAttention}
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
                              value={supplierdata.shippingCountry}
                              onChange={handleChange}
                            >
                              <option value="">Select a Country</option>
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
                              value={supplierdata.shippingAddressStreet1}
                              onChange={handleChange}
                            />
                          </div>
                          <div>
                            <input
                              className="pl-3 text-sm w-full text-[#818894] rounded-md text-start bg-white border border-inputBorder h-[39px] p-2 leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                              placeholder="Street 2"
                              name="shippingAddressLine2"
                              value={supplierdata.shippingAddressStreet2}
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
                              value={supplierdata.shippingCity}
                              onChange={handleChange}
                            />
                          </div>

                          <div className="relative ">
                            <label
                              className="text-slate-600 "
                              htmlFor="organizationAddress"
                            >
                              State / Region / County
                            </label>
                            <div className="relative w-full mt-2">
                              <select
                                value={supplierdata.shippingState}
                                onChange={handleChange}
                                name="shippingState"
                                id="shippingState"
                                className="block appearance-none w-full text-[#818894] bg-white border border-inputBorder text-sm h-[39px] pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-darkRed"
                                disabled={!supplierdata.shippingCountry}
                              >
                                <option value="">
                                  Select State / Region / County
                                </option>
                                {shippingstateList.length > 0 ? (
                                  shippingstateList.map(
                                    (item: any, index: number) => (
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
                              placeholder="Enetr Pin / Zip / Post code"
                              type="text"
                              name="shippingPinCode"
                              value={supplierdata.shippingPinCode}
                              onChange={handleChange}
                            />
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
                                  supplierdata.shippingCountry
                                    ? supplierdata.shippingCountry.toLowerCase()
                                    : "in"
                                }
                                value={supplierdata.shippingPhone}
                                onChange={handleShippingPhoneChange}
                              />
                            </div>
                          </div>
                          <div className="relative w-full">
                            <label htmlFor="" className="mb-2 block">
                              Fax Number
                            </label>
                            <select
                              className="block appearance-none w-full h-9 text-[#818894] bg-white border border-inputBorder text-sm pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              name="shippingFaxNum"
                              value={supplierdata.shippingFaxNum}
                              onChange={handleChange}
                            >
                              <option value="" className="text-gray">
                                Select Fax Number
                              </option>
                              <option value="(987) 6543" className="text-gray">
                                (987) 6543
                              </option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 mt-6 flex items-center px-2 text-gray-700">
                              <CehvronDown color="gray" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {activeTab === "contactPersons" && (
                    <>
                      <div className="rounded-lg border-2 border-tableBorder mt-5">
                        <table className="min-w-full bg-white rounded-lg relative mb-4 border-dropdownText ">
                          <thead className="text-[12px] text-center text-dropdownText">
                            <tr className="bg-lightPink ">
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Salutation
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                FirstName
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                LastName
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Email Address
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Work Phone
                              </th>
                              <th className="py-2 px-4 font-medium border-b border-tableBorder relative">
                                Mobile
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-dropdownText text-center text-[13px] ">
                            {rows.map((row, index) => (
                              <tr className="relative text-center" key={index}>
                                <td className="py-2.5 px- border-y border-tableBorder justify-center mt-4 gap-2 items-center flex-1">
                                  <div className="relative w-full">
                                    <select
                                      className="block relative appearance-none w-full h-9 focus:border-none text-zinc-400 bg-white text-sm text-center border-none rounded-md leading-tight"
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
                                        {" "}
                                        Select
                                      </option>
                                      <option value="Mr" className="text-gray">
                                        {" "}
                                        Mr
                                      </option>
                                      <option value="Mrs" className="text-gray">
                                        {" "}
                                        Mrs
                                      </option>
                                      <option
                                        value="Miss"
                                        className="text-gray"
                                      >
                                        {" "}
                                        Miss
                                      </option>
                                      <option value="Dr" className="text-gray">
                                        {" "}
                                        Dr
                                      </option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 -right-8 flex items-center px-2 text-gray-700">
                                      <CehvronDown color="gray" />
                                    </div>
                                  </div>
                                </td>
                                <td className="py-2.5 px-8 border-y border-tableBorder">
                                  <input
                                    type="text"
                                    value={row.firstName}
                                    className="text-sm w-[100%] text-center rounded-md bg-white h-9 p-2"
                                    placeholder="Fist Name"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "firstName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 border-y border-tableBorder flex-1">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Last Name"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "lastName",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Email"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "email",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Work Phone"
                                    onChange={(e) =>
                                      handleRowChange(
                                        index,
                                        "workPhone",
                                        e.target.value
                                      )
                                    }
                                  />
                                </td>
                                <td className="py-2.5 border-y border-tableBorder relative">
                                  <input
                                    type="text"
                                    className="text-sm w-[100%] rounded-md text-center bg-white h-9 p-2"
                                    placeholder="Mobile"
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

                  {activeTab === "bankDetails" && (
                    <div className="">
                      <div>
                        {supplierdata.bankDetails.map((bankDetail, index) => (
                          <>
                            {supplierdata.bankDetails.length > 1 && (
                              <div className="pt-10 pb-6 flex">
                                <p className="text-base font-bold">
                                  Bank {index + 1}
                                </p>{" "}
                                <div className="ml-auto mx-3">
                                  <button
                                    className="flex items-center gap-1"
                                    onClick={() => deleteBankAccount(index)}
                                  >
                                    <Trash2 size={18} color="currentColor" />
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                            <div
                              key={index}
                              className="grid grid-cols-2 gap-4 border-neutral-300 border-b pb-10"
                            >
                              <div>
                                <label className="block mb-1">
                                  Account Holder Name
                                </label>
                                <input
                                  type="text"
                                  name="accountHolderName"
                                  className="text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                  placeholder="Enter Account Holder Name"
                                  value={bankDetail.accountHolderName}
                                  onChange={(e) =>
                                    handleBankDetailsChange(index, e)
                                  }
                                />
                              </div>
                              <div>
                                <label className="block mb-1">Bank Name</label>
                                <input
                                  type="text"
                                  name="bankName"
                                  className="text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                  placeholder="Enter Bank Name"
                                  value={bankDetail.bankName}
                                  onChange={(e) =>
                                    handleBankDetailsChange(index, e)
                                  }
                                />
                              </div>
                              <div>
                                <label className="block mb-1">
                                  Account Number
                                </label>
                                <div className="relative">
                <input
                  type={showAccountNumbers[index] ? "text" : "password"}
                  name="accountNum"
                  className="text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                  placeholder="Enter Account Number"
                  value={bankDetail.accountNum}
                  onChange={(e) => handleBankDetailsChange(index, e)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-gray-600"
                  onClick={() => toggleShowAccountNumber(index)}
                >
                  {showAccountNumbers[index] ? (
                    <Eye color={"currentColor"} />
                  ) : (
                    <EyeOff />
                  )}
                </button>
              </div>
                              </div>
                              <div>
                                <label className="block mb-1">IFSC Code</label>
                                <input
                                  type="text"
                                  name="ifscCode"
                                  className="text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                                  placeholder="Enter IFSC Code"
                                  value={bankDetail.ifscCode}
                                  onChange={(e) =>
                                    handleBankDetailsChange(index, e)
                                  }
                                />
                              </div>
                              <div>
                                <label className="block mb-1">
                                  Re-Enter Account Number
                                </label>
                                
                                <div className="relative">
                <input
                  type={showReEnterAccountNumbers[index] ? "text" : "password"}
                  name="reAccountNum"
                  className="text-sm w-[100%] rounded-md text-start bg-white border border-slate-300 h-9 p-2 text-[#818894]"
                  placeholder="Re-Enter Account Number"
                  value={reEnterAccountNumbers[index]}
                  onChange={(e) => handleReEnterAccountNumberChange(index, e)}
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-sm text-gray-600"
                  onClick={() => toggleShowReEnterAccountNumber(index)}
                >
                  {showReEnterAccountNumbers[index] ? (
                    <Eye color={"currentColor"} />
                  ) : (
                    <EyeOff />
                  )}
                </button>
              </div>
              {supplierdata.bankDetails[index].accountNum && reEnterAccountNumbers[index] && !isAccountNumberSame[index] && (
            <p className="text-sm text-red-600">Account number does not match</p>
          )}
                              </div>
                            </div>
                          </>
                        ))}
                      </div>

                      <div
                        className="flex my-5 gap-2 text-darkRed items-center font-bold cursor-pointer"
                        onClick={addNewBankAccount}
                      >
                        <PlusCircle color="darkRed" size={22} /> Add New Bank
                        Account
                      </div>
                    </div>
                  )}
                  {activeTab === "remarks" && (
                    <div>
                      <div>
                        <label className="block mb-1">Remarks</label>
                        <textarea
                          rows={3}
                          className="pl-2 text-sm w-[100%]  rounded-md text-start bg-white border border-slate-300   p-2"
                          placeholder="Value"
                          name="remarks"
                          value={supplierdata.remarks}
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
            <Button onClick={closeModal} variant="secondary" size="lg">
              Cancel
            </Button>
            <Button onClick={handleEditSupplier} variant="primary" size="lg">
              Save
            </Button>
          </div>
        </>
      </Modal>
      <Toaster position="top-center" reverseOrder={true} />
    </div>
  );
};

export default EditSupplier;