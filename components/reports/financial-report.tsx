"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface FinancialReportProps {
  dateRange: string
}

export function FinancialReport({ dateRange }: FinancialReportProps) {
  // Sample data - in a real app, this would come from an API
  const financialData = {
    totalRevenue: 1250000,
    totalExpenses: 980000,
    revenueBySource: {
      "Tuition Fees": 850000,
      Donations: 150000,
      Grants: 200000,
      Other: 50000,
    },
    expensesByCategory: {
      Salaries: 650000,
      Facilities: 150000,
      Materials: 80000,
      Technology: 60000,
      Administration: 40000,
    },
  }

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardHeader className="bg-purple-50">
        <CardTitle className="text-lg text-purple-700">Financial Report</CardTitle>
        <CardDescription>
          {dateRange === "week"
            ? "This Week"
            : dateRange === "month"
              ? "This Month"
              : dateRange === "quarter"
                ? "This Quarter"
                : dateRange === "year"
                  ? "This Year"
                  : "Custom Date Range"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="expenses">Expenses</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-lg bg-green-50 p-4">
                <div className="text-xl font-bold text-green-600">{formatCurrency(financialData.totalRevenue)}</div>
                <div className="text-xs text-gray-500">Total Revenue</div>
              </div>
              <div className="rounded-lg bg-red-50 p-4">
                <div className="text-xl font-bold text-red-600">{formatCurrency(financialData.totalExpenses)}</div>
                <div className="text-xs text-gray-500">Total Expenses</div>
              </div>
            </div>
            <div className="rounded-lg border p-4">
              <h4 className="mb-2 text-sm font-medium">Financial Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Net Income:</span>
                  <span className="font-medium text-green-600">
                    {formatCurrency(financialData.totalRevenue - financialData.totalExpenses)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Profit Margin:</span>
                  <span>
                    {Math.round(
                      ((financialData.totalRevenue - financialData.totalExpenses) / financialData.totalRevenue) * 100,
                    )}
                    %
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Budget Utilization:</span>
                  <span>{Math.round((financialData.totalExpenses / 1000000) * 100)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Cost per Student:</span>
                  <span>{formatCurrency(financialData.totalExpenses / 1250)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="revenue">
            <div className="space-y-4">
              <div className="rounded-lg border p-2 text-center">
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-xl font-bold text-green-600">{formatCurrency(financialData.totalRevenue)}</div>
              </div>
              <div className="space-y-3">
                {Object.entries(financialData.revenueBySource).map(([source, amount]) => (
                  <div key={source} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source}</span>
                      <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-green-100">
                      <div
                        className="h-2 rounded-full bg-green-600"
                        style={{ width: `${(amount / financialData.totalRevenue) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="expenses">
            <div className="space-y-4">
              <div className="rounded-lg border p-2 text-center">
                <div className="text-sm text-gray-500">Total Expenses</div>
                <div className="text-xl font-bold text-red-600">{formatCurrency(financialData.totalExpenses)}</div>
              </div>
              <div className="space-y-3">
                {Object.entries(financialData.expensesByCategory).map(([category, amount]) => (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{category}</span>
                      <span className="text-sm font-medium">{formatCurrency(amount)}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-red-100">
                      <div
                        className="h-2 rounded-full bg-red-600"
                        style={{ width: `${(amount / financialData.totalExpenses) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
