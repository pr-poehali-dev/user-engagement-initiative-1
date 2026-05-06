import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SlotsPage from "./pages/SlotsPage";
import ProvidersPage from "./pages/ProvidersPage";
import BonusesPage from "./pages/BonusesPage";
import DepositPage from "./pages/DepositPage";
import VerificationPage from "./pages/VerificationPage";
import SupportPage from "./pages/SupportPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/slots" element={<SlotsPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/bonuses" element={<BonusesPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/verification" element={<VerificationPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
