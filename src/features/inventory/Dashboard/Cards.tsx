import { useState } from "react";
import OrderCards from "./OrderCards"
type Props = {}

const Cards = ({}: Props) => {
    const [activeCard, setActiveCard] = useState<number | null>(0);
    const handleCardClick = (index: number) => {
        setActiveCard(index);
      };
  const cards = [
    {
      icon: <i className="fa-solid fa-cart-shopping text-xl text-black"></i>,
      title: "Total Inventory Value",
      count: "1500",
      rating: "12,95",
    },
    {
      icon: <i className="fa-solid fa-cogs text-xl text-black"></i>,
      title: "Total Sales Value",
      count: "120",
      rating: "18,95",
    },
    {
        icon: <i className="fa-solid fa-cogs text-xl text-black"></i>,
        title: "Turnover Rate",
        count: "800",
        rating: "12,95",
    },
    {
        icon: <i className="fa-solid fa-cogs text-xl text-black"></i>,
        title: "Pending Purchase",
        count: "85%",
        rating: "18",
    },
    {
        icon: <i className="fa-solid fa-cogs text-xl text-black"></i>,
        title: "Pending Sales",
        count: "15%",
        rating: "10",
    },
  ];
  return (
    <div>
        <div className="flex justify-between  w-full space-x-4">
      {cards.map((card, index) => (
        <OrderCards
          key={index}
          icon={card.icon}
          title={card.title}
          count={card.count}
          rating={card.rating}
          active={activeCard === index}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
    </div>
  )
}

export default Cards