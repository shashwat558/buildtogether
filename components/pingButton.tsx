import UsePingWebSocket from "@/hooks/useWebSocket";
import { useSession } from "next-auth/react";

const PingButton = ({ receiverId }: { receiverId: string }) => {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    if (!userId) {
        console.error("User ID is undefined in PingButton.");
        return null;
    }

    if (userId === receiverId) {
        console.warn("User is trying to ping themselves, hiding button.");
        return null; // Hide button if the user tries to ping themselves
    }

    const { sendPing } = UsePingWebSocket({ userId });

    return <button onClick={() => sendPing(receiverId)}>Ping</button>;
};

export default PingButton;