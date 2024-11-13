import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowDownIcon from "../../../assets/icons/ArrowDownIcon";
import ArrowUpIcon from "../../../assets/icons/ArrowUpIcon";
import PlusCircle from "../../../assets/icons/PlusCircle";
import Button from "../../../Components/Button";
import Table from "../manualJournel/newJournal/Table";

type Props = {};

function ManualHome({}: Props) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const dropdownItems = [
    {
      icon: <ArrowDownIcon />,
      text: "Import Journel",
      onClick: () => {
        console.log("Import Sales Order clicked");
      },
    },
    {
      icon: <ArrowUpIcon />,
      text: "Export Journel",
      onClick: () => {
        console.log("Export Sales Order clicked");
      },
    },
    {
      icon: <ArrowUpIcon />,
      text: "Manage Journel",
      onClick: () => {
        console.log("Export Current View clicked");
      },
    },
  ];
  return (
    <>
      <div className="mx-5 my-4  h-[100vh]">
        <div className="flex items-center">
          <div>
            <h3 className="font-bold text-2xl text-textColor">
              Manual Journels
            </h3>
            <p className="text-sm text-gray mt-1">
              A manual journal is a ledger entry used to record financial
              transaction by hand, typically fo adjustment or entries not
              processed through automated system
            </p>
          </div>
          <div className="ml-auto gap-3 flex items-center">
            <Link to={"/accountant/newjournal"}>
              <Button variant="primary" size="xl">
                <PlusCircle color="white" />
                <p className="text-sm">New Journel</p>
              </Button>
            </Link>
            <div className="relative">
              <div onClick={toggleDropdown} className="cursor-pointer">
                {/* <Ellipsis /> */}
              </div>
              {isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl z-10"
                >
                  <ul className="py-1 text-dropdownText">
                    {dropdownItems.map((item, index) => (
                      <li
                        key={index}
                        onClick={item.onClick}
                        className="px-4 py-2 flex items-center gap-2 hover:bg-orange-100 rounded-md text-sm cursor-pointer"
                      >
                        {item.icon}
                        {item.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div></div>
        </div>

        <div className="mt-5 bg-white  p-5 rounded-xl">
          <div>
            <Table />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManualHome;
