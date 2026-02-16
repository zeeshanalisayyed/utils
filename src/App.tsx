import { lazy, Suspense } from "react";
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

// Eager-load the homepage for fast first paint
import Index from "./pages/Index";

// Lazy-load all tool pages for smaller initial bundle
const SipCalculator = lazy(() => import("./pages/SipCalculator"));
const IncomeTax = lazy(() => import("./pages/IncomeTax"));
const Converters = lazy(() => import("./pages/Converters"));
const BmiCalculator = lazy(() => import("./pages/BmiCalculator"));
const Notes = lazy(() => import("./pages/Notes"));
const WhatsappDirect = lazy(() => import("./pages/WhatsappDirect"));
const Reminder = lazy(() => import("./pages/Reminder"));
const VideoDownloader = lazy(() => import("./pages/VideoDownloader"));
const AppIconCreator = lazy(() => import("./pages/AppIconCreator"));
const ScreenshotOrganizer = lazy(() => import("./pages/ScreenshotOrganizer"));
const ImageTools = lazy(() => import("./pages/ImageTools"));
const PdfConverter = lazy(() => import("./pages/PdfConverter"));
const SoundMaster = lazy(() => import("./pages/SoundMaster"));
const BatterySaver = lazy(() => import("./pages/BatterySaver"));
const Mp3Cutter = lazy(() => import("./pages/Mp3Cutter"));
const ScreenRecorder = lazy(() => import("./pages/ScreenRecorder"));
const ImageToText = lazy(() => import("./pages/ImageToText"));
const VideoConverter = lazy(() => import("./pages/VideoConverter"));
const QrCodeGenerator = lazy(() => import("./pages/QrCodeGenerator"));
const ColorPicker = lazy(() => import("./pages/ColorPicker"));
const PasswordGenerator = lazy(() => import("./pages/PasswordGenerator"));
const StopwatchTimer = lazy(() => import("./pages/StopwatchTimer"));
const AgeCalculator = lazy(() => import("./pages/AgeCalculator"));
const LoanCalculator = lazy(() => import("./pages/LoanCalculator"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Blog = lazy(() => import("./pages/Blog"));
const NotFound = lazy(() => import("./pages/NotFound"));
const TextCaseConverter = lazy(() => import("./pages/TextCaseConverter"));
const WordCounter = lazy(() => import("./pages/WordCounter"));
const LoremIpsumGenerator = lazy(() => import("./pages/LoremIpsumGenerator"));
const MarkdownEditor = lazy(() => import("./pages/MarkdownEditor"));
const TextDiffChecker = lazy(() => import("./pages/TextDiffChecker"));
const Base64Encoder = lazy(() => import("./pages/Base64Encoder"));
const UrlEncoder = lazy(() => import("./pages/UrlEncoder"));
const TextToSpeech = lazy(() => import("./pages/TextToSpeech"));
const SpeechToText = lazy(() => import("./pages/SpeechToText"));
const HashGenerator = lazy(() => import("./pages/HashGenerator"));
const JsonFormatter = lazy(() => import("./pages/JsonFormatter"));
const RegexTester = lazy(() => import("./pages/RegexTester"));
const UuidGenerator = lazy(() => import("./pages/UuidGenerator"));
const CssGradientGenerator = lazy(() => import("./pages/CssGradientGenerator"));
const GstCalculator = lazy(() => import("./pages/GstCalculator"));
const TipCalculator = lazy(() => import("./pages/TipCalculator"));
const CompoundInterestCalculator = lazy(() => import("./pages/CompoundInterestCalculator"));
const RoiCalculator = lazy(() => import("./pages/RoiCalculator"));
const PomodoroTimer = lazy(() => import("./pages/PomodoroTimer"));
const RandomNumberGenerator = lazy(() => import("./pages/RandomNumberGenerator"));
const PercentageCalculator = lazy(() => import("./pages/PercentageCalculator"));
const EmailValidator = lazy(() => import("./pages/EmailValidator"));
const PasswordStrengthChecker = lazy(() => import("./pages/PasswordStrengthChecker"));
const RomanNumeralConverter = lazy(() => import("./pages/RomanNumeralConverter"));
const TimeZoneConverter = lazy(() => import("./pages/TimeZoneConverter"));
const DateCalculator = lazy(() => import("./pages/DateCalculator"));
const DiceRoller = lazy(() => import("./pages/DiceRoller"));
const CoinFlipper = lazy(() => import("./pages/CoinFlipper"));
const CsvToJsonConverter = lazy(() => import("./pages/CsvToJsonConverter"));
const ImageCompressor = lazy(() => import("./pages/ImageCompressor"));
const UnitConverter = lazy(() => import("./pages/UnitConverter"));
const ColorContrastChecker = lazy(() => import("./pages/ColorContrastChecker"));
const BinaryConverter = lazy(() => import("./pages/BinaryConverter"));
const CharacterCounter = lazy(() => import("./pages/CharacterCounter"));
const CountdownTimer = lazy(() => import("./pages/CountdownTimer"));
const HexConverter = lazy(() => import("./pages/HexConverter"));
const AspectRatioCalculator = lazy(() => import("./pages/AspectRatioCalculator"));
const EmojiPicker = lazy(() => import("./pages/EmojiPicker"));
const MorseCodeTranslator = lazy(() => import("./pages/MorseCodeTranslator"));
const AiVideoGenerator = lazy(() => import("./pages/AiVideoGenerator"));
const InvoiceGenerator = lazy(() => import("./pages/InvoiceGenerator"));
const BarcodeGenerator = lazy(() => import("./pages/BarcodeGenerator"));
const ColorPaletteGenerator = lazy(() => import("./pages/ColorPaletteGenerator"));
const TextEncryptor = lazy(() => import("./pages/TextEncryptor"));
const ReadingTimeCalculator = lazy(() => import("./pages/ReadingTimeCalculator"));
const SlugGenerator = lazy(() => import("./pages/SlugGenerator"));
const DiscountCalculator = lazy(() => import("./pages/DiscountCalculator"));
const TextRepeater = lazy(() => import("./pages/TextRepeater"));
const JwtDecoder = lazy(() => import("./pages/JwtDecoder"));
const CronGenerator = lazy(() => import("./pages/CronGenerator"));
const SqlFormatter = lazy(() => import("./pages/SqlFormatter"));
const CalorieCounter = lazy(() => import("./pages/CalorieCounter"));
const SleepCalculator = lazy(() => import("./pages/SleepCalculator"));
const WaterIntakeTracker = lazy(() => import("./pages/WaterIntakeTracker"));

const queryClient = new QueryClient();

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <InterstitialAd />
        <ExitIntentAd />
        <ScrollProgressAd />
        <MobileStickyAd />
        <AnchorAd />
        
        <Suspense fallback={<Loading />}>
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
            <Route path="/slug-generator" element={<SlugGenerator />} />
            <Route path="/discount-calculator" element={<DiscountCalculator />} />
            <Route path="/text-repeater" element={<TextRepeater />} />
            <Route path="/jwt-decoder" element={<JwtDecoder />} />
            <Route path="/cron-generator" element={<CronGenerator />} />
            <Route path="/sql-formatter" element={<SqlFormatter />} />
            <Route path="/calorie-counter" element={<CalorieCounter />} />
            <Route path="/sleep-calculator" element={<SleepCalculator />} />
            <Route path="/water-intake-tracker" element={<WaterIntakeTracker />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
        <ConsentBanner />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
