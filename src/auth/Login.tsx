"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";
import Loading from "@/components/Loading";


const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    const { register, handleSubmit, formState: { errors }, } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const handleLogin = (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            login(values.email, values.password);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error instanceof Error ? error.message : 'An error occurred');
        };
    };

    if (loading) { return <Loading /> };
    if (error) { return <div className="error-message">{error}</div> };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-2xl font-semibold mb-6 text-center">Login</h1>

            <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder="Email"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                        placeholder="Password"
                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full bg-lime-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
                >
                    Login
                </button>
            </form>

            <div className="text-center text-gray-500 text-sm mt-4">
                Don't have an account?{" "}
                <Link to="/signup" className="text-lime-600 underline hover:text-green-700">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;