import { useEffect, useRef, useState } from "react";
import ClipboardIcon from "../../assets/icons/ClipboardIcon";
import Ellipsis from "../../assets/icons/Ellipsis";
import EyeIcon from "../../assets/icons/EyeIcon";
import HandShakeIcon from "../../assets/icons/HandShakeIcon";
import PackageIcon from "../../assets/icons/PackageIcon";
import BrandModal from "../../features/inventory/Brand/BrandModal";
import Category from "../../features/inventory/Category/Category";
import NewManufature from "../../features/inventory/Manufature/NewManufacture";
import RackModal from "../../features/inventory/Rack/RackModal";

type Props = {};

const ItemEllipsis = ({}: Props) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isBrandModalOpen, setIsBrandModalOpen] = useState(false);
  const [isRackModalOpen, setIsRackModalOpen] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [isManufatureModalOpen, setIsManudfatureModalOpen] = useState(false);

  const toggleCategoryModal = () => {
    setOpenCategoryModal(!openCategoryModal);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      if (!isBrandModalOpen) {
        setIsDropdownOpen(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isBrandModalOpen]);

  const dropdownItems = [
    {
      icon: <HandShakeIcon color="#4B5C79" />,
      text: "View Manufacture",
      onClick: () => {
        setIsManudfatureModalOpen(true);
      },
    },
    {
      icon: <EyeIcon color="#4B5C79" />,
      text: "View Brand",
      onClick: () => {
        setIsBrandModalOpen(true);
      },
    },
    {
      icon: <PackageIcon color="#4B5C79" />,
      text: "View Rack",
      onClick: () => {
        setIsRackModalOpen(true);
      },
    },
    {
      icon: <ClipboardIcon color="#4B5C79" />,
      text: "View Category",
      onClick: () => {
        setOpenCategoryModal(true);
      },
    },
  ];

  return (
    <>
      <div className="flex justify-end">
        <div onClick={toggleDropdown} className="cursor-pointer">
          <Ellipsis />
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-44 right-16 mt-2 w-[15.8%] bg-white shadow-xl z-10"
            style={{ borderRadius: "4px", padding: "8px" }}
          >
            <ul className="text-dropdownText">
              {dropdownItems.map((item, index) => (
                <div key={index}>
                  <li
                    onClick={item.onClick}
                    className="px-4 py-2 flex items-center 
                      gap-2 hover:bg-orange-100 rounded-md text-sm cursor-pointer"
                  >
                    {item.icon}
                    {item.text}
                  </li>
                  {index < dropdownItems.length - 1 && (
                    <hr className="border-dropdownBorder" />
                  )}
                </div>
              ))}
            </ul>
          </div>
        )}
      </div>

      {isBrandModalOpen && (
        <BrandModal ref={modalRef} onClose={() => setIsBrandModalOpen(false)} />
      )}
      {isRackModalOpen && (
        <RackModal ref={modalRef} onClose={() => setIsRackModalOpen(false)} />
      )}
      {isManufatureModalOpen && (
        <NewManufature
          ref={modalRef}
          onClose={() => setIsManudfatureModalOpen(false)}
        />
      )}
      <Category isOpen={openCategoryModal} onClose={toggleCategoryModal} />
    </>
  );
};

export default ItemEllipsis;