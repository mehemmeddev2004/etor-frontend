"use client";
import React, { useState } from "react";
import Image from "next/image";
import Filter from "./ui/Filter";
import Login from "./ui/Login";
import Bar from "./ui/Bar";

const Header = () => {
  const [toggleSearch, setToggleSearch] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [toggleBar, setToggleBar] = useState(false);

  const handleToggleSearch = () => {
    setToggleSearch((prev) => !prev);
  };

  const handleLoginToggle = () => {
    setOpenLogin((prev) => !prev);
  };
    const handleToggleBar = () => {
    setToggleBar((prev) => !prev);
  };




  const icons = [
    { id: "1", img: "/img/search.svg", alt: "Search icon" },
    { id: "2", img: "/img/user.svg", alt: "User icon" },
    { id: "3", img: "/img/favorite.svg", alt: "Favorite icon" },
    { id: "4", img: "/img/bag.svg", alt: "Bag icon" },
  ];

  const category = [
    { id: "1", name: "Dresses" },
    { id: "2", name: "Trousers" },
    { id: "3", name: "Tops" },
    { id: "4", name: "Skirts" },
    { id: "5", name: "Coats" },
  ];

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <Filter isOpen={toggleSearch} onClose={() => setToggleSearch(false)} />
      <Login isOpen={openLogin} onClose={() => setOpenLogin(false)} />

      <div className="max-w-[1295px] mx-auto flex items-center justify-between px-5 h-16">
    
        <div className="flex items-center gap-12">
          <h2 className="font-extrabold text-3xl uppercase tracking-wide text-gray-900 cursor-pointer select-none">
            Etor
          </h2>

  
          <nav>
            <ul className="flex space-x-6 text-gray-700 max-[991px]:hidden font-medium text-base cursor-pointer select-none">
              {category.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-gray-900 transition-colors duration-200"
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center max-[991px]:hidden gap-[3px]">
          {icons.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "1") handleToggleSearch();
                if (item.id === "2") handleLoginToggle();
              }}
              aria-label={item.alt}
              type="button"
              className={`p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 ${
                (item.id === "2" || item.id === "3") && "max-lg:hidden"
              }`}
            >
              <Image src={item.img} alt={item.alt} width={20} height={20} />
            </button>
          ))}
        </div>
          <div className="hidden max-[991px]:block">
            <Bar onToggle={handleToggleBar} isOpen={toggleBar} />
          </div>
      </div>
    </header>
  );
};

export default Header;
