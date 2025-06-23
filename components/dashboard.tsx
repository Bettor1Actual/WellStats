"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, ChevronLeft, ChevronRight, Filter, X } from "lucide-react"

interface ActivityLog {
  type: "Create" | "Update" | "Delete"
  movement: "Transfer" | "Receiver" | "Mud Mix" | "Invoice"
  message: string
  timestamp: string
}

const activityData: ActivityLog[] = [
  { type: "Create", movement: "Transfer", message: "Created Transfer: #8932", timestamp: "2025-05-28 14:32:15" },
  { type: "Create", movement: "Invoice", message: "Created Movement: #16959", timestamp: "2025-05-28 14:28:42" },
  { type: "Update", movement: "Transfer", message: "Updated Transfer: #8931", timestamp: "2025-05-28 14:15:33" },
  { type: "Update", movement: "Receiver", message: "Updated Receiver: #6444", timestamp: "2025-05-28 13:45:21" },
  { type: "Create", movement: "Receiver", message: "Created Receiver: #6444", timestamp: "2025-05-28 13:22:18" },
  { type: "Create", movement: "Invoice", message: "Created Movement: #16958", timestamp: "2025-05-28 12:58:07" },
  { type: "Delete", movement: "Invoice", message: "Removed Movement: #16957", timestamp: "2025-05-28 12:34:55" },
  { type: "Create", movement: "Invoice", message: "Created Movement: #16957", timestamp: "2025-05-28 11:47:12" },
  { type: "Create", movement: "Transfer", message: "Created Transfer: #8931", timestamp: "2025-05-28 11:23:44" },
  { type: "Create", movement: "Invoice", message: "Created Movement: #16956", timestamp: "2025-05-28 10:56:33" },
  { type: "Update", movement: "Mud Mix", message: "Updated MudMix: #1216", timestamp: "2025-05-28 10:32:21" },
  { type: "Update", movement: "Mud Mix", message: "Updated MudMix: #1215", timestamp: "2025-05-28 10:18:09" },
  { type: "Update", movement: "Mud Mix", message: "Updated MudMix: #1214", timestamp: "2025-05-28 09:54:37" },
  { type: "Update", movement: "Mud Mix", message: "Updated MudMix: #1213", timestamp: "2025-05-28 09:31:25" },
  { type: "Update", movement: "Mud Mix", message: "Updated MudMix: #1212", timestamp: "2025-05-28 09:07:13" },
  { type: "Update", movement: "Transfer", message: "Updated Transfer: #8930", timestamp: "2025-05-28 08:43:01" },
  { type: "Update", movement: "Transfer", message: "Updated Transfer: #8929", timestamp: "2025-05-28 08:19:49" },
  { type: "Update", movement: "Transfer", message: "Updated Transfer: #8928", timestamp: "2025-05-28 07:56:37" },
  { type: "Create", movement: "Transfer", message: "Created Transfer: #8930", timestamp: "2025-05-28 07:32:25" },
  { type: "Create", movement: "Invoice", message: "Created Movement: #16955", timestamp: "2025-05-28 07:08:13" },
]

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState<string>("all")
  const [movementFilter, setMovementFilter] = useState<string>("all")

  const filteredData = activityData.filter((item) => {
    const matchesSearch =
      item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.movement.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.timestamp.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === "all" || item.type === typeFilter
    const matchesMovement = movementFilter === "all" || item.movement === movementFilter

    return matchesSearch && matchesType && matchesMovement
  })

  const totalPages = Math.ceil(filteredData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = filteredData.slice(startIndex, endIndex)

  const handleDownloadCSV = () => {
    const csvContent = [
      ["Type", "Movement", "Message", "Timestamp"],
      ...filteredData.map((item) => [item.type, item.movement, item.message, item.timestamp]),
    ]
      .map((row) => row.map((field) => `"${field}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "activity_log.csv"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "create":
        return "text-green-900 bg-green-200 px-2 py-1 rounded-full text-xs font-medium border border-green-300"
      case "update":
        return "text-yellow-900 bg-yellow-200 px-2 py-1 rounded-full text-xs font-medium border border-yellow-300"
      case "delete":
        return "text-red-900 bg-red-200 px-2 py-1 rounded-full text-xs font-medium border border-red-300"
      default:
        return "text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium"
    }
  }

  const getMovementColor = (movement: string) => {
    switch (movement.toLowerCase()) {
      case "transfer":
        return "text-blue-900 bg-blue-200 px-2 py-1 rounded-full text-xs font-medium border border-blue-300"
      case "receiver":
        return "text-indigo-900 bg-indigo-200 px-2 py-1 rounded-full text-xs font-medium border border-indigo-300"
      case "mud mix":
        return "text-orange-900 bg-orange-200 px-2 py-1 rounded-full text-xs font-medium border border-orange-300"
      case "invoice":
        return "text-gray-900 bg-gray-200 px-2 py-1 rounded-full text-xs font-medium border border-gray-300"
      default:
        return "text-gray-600 bg-gray-50 px-2 py-1 rounded-full text-xs font-medium"
    }
  }

  const clearFilters = () => {
    setTypeFilter("all")
    setMovementFilter("all")
    setSearchTerm("")
    setCurrentPage(1)
  }

  const hasActiveFilters = typeFilter !== "all" || movementFilter !== "all" || searchTerm !== ""

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <Button onClick={handleDownloadCSV} className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Activity</CardTitle>
            <div className="flex items-center gap-4">
              {/* Filters */}
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Create">Create</SelectItem>
                    <SelectItem value="Update">Update</SelectItem>
                    <SelectItem value="Delete">Delete</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={movementFilter} onValueChange={setMovementFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Movement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Movements</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="Receiver">Receiver</SelectItem>
                    <SelectItem value="Mud Mix">Mud Mix</SelectItem>
                    <SelectItem value="Invoice">Invoice</SelectItem>
                  </SelectContent>
                </Select>

                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1">
                    <X className="h-3 w-3" />
                    Clear
                  </Button>
                )}
              </div>

              <Input
                placeholder="Search activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
          {hasActiveFilters && (
            <div className="text-sm text-gray-600">
              Showing {filteredData.length} of {activityData.length} activities
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 font-medium text-gray-700 border-b pb-2">
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Movement</div>
              <div className="col-span-5">Message</div>
              <div className="col-span-3">Timestamp</div>
            </div>

            {/* Table Rows */}
            {currentData.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-12 gap-4 py-2 border-b border-gray-100 last:border-b-0 items-center"
              >
                <div className="col-span-2">
                  <span className={getTypeColor(item.type)}>{item.type}</span>
                </div>
                <div className="col-span-2">
                  <span className={getMovementColor(item.movement)}>{item.movement}</span>
                </div>
                <div className="col-span-5 text-gray-900">{item.message}</div>
                <div className="col-span-3 text-sm text-gray-500 font-mono">{item.timestamp}</div>
              </div>
            ))}

            {currentData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {hasActiveFilters ? "No activity found matching your filters." : "No activity found."}
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Page Size</span>
              <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                <SelectTrigger className="w-20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
                First
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Prev
              </Button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, currentPage - 2)) + i
                if (pageNum <= totalPages) {
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8"
                    >
                      {pageNum}
                    </Button>
                  )
                }
                return null
              })}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                Last
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
