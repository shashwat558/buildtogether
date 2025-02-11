import { useSession } from "next-auth/react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import UsePingWebSocket from "@/hooks/useWebSocket"

const PingButton = ({ receiverId , projectId, projectName, senderName}: { receiverId: string, projectId: string, projectName: string, senderName: string}) => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  if (!userId) {
    console.error("User ID is undefined in PingButton.")
    return null
  }

  if (userId === receiverId) {
    console.warn("User is trying to ping themselves, hiding button.")
    return null // Hide button if the user tries to ping themselves
  }

  const { sendPing } = UsePingWebSocket({ userId })

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => sendPing({receiverId, projectId, projectName, senderName})}
      className="flex items-center space-x-2 bg-primary text-primary-foreground "
    >
      <Bell className="h-4 w-4 hover:text-yellow-500" />
      <span>Ping</span>
    </Button>
  )
}

export default PingButton

