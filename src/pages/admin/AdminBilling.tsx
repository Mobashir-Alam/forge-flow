import { useMemo, useState } from "react";
import { Plus, Trash2, Printer, Download } from "lucide-react";

type Item = { description: string; hsn: string; qty: string; rate: string };

const blankItem = (): Item => ({ description: "", hsn: "", qty: "", rate: "" });

const fmt = (n: number) => n.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const numberToWords = (num: number): string => {
  if (num === 0) return "Zero";
  const a = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const inWords = (n: number): string => {
    if (n < 20) return a[n];
    if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
    if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + inWords(n % 100) : "");
    if (n < 100000) return inWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + inWords(n % 1000) : "");
    if (n < 10000000) return inWords(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + inWords(n % 100000) : "");
    return inWords(Math.floor(n / 10000000)) + " Crore" + (n % 10000000 ? " " + inWords(n % 10000000) : "");
  };
  const rupees = Math.floor(num);
  const paise = Math.round((num - rupees) * 100);
  let s = inWords(rupees) + " Rupees";
  if (paise) s += " and " + inWords(paise) + " Paise";
  return s + " Only";
};

const AdminBilling = () => {
  const [invoiceNo, setInvoiceNo] = useState("013");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [customer, setCustomer] = useState("Cash");
  const [customerAddr, setCustomerAddr] = useState("");
  const [customerState, setCustomerState] = useState("");
  const [customerStateCode, setCustomerStateCode] = useState("");
  const [customerGstin, setCustomerGstin] = useState("");
  const [transport, setTransport] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [items, setItems] = useState<Item[]>([blankItem()]);
  const [freight, setFreight] = useState("0");
  const [cgstRate, setCgstRate] = useState("9");
  const [sgstRate, setSgstRate] = useState("9");
  const [igstRate, setIgstRate] = useState("0");

  const updateItem = (i: number, key: keyof Item, value: string) => {
    setItems(prev => prev.map((it, idx) => (idx === i ? { ...it, [key]: value } : it)));
  };
  const addItem = () => setItems(prev => [...prev, blankItem()]);
  const removeItem = (i: number) => setItems(prev => prev.filter((_, idx) => idx !== i));

  const totals = useMemo(() => {
    const lineTotals = items.map(it => (Number(it.qty) || 0) * (Number(it.rate) || 0));
    const subTotal = lineTotals.reduce((a, b) => a + b, 0);
    const freightAmt = Number(freight) || 0;
    const taxable = subTotal + freightAmt;
    const cgst = (taxable * (Number(cgstRate) || 0)) / 100;
    const sgst = (taxable * (Number(sgstRate) || 0)) / 100;
    const igst = (taxable * (Number(igstRate) || 0)) / 100;
    const grandRaw = taxable + cgst + sgst + igst;
    const grand = Math.round(grandRaw);
    const roundOff = grand - grandRaw;
    return { lineTotals, subTotal, freightAmt, taxable, cgst, sgst, igst, grand, roundOff };
  }, [items, freight, cgstRate, sgstRate, igstRate]);

  const print = () => window.print();

  const inputCls = "w-full px-2 py-1 rounded border border-border bg-background text-sm focus:outline-none focus:ring-1 focus:ring-primary";
  const cellInputCls = "w-full px-2 py-1.5 bg-transparent text-sm focus:outline-none focus:bg-secondary/40";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <div>
          <h2 className="font-display text-2xl font-bold">Generate Bill</h2>
          <p className="text-sm text-muted-foreground">Create a tax invoice and print or save as PDF.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={print} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg gradient-primary text-primary-foreground text-sm font-medium">
            <Printer className="w-4 h-4" /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Editable form (screen only) */}
      <div className="rounded-2xl glass border border-border/30 p-5 space-y-4 print:hidden">
        <div className="grid md:grid-cols-3 gap-3">
          <label className="text-xs font-medium text-muted-foreground">
            Invoice No
            <input value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            Date
            <input type="date" value={date} onChange={e => setDate(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            Customer (M/s)
            <input value={customer} onChange={e => setCustomer(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground md:col-span-3">
            Customer Address
            <input value={customerAddr} onChange={e => setCustomerAddr(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            State
            <input value={customerState} onChange={e => setCustomerState(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            State Code
            <input value={customerStateCode} onChange={e => setCustomerStateCode(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            Customer GSTIN
            <input value={customerGstin} onChange={e => setCustomerGstin(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            Mode of Transport
            <input value={transport} onChange={e => setTransport(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            Vehicle No
            <input value={vehicleNo} onChange={e => setVehicleNo(e.target.value)} className={inputCls + " mt-1"} />
          </label>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Line Items</h3>
            <button onClick={addItem} className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20">
              <Plus className="w-3.5 h-3.5" /> Add Item
            </button>
          </div>
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary/50 text-xs">
                <tr>
                  <th className="px-2 py-2 text-left w-10">#</th>
                  <th className="px-2 py-2 text-left">Description</th>
                  <th className="px-2 py-2 text-left w-24">HSN</th>
                  <th className="px-2 py-2 text-right w-20">Qty</th>
                  <th className="px-2 py-2 text-right w-24">Rate</th>
                  <th className="px-2 py-2 text-right w-28">Amount</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {items.map((it, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="px-2 text-center text-muted-foreground">{i + 1}</td>
                    <td><input value={it.description} onChange={e => updateItem(i, "description", e.target.value)} className={cellInputCls} /></td>
                    <td><input value={it.hsn} onChange={e => updateItem(i, "hsn", e.target.value)} className={cellInputCls} /></td>
                    <td><input type="number" value={it.qty} onChange={e => updateItem(i, "qty", e.target.value)} className={cellInputCls + " text-right"} /></td>
                    <td><input type="number" value={it.rate} onChange={e => updateItem(i, "rate", e.target.value)} className={cellInputCls + " text-right"} /></td>
                    <td className="px-2 text-right font-medium">{fmt(totals.lineTotals[i] || 0)}</td>
                    <td>
                      {items.length > 1 && (
                        <button onClick={() => removeItem(i)} className="p-1 text-destructive hover:bg-destructive/10 rounded">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3">
          <label className="text-xs font-medium text-muted-foreground">
            Freight / Cartage
            <input type="number" value={freight} onChange={e => setFreight(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            CGST %
            <input type="number" value={cgstRate} onChange={e => setCgstRate(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            SGST %
            <input type="number" value={sgstRate} onChange={e => setSgstRate(e.target.value)} className={inputCls + " mt-1"} />
          </label>
          <label className="text-xs font-medium text-muted-foreground">
            IGST %
            <input type="number" value={igstRate} onChange={e => setIgstRate(e.target.value)} className={inputCls + " mt-1"} />
          </label>
        </div>
      </div>

      {/* Printable invoice preview */}
      <div className="bill-preview bg-white text-black rounded-2xl border-2 border-border p-6 md:p-8 shadow-lg print:shadow-none print:border-0 print:rounded-none print:p-4">
        <div className="flex justify-between items-start text-xs border-b-2 border-black pb-2 mb-3">
          <div>GSTIN: <strong>07LHFPK2661E1ZA</strong></div>
          <div className="font-bold">TAX INVOICE</div>
          <div>Mob.: <strong>8447244386</strong></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="col-span-2">
            <h1 className="text-3xl md:text-4xl font-black tracking-wider" style={{ color: "#e60000", fontFamily: "Georgia, serif", textShadow: "1px 1px 0 rgba(0,0,0,0.1)" }}>
              RAJ HARDWARE
            </h1>
            <div className="text-[11px] font-semibold tracking-wide my-1">— DEALS IN —</div>
            <div className="text-sm font-semibold">HARDWARE DOOR FITTING & GENERAL SUPPLIERS</div>
            <div className="text-xs mt-1">2901/107-B, First Floor, Jyoti Hardware Market,</div>
            <div className="text-xs">Lalkuan, Sirkiwalan, New Delhi-110006</div>
          </div>
          <div className="text-xs space-y-1 border border-black p-2">
            <div className="flex justify-between gap-2"><span>State:</span><strong>Delhi</strong><span>Code: <strong>07</strong></span></div>
            <div>Invoice No: <strong className="text-base">{invoiceNo}</strong></div>
            <div>Date: <strong>{new Date(date).toLocaleDateString("en-GB")}</strong></div>
            <div>Mode of Transport: <strong>{transport || "—"}</strong></div>
            <div>Vehicle No: <strong>{vehicleNo || "—"}</strong></div>
          </div>
        </div>

        <div className="border border-black text-xs mb-0">
          <div className="px-2 py-1 border-b border-black">M/s: <strong>{customer}</strong></div>
          <div className="px-2 py-1 border-b border-black min-h-[18px]">{customerAddr || "—"}</div>
          <div className="grid grid-cols-2">
            <div className="px-2 py-1 border-r border-black">State: <strong>{customerState || "—"}</strong> &nbsp; Code: <strong>{customerStateCode || "—"}</strong></div>
            <div className="px-2 py-1">GSTIN No: <strong>{customerGstin || "—"}</strong></div>
          </div>
        </div>

        <table className="w-full text-xs border border-t-0 border-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-black px-1 py-1 w-8">S.No.</th>
              <th className="border border-black px-2 py-1 text-left">DESCRIPTION</th>
              <th className="border border-black px-1 py-1 w-16">HSN Code</th>
              <th className="border border-black px-1 py-1 w-14">Qty</th>
              <th className="border border-black px-1 py-1 w-16">Rate</th>
              <th className="border border-black px-1 py-1 w-24">Amount Rs.</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={i}>
                <td className="border border-black text-center py-1">{i + 1}</td>
                <td className="border border-black px-2">{it.description}</td>
                <td className="border border-black text-center">{it.hsn}</td>
                <td className="border border-black text-right px-1">{it.qty}</td>
                <td className="border border-black text-right px-1">{it.rate}</td>
                <td className="border border-black text-right px-1">{totals.lineTotals[i] ? fmt(totals.lineTotals[i]) : ""}</td>
              </tr>
            ))}
            {/* filler rows */}
            {Array.from({ length: Math.max(0, 8 - items.length) }).map((_, i) => (
              <tr key={`f${i}`}>
                <td className="border border-black h-6"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
                <td className="border border-black"></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="grid grid-cols-2 text-xs border border-t-0 border-black">
          <div className="border-r border-black p-2 space-y-1">
            <div><strong>Rs in Word:</strong> {numberToWords(totals.grand)}</div>
            <div className="mt-3 border-t border-black pt-2">
              <div className="font-bold mb-1">BANK DETAILS</div>
              <div>Bank: <strong>KOTAK MAHINDRA BANK</strong></div>
              <div>Branch: <strong>Chawari Bazar, Delhi-6</strong></div>
              <div>A/C No: <strong>5448070301</strong></div>
              <div>IFS Code: <strong>KKBK0000213</strong></div>
            </div>
          </div>
          <div className="text-xs">
            <Row label="Total" value={fmt(totals.subTotal)} />
            <Row label="Freight Cartage" value={totals.freightAmt ? fmt(totals.freightAmt) : "—"} />
            <Row label="Taxable Value" value={fmt(totals.taxable)} />
            <Row label={`CGST @ ${cgstRate}%`} value={fmt(totals.cgst)} />
            <Row label={`SGST @ ${sgstRate}%`} value={fmt(totals.sgst)} />
            <Row label={`IGST @ ${igstRate}%`} value={totals.igst ? fmt(totals.igst) : "—"} />
            <Row label="Round Off" value={totals.roundOff.toFixed(2)} />
            <div className="grid grid-cols-2 border-t border-black bg-gray-100">
              <div className="px-2 py-1.5 font-bold">Grand Total</div>
              <div className="px-2 py-1.5 text-right font-bold border-l border-black">₹ {fmt(totals.grand)}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 text-[11px] mt-3">
          <div>
            <div className="font-bold underline">TERMS & CONDITIONS:</div>
            <ul className="list-none">
              <li>Goods once sold will not be taken back</li>
              <li>All disputes subject to Delhi Jurisdiction</li>
              <li>Interest @18% will be charged after 30 days</li>
            </ul>
          </div>
          <div className="text-right">
            <div className="font-bold" style={{ color: "#e60000" }}>For RAJ HARDWARE</div>
            <div className="mt-10 border-t border-black inline-block pt-1 px-6">Authorised Signatory</div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .bill-preview, .bill-preview * { visibility: visible; }
          .bill-preview { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
};

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="grid grid-cols-2 border-b border-black">
    <div className="px-2 py-1">{label}</div>
    <div className="px-2 py-1 text-right border-l border-black">{value}</div>
  </div>
);

export default AdminBilling;