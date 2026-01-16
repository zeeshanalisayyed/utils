import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SEOHead } from "@/components/SEOHead";
import { AdBanner, InArticleAd } from "@/components/AdBanner";
import { FAQ } from "@/components/FAQ";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Download, FileText } from "lucide-react";
import { toast } from "sonner";

interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

const InvoiceGenerator = () => {
  const [businessName, setBusinessName] = useState("");
  const [clientName, setClientName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Date.now().toString().slice(-6)}`);
  const [items, setItems] = useState<InvoiceItem[]>([{ description: "", quantity: 1, price: 0 }]);
  const [notes, setNotes] = useState("");

  const addItem = () => {
    setItems([...items, { description: "", quantity: 1, price: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const tax = subtotal * 0.18;
  const total = subtotal + tax;

  const generateInvoice = () => {
    const invoiceHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Invoice ${invoiceNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; }
          .header { display: flex; justify-content: space-between; margin-bottom: 40px; }
          .invoice-title { font-size: 32px; color: #333; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background: #f5f5f5; }
          .totals { text-align: right; margin-top: 20px; }
          .total-row { font-size: 18px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="invoice-title">INVOICE</div>
            <div>${invoiceNumber}</div>
            <div>Date: ${new Date().toLocaleDateString()}</div>
          </div>
          <div style="text-align: right;">
            <strong>${businessName || 'Your Business'}</strong>
          </div>
        </div>
        <div><strong>Bill To:</strong> ${clientName || 'Client Name'}</div>
        <table>
          <tr><th>Description</th><th>Qty</th><th>Price</th><th>Amount</th></tr>
          ${items.map(item => `<tr><td>${item.description}</td><td>${item.quantity}</td><td>₹${item.price.toFixed(2)}</td><td>₹${(item.quantity * item.price).toFixed(2)}</td></tr>`).join('')}
        </table>
        <div class="totals">
          <div>Subtotal: ₹${subtotal.toFixed(2)}</div>
          <div>Tax (18%): ₹${tax.toFixed(2)}</div>
          <div class="total-row">Total: ₹${total.toFixed(2)}</div>
        </div>
        ${notes ? `<div style="margin-top: 40px;"><strong>Notes:</strong><br>${notes}</div>` : ''}
      </body>
      </html>
    `;
    
    const blob = new Blob([invoiceHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoiceNumber}.html`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Invoice downloaded!");
  };

  const faqs = [
    { question: "Is this invoice generator free?", answer: "Yes, completely free with no limits on invoices." },
    { question: "Can I customize the tax rate?", answer: "Currently set to 18% GST. Future updates will add customization." },
    { question: "What format is the invoice?", answer: "HTML format that can be printed or saved as PDF." },
  ];

  return (
    <PageLayout title="Invoice Generator" description="Create professional invoices instantly">
      <SEOHead
        title="Free Invoice Generator - Create Professional Invoices Online"
        description="Generate professional invoices for free. Add items, calculate totals with tax, and download instantly."
        keywords="invoice generator, free invoice, billing, invoice maker, GST invoice"
        canonicalUrl="https://utils.lovable.app/invoice-generator"
      />
      <AdBanner format="horizontal" className="mb-6" />

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Create Invoice
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Your Business Name</Label>
              <Input value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Business Name" />
            </div>
            <div>
              <Label>Client Name</Label>
              <Input value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Client Name" />
            </div>
            <div>
              <Label>Invoice Number</Label>
              <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
            </div>
          </div>

          <InArticleAd />

          <div>
            <Label className="mb-2 block">Items</Label>
            {items.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) => updateItem(index, 'description', e.target.value)}
                  className="flex-1"
                />
                <Input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                  className="w-20"
                />
                <Input
                  type="number"
                  placeholder="Price"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                  className="w-28"
                />
                <Button variant="outline" size="icon" onClick={() => removeItem(index)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button variant="outline" onClick={addItem} className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>

          <div>
            <Label>Notes (Optional)</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Payment terms, thank you note, etc." />
          </div>

          <div className="bg-muted/50 p-4 rounded-lg space-y-1 text-right">
            <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
            <div>Tax (18%): ₹{tax.toFixed(2)}</div>
            <div className="text-xl font-bold">Total: ₹{total.toFixed(2)}</div>
          </div>

          <Button onClick={generateInvoice} className="w-full">
            <Download className="h-4 w-4 mr-2" /> Download Invoice
          </Button>
        </CardContent>
      </Card>

      <FAQ items={faqs} />
    </PageLayout>
  );
};

export default InvoiceGenerator;
