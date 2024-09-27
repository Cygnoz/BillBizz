import { Link, useParams, useLocation } from "react-router-dom";
import CheveronLeftIcon from "../../../assets/icons/CheveronLeftIcon";
import useApi from "../../../Hooks/useApi";
import { endponits } from "../../../Services/apiEndpoints";
import { useEffect, useState } from "react";

type TrialBalance = {
  _id: string;
  organizationId: string;
  date: string;
  accountId: string;
  accountName: string;
  action: string;
  creditAmount: number;
  debitAmount: number;
  remark: string;
};

function AccountantView() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const fromCash = searchParams.get("fromCash") === "true"; 
  const fromBank = searchParams.get("fromBank") === "true"; 
  const { request: getOneTrialBalance } = useApi("put", 5001);
  const { request: getOneOrganization } = useApi("put", 5004);
  const [trialBalance, setTrialBalance] = useState<TrialBalance[]>([]);
  const [oneOrganization, setOneOrganization] = useState<any | []>([]);

  const getOneTrialBalanceData = async () => {
    try {
      const url = `${endponits.GET_ONE_TRIAL_BALANCE}/${id}`;
      const body = { organizationId: "INDORG0001" };
      const { response, error } = await getOneTrialBalance(url, body);
      if (!error && response) {
        setTrialBalance(response.data);
      }
    } catch (error) {
      console.error("Error fetching trial balance:", error);
    }
  };

  const getOrganization = async () => {
    try {
      const url = `${endponits.GET_ONE_ORGANIZATION}`;
      const { response, error } = await getOneOrganization(url, {
        organizationId: "INDORG0001",
      });

      if (!error && response?.data) {
        setOneOrganization(response.data);
      }
    } catch (error) {
      console.error("Error fetching organization:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getOneTrialBalanceData();
      getOrganization();
    }
  }, [id]);

  return (
    <div className="px-6">
      <div className="flex items-center gap-5 mb-2">
      <Link to={fromCash ? "/accountant/cash" : fromBank ? "/accountant/bank" : "/accountant/chart-OF-accountant"}>
          <div
            style={{ borderRadius: "50%" }}
            className="w-[40px] h-[40px] flex items-center justify-center bg-white"
          >
            <CheveronLeftIcon />
          </div>
        </Link>
        <p className="text-textColor text-xl font-bold">
          {trialBalance.length > 0 && trialBalance[0].accountName}
        </p>
      </div>

      <div className="p-6 rounded-lg bg-white">
        <div className="flex justify-between mb-4">
          <p className="font-bold text-textColor text-base">Recent Transaction</p>
          {/* FCY/BCY Toggle Buttons */}
          <div className="flex text-[#565148] text-xs font-medium">
            <button className="border border-[#565148] border-r-0 px-3 py-1 rounded-s-lg text-sm">FCY</button>
            <button className="border border-[#565148] px-3 py-1 rounded-e-lg text-sm">BCY</button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-tableBorder rounded-lg">
            <thead className="text-[12px] text-center text-dropdownText">
              <tr className="bg-[#F9F7F0]">
                <th className="py-3 px-4 font-medium border-b border-tableBorder text-sm">Date</th>
                <th className="py-3 px-4 font-medium border-b border-tableBorder text-sm">Transaction Details</th>
                <th className="py-3 px-4 font-medium border-b border-tableBorder text-sm">Type</th>
                <th className="py-3 px-4 font-medium border-b border-tableBorder text-sm">
                  Debit {oneOrganization.baseCurrency && `(${oneOrganization.baseCurrency})`}
                </th>
                <th className="py-3 px-4 font-medium border-b border-tableBorder text-sm">
                  Credit {oneOrganization.baseCurrency && `(${oneOrganization.baseCurrency})`}
                </th>
              </tr>
            </thead>
            <tbody className="text-dropdownText text-center text-[13px]">
              {/* Check if trialBalance array has data */}
              {trialBalance.length > 0 ? (
                trialBalance.map((item) => (
                  <tr key={item._id}>
                    <td className="py-3 px-4 border-b border-tableBorder">{item.date.split(' ')[0]}</td>
                    <td className="py-3 px-4 border-b border-tableBorder">{item.accountName}</td>
                    <td className="py-3 px-4 border-b border-tableBorder">{item.action}</td>
                    <td className="py-3 px-4 border-b border-tableBorder">{item.debitAmount}</td>
                    <td className="py-3 px-4 border-b border-tableBorder">{item.creditAmount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-3 px-4 border-b border-tableBorder text-center text-red-600">
                    Not found !
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AccountantView;