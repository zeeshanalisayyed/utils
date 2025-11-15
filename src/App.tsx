import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import SipCalculator from "./pages/SipCalculator";
import IncomeTax from "./pages/IncomeTax";
import Converters from "./pages/Converters";
import BmiCalculator from "./pages/BmiCalculator";
import Notes from "./pages/Notes";
import WhatsappDirect from "./pages/WhatsappDirect";
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
          <Route path="/sip-calculator" element={<SipCalculator />} />
          <Route path="/income-tax" element={<IncomeTax />} />
          <Route path="/converters" element={<Converters />} />
          <Route path="/bmi-calculator" element={<BmiCalculator />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/whatsapp-direct" element={<WhatsappDirect />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
