import { ChangeEvent, useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArrowRightLeft from "../../../../assets/icons/ArrowRightLeft";
import CheveronLeftIcon from "../../../../assets/icons/CheveronLeftIcon";
import Info from "../../../../assets/icons/Info";
import MessageCircle from "../../../../assets/icons/MessageCircle";
import NewspaperIcon from "../../../../assets/icons/NewspaperIcon";
import { SupplierResponseContext } from "../../../../context/ContextShare";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";
import EditSupplier from "../EditSupplier";
import { SupplierData } from "../SupplierData";
import Comment from "./Comment";
import Overview from "./Overview";
import Statement from "./Statement";
import Transaction from "./Transaction";
import toast from "react-hot-toast";
import Button from "../../../../Components/Button";
import Pen from "../../../../assets/icons/Pen";

type Props = {};
interface Status {
  organizationId: string;
  status: any;
}

function SeeSupplierDetails({}: Props) {
  const { request: getOneSupplier } = useApi('get', 5009);
  const { id } = useParams<{ id: string }>(); // Define the type for id
  const [supplier, setSupplier] = useState<SupplierData | null>(null); // Use the Supplier type and allow null
  const [tabSwitch, setTabSwitch] = useState<string>("overview");
  const {request:updateSupplierStatus}=useApi("put",5009)
  const {supplierResponse}=useContext(SupplierResponseContext)!;
  const [statusData, setStatusData] = useState<Status>({
    organizationId: "INDORG0001",
    status: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen((prev)=>!prev);
  };

  const closeModal = () => {
    setModalOpen((prev)=>!prev);
  };

  const handleTabSwitch = (tabName: string) => {
    setTabSwitch(tabName);
  };

  const getOneSupplierData = async () => {
    try {
      const url = `${endponits.GET_ONE_SUPPLIER}/${id}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await getOneSupplier(url, body);
      if (!error && response) {
        console.log("response", response.data);
        setSupplier(response.data);
      }
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    if (id) { // Ensure id is defined
      getOneSupplierData();
    }
  }, [id,supplierResponse]);
  const handleStatusSubmit = async (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setStatusData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  
   
    const url = `${endponits.UPDATE_SUPPLIER_STATUS}/${id}`;
    try {
      const { response, error } = await updateSupplierStatus(url, {
        ...statusData,
        status: value, // Pass the updated status value here
      });
      if (!error && response) {
        toast.success(response.data.message);
      } else { 
        toast.error(error.response.data.message);
      }
    } catch (error) {}
  };
  useEffect(()=>{
    setStatusData({...statusData,status:supplier?.status})
  },[supplier])
  
  return (
    <div className="px-6">
      <div className="flex flex-col bg-white h-auto rounded-md text-textColor p-5 space-y-4">
        {/* Header */}
        <div className="flex w-full justify-between">
          <div className="flex gap-5 items-center">
            <Link to={"/supplier/home"}>
              <div
                style={{ borderRadius: "50%" }}
                className="w-[40px] h-[40px] flex items-center justify-center bg-[#F6F6F6]"
              >
                <CheveronLeftIcon />
              </div>
            </Link>
            <p className="text-textColor text-xl font-bold">Office Vendors</p>
          </div>
          <div className="flex gap-1 items-center">
            <Button onClick={openModal} variant="secondary" className="pl-6 pr-6"  size="sm"><Pen size={18} color="#565148" /> <p className="text-sm font-medium">Edit</p></Button>
            <EditSupplier 
        isModalOpen={isModalOpen} 
        openModal={openModal} 
        closeModal={closeModal} 
        supplier={supplier} 
      />
            <select
                  id=""
                  className=" pl-6 pr-6 w-24 text-sm h-[40px]  flex items-center justify-center text-[#565148] ps-2 bg-[#FEFDFA] rounded-md border font-medium border-[#565148]"
                  value={statusData.status}
                  name="status"
                  onChange={handleStatusSubmit}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive"><div>Inactive</div></option>
                </select>
          </div>
        </div>
        {/* Tabs */}
        <div className="flex items-center w-full gap-2">
          <div
            onClick={() => handleTabSwitch("overview")}
            className={`text-[14px] font-semibold ${tabSwitch === "overview" ? "bg-[#F7E7CE]" : ""} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}
          >
            <Info color="#303F58" size={20} /> Overview
          </div>
          <div
            onClick={() => handleTabSwitch("comment")}
            className={`text-[14px] font-semibold ${tabSwitch === "comment" ? "bg-[#F7E7CE]" : ""} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}
          >
            <MessageCircle size={20} color="#303F58" /> Comments
          </div>
          <div
            onClick={() => handleTabSwitch("transaction")}
            className={`text-[14px] font-semibold ${tabSwitch === "transaction" ? "bg-[#F7E7CE]" : ""} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}
          >
            <ArrowRightLeft size={20} color="#303F58" /> Transaction
          </div>
          <div
            onClick={() => handleTabSwitch("statement")}
            className={`text-[14px] font-semibold ${tabSwitch === "statement" ? "bg-[#F7E7CE]" : ""} w-[187px] py-2 justify-center flex gap-2 items-center rounded-[8px] cursor-pointer`}
          >
            <NewspaperIcon color="#303F58" /> Statements
          </div>
        </div>
        {tabSwitch === "overview" ? (
          <Overview supplier={supplier} statusData={statusData} setStatusData={setStatusData}/>
        ) : tabSwitch === "comment" ? (
          <Comment />
        ) : tabSwitch === "transaction" ? (
          <Transaction />
        ) : tabSwitch === "statement" && <Statement />}
      </div>
    </div>
  );
}

export default SeeSupplierDetails;
