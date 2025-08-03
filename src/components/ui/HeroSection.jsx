import React from "react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  useEffect(() => {
    setIsHeroVisible(true);
  }, []);
  return (
    <div>
      <section
        className={`min-h-[80vh] flex flex-col items-center justify-center text-center transition-opacity duration-2000 ease-in ${
          isHeroVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="/images/technothon.png"
          alt="Technothon Main Logo"
          className="w-72 h-auto sm:w-96"
        />
      </section>
    </div>
  );
};

export default HeroSection;
