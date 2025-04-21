import { Badge } from "@/components/ui/badge"

interface Teacher {
  id: number
  name: string
  date: string
  initials: string
  courseType: string
  schoolName: string
}

export function TeachersSection() {
  const teachers: Teacher[] = [
    {
      id: 1,
      name: "Ahmed Solomon",
      date: "25/2/2023",
      initials: "AS",
      courseType: "SCIENCE",
      schoolName: "DandiBoru",
    },
    {
      id: 2,
      name: "Hilina Teshome",
      date: "25/2/2023",
      initials: "HT",
      courseType: "SOCIAL SCIENCE",
      schoolName: "Addis Internation School",
    },
  ]

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Teachers</h2>
      <div className="text-xs text-gray-500 uppercase mb-2">Instructor Name & Date</div>
      <div className="space-y-4">
        {teachers.map((teacher) => (
          <div key={teacher.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs">{teacher.initials}</span>
                </div>
                <div>
                  <div className="font-medium">{teacher.name}</div>
                  <div className="text-xs text-gray-500">{teacher.date}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">{teacher.courseType}</Badge>
                <div className="text-sm">{teacher.schoolName}</div>
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">CONTACT</Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
