import { useState } from "react";
import { FileText, Download, Copy, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("# Hello World\n\nThis is **bold** and this is *italic*.\n\n- Item 1\n- Item 2\n\n[Link](https://example.com)");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const markdownToHtml = (md: string) => {
    let html = md;
    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>');
    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>');
    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>');
    // Lists
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    // Line breaks
    html = html.replace(/\n/gim, '<br>');
    return html;
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const faqs = [
    { question: "What Markdown features are supported?", answer: "The editor supports headers, bold, italic, links, lists, and basic formatting. Full Markdown spec support is being added." },
    { question: "Can I export my Markdown?", answer: "Yes, you can download your Markdown as a .md file or copy it to clipboard." },
    { question: "Is my content saved?", answer: "No, content is stored only in your browser session. Refresh the page to lose it." },
  ];

  return (
    <PageLayout title="Markdown Editor" description="Edit Markdown with live preview">
      <SEOHead
        title="Markdown Editor - Live Preview Editor | Utility Master"
        description="Edit Markdown text with live HTML preview. Export and copy your documents easily."
        keywords="markdown editor, markdown, live preview, markdown to html"
        canonicalUrl="/markdown-editor"
      />
      <AdBanner />

      <div className="max-w-6xl mx-auto">
        <Card className="border-border mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Markdown Editor
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="editor" className="space-y-4">
              <div className="flex justify-between items-center">
                <TabsList>
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadMarkdown}>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
              <TabsContent value="editor">
                <Textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  className="min-h-[500px] font-mono"
                  placeholder="Start typing your Markdown here..."
                />
              </TabsContent>
              <TabsContent value="preview">
                <div
                  className="min-h-[500px] p-4 border rounded-lg prose dark:prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: markdownToHtml(markdown) }}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default MarkdownEditor;

