import { Suspense } from "react";
import { Outlet } from "react-router";
import Loading from "../components/Loading";

const Layout = () => {
    return (
        <div /*className="bg-container"*/>
            <div className="Navbar">
                {/*Navbar Component*/}
            </div>
            <main>
                <Suspense fallback={<Loading />}>
                    <Outlet />
                </Suspense>
            </main>
        </div>
    );
};

export default Layout;