"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useState } from "react";
import { addUser } from "../services/userApi"
import Loading from "@/components/Loading";
import { Link } from "react-router";


const formSchema = z.object({
    username: z.string().min(2, { message: "Username must be at least 2 characters" }).max(50),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const Signup = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    const { handleSubmit, register, formState: { errors } } = form;

    const handleSignup = (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            addUser(values);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error instanceof Error ? error.message : 'An error occurred');
        };
    }

    if (loading) { return <Loading /> };
    if (error) { return <div className="error-message">{error}</div> };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">Sign Up</h1>
            <form onSubmit={handleSubmit(handleSignup)} className="space-y-6">            
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="username">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Username"
                        {...register("username")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <button type="submit" className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors">
                    Sign Up
                </button>
            </form>

            <div className="text-center text-gray-500 text-sm mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-lime-500 underline hover:text-green-500">
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Signup;