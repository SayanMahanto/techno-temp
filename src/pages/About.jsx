import React, { useState, useEffect } from "react";

const About = () => {
  const [showGlow, setShowGlow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowGlow(true);
      } else {
        setShowGlow(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b0014] via-[#1a0033] to-[#000000]"></div>

      {/* Purple + Blue Glow */}
      <div className="absolute inset-0">
        {/* Big Purple Glow */}
        <div className="w-[900px] h-[900px] bg-purple-700 opacity-30 blur-[220px] rounded-full absolute top-[-250px] left-[-250px]"></div>
        {/* Secondary Blue Glow */}
        <div className="w-[700px] h-[700px] bg-blue-500 opacity-20 blur-[200px] rounded-full absolute bottom-[-250px] right-[-200px]"></div>
      </div>

      <div
        className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-70 h-50 bg-purple-600 blur-[180px] rounded-full transition-opacity duration-700 pointer-events-none ${
          showGlow ? "opacity-40" : "opacity-0"
        }`}
        style={{ zIndex: 1 }}
      ></div>

      <div className="relative z-10 flex flex-col items-center px-6 md:px-20 py-10">
        {/* Heading */}
        <div className="w-full text-left my-12 text-5xl">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-gray-200 via-gray-500 to-gray-300 bg-clip-text text-transparent leading-normal inline-block ">
            About Us
          </h1>
          <p className="text-2xl text-gray-300 mb-10">
            Come, <span className="text-teal-400 font-semibold">build</span>{" "}
            with us
          </p>
        </div>

        {/* Content Section */}
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 w-full relative">
          {/* Background Logo */}
          <div className="absolute inset-0 flex justify-start items-start z-0 opacity-5 pointer-events-none">
            <img
              src="/images/technothon_nameless.png"
              alt="Technothon Logo"
              className="w-[750px] md:w-[850px] object-contain relative left-[-10%] top-[-50%]"
            />
          </div>

          {/* Left - Images */}
          <div className="flex gap-6 z-10">
            <img
              src="/images/image 34.png"
              alt="Event 1"
              className="opacity-0 rounded-2xl w-40 h-90 object-cover mb-10 transition-transform duration-300 hover:scale-110 hover:shadow-xl animate-slide-in-top"
            />
            <img
              src="/images/image 35.png"
              alt="Event 2"
              className="opacity-0 rounded-2xl w-38 h-75 md:w-40 md:h-90 object-cover mt-10 transition-transform duration-300 hover:scale-110 hover:shadow-xl animate-slide-in-bottom delay-200"
            />
            <img
              src="/images/image 34.png"
              alt="Event 3"
              className="opacity-0 rounded-2xl w-38 h-75 md:w-40 md:h-90 object-cover mb-10 transition-transform duration-300 hover:scale-110 hover:shadow-xl animate-slide-in-top delay-400"
            />
            <img
              src="/images/image 35.png"
              alt="Event 4"
              className="opacity-0 rounded-2xl w-38 h-75 md:w-40 md:h-90 object-cover mt-10 transition-transform duration-300 hover:scale-110 hover:shadow-xl animate-slide-in-bottom delay-600"
            />
          </div>

          {/* Right - Text */}
          <div className="flex-1 z-10 max-w-xl mt-18">
            <p className="text-xs uppercase text-gray-400 mb-2">Since 2023</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">TECHNOTHON</h2>
            <p className="text-lg leading-relaxed text-gray-300">
              Technothon, a technical club of Techno India University, was
              established by Rahul Mahato in 2023. It focuses on inculcating and
              nurturing innovative ideas in students' minds by turning brute
              force projects into unique practical solutions. With the help of
              Artificial Intelligence, Python, Internet of Things and other
              up-to-date technologies, we aim to transform and envision a new
              world and a better youth.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;