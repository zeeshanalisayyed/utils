import { useState } from "react";
import { FileText, Copy, Check, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const CsvToJsonConverter = () => {
  const [csv, setCsv] = useState("");
  const [json, setJson] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const convertToJson = () => {
    try {
      const lines = csv.trim().split("\n");
      if (lines.length === 0) {
        toast({ title: "Please enter CSV data", variant: "destructive" });
        return;
      }

      const headers = lines[0].split(",").map(h => h.trim());
      const result = [];

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim());
        const obj: any = {};
        headers.forEach((header, idx) => {
          obj[header] = values[idx] || "";
        });
        result.push(obj);
      }

      setJson(JSON.stringify(result, null, 2));
      toast({ title: "Converted successfully!" });
    } catch (error: any) {
      toast({ title: `Conversion failed: ${error.message}`, variant: "destructive" });
    }
  };

  const convertToCsv = () => {
    try {
      const data = JSON.parse(json);
      if (!Array.isArray(data) || data.length === 0) {
        toast({ title: "Invalid JSON array", variant: "destructive" });
        return;
      }

      const headers = Object.keys(data[0]);
      const csvLines = [headers.join(",")];

      data.forEach((item: any) => {
        const values = headers.map(header => item[header] || "");
        csvLines.push(values.join(","));
      });

      setCsv(csvLines.join("\n"));
      toast({ title: "Converted successfully!" });
    } catch (error: any) {
      toast({ title: `Conversion failed: ${error.message}`, variant: "destructive" });
    }
  };

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const download = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    { question: "How do I convert CSV to JSON?", answer: "Paste your CSV data (with headers in the first row) and click Convert. The first row will be used as keys." },
    { question: "Can I convert JSON back to CSV?", answer: "Yes, paste a JSON array and click Convert to CSV. Each object's keys will become column headers." },
    { question: "What CSV format is supported?", answer: "Simple CSV format with comma-separated values. Complex CSV with quotes and escaping may need manual adjustment." },
  ];

  return (
    <PageLayout title="CSV to JSON Converter" description="Convert between CSV and JSON formats">
      <SEOHead
        title="CSV to JSON Converter - Convert CSV JSON | Utility Master"
        description="Convert CSV files to JSON and vice versa. Free and instant."
        keywords="csv to json, json to csv, csv converter, json converter"
        canonicalUrl="/csv-to-json-converter"
      />
      <AdBanner />

      <div className="max-w-4xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              CSV to JSON Converter
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="csv-to-json" className="space-y-4">
              <TabsList>
                <TabsTrigger value="csv-to-json">CSV to JSON</TabsTrigger>
                <TabsTrigger value="json-to-csv">JSON to CSV</TabsTrigger>
              </TabsList>

              <TabsContent value="csv-to-json" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">CSV Data</label>
                  <Textarea
                    value={csv}
                    onChange={(e) => setCsv(e.target.value)}
                    placeholder="name,age,city&#10;John,30,New York&#10;Jane,25,London"
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
                <Button onClick={convertToJson} className="w-full">Convert to JSON</Button>
                {json && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">JSON Result</label>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(json)}>
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => download(json, "output.json")}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea value={json} readOnly className="min-h-[200px] font-mono text-sm" />
                  </div>
                )}
              </TabsContent>

              <TabsContent value="json-to-csv" className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">JSON Data</label>
                  <Textarea
                    value={json}
                    onChange={(e) => setJson(e.target.value)}
                    placeholder='[{"name":"John","age":30},{"name":"Jane","age":25}]'
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
                <Button onClick={convertToCsv} className="w-full">Convert to CSV</Button>
                {csv && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">CSV Result</label>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => copyToClipboard(csv)}>
                          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => download(csv, "output.csv")}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Textarea value={csv} readOnly className="min-h-[200px] font-mono text-sm" />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default CsvToJsonConverter;

