"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useState } from "react";
//shadcn
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Loading from "@/components/Loading";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router";


const formSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

const Login = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();

    if (loading) { return <Loading /> };
    if (error) { return <div className="error-message">{error}</div> };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
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
    }

    return (
        <>
            <h1 className="my-3">Login</h1>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
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
                                    <Input placeholder="Password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Login</Button>
                </form>
                <div className="login-navigation text-center text-xs">
                    Don't have an account? <Link className='text-decoration-line: underline' to="/signup">Sign Up</Link>
                </div>
            </Form>
        </>
    );
};

export default Login;