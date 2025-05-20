"use client";

import { useState } from "react";
import {
  Calendar,
  ChevronDown,
  Mail,
  MoreHorizontal,
  Phone,
  UserCheck,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface StudentCardProps {
  student: {
    id: string;
    name: string;
    grade: string;
    email?: string;
    phone?: string;
    avatar?: string;
    attendance: {
      present: number;
      absent: number;
      late: number;
      total: number;
    };
    status: "active" | "inactive" | "suspended";
  };
}

export function StudentCard({ student }: StudentCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Calculate attendance percentage
  const attendancePercentage = Math.round(
    (student.attendance.present / student.attendance.total) * 100
  );

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  // Status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "inactive":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "suspended":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-purple-50 pb-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-white">
              <AvatarImage
                src={student.avatar || "/placeholder.svg?height=48&width=48"}
                alt={student.name}
              />
              <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{student.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>ID: {student.id}</span>
                <span>•</span>
                <span>Grade: {student.grade}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${getStatusColor(student.status)}`}>
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Send Message</DropdownMenuItem>
                <DropdownMenuItem>Edit Information</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  Report Issue
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-sm font-medium">Attendance</span>
            <span className="text-sm font-medium">{attendancePercentage}%</span>
          </div>
          <Progress
            value={attendancePercentage}
            className="h-2 bg-purple-100"
          />
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Present: {student.attendance.present}</span>
            <span>Absent: {student.attendance.absent}</span>
            <span>Late: {student.attendance.late}</span>
          </div>
        </div>

        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex w-full items-center justify-center gap-1 text-xs text-gray-500"
            >
              {isOpen ? "Show less" : "Show more"}
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="mt-2 space-y-2 text-sm">
              {student.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{student.email}</span>
                </div>
              )}
              {student.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{student.phone}</span>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
      <CardFooter className="flex justify-between border-t bg-gray-50 px-4 py-2">
        <Button variant="outline" size="sm" className="text-xs">
          <Calendar className="mr-1 h-3 w-3" />
          Schedule
        </Button>
        <Button variant="outline" size="sm" className="text-xs">
          <UserCheck className="mr-1 h-3 w-3" />
          Attendance
        </Button>
        <Button size="sm" className="bg-purple-600 text-xs hover:bg-purple-700">
          <Mail className="mr-1 h-3 w-3" />
          Message
        </Button>
      </CardFooter>
    </Card>
  );
}
