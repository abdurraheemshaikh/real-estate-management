
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Index from "./pages/Index";
import Search from "./pages/Search";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import BuilderProfile from "./pages/BuilderProfile";
import AgentProfile from "./pages/AgentProfile";
import NotFound from "./pages/NotFound";

// Customer Pages
import CustomerInquiries from "./pages/customer/Inquiries";
import CustomerProfile from "./pages/customer/Profile";
import CustomerReviews from "./pages/customer/Reviews";
import Customer from "./pages/customer/Dashboard";

// Builder Pages
import BuilderDashboard from "./pages/builder/Dashboard";
import BuilderProjects from "./pages/builder/Projects";
import BuilderInquiries from "./pages/builder/Inquiries";
import BuilderProfileEdit from "./pages/builder/Profile";
import BuilderReviews from "./pages/builder/Reviews";

// Agent Pages
import AgentDashboard from "./pages/agent/Dashboard";
import AgentProperties from "./pages/agent/Properties";
import AgentInquiries from "./pages/agent/Inquiries";
import AgentProfileEdit from "./pages/agent/Profile";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminBuilders from "./pages/admin/Builders";
import AdminAgents from "./pages/admin/Agents";
import AdminReports from "./pages/admin/Reports";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/builder/:id" element={<BuilderProfile />} />
            <Route path="/agent/:id" element={<AgentProfile />} />
            
            {/* Customer Routes */}
            <Route path="/inquiries" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerInquiries />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerProfile />
              </ProtectedRoute>
            } />
            <Route path="/reviews" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <CustomerReviews />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute allowedRoles={['customer']}>
                <Customer/>
              </ProtectedRoute>
            } />
            
            {/* Builder Routes */}
            <Route path="/builder/dashboard" element={
              <ProtectedRoute allowedRoles={['builder']}>
                <BuilderDashboard />
              </ProtectedRoute>
            } />
            <Route path="/builder/projects" element={
              <ProtectedRoute allowedRoles={['builder']}>
                <BuilderProjects />
              </ProtectedRoute>
            } />
            <Route path="/builder/inquiries" element={
              <ProtectedRoute allowedRoles={['builder']}>
                <BuilderInquiries />
              </ProtectedRoute>
            } />
            <Route path="/builder/profile" element={
              <ProtectedRoute allowedRoles={['builder']}>
                <BuilderProfileEdit />
              </ProtectedRoute>
            } />
            <Route path="/builder/reviews" element={
              <ProtectedRoute allowedRoles={['builder']}>
                <BuilderReviews />
              </ProtectedRoute>
            } />
            
            {/* Agent Routes */}
            <Route path="/agent/dashboard" element={
              <ProtectedRoute allowedRoles={['agent']}>
                <AgentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/agent/properties" element={
              <ProtectedRoute allowedRoles={['agent']}>
                <AgentProperties />
              </ProtectedRoute>
            } />
            <Route path="/agent/inquiries" element={
              <ProtectedRoute allowedRoles={['agent']}>
                <AgentInquiries />
              </ProtectedRoute>
            } />
            <Route path="/agent/profile" element={
              <ProtectedRoute allowedRoles={['agent']}>
                <AgentProfileEdit />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsers />
              </ProtectedRoute>
            } />
            <Route path="/admin/builders" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminBuilders />
              </ProtectedRoute>
            } />
            <Route path="/admin/agents" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminAgents />
              </ProtectedRoute>
            } />
            <Route path="/admin/reports" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminReports />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
