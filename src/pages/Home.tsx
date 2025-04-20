import { Link } from "react-router";

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <section><Link to={"/signup"}>Signup</Link></section>
            <section><Link to={"/login"}>Login</Link></section>
        </>
    );
};

export default Home;