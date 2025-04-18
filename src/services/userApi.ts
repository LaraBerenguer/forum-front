import userInterface from "@/types/userInterface";

//const BACK_URL = import.meta.env.VITE_API_URL_BACK;
const DEV_BACK_URL = import.meta.env.VITE_DEV_BACK_URL || "http://localhost:4000";

//post
export const addUser = async (user: userInterface) => {
    try {        
        const response = await fetch(`${DEV_BACK_URL}/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'                
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        const data = await response.json();
        console.log("POST:", data);

        return data;

    } catch (error) {
        console.error('Error adding user', error);
        throw error;
    }
};


