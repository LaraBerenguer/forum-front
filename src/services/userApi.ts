import userInterface from "@/types/userInterface";

//const BACK_URL = import.meta.env.VITE_API_URL_BACK;
const DEV_BACK_URL = import.meta.env.VITE_DEV_BACK_URL || "http://localhost:4000";


//get
export const getUserById = async (id: number) => {
    try {
        const token = "mocktoken123";
        const response = await fetch(`${DEV_BACK_URL}/api/users/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        };

        const data = await response.json();
        console.log("GET:", data);

        return data;

    } catch (error) {
        console.error('Error fetching characters', error);
        throw error;
    }
}

//post
export const addUser = async (user: userInterface) => {
    try {
        const token = "mocktoken123";
        const response = await fetch(`${DEV_BACK_URL}/api/users/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token ? `Bearer ${token}` : ''
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


