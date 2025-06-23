"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  ArrowLeft,
  Save,
  Loader2,
  CheckSquare,
  Square,
  Filter,
  X,
  Database,
  Truck,
  Package,
  Users,
  Building2,
  Beaker,
} from "lucide-react"
import { materialData } from "../data/material-data"
import { cn } from "@/lib/utils"

interface DropdownManagerProps {
  onBack: () => void
  onSave: (
    warehouses: string[],
    deliveryCompanies: string[],
    products: string[],
    personnel: string[],
    operators: string[],
    fluidTypes: string[],
  ) => void
  initialWarehouses: string[]
  initialDeliveryCompanies: string[]
  initialProducts: string[]
  initialPersonnel: string[]
  initialOperators: string[]
  initialFluidTypes: string[]
}

export default function DropdownManager({
  onBack,
  onSave,
  initialWarehouses,
  initialDeliveryCompanies,
  initialProducts,
  initialPersonnel,
  initialOperators,
  initialFluidTypes,
}: DropdownManagerProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedWarehouses, setSelectedWarehouses] = useState<string[]>(initialWarehouses)
  const [selectedDeliveryCompanies, setSelectedDeliveryCompanies] = useState<string[]>(initialDeliveryCompanies)
  const [selectedProducts, setSelectedProducts] = useState<string[]>(initialProducts)
  const [selectedPersonnel, setSelectedPersonnel] = useState<string[]>(initialPersonnel)
  const [selectedOperators, setSelectedOperators] = useState<string[]>(initialOperators)
  const [selectedFluidTypes, setSelectedFluidTypes] = useState<string[]>(initialFluidTypes)
  const [isSaving, setIsSaving] = useState(false)
  const [activeTab, setActiveTab] = useState("warehouses")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [showSelected, setShowSelected] = useState(false)

  // Calculate selection percentages for progress bars
  const warehousePercentage = (selectedWarehouses.length / materialData.sourceWarehouses.length) * 100
  const deliveryPercentage = (selectedDeliveryCompanies.length / materialData.deliveredBy.length) * 100
  const productPercentage = (selectedProducts.length / materialData.products.length) * 100
  const personnelPercentage = (selectedPersonnel.length / materialData.verifiedBy.length) * 100
  const operatorPercentage = (selectedOperators.length / materialData.operators.length) * 100
  const fluidTypePercentage = (selectedFluidTypes.length / materialData.fluidTypes.length) * 100

  const handleSelectAll = (category: string, items: string[], setSelected: (items: string[]) => void) => {
    setSelected(items)
  }

  const handleDeselectAll = (setSelected: (items: string[]) => void) => {
    setSelected([])
  }

  const handleItemToggle = (item: string, selected: string[], setSelected: (items: string[]) => void) => {
    if (selected.includes(item)) {
      setSelected(selected.filter((i) => i !== item))
    } else {
      setSelected([...selected, item])
    }
  }

  const filterItems = (items: string[]) => {
    let filtered = items

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filter by selection status if needed
    if (showSelected) {
      const selectedItems = getSelectedItemsForCurrentTab()
      filtered = filtered.filter((item) => selectedItems.includes(item))
    }

    // Sort items
    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === "asc") {
        return a.localeCompare(b)
      } else {
        return b.localeCompare(a)
      }
    })

    return filtered
  }

  const getSelectedItemsForCurrentTab = () => {
    switch (activeTab) {
      case "warehouses":
        return selectedWarehouses
      case "delivery":
        return selectedDeliveryCompanies
      case "products":
        return selectedProducts
      case "personnel":
        return selectedPersonnel
      case "operators":
        return selectedOperators
      case "fluid-types":
        return selectedFluidTypes
      default:
        return []
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate save process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)

    // Call onSave directly without showing success overlay
    onSave(
      selectedWarehouses,
      selectedDeliveryCompanies,
      selectedProducts,
      selectedPersonnel,
      selectedOperators,
      selectedFluidTypes,
    )
  }

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc")
  }

  const toggleShowSelected = () => {
    setShowSelected(!showSelected)
  }

  const clearSearch = () => {
    setSearchTerm("")
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "warehouses":
        return <Building2 className="h-4 w-4" />
      case "delivery":
        return <Truck className="h-4 w-4" />
      case "products":
        return <Package className="h-4 w-4" />
      case "personnel":
        return <Users className="h-4 w-4" />
      case "operators":
        return <Database className="h-4 w-4" />
      case "fluid-types":
        return <Beaker className="h-4 w-4" />
      default:
        return null
    }
  }

  const getSelectionCount = (tab: string) => {
    switch (tab) {
      case "warehouses":
        return `${selectedWarehouses.length}/${materialData.sourceWarehouses.length}`
      case "delivery":
        return `${selectedDeliveryCompanies.length}/${materialData.deliveredBy.length}`
      case "products":
        return `${selectedProducts.length}/${materialData.products.length}`
      case "personnel":
        return `${selectedPersonnel.length}/${materialData.verifiedBy.length}`
      case "operators":
        return `${selectedOperators.length}/${materialData.operators.length}`
      case "fluid-types":
        return `${selectedFluidTypes.length}/${materialData.fluidTypes.length}`
      default:
        return ""
    }
  }

  const renderTable = (
    title: string,
    items: string[],
    selectedItems: string[],
    setSelectedItems: (items: string[]) => void,
  ) => {
    const filteredItems = filterItems(items)
    const selectionPercentage = (selectedItems.length / items.length) * 100

    return (
      <Card className="shadow-md border-0">
        <CardHeader className="border-b border-gray-100 py-3 px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div>
                <CardTitle className="flex items-center gap-2 text-base">
                  {getTabIcon(activeTab)}
                  {title}
                </CardTitle>
                <div className="text-xs text-gray-600 flex items-center gap-2 mt-1">
                  <Badge variant={selectedItems.length > 0 ? "default" : "outline"} className="font-normal text-xs">
                    {selectedItems.length} of {items.length} selected
                  </Badge>
                  <Progress value={selectionPercentage} className="w-24 h-1.5" />
                </div>
              </div>

              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 h-3.5 w-3.5" />
                <Input
                  type="text"
                  placeholder={`Search ${title.toLowerCase()}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-8 h-9 text-sm border border-gray-200 focus:border-blue-500"
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearSearch}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-5 w-5 p-0"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={toggleSortOrder}
                className={cn("h-8 w-8 p-0", sortOrder === "desc" && "bg-gray-100")}
                title={sortOrder === "asc" ? "Sort Z-A" : "Sort A-Z"}
              >
                {sortOrder === "asc" ? "A→Z" : "Z→A"}
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={toggleShowSelected}
                className={cn("h-8 w-8 p-0", showSelected && "bg-slate-50 border border-slate-200 text-slate-700")}
                title={showSelected ? "Show all items" : "Show only selected items"}
              >
                <Filter className="h-3.5 w-3.5" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSelectAll(title, items, setSelectedItems)}
                className="h-8 text-xs border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800"
              >
                <CheckSquare className="h-3.5 w-3.5 mr-1" />
                Select All
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeselectAll(setSelectedItems)}
                className="h-8 text-xs border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800"
              >
                <Square className="h-3.5 w-3.5 mr-1" />
                Clear
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-2">
          {filteredItems.length > 0 ? (
            <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-1 custom-scrollbar">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                {filteredItems.map((item) => (
                  <div
                    key={item}
                    className={cn(
                      "flex items-center space-x-1 p-1 rounded-md transition-colors text-sm",
                      selectedItems.includes(item)
                        ? "bg-slate-50 border border-slate-200"
                        : "hover:bg-gray-50 border border-transparent hover:border-gray-200",
                    )}
                  >
                    <Checkbox
                      id={`${title}-${item}`}
                      checked={selectedItems.includes(item)}
                      onCheckedChange={() => handleItemToggle(item, selectedItems, setSelectedItems)}
                      className="h-4 w-4 rounded-sm"
                    />
                    <Label htmlFor={`${title}-${item}`} className="text-sm cursor-pointer flex-1 truncate">
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-8 text-center">
              <div className="max-w-xs">
                <div className="bg-gray-100 rounded-full p-2 mb-3 mx-auto">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <h3 className="text-sm font-medium text-gray-900 mb-1">No items found</h3>
                <p className="text-xs text-gray-500">
                  {showSelected
                    ? "No selected items match your search criteria."
                    : "Try adjusting your search or filters to find what you're looking for."}
                </p>
                {(searchTerm || showSelected) && (
                  <div className="mt-3 flex gap-2 justify-center">
                    {searchTerm && (
                      <Button variant="outline" size="sm" onClick={clearSearch} className="h-7 text-xs">
                        Clear search
                      </Button>
                    )}
                    {showSelected && (
                      <Button variant="outline" size="sm" onClick={toggleShowSelected} className="h-7 text-xs">
                        Show all
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="border-t border-gray-100 bg-gray-50 py-2 px-4 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            {filteredItems.length} of {items.length} items shown
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-white text-xs">
              {selectedItems.length} selected
            </Badge>
            <Progress value={selectionPercentage} className="w-16 h-1.5" />
          </div>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Loading Overlay */}
      {isSaving && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
          <Card className="max-w-sm w-full mx-4 shadow-xl border-0">
            <CardContent className="p-3 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-900">Saving Changes</h3>
                <p className="text-xs text-gray-600">Updating dropdown options...</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-14">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-1.5 h-8" disabled={isSaving}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
              <div className="h-5 w-px bg-gray-300" />
              <h1 className="text-lg font-semibold text-gray-900">Edit Dropdown Options</h1>
            </div>
            <Button
              onClick={handleSave}
              className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-800 text-white h-8"
              disabled={isSaving}
            >
              {isSaving ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Save className="h-3.5 w-3.5" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-2">
        {/* Tabs for Different Categories */}
        <Tabs
          defaultValue="warehouses"
          className="space-y-2"
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value)
            setSearchTerm("")
            setShowSelected(false)
          }}
        >
          <div className="bg-white rounded-md shadow-sm p-1 mb-3">
            <TabsList className="grid w-full grid-cols-6 h-auto">
              {[
                { id: "warehouses", label: "Warehouses", icon: <Building2 className="h-3.5 w-3.5 mr-1.5" /> },
                { id: "delivery", label: "Delivery", icon: <Truck className="h-3.5 w-3.5 mr-1.5" /> },
                { id: "products", label: "Products", icon: <Package className="h-3.5 w-3.5 mr-1.5" /> },
                { id: "personnel", label: "Personnel", icon: <Users className="h-3.5 w-3.5 mr-1.5" /> },
                { id: "operators", label: "Operators", icon: <Database className="h-3.5 w-3.5 mr-1.5" /> },
                { id: "fluid-types", label: "Fluid Types", icon: <Beaker className="h-3.5 w-3.5 mr-1.5" /> },
              ].map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} disabled={isSaving} className="py-1.5 px-2 text-sm relative">
                  <div className="flex items-center">
                    {tab.icon}
                    <span>{tab.label}</span>
                    <Badge
                      variant="secondary"
                      className="ml-1.5 text-xs font-normal bg-gray-100 px-1.5 py-0 h-5 min-w-[36px] flex items-center justify-center"
                    >
                      {getSelectionCount(tab.id)}
                    </Badge>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value="warehouses">
            {renderTable("Source Warehouses", materialData.sourceWarehouses, selectedWarehouses, setSelectedWarehouses)}
          </TabsContent>

          <TabsContent value="delivery">
            {renderTable(
              "Delivery Companies",
              materialData.deliveredBy,
              selectedDeliveryCompanies,
              setSelectedDeliveryCompanies,
            )}
          </TabsContent>

          <TabsContent value="products">
            {renderTable("Products", materialData.products, selectedProducts, setSelectedProducts)}
          </TabsContent>

          <TabsContent value="personnel">
            {renderTable("Personnel", materialData.verifiedBy, selectedPersonnel, setSelectedPersonnel)}
          </TabsContent>

          <TabsContent value="operators">
            {renderTable("Operators", materialData.operators, selectedOperators, setSelectedOperators)}
          </TabsContent>

          <TabsContent value="fluid-types">
            {renderTable("Fluid Types", materialData.fluidTypes, selectedFluidTypes, setSelectedFluidTypes)}
          </TabsContent>
        </Tabs>

        {/* Summary Card */}
        <Card className="mt-2 shadow-md border-0">
          <CardHeader className="bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-t-md py-2 px-4">
            <CardTitle className="flex items-center gap-1.5 text-base">
              <Database className="h-4 w-4" />
              Selection Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2">
            <div className="grid grid-cols-6 gap-2">
              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-900 flex items-center gap-1.5 text-sm">
                    <Building2 className="h-3.5 w-3.5 text-slate-600" />
                    Warehouses
                  </div>
                  <Badge variant={selectedWarehouses.length > 0 ? "default" : "outline"} className="text-xs">
                    {selectedWarehouses.length}
                  </Badge>
                </div>
                <Progress value={warehousePercentage} className="h-1.5" />
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-900 flex items-center gap-1.5 text-sm">
                    <Truck className="h-3.5 w-3.5 text-slate-600" />
                    Delivery
                  </div>
                  <Badge variant={selectedDeliveryCompanies.length > 0 ? "default" : "outline"} className="text-xs">
                    {selectedDeliveryCompanies.length}
                  </Badge>
                </div>
                <Progress value={deliveryPercentage} className="h-1.5" />
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-900 flex items-center gap-1.5 text-sm">
                    <Package className="h-3.5 w-3.5 text-slate-600" />
                    Products
                  </div>
                  <Badge variant={selectedProducts.length > 0 ? "default" : "outline"} className="text-xs">
                    {selectedProducts.length}
                  </Badge>
                </div>
                <Progress value={productPercentage} className="h-1.5" />
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-900 flex items-center gap-1.5 text-sm">
                    <Users className="h-3.5 w-3.5 text-slate-600" />
                    Personnel
                  </div>
                  <Badge variant={selectedPersonnel.length > 0 ? "default" : "outline"} className="text-xs">
                    {selectedPersonnel.length}
                  </Badge>
                </div>
                <Progress value={personnelPercentage} className="h-1.5" />
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-900 flex items-center gap-1.5 text-sm">
                    <Database className="h-3.5 w-3.5 text-slate-600" />
                    Operators
                  </div>
                  <Badge variant={selectedOperators.length > 0 ? "default" : "outline"} className="text-xs">
                    {selectedOperators.length}
                  </Badge>
                </div>
                <Progress value={operatorPercentage} className="h-1.5" />
              </div>

              <div className="space-y-0.5">
                <div className="flex justify-between items-center">
                  <div className="font-medium text-gray-900 flex items-center gap-1.5 text-sm">
                    <Beaker className="h-3.5 w-3.5 text-slate-600" />
                    Fluid Types
                  </div>
                  <Badge variant={selectedFluidTypes.length > 0 ? "default" : "outline"} className="text-xs">
                    {selectedFluidTypes.length}
                  </Badge>
                </div>
                <Progress value={fluidTypePercentage} className="h-1.5" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 border-t border-gray-100 rounded-b-md py-2 px-4">
            <div className="w-full flex justify-end">
              <Button
                onClick={handleSave}
                className="bg-slate-700 hover:bg-slate-800 text-white h-8 text-sm"
                disabled={isSaving}
              >
                {isSaving ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin mr-1.5" />
                ) : (
                  <Save className="h-3.5 w-3.5 mr-1.5" />
                )}
                {isSaving ? "Saving..." : "Save All Changes"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
