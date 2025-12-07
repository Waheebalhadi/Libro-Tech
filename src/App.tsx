import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import Industries from "./pages/Industries";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Industry Pages
import Commercial from "./pages/industries/Commercial";
import Factories from "./pages/industries/Factories";
import Restaurants from "./pages/industries/Restaurants";
import Services from "./pages/industries/Services";
import Ecommerce from "./pages/industries/Ecommerce";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import DashboardHome from "./pages/admin/DashboardHome";
import AdminHomepage from "./pages/admin/Homepage";
import AdminServices from "./pages/admin/Services";
import AdminIndustries from "./pages/admin/Industries";
import AdminBlog from "./pages/admin/Blog";
import AdminMessages from "./pages/admin/Messages";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/industries" element={<Industries />} />
              <Route path="/industries/commercial" element={<Commercial />} />
              <Route path="/industries/factories" element={<Factories />} />
              <Route path="/industries/restaurants" element={<Restaurants />} />
              <Route path="/industries/services" element={<Services />} />
              <Route path="/industries/ecommerce" element={<Ecommerce />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<DashboardHome />} />
                <Route path="homepage" element={<AdminHomepage />} />
                <Route path="services" element={<AdminServices />} />
                <Route path="industries" element={<AdminIndustries />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="messages" element={<AdminMessages />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;