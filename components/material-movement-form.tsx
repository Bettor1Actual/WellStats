"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, X } from "lucide-react"

interface Item {
  id: string
  product: string
  qty: string
}

interface MaterialMovementFormProps {
  activeWarehouses: string[]
  activeDeliveryCompanies: string[]
  activeProducts: string[]
  activePersonnel: string[]
  activeFluidTypes: string[]
}

export default function MaterialMovementForm({
  activeWarehouses,
  activeDeliveryCompanies,
  activeProducts,
  activePersonnel,
  activeFluidTypes,
}: MaterialMovementFormProps) {
  const [items, setItems] = useState<Item[]>([{ id: "1", product: "", qty: "" }])

  const addItem = () => {
    const newItem: Item = {
      id: Date.now().toString(),
      product: "",
      qty: "",
    }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, field: keyof Item, value: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Header</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date">Date:</Label>
              <Input
                id="date"
                type="date"
                defaultValue="2025-05-28"
                className="mt-1 border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
              />
            </div>
            <div>
              <Label htmlFor="type">Type:</Label>
              <Select defaultValue="invoice">
                <SelectTrigger className="mt-1 border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">Invoice</SelectItem>
                  <SelectItem value="receipt">Receipt</SelectItem>
                  <SelectItem value="transfer">Transfer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="source-warehouse">Source Warehouse:</Label>
              <Select defaultValue="">
                <SelectTrigger className="mt-1 border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500">
                  <SelectValue placeholder="Select Warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {activeWarehouses.map((warehouse) => (
                    <SelectItem key={warehouse} value={warehouse.toLowerCase().replace(/\s+/g, "-")}>
                      {warehouse}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="delivered-by">Delivered By:</Label>
              <Select defaultValue="">
                <SelectTrigger className="mt-1 border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500">
                  <SelectValue placeholder="Select Delivery Company" />
                </SelectTrigger>
                <SelectContent>
                  {activeDeliveryCompanies.map((company) => (
                    <SelectItem key={company} value={company.toLowerCase().replace(/\s+/g, "-")}>
                      {company}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 font-medium text-gray-700 border-b pb-2">
              <div className="col-span-8">Product</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-2"></div>
            </div>

            {/* Items */}
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-8">
                  <Select value={item.product} onValueChange={(value) => updateItem(item.id, "product", value)}>
                    <SelectTrigger className="mt-1 border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500">
                      <SelectValue placeholder="Select Product" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {activeProducts.map((product) => (
                        <SelectItem key={product} value={product.toLowerCase().replace(/\s+/g, "-")}>
                          {product}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="0"
                    value={item.qty}
                    onChange={(e) => updateItem(item.id, "qty", e.target.value)}
                    className="border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                  />
                </div>
                <div className="col-span-2 flex justify-end">
                  {items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end">
              <Button onClick={addItem} variant="outline" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Receiving Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Receiving</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="verified-by">Verified By:</Label>
            <div className="flex items-center gap-2 mt-1">
              <Select defaultValue="">
                <SelectTrigger className="flex-1 border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500">
                  <SelectValue placeholder="Select Personnel" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {activePersonnel.map((person) => (
                    <SelectItem key={person} value={person.toLowerCase().replace(/\s+/g, "-")}>
                      {person}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <X className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes:</Label>
            <Textarea
              id="notes"
              placeholder="Enter any additional notes..."
              className="mt-1 min-h-[100px] border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </div>
    </div>
  )
}
