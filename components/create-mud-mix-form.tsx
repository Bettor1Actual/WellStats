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
import {
  Plus,
  X,
  Save,
  AlertCircle,
  Loader2,
  Package,
  Truck,
  MapPin,
  User,
  FileText,
  Calculator,
  Beaker,
  Thermometer,
} from "lucide-react"
import { productDatabase } from "../data/product-database"

interface MudMixItem {
  id: string
  productId: string
  product: string
  unit: string
  unitWeight: number
  quantity: number
  itemWeight: number
}

interface CreateMudMixFormProps {
  activeWarehouses: string[]
  activeDeliveryCompanies: string[]
  activeProducts: string[]
  activePersonnel: string[]
  activeOperators: string[]
  activeFluidTypes: string[]
}

interface ValidationErrors {
  orderDate?: string
  expectedDeliveryDate?: string
  orderedBy?: string
  verifiedBy?: string
  mixedBy?: string
  bblsMixed?: string
  fluidType?: string
  mudWeight?: string
  viscosity?: string
  temp?: string
  operator?: string
  wellName?: string
  deliveredTo?: string
  deliveredBy?: string
  items?: string
}

export default function CreateMudMixForm({
  activeWarehouses,
  activeDeliveryCompanies,
  activeProducts,
  activePersonnel,
  activeOperators,
  activeFluidTypes,
}: CreateMudMixFormProps) {
  const [movementId, setMovementId] = useState("16527")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [formData, setFormData] = useState({
    orderDate: "2025-05-06",
    expectedDeliveryDate: "",
    orderedBy: "",
    verifiedBy: "",
    mixedBy: "",
    bblsMixed: "",
    fluidType: "",
    mudWeight: "",
    viscosity: "",
    temp: "",
    operator: "",
    wellName: "",
    deliveredTo: "",
    deliveredBy: "",
    notes: "",
  })

  const [items, setItems] = useState<MudMixItem[]>([
    {
      id: Date.now().toString(),
      productId: "",
      product: "",
      unit: "",
      unitWeight: 0,
      quantity: 0,
      itemWeight: 0,
    },
  ])

  const addItem = () => {
    const newItem: MudMixItem = {
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

  const updateItem = (id: string, field: keyof MudMixItem, value: any) => {
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
    if (!formData.orderDate) errors.orderDate = "Order date is required"
    if (!formData.orderedBy) errors.orderedBy = "Ordered by is required"
    if (!formData.verifiedBy) errors.verifiedBy = "Verified by is required"
    if (!formData.mixedBy) errors.mixedBy = "Mixed by is required"
    if (!formData.bblsMixed) errors.bblsMixed = "Barrels mixed is required"
    if (!formData.fluidType) errors.fluidType = "Fluid type is required"
    if (!formData.mudWeight) errors.mudWeight = "Mud weight is required"
    if (!formData.viscosity) errors.viscosity = "Viscosity is required"
    if (!formData.temp) errors.temp = "Temperature is required"
    if (!formData.operator) errors.operator = "Operator is required"
    if (!formData.wellName) errors.wellName = "Well name is required"
    if (!formData.deliveredTo) errors.deliveredTo = "Delivered to is required"
    if (!formData.deliveredBy) errors.deliveredBy = "Delivered by is required"

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
      console.log("Mud Mix saved and submitted successfully!")
    } catch (error) {
      console.error("Error saving mud mix:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const hasErrors = Object.keys(validationErrors).length > 0
  const validItemsCount = items.filter((item) => item.product && item.quantity > 0).length

  return (
    <div className="max-w-6xl mx-auto space-y-2">
      {/* Header with Movement ID and Save Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Beaker className="h-5 w-5 text-amber-600" />
          <h1 className="text-2xl font-bold text-gray-900">Create Mud Mix</h1>
          <Badge variant="outline" className="text-sm px-2 py-0.5">
            #{movementId}
          </Badge>
        </div>
        <Button
          onClick={handleSaveAndSubmit}
          size="sm"
          className="bg-slate-700 hover:bg-slate-800 text-white shadow-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-1.5" />
              Save & Submit
            </>
          )}
        </Button>
      </div>

      {/* Validation Errors Alert */}
      {hasErrors && (
        <Alert variant="destructive" className="border-red-200 bg-red-50 py-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800 text-sm">
            Please complete all required fields before submitting.
          </AlertDescription>
        </Alert>
      )}

      {/* Order & Personnel Info */}
      <Card className="shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg py-2 px-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-4 w-4 text-amber-400" />
            <span>Order Details</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Order Date */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Order Date <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                type="date"
                value={formData.orderDate}
                onChange={(e) => updateFormData("orderDate", e.target.value)}
                className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.orderDate ? "border-red-300" : "border-gray-300"}`}
              />
            </div>

            {/* Expected Delivery */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700">Exp. Delivery</Label>
              <Input
                type="date"
                value={formData.expectedDeliveryDate}
                onChange={(e) => updateFormData("expectedDeliveryDate", e.target.value)}
                className="h-8 text-sm border-2 border-gray-300 bg-gray-50"
              />
            </div>

            {/* Movement Number */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700">Movement #</Label>
              <Input value={movementId} readOnly className="h-8 text-sm border-2 border-gray-200 bg-gray-100 font-mono" />
            </div>

            {/* Ordered By */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Ordered By <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select value={formData.orderedBy} onValueChange={(value) => updateFormData("orderedBy", value)}>
                <SelectTrigger className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.orderedBy ? "border-red-300" : "border-gray-300"}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {activePersonnel.map((person) => (
                    <SelectItem key={person} value={person.toLowerCase().replace(/\s+/g, "-")}>{person}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Verified By */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Verified By <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select value={formData.verifiedBy} onValueChange={(value) => updateFormData("verifiedBy", value)}>
                <SelectTrigger className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.verifiedBy ? "border-red-300" : "border-gray-300"}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {activePersonnel.map((person) => (
                    <SelectItem key={person} value={person.toLowerCase().replace(/\s+/g, "-")}>{person}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mixed By */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Mixed By <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select value={formData.mixedBy} onValueChange={(value) => updateFormData("mixedBy", value)}>
                <SelectTrigger className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.mixedBy ? "border-red-300" : "border-gray-300"}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {activePersonnel.map((person) => (
                    <SelectItem key={person} value={person.toLowerCase().replace(/\s+/g, "-")}>{person}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mud Specifications */}
      <Card className="shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-slate-700 to-slate-800 text-white rounded-t-lg py-2 px-4">
          <CardTitle className="flex items-center gap-2 text-base">
            <Beaker className="h-4 w-4 text-amber-400" />
            <span>Mud Specifications</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {/* Barrels Mixed */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                BBLs Mixed <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.bblsMixed}
                onChange={(e) => updateFormData("bblsMixed", e.target.value)}
                className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.bblsMixed ? "border-red-300" : "border-gray-300"}`}
              />
            </div>

            {/* Fluid Type */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Fluid Type <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select value={formData.fluidType} onValueChange={(value) => updateFormData("fluidType", value)}>
                <SelectTrigger className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.fluidType ? "border-red-300" : "border-gray-300"}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {activeFluidTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(/\s+/g, "-")}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Mud Weight */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Mud Wt (ppg) <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                type="number"
                step="0.1"
                placeholder="0.0"
                value={formData.mudWeight}
                onChange={(e) => updateFormData("mudWeight", e.target.value)}
                className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.mudWeight ? "border-red-300" : "border-gray-300"}`}
              />
            </div>

            {/* Viscosity */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Viscosity (cP) <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.viscosity}
                onChange={(e) => updateFormData("viscosity", e.target.value)}
                className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.viscosity ? "border-red-300" : "border-gray-300"}`}
              />
            </div>

            {/* Temperature */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                <Thermometer className="h-3 w-3 mr-1" />
                Temp (F) <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                type="number"
                placeholder="0"
                value={formData.temp}
                onChange={(e) => updateFormData("temp", e.target.value)}
                className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.temp ? "border-red-300" : "border-gray-300"}`}
              />
            </div>

            {/* Operator */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Operator <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select value={formData.operator} onValueChange={(value) => updateFormData("operator", value)}>
                <SelectTrigger className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.operator ? "border-red-300" : "border-gray-300"}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {activeOperators.map((operator) => (
                    <SelectItem key={operator} value={operator.toLowerCase().replace(/\s+/g, "-")}>{operator}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Well Name */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                Well Name <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Input
                placeholder="Enter well..."
                value={formData.wellName}
                onChange={(e) => updateFormData("wellName", e.target.value)}
                className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.wellName ? "border-red-300" : "border-gray-300"}`}
              />
            </div>

            {/* Delivered To */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                Delivered To <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select value={formData.deliveredTo} onValueChange={(value) => updateFormData("deliveredTo", value)}>
                <SelectTrigger className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.deliveredTo ? "border-red-300" : "border-gray-300"}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {activeWarehouses.map((warehouse) => (
                    <SelectItem key={warehouse} value={warehouse.toLowerCase().replace(/\s+/g, "-")}>{warehouse}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Delivered By */}
            <div className="space-y-1">
              <Label className="text-xs font-semibold text-gray-700 flex items-center">
                <Truck className="h-3 w-3 mr-1" />
                Delivered By <span className="text-red-500 ml-0.5">*</span>
              </Label>
              <Select value={formData.deliveredBy} onValueChange={(value) => updateFormData("deliveredBy", value)}>
                <SelectTrigger className={`h-8 text-sm border-2 bg-gray-50 ${validationErrors.deliveredBy ? "border-red-300" : "border-gray-300"}`}>
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {activeDeliveryCompanies.map((company) => (
                    <SelectItem key={company} value={company.toLowerCase().replace(/\s+/g, "-")}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Notes - spans remaining columns */}
            <div className="space-y-1 col-span-2 md:col-span-2 lg:col-span-3">
              <Label className="text-xs font-semibold text-gray-700">Notes</Label>
              <Textarea
                placeholder="Additional notes..."
                value={formData.notes}
                onChange={(e) => updateFormData("notes", e.target.value)}
                className="h-8 min-h-[32px] text-sm border-2 border-gray-300 bg-gray-50 resize-none"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Section */}
      <Card className="shadow-md border-0">
        <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-t-lg py-2 px-4">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <Package className="h-4 w-4 text-amber-400" />
              <span>Mix Items</span>
            </CardTitle>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30 text-xs">
                {validItemsCount} items
              </Badge>
              <Button onClick={addItem} size="sm" className="bg-amber-600 hover:bg-amber-700 text-white h-7 text-xs">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-3">
          {validationErrors.items && (
            <Alert variant="destructive" className="mb-2 py-1.5 border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="text-red-800 text-xs">{validationErrors.items}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-1.5">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-2 py-1 bg-gray-100 rounded text-xs font-semibold text-gray-700">
              <div className="col-span-1">ID</div>
              <div className="col-span-4">Product</div>
              <div className="col-span-2">Unit</div>
              <div className="col-span-1">Wt/Unit</div>
              <div className="col-span-2">Qty</div>
              <div className="col-span-1">Total Wt</div>
              <div className="col-span-1"></div>
            </div>

            {/* Items - Compact rows */}
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 p-2 bg-white rounded border border-gray-100 hover:border-amber-200 items-center">
                <div className="col-span-1">
                  <Input value={item.productId} readOnly className="h-7 text-xs border border-gray-200 bg-gray-50 text-center" />
                </div>
                <div className="col-span-4">
                  <Select value={item.product} onValueChange={(value) => updateItem(item.id, "product", value)}>
                    <SelectTrigger className="h-7 text-xs border border-gray-200 bg-gray-50">
                      <SelectValue placeholder="Select product..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {activeProducts.map((product) => (
                        <SelectItem key={product} value={product.toLowerCase().replace(/\s+/g, "-")} className="text-xs">{product}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2">
                  <Input value={item.unit} readOnly className="h-7 text-xs border border-gray-200 bg-gray-50 text-center" />
                </div>
                <div className="col-span-1">
                  <Input value={item.unitWeight.toLocaleString()} readOnly className="h-7 text-xs border border-gray-200 bg-gray-50 text-center" />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="0"
                    value={item.quantity || ""}
                    onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                    className="h-7 text-xs border border-gray-200 bg-white text-center"
                    placeholder="0"
                  />
                </div>
                <div className="col-span-1">
                  <Input value={item.itemWeight.toLocaleString()} readOnly className="h-7 text-xs border border-gray-200 bg-gray-50 text-center font-medium" />
                </div>
                <div className="col-span-1 flex justify-center">
                  {items.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id)} className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50">
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {/* Total Weight Footer */}
            <div className="flex justify-end pt-2 border-t border-gray-200">
              <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded">
                <Calculator className="h-4 w-4 text-slate-600" />
                <span className="text-sm font-semibold text-slate-700">Total Weight:</span>
                <span className="text-sm font-bold text-slate-900">{calculateTotalWeight().toLocaleString()} lbs</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
