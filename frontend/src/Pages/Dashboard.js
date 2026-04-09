import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import "../CssFiles/Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h2>My App</h2>
        </div>
        <div className="nav-menu">
          <button onClick={() => navigate("/dashboard")} className="nav-link active">
            Dashboard
          </button>
          <button onClick={() => navigate("/profile")} className="nav-link">
            Profile
          </button>
          <button onClick={handleLogout} className="nav-link logout">
            Logout
          </button>
        </div>
      </nav>

      <div className="dashboard-content">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}</h1>
          <p>Here's what's happening with your account today.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-icon"></div>
            <h3>Profile</h3>
            <p>Manage your personal information</p>
            <button onClick={() => navigate("/profile")} className="card-button">
              View Profile
            </button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon"></div>
            <h3>Analytics</h3>
            <p>View your activity statistics</p>
            <button className="card-button">View Stats</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon"></div>
            <h3>Settings</h3>
            <p>Configure your preferences</p>
            <button className="card-button">Open Settings</button>
          </div>

          <div className="dashboard-card">
            <div className="card-icon"></div>
            <h3>Messages</h3>
            <p>Check your inbox</p>
            <button className="card-button">View Messages</button>
          </div>
        </div>

        <div className="user-info-section">
          <h2>Account Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Status:</span>
              <span className="info-value status-active">Active</span>
            </div>
            <div className="info-item">
              <span className="info-label">Member Since:</span>
              <span className="info-value">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
