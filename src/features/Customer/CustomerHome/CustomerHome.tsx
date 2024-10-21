import Cards from "./Cards"
import Dropdown from "./Dropdown"
import NewCustomerModal from "./NewCustomerModal"
import CustomerTable from "./CustomerTable"
import Customers from "./Customers"


type Props = {}

function CustomerHome({}: Props) {
  return (
    <>
      <div className="mx-5 my-4 space-y-8 flex items-center relative">
        <div>
          <h3 className="font-bold text-2xl text-textColor">Customer</h3>
          <p className="text-sm text-gray mt-1">
          A customer is a compiled record of all individuals or entities who have purchased or interacted with business
          </p>
        </div>
        <div className="ml-auto gap-3 flex items-center">
          <NewCustomerModal page=""/>
          <Dropdown />
        </div>
      </div>
      <div>
        <Cards />
      </div>
      <div className="px-6 mt-3">
        <div className="bg-white p-5">
          <div className="w-[100%] p-3">
            <Customers />
          </div>
          
          <div className="pl-5 pr-5 mt-2">
            {/* table */}
            <CustomerTable/>
            </div>
        </div>
      </div>
    </>
  )
}

export default CustomerHome