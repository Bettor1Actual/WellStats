"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Search } from "lucide-react"
import { materialData } from "../data/material-data"
import DropdownManager from "../components/dropdown-manager"
import MaterialMovementForm from "../components/material-movement-form"
import CreateTransferForm from "../components/create-transfer-form"
import CreateReceiverForm from "../components/create-receiver-form"
import CreateInvoiceForm from "../components/create-invoice-form"
import { useToast } from "@/hooks/use-toast"
import Dashboard from "../components/dashboard"
import CreateMudMixForm from "../components/create-mud-mix-form"

export default function MainPage() {
  const { toast } = useToast()
  const [activeView, setActiveView] = useState<
    "dashboard" | "transfer" | "receiver" | "material-movement" | "dropdown-manager" | "invoice" | "mud-mix"
  >("dashboard")

  // State for active dropdown options
  const [activeWarehouses, setActiveWarehouses] = useState<string[]>(materialData.sourceWarehouses)
  const [activeDeliveryCompanies, setActiveDeliveryCompanies] = useState<string[]>(materialData.deliveredBy)
  const [activeProducts, setActiveProducts] = useState<string[]>(materialData.products)
  const [activePersonnel, setActivePersonnel] = useState<string[]>(materialData.verifiedBy)
  const [activeOperators, setActiveOperators] = useState<string[]>(materialData.operators)
  const [activeFluidTypes, setActiveFluidTypes] = useState<string[]>(materialData.fluidTypes)

  const handleSaveDropdownChanges = (
    warehouses: string[],
    deliveryCompanies: string[],
    products: string[],
    personnel: string[],
    operators: string[],
    fluidTypes: string[],
  ) => {
    setActiveWarehouses(warehouses)
    setActiveDeliveryCompanies(deliveryCompanies)
    setActiveProducts(products)
    setActivePersonnel(personnel)
    setActiveOperators(operators)
    setActiveFluidTypes(fluidTypes)
    setActiveView("transfer")

    toast({
      title: "Dropdown options updated",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-slate-700">GEO</span>
                <span className="text-sm text-gray-500 ml-1">Drilling Fluids, Inc.</span>
              </div>

              <nav className="flex space-x-6">
                <button onClick={() => setActiveView("dashboard")} className="text-gray-600 hover:text-gray-900">
                  Dashboard
                </button>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900">
                    Tracking Forms
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setActiveView("transfer")}>Create Transfer</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveView("receiver")}>Create Receiver</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveView("mud-mix")}>Create Mud Mix</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveView("invoice")}>Create Invoice</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900">
                    Reports
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Monthly Reports</DropdownMenuItem>
                    <DropdownMenuItem>Inventory Reports</DropdownMenuItem>
                    <DropdownMenuItem>Usage Analytics</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </div>

            {/* Search and User */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input type="text" placeholder="Search..." className="pl-10 w-64" />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-gray-600 hover:text-gray-900">
                  Chris Tisler
                  <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setActiveView("dropdown-manager")}>Edit Dropdowns</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {activeView === "dropdown-manager" ? (
          <DropdownManager
            onBack={() => setActiveView("transfer")}
            onSave={handleSaveDropdownChanges}
            initialWarehouses={activeWarehouses}
            initialDeliveryCompanies={activeDeliveryCompanies}
            initialProducts={activeProducts}
            initialPersonnel={activePersonnel}
            initialOperators={activeOperators}
            initialFluidTypes={activeFluidTypes}
          />
        ) : activeView === "material-movement" ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">Material Movement</h1>
            <MaterialMovementForm
              activeWarehouses={activeWarehouses}
              activeDeliveryCompanies={activeDeliveryCompanies}
              activeProducts={activeProducts}
              activePersonnel={activePersonnel}
              activeOperators={activeOperators}
              activeFluidTypes={activeFluidTypes}
            />
          </>
        ) : activeView === "dashboard" ? (
          <Dashboard />
        ) : activeView === "invoice" ? (
          <CreateInvoiceForm />
        ) : activeView === "receiver" ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">New Receiver</h1>
            <CreateReceiverForm
              activeWarehouses={activeWarehouses}
              activeDeliveryCompanies={activeDeliveryCompanies}
              activeProducts={activeProducts}
              activePersonnel={activePersonnel}
              activeOperators={activeOperators}
              activeFluidTypes={activeFluidTypes}
            />
          </>
        ) : activeView === "mud-mix" ? (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">New Mud Mix</h1>
            <CreateMudMixForm
              activeWarehouses={activeWarehouses}
              activeDeliveryCompanies={activeDeliveryCompanies}
              activeProducts={activeProducts}
              activePersonnel={activePersonnel}
              activeOperators={activeOperators}
              activeFluidTypes={activeFluidTypes}
            />
          </>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-900 mb-4">New Transfer</h1>
            <CreateTransferForm
              activeWarehouses={activeWarehouses}
              activeDeliveryCompanies={activeDeliveryCompanies}
              activeProducts={activeProducts}
              activePersonnel={activePersonnel}
              activeOperators={activeOperators}
              activeFluidTypes={activeFluidTypes}
            />
          </>
        )}
      </main>
    </div>
  )
}
