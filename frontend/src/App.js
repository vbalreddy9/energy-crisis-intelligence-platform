import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/NewDashboard";
import AddEnergy from "./components/AddEnergy";
import UserDashboard from "./components/UserDashboard";
import ReportIssue from "./components/ReportIssue";
import AdminIssues from "./components/AdminIssues";
import MyIssues from "./components/MyIssues";
import NewDashboard from "./components/NewDashboard";

function App() {

  return (

    <Router>

      <Routes>

        {/* Login Page */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Register Page */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={<UserDashboard />}
        />

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <div>
              <NewDashboard />
              <AddEnergy />
            </div>
          }
        />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route
    path="/admin-issues"
    element={<AdminIssues />}
/>
<Route
    path="/my-issues"
    element={<MyIssues />}
/>

      </Routes>

    </Router>

  );
}

export default App;