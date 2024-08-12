import { useEffect, useState } from "react";
import navlist from "../../assets/constants";
import { Link } from "react-router-dom";
import ItemEllipsis from "../../Components/ellipsis/Ellipsis";

type Props = {
  activeIndex: number | null;
};

const SubHeader = ({ activeIndex }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState<number>();

  useEffect(() => {
    const savedSelectedIndex = localStorage.getItem("savedSelectedIndex");
    if (savedSelectedIndex !== null) {
      setSelectedIndex(Number(0));
    }
  }, [activeIndex]);

  const handleSelect = (index: number) => {
    setSelectedIndex(index);
    localStorage.setItem("savedSelectedIndex", index.toString());
  };

  return (
    <div className="bg-BgSubhead flex mx-7 justify-between px-7 py-5 my-4 items-center rounded-full ">
      <div className="flex items-center gap-4">
        <div className="bg-white px-4 py-2 rounded-full text-sm">Home</div>
        {activeIndex !== null &&
          navlist[activeIndex] &&
          navlist[activeIndex].subhead &&
          navlist[activeIndex].subhead.map((item, index) => (
            <Link to={item.subRoute} key={index}>
              <div
                className={`font-medium py-2 px-4 rounded-full cursor-pointer ${
                  selectedIndex === index ? "bg-white" : "hover:bg-white"
                }`}
                onClick={() => handleSelect(index)}
              >
                {item.headName}
              </div>
            </Link>
          ))}
      </div>
      <div>{activeIndex === 1 && <ItemEllipsis />}</div>
    </div>
  );
};

export default SubHeader;
