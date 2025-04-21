import { Search, Filter, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="p-4 flex items-center justify-between border-b">
      <div className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search your school here..."
            className="w-[93%] pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <Button variant="outline" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2 ">
            <Filter className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
    </header>
  )
}
