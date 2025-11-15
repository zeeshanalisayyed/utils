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
import Reminder from "./pages/Reminder";
import VideoDownloader from "./pages/VideoDownloader";
import AppIconCreator from "./pages/AppIconCreator";
import ScreenshotOrganizer from "./pages/ScreenshotOrganizer";
import ImageTools from "./pages/ImageTools";
import PdfConverter from "./pages/PdfConverter";
import SoundMaster from "./pages/SoundMaster";
import BatterySaver from "./pages/BatterySaver";
import Mp3Cutter from "./pages/Mp3Cutter";
import ScreenRecorder from "./pages/ScreenRecorder";
import ImageToText from "./pages/ImageToText";
import VideoConverter from "./pages/VideoConverter";
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
          <Route path="/reminder" element={<Reminder />} />
          <Route path="/video-downloader" element={<VideoDownloader />} />
          <Route path="/app-icon-creator" element={<AppIconCreator />} />
          <Route path="/screenshot-organizer" element={<ScreenshotOrganizer />} />
          <Route path="/image-tools" element={<ImageTools />} />
          <Route path="/pdf-converter" element={<PdfConverter />} />
          <Route path="/sound-master" element={<SoundMaster />} />
          <Route path="/battery-saver" element={<BatterySaver />} />
          <Route path="/mp3-cutter" element={<Mp3Cutter />} />
          <Route path="/screen-recorder" element={<ScreenRecorder />} />
          <Route path="/image-to-text" element={<ImageToText />} />
          <Route path="/video-converter" element={<VideoConverter />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
