import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { InterstitialAd } from "@/components/InterstitialAd";
import { MobileStickyAd } from "@/components/MobileStickyAd";
import { ExitIntentAd } from "@/components/ExitIntentAd";
import { AnchorAd } from "@/components/AnchorAd";
import { ScrollProgressAd } from "@/components/ScrollProgressAd";
import { ConsentBanner } from "@/components/ConsentBanner";
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
import QrCodeGenerator from "./pages/QrCodeGenerator";
import ColorPicker from "./pages/ColorPicker";
import PasswordGenerator from "./pages/PasswordGenerator";
import StopwatchTimer from "./pages/StopwatchTimer";
import AgeCalculator from "./pages/AgeCalculator";
import LoanCalculator from "./pages/LoanCalculator";
import AboutUs from "./pages/AboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import TextCaseConverter from "./pages/TextCaseConverter";
import WordCounter from "./pages/WordCounter";
import LoremIpsumGenerator from "./pages/LoremIpsumGenerator";
import MarkdownEditor from "./pages/MarkdownEditor";
import TextDiffChecker from "./pages/TextDiffChecker";
import Base64Encoder from "./pages/Base64Encoder";
import UrlEncoder from "./pages/UrlEncoder";
import TextToSpeech from "./pages/TextToSpeech";
import SpeechToText from "./pages/SpeechToText";
import HashGenerator from "./pages/HashGenerator";
import JsonFormatter from "./pages/JsonFormatter";
import RegexTester from "./pages/RegexTester";
import UuidGenerator from "./pages/UuidGenerator";
import CssGradientGenerator from "./pages/CssGradientGenerator";
import GstCalculator from "./pages/GstCalculator";
import TipCalculator from "./pages/TipCalculator";
import CompoundInterestCalculator from "./pages/CompoundInterestCalculator";
import RoiCalculator from "./pages/RoiCalculator";
import PomodoroTimer from "./pages/PomodoroTimer";
import RandomNumberGenerator from "./pages/RandomNumberGenerator";
import PercentageCalculator from "./pages/PercentageCalculator";
import EmailValidator from "./pages/EmailValidator";
import PasswordStrengthChecker from "./pages/PasswordStrengthChecker";
import RomanNumeralConverter from "./pages/RomanNumeralConverter";
import TimeZoneConverter from "./pages/TimeZoneConverter";
import DateCalculator from "./pages/DateCalculator";
import DiceRoller from "./pages/DiceRoller";
import CoinFlipper from "./pages/CoinFlipper";
import CsvToJsonConverter from "./pages/CsvToJsonConverter";
import ImageCompressor from "./pages/ImageCompressor";
import UnitConverter from "./pages/UnitConverter";
import ColorContrastChecker from "./pages/ColorContrastChecker";
import BinaryConverter from "./pages/BinaryConverter";
import CharacterCounter from "./pages/CharacterCounter";
import CountdownTimer from "./pages/CountdownTimer";
import HexConverter from "./pages/HexConverter";
import AspectRatioCalculator from "./pages/AspectRatioCalculator";
import EmojiPicker from "./pages/EmojiPicker";
import MorseCodeTranslator from "./pages/MorseCodeTranslator";
import AiVideoGenerator from "./pages/AiVideoGenerator";
import InvoiceGenerator from "./pages/InvoiceGenerator";
import BarcodeGenerator from "./pages/BarcodeGenerator";
import ColorPaletteGenerator from "./pages/ColorPaletteGenerator";
import TextEncryptor from "./pages/TextEncryptor";
import ReadingTimeCalculator from "./pages/ReadingTimeCalculator";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* Interstitial Ad - shows every 3rd tool page navigation */}
        <InterstitialAd />
        
        {/* Exit Intent Ad - shows when user tries to leave (desktop) */}
        <ExitIntentAd />
        
        {/* Scroll Progress Ad - shows at 60% scroll depth (desktop) */}
        <ScrollProgressAd />
        
        {/* Mobile Sticky Bottom Ad */}
        <MobileStickyAd />
        
        {/* Desktop Anchor Ad - sticky bottom banner */}
        <AnchorAd />
        
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
          <Route path="/qr-code-generator" element={<QrCodeGenerator />} />
          <Route path="/color-picker" element={<ColorPicker />} />
          <Route path="/password-generator" element={<PasswordGenerator />} />
          <Route path="/stopwatch-timer" element={<StopwatchTimer />} />
          <Route path="/age-calculator" element={<AgeCalculator />} />
          <Route path="/loan-calculator" element={<LoanCalculator />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/text-case-converter" element={<TextCaseConverter />} />
          <Route path="/word-counter" element={<WordCounter />} />
          <Route path="/lorem-ipsum-generator" element={<LoremIpsumGenerator />} />
          <Route path="/markdown-editor" element={<MarkdownEditor />} />
          <Route path="/text-diff-checker" element={<TextDiffChecker />} />
          <Route path="/base64-encoder" element={<Base64Encoder />} />
          <Route path="/url-encoder" element={<UrlEncoder />} />
          <Route path="/text-to-speech" element={<TextToSpeech />} />
          <Route path="/speech-to-text" element={<SpeechToText />} />
          <Route path="/hash-generator" element={<HashGenerator />} />
          <Route path="/json-formatter" element={<JsonFormatter />} />
          <Route path="/regex-tester" element={<RegexTester />} />
          <Route path="/uuid-generator" element={<UuidGenerator />} />
          <Route path="/css-gradient-generator" element={<CssGradientGenerator />} />
          <Route path="/gst-calculator" element={<GstCalculator />} />
          <Route path="/tip-calculator" element={<TipCalculator />} />
          <Route path="/compound-interest-calculator" element={<CompoundInterestCalculator />} />
          <Route path="/roi-calculator" element={<RoiCalculator />} />
          <Route path="/pomodoro-timer" element={<PomodoroTimer />} />
          <Route path="/random-number-generator" element={<RandomNumberGenerator />} />
          <Route path="/percentage-calculator" element={<PercentageCalculator />} />
          <Route path="/email-validator" element={<EmailValidator />} />
          <Route path="/password-strength-checker" element={<PasswordStrengthChecker />} />
          <Route path="/roman-numeral-converter" element={<RomanNumeralConverter />} />
          <Route path="/time-zone-converter" element={<TimeZoneConverter />} />
          <Route path="/date-calculator" element={<DateCalculator />} />
          <Route path="/dice-roller" element={<DiceRoller />} />
          <Route path="/coin-flipper" element={<CoinFlipper />} />
          <Route path="/csv-to-json-converter" element={<CsvToJsonConverter />} />
          <Route path="/image-compressor" element={<ImageCompressor />} />
          <Route path="/unit-converter" element={<UnitConverter />} />
          <Route path="/color-contrast-checker" element={<ColorContrastChecker />} />
          <Route path="/binary-converter" element={<BinaryConverter />} />
          <Route path="/character-counter" element={<CharacterCounter />} />
          <Route path="/countdown-timer" element={<CountdownTimer />} />
          <Route path="/hex-converter" element={<HexConverter />} />
          <Route path="/aspect-ratio-calculator" element={<AspectRatioCalculator />} />
          <Route path="/emoji-picker" element={<EmojiPicker />} />
          <Route path="/morse-code-translator" element={<MorseCodeTranslator />} />
          <Route path="/ai-video-generator" element={<AiVideoGenerator />} />
          <Route path="/invoice-generator" element={<InvoiceGenerator />} />
          <Route path="/barcode-generator" element={<BarcodeGenerator />} />
          <Route path="/color-palette-generator" element={<ColorPaletteGenerator />} />
          <Route path="/text-encryptor" element={<TextEncryptor />} />
          <Route path="/reading-time-calculator" element={<ReadingTimeCalculator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Consent Banner - shows for first-time visitors */}
        <ConsentBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
