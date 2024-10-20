// import { FormEvent, 
  // import useState from "react";
import Button from "../../../Components/Button";
import Pen from "../../../assets/icons/Pen";
import CehvronDown from "../../../assets/icons/CehvronDown";
import bgImage from "../../../assets/Images/6.png";
import Modal from "../../../Components/model/Modal";
import { useState } from "react";
// import useApi from "../../../Hooks/useApi";
// import { endponits } from "../../../Services/apiEndpoints";
// import toast from "react-hot-toast";

type Props = {};

interface EditUnitData  {
  targetUnit:string;
unitConversionR:string;
}

const EditUnitConversion = ({}: Props) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const[editUnitData,seteditUnitData]=useState<EditUnitData>(
{
  targetUnit:"",
  unitConversionR:"",
});

// const {request:addEditunit}=useApi("post",5003);
console.log(editUnitData);


const handleInputChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, } = event.target;

  seteditUnitData({...editUnitData,[name]:value})
};
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  // const handleSave = async (e: FormEvent) => {


    
  //   try {
  //     const url =  `${endponits.ADD_UNIT}`;
  //     // const body = initialUnitData;
     
  //     const { response, error } = await addnewunit(url, body);
  //     if (!error && response) {
  //       toast.success(response.data.message);
  //    console.log(response);
  //    setModalOpen(false);
  //       // setInitialUnitData(  {
  //       //   unitName: "",
  //       //     symbol: "",
  //       //     quantityCode:"",
  //       //     precision:"",
          
  //       //   });


  //     } else {
  //       console.log(error);
  //       toast.error(error.response.data.message);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  return (
    <div>
      <Button variant="secondary" onClick={openModal} size="sm">
        <Pen color="currentColor" />
        Edit
      </Button>

      <Modal open={isModalOpen} onClose={closeModal} className="w-[45%]">
        <div className="p-5 mt-3">
          <div className="mb-5 flex p-4 rounded-xl bg-CreamBg relative overflow-hidden">
            <div
              className="absolute top-0 -right-8 w-[178px] h-[89px]"
              style={{
                backgroundImage: `url(${bgImage})`,
                backgroundRepeat: "no-repeat",
              }}
            ></div>
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-textColor">
                Edit Unit Conversion
              </h3>
            </div>
            <div
              className="ms-auto text-3xl cursor-pointer relative z-10"
              onClick={closeModal}
            >
              &times;
            </div>
          </div>

          <form>
            <div className="grid grid-cols-2 gap-5 p-3">
              <div className="text-start">
                <label htmlFor="">Target Unit</label>
                <div className="relative w-full ">
                <input
                    type="text"
                  name="symbol"
                    // value={initialUnitData.symbol}
                    placeholder="Symbol"
                    onChange={handleInputChange}
                    className="border-inputBorder w-full text-sm border rounded p-1.5 pl-2 h-10"
                  />


                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
              <div className=" text-start">
                <label htmlFor="">Unit Conversion Rate</label>

                <div className="relative w-full">
                  <select className="block appearance-none w-full h-10  text-zinc-400 bg-white border border-inputBorder text-sm  pl-9 pr-8 rounded-md leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                    <option value="" className="text-gray">
                      {" "}
                      0.23
                    </option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <CehvronDown color="gray" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mb-3 mt-10">
              <Button onClick={closeModal} variant="secondary" size="lg">
                Cancel
              </Button>
              <Button variant="primary" size="lg">
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditUnitConversion;
