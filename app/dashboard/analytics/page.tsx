"use client";

import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { School, Users, GraduationCap, TrendingUp } from "lucide-react";

const performanceData = [
  { name: "Jan", score: 75 },
  { name: "Feb", score: 82 },
  { name: "Mar", score: 78 },
  { name: "Apr", score: 85 },
  { name: "May", score: 88 },
  { name: "Jun", score: 90 },
];

const enrollmentData = [
  { name: "2020", students: 400 },
  { name: "2021", students: 450 },
  { name: "2022", students: 500 },
  { name: "2023", students: 550 },
];

const gradeDistribution = [
  { name: "A", value: 30 },
  { name: "B", value: 40 },
  { name: "C", value: 20 },
  { name: "D", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        School Analytics
      </h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Students</p>
              <h3 className="text-2xl font-bold">1,234</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+12% from last year</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Score</p>
              <h3 className="text-2xl font-bold">85%</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <GraduationCap className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+5% from last year</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Schools</p>
              <h3 className="text-2xl font-bold">24</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <School className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+2 from last year</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Growth Rate</p>
              <h3 className="text-2xl font-bold">15%</h3>
            </div>
            <div className="p-3 bg-orange-100 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <p className="text-sm text-green-600 mt-2">+3% from last year</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Enrollment Growth */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Enrollment Growth</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={enrollmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="students" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Grade Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Grade Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* School Comparison */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">School Comparison</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: "School A", score: 85 },
                  { name: "School B", score: 78 },
                  { name: "School C", score: 92 },
                  { name: "School D", score: 88 },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            Top Performing Subjects
          </h3>
          <div className="space-y-4">
            {[
              { subject: "Mathematics", score: 92 },
              { subject: "Science", score: 88 },
              { subject: "English", score: 85 },
              { subject: "History", score: 82 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{item.subject}</span>
                <div className="flex items-center">
                  <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-2 bg-purple-600 rounded-full"
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{item.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Student Demographics</h3>
          <div className="space-y-4">
            {[
              { category: "Gender", male: 52, female: 48 },
              { category: "Age Groups", junior: 35, senior: 65 },
              { category: "Ethnicity", diverse: 40, local: 60 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>{item.category}</span>
                </div>
                <div className="flex h-2 bg-gray-200 rounded-full">
                  <div
                    className="bg-purple-600 rounded-l-full"
                    style={{
                      width: `${item.male || item.junior || item.diverse}%`,
                    }}
                  />
                  <div
                    className="bg-blue-600 rounded-r-full"
                    style={{
                      width: `${item.female || item.senior || item.local}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>
                    {item.male || item.junior || item.diverse}%{" "}
                    {item.category === "Gender"
                      ? "Male"
                      : item.category === "Age Groups"
                      ? "Junior"
                      : "Diverse"}
                  </span>
                  <span>
                    {item.female || item.senior || item.local}%{" "}
                    {item.category === "Gender"
                      ? "Female"
                      : item.category === "Age Groups"
                      ? "Senior"
                      : "Local"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
