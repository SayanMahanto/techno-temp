import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Trash2 } from "lucide-react";

export default function TeamRegistration() {
  const [currentStep, setCurrentStep] = useState(1);
  const [teamData, setTeamData] = useState({
    teamName: "",
    ideaTitle: "",
    ideaDescription: "",
    leaderRole: "",
    teamId: "",
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  const availableRoles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "UI/UX Designer",
    "Data Scientist",
    "Machine Learning Engineer",
    "DevOps Engineer",
    "Mobile Developer",
    "Database Administrator",
    "Quality Assurance Engineer",
  ];

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("http://localhost:8000/me", { credentials: "include" });
        if (!res.ok) throw new Error("User not logged in");
        const data = await res.json();
        setCurrentUser(data);
        setTeamMembers([{ id: data.uid, name: data.name, role: "", status: "accepted", isLeader: true }]);
      } catch (err) {
        alert("❌ Please log in to continue.");
        window.location.href = "/User_login";
      }
    }
    fetchUser();
  }, []);

  const handleTeamRegistration = () => {
    const { teamName, ideaTitle, ideaDescription, leaderRole } = teamData;
    if (!teamName || !ideaTitle || !ideaDescription || !leaderRole) {
      alert("Please fill all fields");
      return;
    }
    setTeamMembers(prev => prev.map(m => (m.isLeader ? { ...m, role: leaderRole } : m)));
    setCurrentStep(2);
  };

  const handleSearchMember = async () => {
    if (!searchId.trim() || !selectedRole) {
      alert("Please enter member ID and select role");
      return;
    }
    if (teamMembers.length >= 6) {
      alert("Maximum 6 members allowed");
      return;
    }
    if (teamMembers.some(m => m.role === selectedRole)) {
      alert("This role is already assigned");
      return;
    }
    try {
      const res = await fetch(`http://localhost:8000/search-user?uid=${encodeURIComponent(searchId)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) throw new Error("Member not found");
      const data = await res.json();
      if (!data || data.length === 0) throw new Error("No user found");
      const newMember = {
        id: data[0].uid,
        name: data[0].Name,
        role: selectedRole,
        status: "accepted",
        isLeader: false,
      };
      setTeamMembers(prev => [...prev, newMember]);
      setSearchId("");
      setSelectedRole("");
      alert("Member added successfully!");
    } catch {
      alert("Member not found or error occurred");
    }
  };

  const removeMember = memberId => {
    setTeamMembers(prev => prev.filter(m => m.id !== memberId));
  };

  const getAvailableRoles = () =>
    availableRoles.filter(r => !teamMembers.some(m => m.role === r));

  const handleFinalizeTeam = async () => {
    if (teamMembers.length < 5) {
      alert("❌ Minimum 5 members required.");
      return;
    }
    if (teamMembers.some(m => !m.role)) {
      alert("❌ Assign roles to all members.");
      return;
    }
    const payload = {
      team_name: teamData.teamName,
      idea_title: teamData.ideaTitle,
      idea_description: teamData.ideaDescription,
      event_id: "TT01",
      existing_members: teamMembers.map(m => ({ uid: m.id, role: m.role })),
      created_by_id: teamMembers.find(m => m.isLeader)?.id,
    };
    try {
      const resp = await fetch("http://localhost:8000/team/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const err = await resp.json();
        alert(`❌ Error: ${err.detail || "Team registration failed"}`);
        return;
      }
      alert("✅ Team registered successfully!");
      window.location.href = "/payment";
    } catch (err) {
      alert(`❌ Error: ${err.message || "Something went wrong"}`);
    }
  };

  const canProceed = teamMembers.length >= 5 && !teamMembers.some(m => !m.role);

  return (
    <div className="min-h-screen bg-[#0b0b10] text-white">
      {/* Embedded Header */}
      <nav className="flex items-center justify-between z-40 p-6 lg:px-8 fixed w-full bg-black/60 backdrop-blur-md">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5 flex items-center">
            <img src="/images/technothon.png" alt="Logo" className="h-12" />
          </Link>
        </div>
        <div className="flex gap-x-12 rounded-full ring-1 ring-gray-200/20 px-7 py-2 backdrop-blur-3xl">
          {[
            { name: "Home", href: "/home" },
            { name: "Events", href: "/events" },
            { name: "About", href: "/about" },
            { name: "Contact", href: "/contact" },
          ].map(item => (
            <Link key={item.name} to={item.href} className="text-sm font-semibold text-white">
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link to="/login" className="text-sm font-semibold text-white">
            Log out <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>

      {/* Main Section */}
      <main className="max-w-6xl w-full px-4 pt-32 grid grid-cols-1 lg:grid-cols-2 gap-8 mx-auto">
        {/* LEFT FORM SECTION */}
        <div>
          {currentStep === 1 && (
            <div>
              <h1 className="text-4xl font-semibold mb-6 text-purple-400">Register Your Team</h1>
              <Card className="bg-[#15111e] backdrop-blur-md rounded-lg shadow-2xl border-none">
                <CardContent className="p-8 space-y-6">
                  <Input
                    value={teamData.teamName}
                    onChange={e => setTeamData(prev => ({ ...prev, teamName: e.target.value }))}
                    placeholder="Team Name"
                    className="bg-white/10 border border-purple-600 placeholder-white/70 text-white"
                  />
                  <Input
                    value={teamData.ideaTitle}
                    onChange={e => setTeamData(prev => ({ ...prev, ideaTitle: e.target.value }))}
                    placeholder="Idea Title"
                    className="bg-white/10 border border-purple-600 placeholder-white/70 text-white"
                  />
                  <Textarea
                    value={teamData.ideaDescription}
                    onChange={e => setTeamData(prev => ({ ...prev, ideaDescription: e.target.value }))}
                    placeholder="Describe your idea"
                    className="bg-white/10 border border-purple-600 placeholder-white/70 text-white"
                  />
                  <Select
                    value={teamData.leaderRole}
                    onValueChange={v => setTeamData(prev => ({ ...prev, leaderRole: v }))}
                  >
                    {({ isOpen, setIsOpen, value, onValueChange }) => (
                      <>
                        <SelectTrigger
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                          className="bg-white/10 border border-purple-600 text-white"
                        >
                          <SelectValue placeholder="Your Role..." value={value} />
                        </SelectTrigger>
                        <SelectContent
                          isOpen={isOpen}
                          className="bg-gray-900/90 border border-purple-700 text-white"
                        >
                          {availableRoles.map(role => (
                            <SelectItem
                              key={role}
                              value={role}
                              onValueChange={onValueChange}
                              setIsOpen={setIsOpen}
                              className="hover:bg-purple-500/20"
                            >
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </>
                    )}
                  </Select>
                  <Button
                    onClick={handleTeamRegistration}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white rounded-full py-2"
                  >
                    Save and Add Members
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div>
              <h1 className="text-4xl font-semibold mb-4 text-purple-400">Add Team Members</h1>
              <Card className="bg-white/5 backdrop-blur-lg border-2 border-purple-600 rounded-2xl shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="w-5 h-5 text-purple-500" /> Team Members: {teamMembers.length}/6
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Members List */}
                  {teamMembers.map(member => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between bg-white/10 p-3 rounded-md border border-white/20"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white">{member.name}</span>
                        {member.isLeader && (
                          <Badge className="bg-purple-600 text-white">Leader</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-purple-300">{member.role || "No role assigned"}</span>
                        {!member.isLeader && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeMember(member.id)}
                            className="border-red-400 text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Add Member */}
                  {teamMembers.length < 6 && (
                    <div className="space-y-4">
                      <Input
                        value={searchId}
                        onChange={e => setSearchId(e.target.value)}
                        placeholder="Type UID (e.g. T250001)"
                        className="bg-white/10 border border-purple-600 placeholder-white/70 text-white"
                      />
                      <Select value={selectedRole} onValueChange={setSelectedRole}>
                        {({ isOpen, setIsOpen, value, onValueChange }) => (
                          <>
                            <SelectTrigger
                              isOpen={isOpen}
                              setIsOpen={setIsOpen}
                              className="bg-white/10 border border-purple-600 text-white"
                            >
                              <SelectValue
                                placeholder="Select role for this member..."
                                value={value}
                              />
                            </SelectTrigger>
                            <SelectContent
                              isOpen={isOpen}
                              className="bg-gray-900/90 border border-purple-700 text-white"
                            >
                              {getAvailableRoles().map(role => (
                                <SelectItem
                                  key={role}
                                  value={role}
                                  onValueChange={onValueChange}
                                  setIsOpen={setIsOpen}
                                  className="hover:bg-purple-500/20"
                                >
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </>
                        )}
                      </Select>
                      <Button
                        onClick={handleSearchMember}
                        disabled={!searchId || !selectedRole}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-full py-2"
                      >
                        Add Selected Member
                      </Button>
                    </div>
                  )}
                  <Button
                    onClick={handleFinalizeTeam}
                    disabled={!canProceed}
                    className={`w-full py-3 font-semibold rounded-full mt-4 ${
                      canProceed
                        ? "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
                        : "bg-white/10 border border-white/20 text-white/50 cursor-not-allowed"
                    }`}
                  >
                    Finalize Team Registration
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="hidden lg:flex items-center justify-center">
          <img
            src="/images/ai-registration-bg.png"
            alt="AI registration illustration"
            className="rounded-2xl w-full max-h-[600px] object-cover shadow-2xl"
          />
        </div>
      </main>
    </div>
  );
}
