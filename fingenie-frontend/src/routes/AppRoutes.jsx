import { Routes, Route } from "react-router-dom";

/* ✅ USER PAGES */
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Loan from "../pages/Loan";
import Investments from "../pages/Investments";
import Transactions from "../pages/Transactions";
import FraudAlerts from "../pages/FraudAlerts";
import ChatAssistant from "../pages/ChatAssistant";
import Accounts from "../pages/Accounts";

/* ✅ ADMIN */
import AdminDashboard from "../pages/AdminDashboard";
import AdminLogin from "../pages/AdminLogin";

/* ✅ ADMIN TABLE COMPONENTS */
import AccountsTableOnly from "../components/AccountsTableOnly";
import TransactionsTableOnly from "../components/TransactionsTableOnly";
import LoanTableOnly from "../components/LoanTableOnly";
import InvestmentsTableOnly from "../components/InvestmentsTableOnly";
import FraudTableOnly from "../components/FraudTableOnly";

function AppRoutes() {
  return (
    <Routes>

      {/* ✅ USER ROUTES */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />   {/* ✅ Added (important) */}
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/loan" element={<Loan />} />
      <Route path="/investments" element={<Investments />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/fraud-alerts" element={<FraudAlerts />} />
      <Route path="/chat" element={<ChatAssistant />} />
      <Route path="/accounts" element={<Accounts />} />

      {/* ✅ ADMIN ROUTES */}
      <Route path="/admin-login" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />

      {/* ✅ ADMIN TABLE ROUTES */}
      <Route path="/admin-transactions" element={<TransactionsTableOnly />} />
      <Route path="/admin-loans" element={<LoanTableOnly />} />
      <Route path="/admin-investments" element={<InvestmentsTableOnly />} />
      <Route path="/admin-fraud" element={<FraudTableOnly />} />
      <Route path="/admin-accounts" element={<AccountsTableOnly />} />

    </Routes>
  );
}

export default AppRoutes;
