import React from "react";
import { Link } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedin,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const navigation = [
  { name: "Home", href: "/home" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Contact = () => {
  return (
    <>
      {/* Header */}
      <nav
        aria-label="Global"
        className="flex items-center justify-between z-40 p-6 lg:px-8 fixed w-full"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex">
            <img
              src="/images/technothon.png"
              alt="Logo"
              className="h-15 mx-auto"
            />
          </Link>
        </div>

        <div className="flex gap-x-12 rounded-full ring-1 ring-gray-200/20 px-7 py-2 backdrop-blur-3xl">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm/6 font-semibold text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm/6 font-semibold text-gray-900">
            Log out <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Contact Section */}
      <section className="min-h-screen bg-gradient-to-br from-[#1f0037] via-[#2a004d] to-[#000000] text-white pt-28 pb-10 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Form Section */}
          <div className="flex flex-col justify-center">
            <h2 className="text-5xl font-extrabold mb-4 tracking-widest">
              CONTACT US
            </h2>
            <p className="mb-6 text-lg">
              Have a question, suggestion, or want to collaborate?
              <br />
              <span className="text-gray-300">
                Feel free to reach out! Our team will get back to you as soon as
                possible.
              </span>
            </p>

            <form className="bg-[#1f1b2e] p-6 rounded-2xl border-2 border-[#00aaff] w-full">
              <div className="space-y-4">
                <div>
                  <label className="block text-lg">Name</label>
                  <input
                    type="text"
                    className="w-full p-2 bg-transparent border-b-2 border-gray-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-lg">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 bg-transparent border-b-2 border-gray-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-lg">Message</label>
                  <textarea
                    className="w-full p-2 bg-transparent border-b-2 border-gray-400 focus:outline-none"
                    rows="4"
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  type="submit"
                  className="bg-[#3a1a78] text-white text-lg px-8 py-2 rounded-xl shadow-lg hover:bg-[#5621a7] transition"
                >
                  Send!
                </button>
              </div>
            </form>

            {/* Contact Info */}
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <FaPhoneAlt className="text-lg" />
                <span>9836209179</span>
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-lg" />
                <span>
                  EM-4, EM-4/1, EM Block, Sector V, Bidhannagar, Kolkata, West
                  Bengal 700091
                </span>
              </div>
              <div className="flex space-x-4 text-2xl mt-4">
                <FaLinkedin className="cursor-pointer hover:text-[#0077b5]" />
                <FaInstagram className="cursor-pointer hover:text-[#e4405f]" />
                <FaYoutube className="cursor-pointer hover:text-[#ff0000]" />
                <FaWhatsapp className="cursor-pointer hover:text-[#25d366]" />
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="h-full w-full">
            <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-[#3f1a78] h-full">
              <iframe
                title="Techno India University Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.8076930215953!2d88.43164237484504!3d22.58602963213233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0276b1a5f7166d%3A0x112d6315a1c1eb2f!2sTechno%20India%20University!5e0!3m2!1sen!2sin!4v1620213124000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="min-h-[500px] w-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
