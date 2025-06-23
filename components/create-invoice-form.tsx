"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Save, Loader2, FileText, Printer, Download } from "lucide-react"

export default function CreateInvoiceForm() {
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showInvoice, setShowInvoice] = useState(false)

  const handleSaveAndSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowInvoice(true)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // Simulate PDF download
    console.log("Downloading invoice as PDF...")
  }

  const handleNewInvoice = () => {
    setShowInvoice(false)
    setNotes("")
  }

  if (showInvoice) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-between items-center print:hidden">
          <Button variant="outline" onClick={handleNewInvoice}>
            Create New Invoice
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
          </div>
        </div>

        {/* Invoice Document */}
        <div className="bg-white shadow-lg print:shadow-none print:bg-white">
          <div className="p-8 print:p-6">
            {/* Header with Company Info */}
            <div className="text-center mb-4">
              <p className="text-sm font-medium">
                1431 Union Avenue • Bakersfield, CA 93305 • Telephone (661) 325-5919 • Email: geodf@geodf.com
              </p>
            </div>

            {/* Logo and Title Section */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <img src="/images/geo-logo.png" alt="GEO Logo" className="h-20 w-auto" />
                <div>
                  <div className="text-sm text-gray-600">Drilling Fluids, Inc.</div>
                </div>
              </div>

              <div className="text-center">
                <h1 className="text-3xl font-bold mb-2">Delivery Ticket</h1>
                <div className="border-b-2 border-black w-full mb-2"></div>
              </div>

              <div className="text-right">
                <div className="space-y-1">
                  <div className="text-sm">
                    <span className="font-semibold">Ticket Number</span>
                  </div>
                  <div className="text-lg font-bold">54945087</div>
                </div>
              </div>
            </div>

            {/* Customer and Job Info */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold w-24">Sold to:</span>
                  <span>XTO Energy</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">Field:</span>
                  <span>Delaware</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">Well Name:</span>
                  <span>St Cloud 76 3031 TG 703H</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex">
                  <span className="font-semibold w-24">Rig:</span>
                  <span>H&P 549</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">Warehouse:</span>
                  <span>Odessa</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">PO#:</span>
                  <span>42-301-36420</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-24">AFE:</span>
                  <span>DD.2022.07211</span>
                </div>
              </div>
            </div>

            {/* Items Table */}
            <div className="mb-6">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-2 border-black px-2 py-2 text-center font-bold">Quantity</th>
                    <th className="border-2 border-black px-2 py-2 text-center font-bold">Size</th>
                    <th className="border-2 border-black px-2 py-2 text-center font-bold">Description</th>
                    <th className="border-2 border-black px-2 py-2 text-center font-bold">Unit Price</th>
                    <th className="border-2 border-black px-2 py-2 text-center font-bold">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Non-Taxable Section */}
                  <tr>
                    <td colSpan={5} className="border-2 border-black px-2 py-1 text-center font-bold">
                      Non-Taxable
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">3</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Each</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Truck Unloading</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$85.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$255.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">20</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Days</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Blower</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$20.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$400.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">10</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Days</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Engineering</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$850.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$8,500.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">20</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Days</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Bottle Rental</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$30.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$600.00</td>
                  </tr>

                  {/* Taxable Section */}
                  <tr>
                    <td colSpan={5} className="border-2 border-black px-2 py-1 text-center font-bold">
                      Taxable
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">18</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Each</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Flat Rate Trucking</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$950.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$17,100.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">16</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Each</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Pallets</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$20.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$320.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">13</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Each</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Shrink Wrap Covers</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$15.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$195.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">289</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Ton</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Geo Bar - Bulk</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$230.00</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$66,470.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">29</td>
                    <td className="border-2 border-black px-2 py-1 text-center">50#</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Mul Troll (Gilsonite)</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$49.55</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$1,436.95</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">34</td>
                    <td className="border-2 border-black px-2 py-1 text-center">50#</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Mul Thick</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$93.10</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$3,165.40</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">220</td>
                    <td className="border-2 border-black px-2 py-1 text-center">1 GAL</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Delta Trol WA</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$31.80</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$6,996.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">220</td>
                    <td className="border-2 border-black px-2 py-1 text-center">1 GAL</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Delta Lift</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$45.80</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$10,076.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">220</td>
                    <td className="border-2 border-black px-2 py-1 text-center">1 GAL</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Delta Mod</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$53.63</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$11,798.60</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">29</td>
                    <td className="border-2 border-black px-2 py-1 text-center">50#</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Drill Well D210</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$124.90</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$3,622.10</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">295</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Gal</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Mul Treat (Totes)</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$17.99</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$5,307.05</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">1000</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Gal</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Mul III</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$13.45</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$13,450.00</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">277</td>
                    <td className="border-2 border-black px-2 py-1 text-center">60#</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Hydrated Lime</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$7.10</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$1,966.70</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">327</td>
                    <td className="border-2 border-black px-2 py-1 text-center">50#</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Calcium Chloride</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$20.77</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$6,791.79</td>
                  </tr>
                  <tr>
                    <td className="border-2 border-black px-2 py-1 text-center">30</td>
                    <td className="border-2 border-black px-2 py-1 text-center">50#</td>
                    <td className="border-2 border-black px-2 py-1 text-center">Microphalt</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$81.77</td>
                    <td className="border-2 border-black px-2 py-1 text-center">$2,453.10</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="flex justify-end mb-6">
              <div className="w-80 space-y-1">
                <div className="flex justify-between border-b border-black">
                  <span className="font-bold">Non-Taxable Total</span>
                  <span className="font-bold">$9,755.00</span>
                </div>
                <div className="flex justify-between border-b border-black">
                  <span className="font-bold">Taxable Total</span>
                  <span className="font-bold">$151,148.69</span>
                </div>
                <div className="flex justify-between border-b border-black">
                  <span className="font-bold">Sales Tax</span>
                  <span className="font-bold">$12,469.77</span>
                </div>
                <div className="flex justify-between border-2 border-black p-1">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg">$173,373.46</span>
                </div>
              </div>
            </div>

            {/* Tax Info */}
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-2">
                <div className="border-b border-black w-64 mb-2"></div>
                <p className="text-sm">Company</p>
              </div>
              <div className="text-right space-y-1">
                <div>
                  <span className="font-bold">Tax Rate</span>
                </div>
                <div>8.250%</div>
                <div className="mt-2">
                  <span className="font-bold">Tax Region</span>
                </div>
                <div>TX</div>
              </div>
            </div>

            {/* Notes */}
            {notes && (
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Notes:</h3>
                <p className="text-sm text-gray-700 whitespace-pre-wrap border border-gray-300 p-2 rounded">{notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-between items-end">
              <div>
                <div className="border-b border-black w-64 mb-2"></div>
                <p className="text-sm">By</p>
                <p className="text-xs mt-4">
                  TITLE TO GOODS SOLD HEREUNDER PASSES TO YOU AT OUR
                  <br />
                  WAREHOUSE PRIOR TO SHIPMENT.
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm">
                  <span className="font-bold">Date:</span> 06/01/2023 - 06/10/2023
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-stone-600" />
          <h1 className="text-3xl font-bold text-gray-900">Create Invoice</h1>
        </div>
      </div>

      {/* Notes & Attachments Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2 text-xl">
            <FileText className="h-6 w-6 text-stone-300" />
            <span>Notes & Attachments</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-3">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Additional Notes</Label>
            <Textarea
              placeholder="Enter any additional notes, special instructions, or comments..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[80px] border-2 border-gray-200 focus:border-slate-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">File Attachments</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-stone-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="space-y-1">
                <Button variant="outline" className="border-stone-200 text-stone-700 hover:bg-stone-50">
                  <Upload className="h-4 w-4 mr-2" />
                  Choose Files
                </Button>
                <p className="text-sm text-gray-500">or drag and drop files here</p>
                <p className="text-xs text-gray-400">PDF, DOC, XLS, JPG, PNG (Max 10MB)</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <div className="flex justify-center pb-4">
        <Button
          onClick={handleSaveAndSubmit}
          size="lg"
          className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[250px] h-10 text-lg font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin mr-3" />
              Creating Invoice...
            </>
          ) : (
            <>
              <Save className="h-6 w-6 mr-3" />
              Save & Submit Invoice
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
