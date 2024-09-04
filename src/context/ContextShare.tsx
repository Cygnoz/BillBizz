import React, { createContext, useState, ReactNode } from "react";
import { endponits } from "../Services/apiEndpoints";
import useApi from "../Hooks/useApi";

interface CashResponseContextType {
  cashResponse: any;
  setCashResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface BankResponseContextType {
  bankResponse: any;
  setBankResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface GstResponseContextType {
  gstResponse: any;
  setGstResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface VatResponseContextType {
  vatResponse: any;
  setVatResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface CurrencyResponseContextType {
  currencyResponse: any;
  setCurrencyResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface SupplierResponseContextType {
  supplierResponse: any;
  setsupplierResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface CustomerResponseContextType {
  customerResponse: any;
  setcustomerResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface CustomerEditResponseContextType {
  customerEditResponse: any;
  setcustomereditResponse: React.Dispatch<React.SetStateAction<any>>;
}

interface SettingsResponseType {
  settingsResponse: any;
  getSettingsData: () => void;
}

export const cashResponseContext = createContext<CashResponseContextType | undefined>(undefined);
export const BankResponseContext = createContext<BankResponseContextType | undefined>(undefined);
export const CurrencyResponseContext = createContext<CurrencyResponseContextType | undefined>(undefined);
export const GstResponseContext = createContext<GstResponseContextType | undefined>(undefined);
export const VatResponseContext = createContext<VatResponseContextType | undefined>(undefined);
export const settingsdataResponseContext = createContext<SettingsResponseType | undefined>(undefined);
export const SupplierResponseContext = createContext<SupplierResponseContextType | undefined>(undefined);
export const CustomerResponseContext = createContext<CustomerResponseContextType | undefined>(undefined);
export const CustomerEditResponseContext = createContext<CustomerEditResponseContextType | undefined>(undefined);

interface ContextShareProps {
  children: ReactNode;
}

const ContextShare: React.FC<ContextShareProps> = ({ children }) => {
  const [cashResponse, setCashResponse] = useState<any>({});
  const [bankResponse, setBankResponse] = useState<any>({});
  const [currencyResponse, setCurrencyResponse] = useState<any>({});
  const [gstResponse, setGstResponse] = useState<any>({});
  const [vatResponse, setVatResponse] = useState<any>({});
  const [settingsResponse, setSettingsesponse] = useState<any>({});
  const { request: getAllSettingsData } = useApi("put", 5004);
  const [supplierResponse, setsupplierResponse] = useState<any>({});
  const [customerResponse, setcustomerResponse] = useState<any>({});
  const [customerEditResponse, setcustomereditResponse] = useState<any>({});

  const getSettingsData = async () => {
    try {
      const url = `${endponits.GET_SETTINGS_DATA}`;
      const apiResponse = await getAllSettingsData(url, { organizationId: "INDORG0001" });
      const { response, error } = apiResponse;
      if (!error && response) {
        setSettingsesponse(response);
      } else {
        console.error('API Error:', error?.response?.data?.message || 'Unknown error');
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    }
  };

  return (
    <cashResponseContext.Provider value={{ cashResponse, setCashResponse }}>
      <BankResponseContext.Provider value={{ bankResponse, setBankResponse }}>
        <CurrencyResponseContext.Provider value={{ currencyResponse, setCurrencyResponse }}>
          <GstResponseContext.Provider value={{ gstResponse, setGstResponse }}>
            <VatResponseContext.Provider value={{ vatResponse, setVatResponse }}>
              <settingsdataResponseContext.Provider value={{ settingsResponse, getSettingsData }}>
                <CustomerEditResponseContext.Provider value={{ customerEditResponse, setcustomereditResponse }}>
                  <SupplierResponseContext.Provider value={{ supplierResponse, setsupplierResponse }}>
                    <CustomerResponseContext.Provider value={{ customerResponse, setcustomerResponse }}>
                      {children}
                    </CustomerResponseContext.Provider>
                  </SupplierResponseContext.Provider>
                </CustomerEditResponseContext.Provider>
              </settingsdataResponseContext.Provider>
            </VatResponseContext.Provider>
          </GstResponseContext.Provider>
        </CurrencyResponseContext.Provider>
      </BankResponseContext.Provider>
    </cashResponseContext.Provider>
  );
};

export default ContextShare;
