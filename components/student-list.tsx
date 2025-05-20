"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import { StudentCard } from "@/components/student-card"

// Sample student data
const students = [
  {
    id: "STU-1001",
    name: "Alex Johnson",
    grade: "10th Grade",
    email: "alex.johnson@school.edu",
    phone: "(555) 123-4567",
    attendance: {
      present: 42,
      absent: 3,
      late: 5,
      total: 50,
    },
    status: "active" as const,
  },
  {
    id: "STU-1002",
    name: "Samantha Lee",
    grade: "11th Grade",
    email: "samantha.lee@school.edu",
    phone: "(555) 234-5678",
    attendance: {
      present: 47,
      absent: 1,
      late: 2,
      total: 50,
    },
    status: "active" as const,
  },
  {
    id: "STU-1003",
    name: "Marcus Williams",
    grade: "9th Grade",
    email: "marcus.williams@school.edu",
    phone: "(555) 345-6789",
    attendance: {
      present: 35,
      absent: 10,
      late: 5,
      total: 50,
    },
    status: "suspended" as const,
  },
]

export function StudentList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <Input
          placeholder="Search students by name, ID, or grade..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-4 text-center">
          <p className="text-lg font-medium">No students found</p>
          <p className="text-sm text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  )
}
