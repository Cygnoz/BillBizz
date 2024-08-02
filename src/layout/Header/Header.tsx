import { Link } from "react-router-dom";
import Button from "../../Components/Button";
import SearchBar from "../../Components/SearchBar";
import SettingsIcons from "../../assets/icons/SettingsIcon";
import Notification from "./HeaderIcons/Notification";
import RefferEarn from "./HeaderIcons/RefferEarn";
import Organization from "./HeaderIcons/Organization";
import { useState } from "react";

type Props = {};

const Header = ({}: Props) => {
  const [searchValue, setSearchValue] = useState<string>("");
  return (
    <div
      className="p-4 flex items-center gap-4 w-full border-b-slate-400 border-y-orange-200"
      style={{ borderBottom: "1.5px solid rgba(28, 28, 28, 0.1)" }}
    >
      <div className="flex-grow">
        <SearchBar
          placeholder="Serach"
          searchValue={searchValue}
          onSearchChange={setSearchValue}
        />
      </div>
      <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">
        Trial expires in 14 days
      </span>
      <div className="flex items-center gap-4 ml-auto">
        <Button variant="tertiary" size="sm">
          <p className="text-xs  font-medium">Subscribe</p>
        </Button>
        <select
          className="border border-outlineButton px-[0.625rem] py-2 text-outlineButton rounded-md bg-orange-100 text-xs font-medium     
"
        >
          <option>Company</option>
          <option>Other</option>
          <option>Other</option>
          <option>Other</option>
        </select>
        <div className="flex items-center gap-2">
          <Notification />
          <RefferEarn />
          <Link to="/settings">
            <SettingsIcons size="md" />
          </Link>
          <Organization />
        </div>
      </div>
    </div>
  );
};

export default Header;
