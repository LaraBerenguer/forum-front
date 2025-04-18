"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useState } from "react";
import { addUser } from "../services/userApi"
//shadcn
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
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

    if (loading) { return <Loading /> };
    if (error) { return <div className="error-message">{error}</div> };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            password: ""
        },
    });

    const handleSignup = (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            addUser (values);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error instanceof Error ? error.message : 'An error occurred');
        };
    }

    return (
        <>
            <h1 className="my-3">Sign Up</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSignup)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input placeholder="Username" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Sign Up</Button>
                </form>
                <div className="login-navigation text-center text-xs">
                    Already have an account? <Link className='text-decoration-line: underline' to="/login">Login</Link>
                </div>
            </Form>
        </>
    );
};

export default Signup;