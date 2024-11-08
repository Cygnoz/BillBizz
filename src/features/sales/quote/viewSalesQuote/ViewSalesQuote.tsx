import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CheveronLeftIcon from "../../../../assets/icons/CheveronLeftIcon";
import MailIcon from "../../../../assets/icons/MailIcon";
import Button from "../../../../Components/Button";
import useApi from "../../../../Hooks/useApi";
import { endponits } from "../../../../Services/apiEndpoints";
// import SalesPdfView from "./SalesQuotePdfView";
import SalesOrderView from "./SalesQuoteView";

interface QuoteItem {
  itemId: string;
  itemName: string;
  quantity: number;
  sellingPrice: number;
  amount: number;
  itemAmount: number;
}

interface QuoteData {
  cgst: number;
  sgst: number;
  createdDate: string;
  customerName: string;
  discountTransactionAmount: number;
  expiryDate: string;
  items: QuoteItem[];
  placeOfSupply: string;
  salesQuoteDate: string;
  salesQuotes: string;
  status: string;
  subTotal: number;
  totalAmount: number;
  totalDiscount: number;
  totalItem: number;
  totalTax: number;
  customerId: number
}

function ViewSalesQuote() {
  const [isPdfView, setIsPdfView] = useState(false);
  const { id } = useParams<{ id: string }>();
  const { request: getOneQuote } = useApi("get", 5007);
  const [data, setData] = useState<QuoteData | null>(null);

  const fetchOneQuote = async () => {
    try {
      const url = `${endponits.GET_ONE_QUOTES}/${id}`;
      const { response, error } = await getOneQuote(url);
      if (!error && response) {
        setData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  useEffect(() => {
    fetchOneQuote();
  }, [id]);

  const handleToggle = () => {
    setIsPdfView(!isPdfView);
  };

  return (
    <div className="px-6">
      <div className="bg-white rounded-md p-5 mb-3">
        <div className="flex items-center gap-5">
          <Link to={"/sales/quote"}>
            <div
              style={{ borderRadius: "50%" }}
              className="w-[40px] h-[40px] flex items-center justify-center bg-backButton"
            >
              <CheveronLeftIcon />
            </div>
          </Link>
          <p className="text-textColor text-xl font-bold">View Sales Quote</p>
        </div>
        <br />

        <div className="flex justify-between">
          <div className="flex gap-3 items-center">
            <p className="text-lg text-textColor font-bold pr-4 border-r-[1px] border-borderRight">
              Quote
            </p>
            <p className="text-lg text-textColor font-bold pr-4 border-r-[1px] border-borderRight">
              #{data?.salesQuotes || "N/A"}
            </p>
            <p className="text-sm font-semibold text-textColor bg-cuscolumnbg p-1 text-center rounded-sm">
              {data?.status || "Draft"}
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <Button variant="secondary" className="pl-5 pr-5" size="sm">
              <MailIcon color="#565148" />
              <p className="text-sm font-medium">Email</p>
            </Button>
            {/* toggle button */}
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isPdfView}
                  onChange={handleToggle}
                />
                <div
                  className={`w-11 h-6 rounded-full shadow-inner transition-colors ${
                    isPdfView ? "bg-checkBox" : "bg-dropdownBorder"
                  }`}
                ></div>
                <div
                  className={`dot absolute w-4 h-4 bg-white rounded-full top-1 transition-transform ${
                    isPdfView ? "transform translate-x-full left-2" : "left-1"
                  }`}
                ></div>
              </div>
              <div className="ml-3 text-textColor font-semibold text-base">
                PDF View
              </div>
            </label>
          </div>
        </div>
        <hr className="border-t border-inputBorder mt-4" />

        {/* Conditional rendering based on isPdfView */}
        {isPdfView ? (
          <div className="pdf-view-component">
            {/* <SalesPdfView data = {data}/> */}
          </div>
        ) : (
          <div className="other-component">
            <SalesOrderView data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewSalesQuote;
