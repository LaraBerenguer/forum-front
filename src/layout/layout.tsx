import { Suspense } from "react";
import { Outlet } from "react-router";
import Loading from "../components/Loading";
import Navbar from "@/components/Navbar";

const Layout = () => {
    return (
        <div>
            <div className="Navbar">
                <Navbar />
            </div>
            <main className="outlet-container">
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default Layout;