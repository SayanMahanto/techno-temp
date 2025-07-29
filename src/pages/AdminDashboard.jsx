import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // <-- Added here because Head uses Link
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

// Navigation array (used by Header)
const navigation = [
  { name: "Home", href: "/home" },
  { name: "Events", href: "/events" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

// --- Header component integrated ---
const Head = () => {
  return (
    <div>
      <nav
        aria-label="Global"
        className="flex items-center justify-between z-40 p-6 lg:px-8 fixed w-full bg-black bg-opacity-90"
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
              className="text-sm/6 font-semibold text-gray-200 hover:text-white"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm/6 font-semibold text-gray-200 hover:text-white">
            Log out <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

// --- Stat Card (unused in this version) ---
const StatCard = ({ title, total, active, current }) => (
  <div className="bg-black rounded-lg p-6 shadow text-white w-full flex flex-col gap-1 border border-gray-800 h-80">
    <h2 className="text-lg font-bold">{title}</h2>
    {total && <p>Total: {total}</p>}
    {active && <p className="text-green-400">Active: {active}</p>}
    {current && <p>Current: {current}</p>}
  </div>
);

// --- Gallery ---
const Gallery = () => (
  <div className="bg-black p-6 rounded-lg shadow text-white w-full border border-gray-800 h-80">
    <h2 className="text-lg font-bold mb-2">Gallery 📷</h2>
    <img
      src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=3132&auto=format&fit=crop"
      alt="Gallery"
      className="w-full h-36 object-cover rounded mb-2"
    />
    <div>
      <h3 className="text-md font-semibold">At a glance</h3>
      <p>Ai Unleashed</p>
      <p>Uploads 22</p>
    </div>
  </div>
);

// --- Pie Chart Card ---
const ChartCard = ({ title, data }) => (
  <div className="bg-black rounded-lg p-6 shadow text-white w-full border border-gray-800 h-80">
    <h2 className="text-lg font-bold mb-4">{title}</h2>
    <div className="h-48">
      <Pie data={data} options={{ maintainAspectRatio: false }} />
    </div>
  </div>
);

// --- Event Form ---
const EventsSection = () => {
  const [form, setForm] = useState({
    name: "",
    desc: "",
    prize: "",
    start: "",
    end: "",
  });

  return (
    <div className="bg-black p-6 rounded-lg shadow text-white w-full border border-gray-800">
      <h3 className="text-lg font-semibold mb-2">Create Event</h3>
      <div className="flex gap-2 mb-3">
        <button className="bg-purple-600 px-3 py-1 rounded">Existing</button>
        <button className="bg-purple-600 px-3 py-1 rounded">Live</button>
      </div>
      <div className="grid gap-2">
        {["name", "desc", "prize", "start", "end"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white"
          />
        ))}
        <div className="flex gap-2">
          <button className="bg-red-500 px-4 py-1 rounded">Cancel</button>
          <button className="bg-green-600 px-4 py-1 rounded">Upload</button>
        </div>
      </div>
    </div>
  );
};

// --- Upload Section ---
const UploadSection = () => (
  <div className="bg-black p-6 rounded-lg shadow text-white w-full border border-gray-800">
    <h3 className="text-lg font-semibold mb-2">Uploads</h3>
    <p className="mb-2">Last Uploaded: abc.csv</p>
    <input
      className="w-full mb-2 p-2 rounded bg-gray-800 text-white"
      placeholder="Search..."
    />
    <ul className="text-sm space-y-2 mb-3">
      {["abc.csv", "file2.doc", "event.pdf"].map((file, i) => (
        <li
          key={i}
          className="flex justify-between bg-gray-800 px-3 py-2 rounded"
        >
          <span>{file}</span>
          <span>Date</span>
        </li>
      ))}
    </ul>
    <input type="file" className="mb-3 w-full text-sm" />
    <div className="flex gap-2">
      <button className="bg-red-500 px-4 py-1 rounded">Cancel</button>
      <button className="bg-green-600 px-4 py-1 rounded">Upload</button>
    </div>
  </div>
);

// --- Admin Dashboard ---
export default function AdminDashboard() {
  const [teamsPending, setTeamsPending] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await axios.get("http://localhost:8000/admin/pending_teams", {
        withCredentials: true,
      });
      setTeamsPending(res.data.pending_teams || []);
    } catch (err) {
      console.error("Error fetching pending teams", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDecision = async (tid, approve) => {
    const url = `http://localhost:8000/admin/${
      approve ? "approve_team" : "reject_team"
    }/${tid}`;
    try {
      await axios.post(url, {}, { withCredentials: true });
      fetchPending();
    } catch (err) {
      console.error("Error processing team", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // Chart data
  const chartUsers = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "Users",
        data: [40, 240],
        backgroundColor: ["#22c55e", "#6b7280"],
      },
    ],
  };

  const chartSponsors = {
    labels: ["Current", "Past"],
    datasets: [
      {
        label: "Sponsors",
        data: [10, 5],
        backgroundColor: ["#facc15", "#4b5563"],
      },
    ],
  };

  const chartTeams = {
    labels: ["Pending", "Approved"],
    datasets: [
      {
        label: "Teams",
        data: [teamsPending.length, 30],
        backgroundColor: ["#3b82f6", "#9ca3af"],
      },
    ],
  };

  return (
    <>
      <Head />
      <div className="min-h-screen bg-black text-white pt-28 px-6 pb-12">
        {/* Admin Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-full bg-white text-black flex items-center justify-center text-xl font-bold">
            S
          </div>
          <div>
            <h1 className="text-2xl font-bold">Rahul Mahato</h1>
            <p className="text-sm text-gray-400">TCS Employee</p>
          </div>
        </div>

        {/* Cards and Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
          <ChartCard title="Users Chart" data={chartUsers} />
          <ChartCard title="Sponsors Chart" data={chartSponsors} />
          <Gallery />
          <ChartCard title="Teams Chart" data={chartTeams} />
        </div>

        {/* Event and Upload Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <EventsSection />
          <UploadSection />
        </div>
      </div>
    </>
  );
}
