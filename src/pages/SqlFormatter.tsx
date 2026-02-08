import { useState } from "react";
import { Database, Copy, Check, Wand2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AdBanner } from "@/components/AdBanner";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";
import { useToast } from "@/hooks/use-toast";

const SqlFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [keywordCase, setKeywordCase] = useState<"upper" | "lower">("upper");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const formatSql = () => {
    if (!input.trim()) {
      toast({ title: "Please enter SQL to format", variant: "destructive" });
      return;
    }

    try {
      let sql = input.trim();
      
      // Keywords to format
      const keywords = [
        "SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING",
        "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "OUTER JOIN", "FULL JOIN",
        "ON", "AS", "IN", "NOT IN", "LIKE", "BETWEEN", "IS NULL", "IS NOT NULL",
        "INSERT INTO", "VALUES", "UPDATE", "SET", "DELETE FROM", "CREATE TABLE",
        "ALTER TABLE", "DROP TABLE", "INDEX", "PRIMARY KEY", "FOREIGN KEY",
        "REFERENCES", "CONSTRAINT", "UNIQUE", "DEFAULT", "NOT NULL", "NULL",
        "LIMIT", "OFFSET", "DISTINCT", "ALL", "UNION", "EXCEPT", "INTERSECT",
        "CASE", "WHEN", "THEN", "ELSE", "END", "EXISTS", "COUNT", "SUM", "AVG",
        "MIN", "MAX", "CAST", "COALESCE", "NULLIF", "ASC", "DESC"
      ];

      // Replace multiple spaces with single space
      sql = sql.replace(/\s+/g, " ");

      // Format keywords
      keywords.forEach((keyword) => {
        const regex = new RegExp(`\\b${keyword}\\b`, "gi");
        const formatted = keywordCase === "upper" ? keyword : keyword.toLowerCase();
        sql = sql.replace(regex, formatted);
      });

      // Add newlines before major clauses
      const majorClauses = ["SELECT", "FROM", "WHERE", "AND", "OR", "ORDER BY", "GROUP BY", "HAVING", "JOIN", "LEFT JOIN", "RIGHT JOIN", "INNER JOIN", "LIMIT"];
      majorClauses.forEach((clause) => {
        const formattedClause = keywordCase === "upper" ? clause : clause.toLowerCase();
        const regex = new RegExp(`\\s+${formattedClause}\\b`, "gi");
        sql = sql.replace(regex, `\n${formattedClause}`);
      });

      // Indent sub-clauses
      sql = sql.replace(/\n(AND|OR)\b/gi, (match) => `\n  ${keywordCase === "upper" ? match.trim().toUpperCase() : match.trim().toLowerCase()}`);

      // Format commas in SELECT
      sql = sql.replace(/,\s*/g, ",\n  ");

      // Clean up the first line
      sql = sql.trim();

      setOutput(sql);
      toast({ title: "SQL formatted successfully!" });
    } catch (error) {
      toast({ title: "Error formatting SQL", variant: "destructive" });
    }
  };

  const minifySql = () => {
    if (!input.trim()) {
      toast({ title: "Please enter SQL to minify", variant: "destructive" });
      return;
    }

    const minified = input
      .replace(/\s+/g, " ")
      .replace(/\s*,\s*/g, ",")
      .replace(/\s*=\s*/g, "=")
      .replace(/\s*\(\s*/g, "(")
      .replace(/\s*\)\s*/g, ")")
      .trim();

    setOutput(minified);
    toast({ title: "SQL minified!" });
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast({ title: "Copied to clipboard!" });
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    { question: "Why format SQL?", answer: "Formatted SQL is easier to read, debug, and maintain. It helps identify syntax errors and understand complex queries." },
    { question: "Does this validate SQL?", answer: "This tool formats SQL but doesn't validate syntax. It works with most standard SQL dialects." },
    { question: "Is my data safe?", answer: "Yes! All formatting happens in your browser. Your SQL is never sent to any server." },
  ];

  return (
    <PageLayout title="SQL Formatter" description="Format and beautify SQL queries">
      <SEOHead
        title="SQL Formatter - Format & Beautify SQL | Utility Master"
        description="Free online SQL formatter and beautifier. Format messy SQL queries instantly with proper indentation and keyword casing."
        keywords="sql formatter, sql beautifier, format sql, sql pretty print, sql minifier"
        canonicalUrl="https://utils.lovable.app/sql-formatter"
      />
      <AdBanner />

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Input SQL
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="SELECT * FROM users WHERE id = 1 AND status = 'active' ORDER BY created_at DESC"
                className="min-h-[300px] font-mono text-sm"
              />
              
              <div className="flex gap-4 items-center">
                <div>
                  <Label>Keyword Case</Label>
                  <Select value={keywordCase} onValueChange={(v: "upper" | "lower") => setKeywordCase(v)}>
                    <SelectTrigger className="w-32 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upper">UPPER</SelectItem>
                      <SelectItem value="lower">lower</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2">
                <Button onClick={formatSql} className="flex-1">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Format SQL
                </Button>
                <Button onClick={minifySql} variant="outline" className="flex-1">
                  Minify
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Formatted SQL</CardTitle>
                {output && (
                  <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                value={output}
                readOnly
                placeholder="Formatted SQL will appear here..."
                className="min-h-[300px] font-mono text-sm bg-muted/30"
              />
            </CardContent>
          </Card>
        </div>

        <AdBanner format="horizontal" />

        <FAQ items={faqs} />
      </div>
    </PageLayout>
  );
};

export default SqlFormatter;
