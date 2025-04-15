import userInterface from "@/types/userInterface";

//const BACK_URL = import.meta.env.VITE_API_URL_BACK;
//const DEV_BACK_URL = import.meta.env.VITE_DEV_BACK_URL;


//get

//post
export const addUser = (user: userInterface) => {
    console.log("Username:", user.username);
    console.log("Email:", user.email);
    console.log("Password:", user.password);
};


