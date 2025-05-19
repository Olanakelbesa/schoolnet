import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PeopleOutline } from "@mui/icons-material";

interface ParentConnectionsCardProps {
  count: number;
  avatars?: Array<{
    profilepic: string;
    src?: string;
    alt: string;
    fallback: string;
  }>;
}

export function ParentConnectionsCard({
  count,
  avatars = [],
}: ParentConnectionsCardProps) {
  // Limit to 3 avatars max
  const displayAvatars = avatars.slice(0, 3);

  return (
    <Card className="flex flex-col justify-between bg-[#b188e3]/10 shadow-md shadow-[#b188e3]/30 ">
      <div className="w-full flex justify-between pr-8">
        <CardHeader className="pb-2 w-full ">
          <CardDescription className="text-sm text-[#5a3b82]">
            Connections
          </CardDescription>
          <CardTitle className="text-lg text-[#5a3b82]">
            Parent Connections
          </CardTitle>
        </CardHeader>
        <div className="bg-[#B188E3]/10 rounded-full p-2 w-10 h-10 flex justify-center items-center ">
          <PeopleOutline className="text-[#B188E3]" />
        </div>
      </div>

      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">People</div>
            <div className="text-xl font-semibold">{count}</div>
          </div>
          <div className="flex -space-x-2">
            {displayAvatars.length > 0 ? (
              displayAvatars.map((avatar, index) => (
                <Avatar key={index} className="border-2 border-white">
                  <AvatarImage src={avatar.profilepic} alt={avatar.alt} />
                  <AvatarFallback>{avatar.fallback}</AvatarFallback>
                </Avatar>
              ))
            ) : (
              <>
                <Avatar className="border-2 border-white">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>U1</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>U2</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-white">
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="User"
                  />
                  <AvatarFallback>U3</AvatarFallback>
                </Avatar>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
