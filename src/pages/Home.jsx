import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import HeroSection from "../components/ui/HeroSection";
import Marquee from "react-fast-marquee";

const navigation = [
  { name: "Home", href: "/home", isRouterLink: true },
  { name: "About", href: "/about", isRouterLink: true },
  { name: "Event", href: "#events", isRouterLink: false },
  { name: "Sponsors", href: "#sponsors", isRouterLink: false },
  { name: "Contact Us", href: "/contact", isRouterLink: true },
];

const leaders = [
  {
    id: 1,
    name: "Prof. Samiran Chattopadhyay",
    title: "Pro Vice Chancellor, Techno India University",
    image: "/images/image 34.png",
  },
  {
    id: 2,
    name: "Dr. Sujoy Biswas",
    title: "CEO, Techno India Group",
    image: "/images/image 35.png",
  },
  {
    id: 3,
    name: "Dr. Rina Paladhi",
    title: "Director, Techno India Group",
    image: "/images/image 34.png",
  },
  {
    id: 4,
    name: "Dr. Ishan Ghosh",
    title: "Associate Dean of Student Affairs, Techno India University",
    image: "/images/image 35.png",
  },
];

const events = [
  {
    id: 1,
    title: "AI UNLEASHED",
    description:
      "Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies. Exp...",
    image: "/images/image 34.png",
  },
  {
    id: 2,
    title: "IOT EXPOSITION",
    description:
      "Landing page for SeaPhantom, an NFT project focusing on innovative and sustainable technologies. Exp...",
    image: "/images/image 35.png",
  },
];

const projects = [
  {
    id: 1,
    title: "SLEEPING..",
    description:
      "A dynamic platform for showcasing student innovations in AI and IoT.",
    image: "/images/image 35.png",
  },
  {
    id: 2,
    title: "POSING PROJECT",
    description:
      "Watch and backed by modern design, this site lets you register for events...",
    image: "/images/image 34.png",
  },
  {
    id: 4,
    title: "CANDID PROJECT",
    description:
      "Organized by batch and backed by modern design, view projects...",
    image: "/images/image 34.png",
  },
  {
    id: 3,
    title: "LANDSCAPE PROJECT",
    description:
      "This site lets you register for events, view cutting-edge projects...",
    image: "/images/image 35.png",
  },
];

const gallery = [
  { id: 1, image: "/images/image 35.png" },
  { id: 2, image: "/images/image 34.png" },
  { id: 3, image: "/images/image 35.png" },
  { id: 4, image: "/images/image 34.png" },
];

const sponsors = [
  { id: 1, name: "SPONSOR.1", responsiveClass: "" },
  { id: 2, name: "SPONSOR.1", responsiveClass: "" },
  { id: 3, name: "SPONSOR.1", responsiveClass: "" },
  { id: 4, name: "SPONSOR.1", responsiveClass: "" },
  { id: 5, name: "SPONSOR.1", responsiveClass: "" },
  { id: 6, name: "SPONSOR.1", responsiveClass: "" },
  { id: 7, name: "SPONSOR.1", responsiveClass: "" },
  { id: 8, name: "SPONSOR.1", responsiveClass: "" },
  { id: 9, name: "SPONSOR.1", responsiveClass: "" },
  { id: 10, name: "SPONSOR.1", responsiveClass: "" },
];

const Home = () => {
  const navigate = useNavigate();
  const [scrollOpacity, setScrollOpacity] = useState(0.2);
  const [isIntroVisible, setIsIntroVisible] = useState(false);
  const [isEventsVisible, setIsEventsVisible] = useState(false);
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = useState(false);
  const [isLeaderVisible, setIsLeaderVisible] = useState(false);
  const introSectionRef = useRef(null);
  const eventsSectionRef = useRef(null);
  const projectsSectionRef = useRef(null);
  const gallerySectionRef = useRef(null);
  const leaderSectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrollOpacity(1);
      } else {
        setScrollOpacity(0.2);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === "intro") setIsIntroVisible(true);
          if (entry.target.id === "events") setIsEventsVisible(true);
          if (entry.target.id === "projects") setIsProjectsVisible(true);
          if (entry.target.id === "gallery") setIsGalleryVisible(true);
          if (entry.target.id === "leader") setIsLeaderVisible(true);
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    const refs = [
      introSectionRef,
      eventsSectionRef,
      projectsSectionRef,
      gallerySectionRef,
      leaderSectionRef,
    ];

    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen overflow-hidden text-white">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0014] via-[#220033] to-[#000000]"></div>
      <div className="absolute inset-0">
        <div className="w-[900px] h-[900px] bg-purple-700 opacity-30 blur-[220px] rounded-full absolute top-[-250px] left-[-250px]"></div>
        <div className="w-[700px] h-[700px] bg-blue-500 opacity-20 blur-[200px] rounded-full absolute bottom-[-250px] right-[-200px]"></div>
      </div>
      <div
        className="fixed top-0 left-1/2 transform -translate-x-1/2 w-[900px] h-[250px] bg-gradient-to-r from-purple-500 via-purple-600 to-pink-600 blur-[120px] rounded-full pointer-events-none transition-all duration-300"
        style={{ zIndex: 1, opacity: scrollOpacity }}
      ></div>
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="py-6">
          <nav className="flex items-center justify-between">
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  className="h-20 w-auto"
                  src="/images/technothon.png"
                  alt="Technothon Logo"
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-baseline space-x-4 rounded-full ring-1 ring-gray-200/10 px-6 py-2 bg-white/5 backdrop-blur-sm">
                {navigation.map((item) =>
                  item.isRouterLink ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {item.name}
                    </a>
                  )
                )}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-300 hover:text-white"
              >
                Login / Register
              </Link>
            </div>
          </nav>
        </header>

        <HeroSection />

        <div className="py-4 border-y border-white/10" id="sponsors">
          <Marquee pauseOnHover={true} speed={50}>
            {sponsors.map((sponsor) => (
              <span
                key={sponsor.id}
                className={`${sponsor.responsiveClass} mx-8 text-gray-400 text-sm font-semibold`}
              >
                {sponsor.name}
              </span>
            ))}
          </Marquee>
        </div>

        <section
          id="intro"
          ref={introSectionRef}
          className={`py-24 transition-all duration-700 ${
            isIntroVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-center text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
            STEP INTO A WORLD OF INNOVATION WHERE STUDENTS BRING TECHNOLOGY TO
            LIFE! DISCOVER AI AND IOT-POWERED PROJECTS, REGISTER FOR EXCITING
          </p>
        </section>

        <section
          id="events"
          ref={eventsSectionRef}
          className={`py-12 transition-all duration-700 ${
            isEventsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-200 via-gray-500 to-gray-300 bg-clip-text text-transparent inline-block">
              EVENTS
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              A DYNAMIC PLATFORM FOR SHOWCASING STUDENT INNOVATIONS IN AI AND
              IOT.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-[#1A162D] rounded-lg overflow-hidden p-6 flex flex-col"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-gray-400 text-sm mb-4">
                  {event.description}
                </p>

                <div className="mt-auto">
                  <Link
                    to="/events"
                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                  >
                    View Event
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="projects"
          ref={projectsSectionRef}
          className={`py-24 transition-all duration-700 ${
            isProjectsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-200 via-gray-500 to-gray-300 bg-clip-text text-transparent inline-block">
              FEATURED PROJECTS
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              A DYNAMIC PLATFORM FOR SHOWCASING STUDENT INNOVATIONS IN AI AND
              IOT.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="relative group rounded-2xl overflow-hidden h-80"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="gallery"
          ref={gallerySectionRef}
          className={`py-12 transition-all duration-700 ${
            isGalleryVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-200 via-gray-500 to-gray-300 bg-clip-text text-transparent inline-block">
              GALLERY
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              A DYNAMIC PLATFORM FOR SHOWCASING STUDENT INNOVATIONS IN AI AND
              IOT.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {gallery.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl overflow-hidden aspect-w-1 aspect-h-1 transform transition duration-300 hover:scale-105 hover:shadow-lg  "
              >
                <img
                  src={item.image}
                  alt={`Gallery item ${item.id}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        <section
          id="leader"
          ref={leaderSectionRef}
          className={`py-12 transition-all duration-700 ${
            isLeaderVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-12">
            <h2
              className="text-5xl font-bold bg-gradient-to-r from-gray-200 via-gray-500
             to-gray-300 bg-clip-text text-transparent inline-block"
            >
              Our Leaders
            </h2>
            <p className="text-gray-400 mt-2 text-sm">
              Meet the visionary leaders of Techno India University
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4 sm:px-8">
            {leaders.map((leader) => (
              <div
                key={leader.id}
                className="flex flex-col items-center text-center transform transition duration-300 hover:scale-105 hover:shadow-lg hover:bg-white/5 p-4 rounded-xl"
              >
                <div className="w-40 h-40 rounded-full overflow-hidden mb-4 ">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold">{leader.name}</h3>
                <p className="text-gray-400 text-sm mt-1">{leader.title}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
