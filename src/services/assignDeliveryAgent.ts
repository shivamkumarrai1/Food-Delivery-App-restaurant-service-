import axios from "axios";

export const assignDeliveryAgent = async (): Promise<number | null> => {
    try {
        const response = await axios.post("http://localhost:4000/agents/assign");
        return response.data.agentId || null;
    } catch (error) {
        console.error("Failed to assign delivery agent:", error);
        return null;
    }
};