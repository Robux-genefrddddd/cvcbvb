import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft, Users, BarChart3, Settings } from "lucide-react";

const FOUNDER_EMAIL = "founder@example.com";

export default function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeConversations: 0,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.email !== FOUNDER_EMAIL) {
      navigate("/");
      return;
    }
  }, [user, navigate]);

  if (!user || user.email !== FOUNDER_EMAIL) {
    return null;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "#0A0A0A" }}
    >
      {/* Header */}
      <div
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ backgroundColor: "#000000", borderColor: "#1A1A1A" }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Back to chat"
          >
            <ArrowLeft size={20} color="#FFFFFF" />
          </button>
          <h1 className="text-2xl font-bold" style={{ color: "#FFFFFF" }}>
            Admin Panel
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg font-semibold transition-colors"
          style={{
            backgroundColor: "#0A84FF",
            color: "#FFFFFF",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#0070DD";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.backgroundColor = "#0A84FF";
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2
              className="text-2xl font-bold mb-2"
              style={{ color: "#FFFFFF" }}
            >
              Welcome, {user.name}
            </h2>
            <p style={{ color: "#888888" }}>Manage your application here</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Users Card */}
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: "#0D0D0D",
                borderColor: "#1A1A1A",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  Total Users
                </h3>
                <Users size={24} color="#0A84FF" />
              </div>
              <p className="text-3xl font-bold" style={{ color: "#0A84FF" }}>
                --
              </p>
              <p className="text-sm mt-2" style={{ color: "#888888" }}>
                Connected to Firebase
              </p>
            </div>

            {/* Conversations Card */}
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: "#0D0D0D",
                borderColor: "#1A1A1A",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  Active Conversations
                </h3>
                <BarChart3 size={24} color="#0A84FF" />
              </div>
              <p className="text-3xl font-bold" style={{ color: "#0A84FF" }}>
                --
              </p>
              <p className="text-sm mt-2" style={{ color: "#888888" }}>
                Real-time usage
              </p>
            </div>

            {/* Settings Card */}
            <div
              className="rounded-lg p-6 border"
              style={{
                backgroundColor: "#0D0D0D",
                borderColor: "#1A1A1A",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3
                  className="text-lg font-semibold"
                  style={{ color: "#FFFFFF" }}
                >
                  Configuration
                </h3>
                <Settings size={24} color="#0A84FF" />
              </div>
              <button
                className="w-full py-2 rounded-lg font-semibold transition-colors mt-2"
                style={{
                  backgroundColor: "#0A84FF",
                  color: "#FFFFFF",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#0070DD";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor =
                    "#0A84FF";
                }}
              >
                Manage Settings
              </button>
            </div>
          </div>

          {/* Firebase Info */}
          <div
            className="rounded-lg p-6 border"
            style={{
              backgroundColor: "#0D0D0D",
              borderColor: "#1A1A1A",
            }}
          >
            <h3
              className="text-xl font-semibold mb-4"
              style={{ color: "#FFFFFF" }}
            >
              Firebase Configuration
            </h3>
            <div className="space-y-3">
              <p style={{ color: "#888888" }}>
                <span className="font-semibold" style={{ color: "#FFFFFF" }}>
                  Project ID:
                </span>{" "}
                keysystem-d0b86-8df89
              </p>
              <p style={{ color: "#888888" }}>
                <span className="font-semibold" style={{ color: "#FFFFFF" }}>
                  Auth:
                </span>{" "}
                Firebase Authentication enabled
              </p>
              <p style={{ color: "#888888" }}>
                <span className="font-semibold" style={{ color: "#FFFFFF" }}>
                  Database:
                </span>{" "}
                Cloud Firestore connected
              </p>
              <p style={{ color: "#888888" }}>
                <span className="font-semibold" style={{ color: "#FFFFFF" }}>
                  AI Service:
                </span>{" "}
                OpenRouter API integrated
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
