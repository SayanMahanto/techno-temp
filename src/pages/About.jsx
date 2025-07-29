/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const About = () => {
  const [scrollOpacity, setScrollOpacity] = useState(0.2);
  const [isImgVisible, setIsImgVisible] = useState(false);
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  const imgRef = useRef(null);
  const descriptionRef = useRef(null);
  const teamSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 500) {
        setScrollOpacity(1);
      } else {
        setScrollOpacity(0.2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsImgVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsDescriptionVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.4 }
    );

    if (descriptionRef.current) {
      observer.observe(descriptionRef.current);
    }

    return () => {
      if (descriptionRef.current) {
        observer.unobserve(descriptionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsCardVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.6 }
    );

    if (teamSectionRef.current) {
      observer.observe(teamSectionRef.current);
    }

    return () => {
      if (teamSectionRef.current) {
        observer.unobserve(teamSectionRef.current);
      }
    };
  }, []);

  const teamData = [
    { name: "John Doe", img: "/images/image 34.png", role: "Co-Founder" },
    { name: "Jane Smith", img: "/images/image 35.png", role: "Lead Developer" },
    {
      name: "Alice Johnson",
      img: "/images/image 34.png",
      role: "UI/UX Designer",
    },
    {
      name: "Bob Brown",
      img: "/images/image 35.png",
      role: "Marketing Specialist",
    },
    {
      name: "Emily White",
      img: "/images/image 34.png",
      role: "Backend Engineer",
    },
    {
      name: "David Green",
      img: "/images/image 35.png",
      role: "Product Manager",
    },
    {
      name: "Sarah Black",
      img: "/images/image 34.png",
      role: "Content Creator",
    },
    {
      name: "Michael Blue",
      img: "/images/image 35.png",
      role: "DevOps Engineer",
    },
    {
      name: "Olivia Grey",
      img: "/images/image 34.png",
      role: "Data Scientist",
    },
    {
      name: "William Red",
      img: "/images/image 35.png",
      role: "Cybersecurity Analyst",
    },
    {
      name: "Sophia Gold",
      img: "/images/image 34.png",
      role: "Community Manager",
    },
    {
      name: "James Silver",
      img: "/images/image 35.png",
      role: "Technical Writer",
    },
  ];

  const images = [
    "/images/image 34.png",
    "/images/image 35.png",
    "/images/image 34.png",
    "/images/image 35.png",
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0014] via-[#220033] to-[#000000]"></div>

      {/* Purple + Blue Glow */}
      <div className="absolute inset-0">
        <div className="w-[900px] h-[900px] bg-purple-700 opacity-30 blur-[220px] rounded-full absolute top-[-250px] left-[-250px]"></div>
        <div className="w-[700px] h-[700px] bg-blue-500 opacity-20 blur-[200px] rounded-full absolute bottom-[-250px] right-[-200px]"></div>
      </div>

      {/* Top Glow */}
      <div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[900px] h-[250px] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 blur-[120px] rounded-full pointer-events-none transition-all duration-300"
        style={{ zIndex: 1, opacity: scrollOpacity }}></div>

      <div className="relative z-10 flex flex-col items-center px-6 md:px-20 py-10">
        {/* Heading */}
        <div className="w-full text-left my-12 text-5xl">
          <h1 className="font-bold bg-gradient-to-r from-gray-200 via-gray-500 to-gray-300 bg-clip-text text-transparent leading-normal inline-block main-section-heading">
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
              className="w-500 md:w-300 object-contain relative left-[-30%] top-[-35%]"
            />
          </div>

          {/* Left - Images with Wave Animation */}
          <div ref={imgRef} className="flex gap-5 z-10">
            {images.map((img, index) => (
              <div
                key={index}
                className="hover:scale-110 transition-transform duration-300 cursor-pointer">
                <div
                  className={`opacity-0 ${
                    isImgVisible
                      ? index % 2 === 0
                        ? "animate-slide-in-top"
                        : "animate-slide-in-bottom"
                      : ""
                  }`}
                  style={{ animationDelay: `${index * 0.2}s` }}>
                  <img
                    src={img}
                    alt={`Event ${index + 1}`}
                    className={`rounded-2xl w-32 h-72 md:w-36 md:h-80 object-cover ${
                      index % 2 === 0 ? "mb-10" : "mt-10"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right - Text */}
          <div
            ref={descriptionRef}
            className={`opacity-0 flex-1 z-10 max-w-xl mt-12
            ${isDescriptionVisible ? "animate-slide-in-right" : ""}`}>
            <p className="text-xs uppercase text-gray-400 mb-2">Since 2023</p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-wider mb-4">
              TECHNOTHON
            </h2>
            <p className="text-xl leading-relaxed text-gray-300">
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

        {/* Team Section */}
        <section className="w-full px-4 md:px-20 py-24 mt-20 text-white relative z-10 min-h-screen">
          <div className="text-center mb-16 text-4xl">
            <h1 className="font-bold bg-gradient-to-r from-gray-200 via-gray-500 to-gray-300 bg-clip-text text-transparent mb-20 second-main-heading">
              Meet the team
            </h1>
          </div>

          {/* Team Cards - Swiper Slider (Carousel Style) */}
          <Swiper
            // No 'effect' prop for a standard carousel
            grabCursor={true}
            centeredSlides={true} // Keep centeredSlides for the 'middle card larger' effect
            spaceBetween={30} // Space between cards
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Navigation, Autoplay]} // Only Navigation and Autoplay are needed
            breakpoints={{
              // Adjust slidesPerView for responsiveness
              640: {
                slidesPerView: 1.5, // 1 centered, 1 partial on side
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2.5, // 1 centered, 2 partial on sides
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3, // 1 centered, 2 full on sides (or adjust for more partial)
                spaceBetween: 40,
              },
              1280: {
                slidesPerView: 3.5, // Even more visible cards on larger screens
                spaceBetween: 50,
              },
              1536: {
                // 2xl breakpoint
                slidesPerView: 4.5,
                spaceBetween: 60,
              },
            }}
            ref={teamSectionRef}
            className={`opacity-0 mySwiper carousel-swiper-container mb-50 ${
              isCardVisible ? "animate-popout" : ""
            } transition-opacity duration-500`} // mb-50 is restored
          >
            {teamData.map((member, index) => (
              <SwiperSlide key={index}>
                <div className="bg-zinc-900 rounded-2xl p-10 text-center relative overflow-hidden group border-animation-card w-full">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
                  />
                  <h2 className="text-lg font-semibold mb-2">{member.name}</h2>
                  <p className="text-gray-400 text-sm">{member.role}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Background text */}
          <div className="absolute inset-0 flex justify-center items-center bottom-[-90vh] right-[-40vh] opacity-[0.05] text-[10rem] font-semibold pointer-events-none select-none tracking-wider z-[-1] mb-10">
            DEVELOPEMENT
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
