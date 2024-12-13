import { useContext, useState } from "react";
// import DotIcon from "../../../../../assets/icons/DotIcon";
// import DateFormat from "../../../../../Components/DateFormat/DateFormta";
import PurchaseTable from "../../../CommonComponents/PurchaseTable/PurchaseTable";
// import { endponits } from "../../../../../Services/apiEndpoints";
import { useNavigate } from "react-router-dom";
// import useApi from "../../../../../Hooks/useApi";
import { TableResponseContext } from "../../../../../context/ContextShare";
import DotIcon from "../../../../../assets/icons/DotIcon";


const AllInvoiceTable = () => {
  const [columns, setColumns] = useState([
    { id: "supplier", label: "Supplier", visible: true },
    { id: "invoiceNumber", label: "Invoice Number", visible: true },
    { id: "uploadedDate", label: "Uploaded Date", visible: true },
    { id: "reviewStatus", label: "Review Status", visible: true },
    { id: "reviewDate", label: "Review Date", visible: true },
  ]);

  const [allInoive ] = useState<any[]>([
    {
      supplier: "Supplier A",
      invoiceNumber: "INV-001",
      uploadedDate: "2024-12-01",
      reviewStatus: "Need Review",
      reviewDate: "2024-12-02",
    },
    {
      supplier: "Supplier B",
      invoiceNumber: "INV-002",
      uploadedDate: "2024-11-30",
      reviewStatus: "Reviwed",
      reviewDate: "2024-12-01",
    },
    {
      supplier: "Supplier C",
      invoiceNumber: "INV-003",
      uploadedDate: "2024-11-29",
      reviewStatus: "Reviwed",
      reviewDate: "2024-11-30",
    },
    {
      supplier: "Supplier D",
      invoiceNumber: "INV-004",
      uploadedDate: "2024-11-28",
      reviewStatus: "Reviwed",
      reviewDate: "2024-11-29",
    },
    {
      supplier: "Supplier E",
      invoiceNumber: "INV-005",
      uploadedDate: "2024-11-27",
      reviewStatus: "Reviwed",
      reviewDate: "2024-11-28",
    },
  ]);

  const { loading, setLoading } = useContext(TableResponseContext)!;
  const navigate = useNavigate();

  setLoading("")

  const handleRowClick = () => {
    navigate(`/purchase/bills/invoice/view`);
  };

  const renderColumnContent = (colId: string, item: any) => {
    const columnValue = item[colId as keyof typeof item];
    if (colId === "reviewStatus") {
      return (
        <div className="flex justify-center items-center">
          <div
            className={`${
              item.reviewStatus === "Need Review" ? "bg-[#F7E7CE]" :"bg-[#DADCCD]"
            } text-[13px] rounded-lg text-center items-center text-textColor h-[18px] px-2 max-w-fit gap-2 py-2 flex justify-center`}
          >
                        <DotIcon color="#495160" />

            {item.reviewStatus}
          </div>
       </div>
      );
    }
    return columnValue ? columnValue : <span className="text-gray-500 italic">-</span>;
  };

  return (
    <PurchaseTable
      columns={columns}
      data={allInoive}
      onRowClick={handleRowClick}
      renderColumnContent={renderColumnContent}
      searchPlaceholder="Search Invoice"
      loading={loading.skeleton}
      searchableFields={["supplier", "reviewStatus"]}
      setColumns={setColumns}
    />
  );
};

export default AllInvoiceTable;
