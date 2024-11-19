import { useState } from "react";
import PaymentViewTypes from "../../purchase/debitNote/viewDebitNote/PaymentViewTypes";
import { useNavigate } from "react-router-dom";

type Props = {data?:any};

function SideBar({data}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate=useNavigate()

  const colorShow = (index: number) => {
    setActiveIndex(index);
  };

  const handleRowClick = (id: string) => {
    navigate(`/purchase/bills/view/${id}?pdfView=true`);
  };

  return (
    <>
      <div className="bg-[#F6F6F6] rounded-md px-3 py-6 space-y-4">
        <div>
          <PaymentViewTypes />
        </div>
        {data.unpaidBills?.map((item: any, index: number) => (
          <div
          onClick={() => {
            colorShow(index);
            handleRowClick(item.billId);
          }}
                      className={`text-[#303F58] p-4 rounded-md mb-4 space-y-2 ${
              activeIndex === index ? "bg-white" : ""
            } cursor-pointer`}
          >
            <div className="flex justify-between font-bold">
              <p className="">{data.supplierDisplayName}</p>
              <p>{item.amount}</p>
            </div>
            <p>
              {item.billDate} | {item.billNumber}
            </p>

            <p className=" font-bold">Mode: {data.paymentMode}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default SideBar;
