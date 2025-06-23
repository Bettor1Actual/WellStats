"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Plus,
  X,
  Upload,
  Save,
  AlertCircle,
  Loader2,
  Package,
  Truck,
  MapPin,
  User,
  FileText,
  Calculator,
  Building,
  Receipt,
} from "lucide-react"
import { productDatabase } from "../data/product-database"

interface ReceiverItem {
  id: string
  productId: string
  product: string
  unit: string
  unitWeight: number
  quantity: number
  itemWeight: number
}

interface CreateReceiverFormProps {
  activeWarehouses: string[]
  activeDeliveryCompanies: string[]
  activeProducts: string[]
  activePersonnel: string[]
  activeOperators: string[]
  activeFluidTypes: string[]
}

interface ValidationErrors {
  receiptDate?: string
  vendor?: string
  verifiedBy?: string
  destinationWarehouse?: string
  deliveredBy?: string
  items?: string
}

const vendors = [
  "Federal",
  "Halliburton",
  "Baker Hughes",
  "Schlumberger",
  "Weatherford",
  "NOV",
  "Cameron",
  "FMC Technologies",
  "Tenaris",
  "Vallourec",
]

export default function CreateReceiverForm({
  activeWarehouses,
  activeDeliveryCompanies,
  activeProducts,
  activePersonnel,
  activeOperators,
  activeFluidTypes,
}: CreateReceiverFormProps) {
  const [movementId, setMovementId] = useState("17145")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [formData, setFormData] = useState({
    receiptDate: "2025-06-03",
    vendor: "Federal",
    bol: "",
    verifiedBy: "James Brown",
    destinationWarehouse: "CUSTOMER",
    deliveredBy: "Vendor Setup Trucking",
    notes: "",
  })

  const [items, setItems] = useState<ReceiverItem[]>([
    {
      id: "1",
      productId: "444",
      product: "geo-bar-(bulk)",
      unit: "Ton",
      unitWeight: 2000,
      quantity: 25,
      itemWeight: 50000,
    },
  ])

  const addItem = () => {
    const newItem: ReceiverItem = {
      id: Date.now().toString(),
      productId: "",
      product: "",
      unit: "",
      unitWeight: 0,
      quantity: 0,
      itemWeight: 0,
    }
    setItems([...items, newItem])
  }

  const updateItem = (id: string, field: keyof ReceiverItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Auto-populate fields when product is selected
          if (field === "product" && value) {
            const productInfo = productDatabase[value]
            if (productInfo) {
              updatedItem.productId = productInfo.id
              updatedItem.unit = productInfo.unit
              updatedItem.unitWeight = productInfo.unitWeight
              // Recalculate item weight if quantity exists
              if (updatedItem.quantity > 0) {
                updatedItem.itemWeight = updatedItem.unitWeight * updatedItem.quantity
              }
            }
          }

          // Auto-calculate item weight when quantity changes
          if (field === "quantity") {
            updatedItem.itemWeight = updatedItem.unitWeight * updatedItem.quantity
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const calculateTotalWeight = () => {
    return items.reduce((total, item) => total + item.itemWeight, 0)
  }

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear validation error when user starts typing
    if (validationErrors[field as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {}

    // Required field validation
    if (!formData.receiptDate) errors.receiptDate = "Receipt date is required"
    if (!formData.vendor) errors.vendor = "Vendor is required"
    if (!formData.verifiedBy) errors.verifiedBy = "Verified by is required"
    if (!formData.destinationWarehouse) errors.destinationWarehouse = "Destination warehouse is required"
    if (!formData.deliveredBy) errors.deliveredBy = "Delivery company is required"

    // Items validation
    const validItems = items.filter((item) => item.product && item.quantity > 0)
    if (validItems.length === 0) {
      errors.items = "At least one item with product and quantity is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSaveAndSubmit = async () => {
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Handle successful submission
      console.log("Receiver saved and submitted successfully!")
    } catch (error) {
      console.error("Error saving receiver:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasErrors = Object.keys(validationErrors).length > 0
  const validItemsCount = items.filter((item) => item.product && item.quantity > 0).length

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      {/* Header with Movement ID and Save Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Receipt className="h-6 w-6 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Create Receiver</h1>
          </div>
          <Badge variant="outline" className="text-lg px-3 py-1">
            #{movementId}
          </Badge>
        </div>
        <Button
          onClick={handleSaveAndSubmit}
          size="lg"
          className="bg-slate-700 hover:bg-slate-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-[180px]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-5 w-5 mr-2" />
              Save & Submit
            </>
          )}
        </Button>
      </div>

      {/* Validation Errors Alert */}
      {hasErrors && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="text-red-800">
            Please complete all required fields before submitting the receiver.
          </AlertDescription>
        </Alert>
      )}

      {/* Receipt Information */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2 text-xl">
            <FileText className="h-6 w-6 text-blue-600" />
            <span>Receipt Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {/* Date and Movement Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="receipt-date" className="text-sm font-semibold text-gray-700 flex items-center">
                Receipt Date <span className="text-red-500 ml-1">*</span>
              </Label>
              <Input
                id="receipt-date"
                type="date"
                value={formData.receiptDate}
                onChange={(e) => updateFormData("receiptDate", e.target.value)}
                className={`h-10 border-2 transition-colors shadow-sm bg-gray-50 ${
                  validationErrors.receiptDate
                    ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-gray-400 focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                }`}
              />
              {validationErrors.receiptDate && (
                <p className="text-red-500 text-sm flex items-center mt-1">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {validationErrors.receiptDate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">Movement Number</Label>
              <Input
                value={movementId}
                readOnly
                className="h-10 border-2 border-gray-300 bg-gray-100 font-mono shadow-sm"
              />
            </div>
          </div>

          <Separator className="my-6" />

          {/* Vendor Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="h-5 w-5 mr-2 text-blue-600" />
              Vendor Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  Vendor <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select value={formData.vendor} onValueChange={(value) => updateFormData("vendor", value)}>
                  <SelectTrigger
                    className={`h-10 border-2 transition-colors shadow-sm bg-gray-50 ${
                      validationErrors.vendor
                        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-400 focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                    }`}
                  >
                    <SelectValue placeholder="Select vendor..." />
                  </SelectTrigger>
                  <SelectContent>
                    {vendors.map((vendor) => (
                      <SelectItem key={vendor} value={vendor.toLowerCase().replace(/\s+/g, "-")}>
                        {vendor}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.vendor && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.vendor}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">BOL (Bill of Lading)</Label>
                <Input
                  placeholder="Enter BOL number..."
                  value={formData.bol}
                  onChange={(e) => updateFormData("bol", e.target.value)}
                  className="h-10 border-2 border-gray-300 bg-white shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                />
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Location & Logistics Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-600" />
              Location & Logistics
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  Destination Warehouse <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select
                  value={formData.destinationWarehouse}
                  onValueChange={(value) => updateFormData("destinationWarehouse", value)}
                >
                  <SelectTrigger
                    className={`h-10 border-2 transition-colors shadow-sm bg-gray-50 ${
                      validationErrors.destinationWarehouse
                        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-400 focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                    }`}
                  >
                    <SelectValue placeholder="Select destination warehouse..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activeWarehouses.map((warehouse) => (
                      <SelectItem key={warehouse} value={warehouse.toLowerCase().replace(/\s+/g, "-")}>
                        {warehouse}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.destinationWarehouse && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.destinationWarehouse}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  <Truck className="h-4 w-4 mr-1" />
                  Delivered By <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select value={formData.deliveredBy} onValueChange={(value) => updateFormData("deliveredBy", value)}>
                  <SelectTrigger
                    className={`h-10 border-2 transition-colors shadow-sm bg-gray-50 ${
                      validationErrors.deliveredBy
                        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-400 focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                    }`}
                  >
                    <SelectValue placeholder="Select delivery company..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activeDeliveryCompanies.map((company) => (
                      <SelectItem key={company} value={company.toLowerCase().replace(/\s+/g, "-")}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.deliveredBy && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.deliveredBy}
                  </p>
                )}
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Personnel Section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Personnel
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 flex items-center">
                  Verified By <span className="text-red-500 ml-1">*</span>
                </Label>
                <Select value={formData.verifiedBy} onValueChange={(value) => updateFormData("verifiedBy", value)}>
                  <SelectTrigger
                    className={`h-10 border-2 transition-colors shadow-sm bg-gray-50 ${
                      validationErrors.verifiedBy
                        ? "border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                        : "border-gray-400 focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                    }`}
                  >
                    <SelectValue placeholder="Select personnel..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activePersonnel.map((person) => (
                      <SelectItem key={person} value={person.toLowerCase().replace(/\s+/g, "-")}>
                        {person}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {validationErrors.verifiedBy && (
                  <p className="text-red-500 text-sm flex items-center mt-1">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {validationErrors.verifiedBy}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 text-xl">
              <Package className="h-6 w-6 text-blue-600" />
              <span>Received Items</span>
              <span className="text-green-200 ml-2">*</span>
            </CardTitle>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                {validItemsCount} valid items
              </Badge>
              <Button
                onClick={addItem}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 font-semibold"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Item
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {validationErrors.items && (
            <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
              <AlertCircle className="h-5 w-5" />
              <AlertDescription className="text-red-800">{validationErrors.items}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            {/* Enhanced Table Header */}
            <div className="grid grid-cols-12 gap-4 p-2 bg-gray-50 rounded-lg border-2 border-gray-200">
              <div className="col-span-1 font-semibold text-gray-700 text-sm">ID</div>
              <div className="col-span-3 font-semibold text-gray-700 text-sm">Product</div>
              <div className="col-span-2 font-semibold text-gray-700 text-sm">Unit</div>
              <div className="col-span-2 font-semibold text-gray-700 text-sm">Unit Weight</div>
              <div className="col-span-2 font-semibold text-gray-700 text-sm">Quantity</div>
              <div className="col-span-1 font-semibold text-gray-700 text-sm">Weight</div>
              <div className="col-span-1 font-semibold text-gray-700 text-sm">Actions</div>
            </div>

            {/* Items */}
            {items.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-12 gap-4 p-4 bg-white rounded-lg border-2 border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="col-span-1">
                  <Input
                    value={item.productId}
                    readOnly
                    className="bg-gray-200 text-sm font-mono border-0 shadow-none rounded-md"
                    placeholder="Auto"
                  />
                </div>
                <div className="col-span-3">
                  <Select value={item.product} onValueChange={(value) => updateItem(item.id, "product", value)}>
                    <SelectTrigger className="border-2 border-gray-300 focus:border-slate-600 h-9 bg-white shadow-sm">
                      <SelectValue placeholder="Select product..." />
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
                    value={item.unit}
                    readOnly
                    className="bg-gray-200 border-0 h-9 shadow-none rounded-md"
                    placeholder="Auto-filled"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    value={item.unitWeight || ""}
                    readOnly
                    className="bg-gray-200 border-0 h-9 font-mono shadow-none rounded-md"
                    placeholder="0.00"
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="Enter quantity..."
                    value={item.quantity || ""}
                    onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                    className="h-10 border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500"
                  />
                </div>
                <div className="col-span-1">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={item.itemWeight || ""}
                    readOnly
                    className="bg-gray-200 text-sm font-mono border-0 shadow-none rounded-md"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  {items.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 hover:bg-red-50 h-11 w-11"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Weight Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border-2 border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calculator className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-blue-800">Weight Summary</h3>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex justify-between items-center space-x-8">
                    <span className="text-sm text-blue-700">Product Weight:</span>
                    <span className="font-mono font-semibold text-blue-800">
                      {calculateTotalWeight().toFixed(2)} lbs
                    </span>
                  </div>
                  <div className="flex justify-between items-center space-x-8">
                    <span className="text-sm text-blue-700">Equipment Weight:</span>
                    <span className="font-mono font-semibold text-blue-800">0.00 lbs</span>
                  </div>
                  <Separator className="my-2 bg-blue-300" />
                  <div className="flex justify-between items-center space-x-8">
                    <span className="font-semibold text-blue-800">Final Weight:</span>
                    <span className="font-mono font-bold text-xl text-blue-900">
                      {calculateTotalWeight().toFixed(2)} lbs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes & Attachments Section */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2 text-xl">
            <FileText className="h-6 w-6 text-blue-600" />
            <span>Notes & Attachments</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">Additional Notes</Label>
            <Textarea
              placeholder="Enter any additional notes, special instructions, or comments..."
              value={formData.notes}
              onChange={(e) => updateFormData("notes", e.target.value)}
              className="min-h-[120px] border-2 border-gray-400 bg-gray-50 shadow-sm focus:border-slate-600 focus:ring-1 focus:ring-slate-500 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-gray-700">File Attachments</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <div className="space-y-1">
                <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50">
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

      {/* Final Submit Button */}
      <div className="flex justify-center pb-4">
        <Button
          onClick={handleSaveAndSubmit}
          size="lg"
          className="bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white shadow-xl hover:shadow-2xl transition-all duration-300 min-w-[250px] h-14 text-lg font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin mr-3" />
              Processing Receiver...
            </>
          ) : (
            <>
              <Save className="h-6 w-6 mr-3" />
              Save & Submit Receiver
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
