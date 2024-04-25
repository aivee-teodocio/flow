import { useEffect } from "react";

const Header = () => {
    const appName = "Flow";

    useEffect(() => {
        document.title = appName;
    }, []);

    return (
        <h1 className=" text-primary-400 text-xl text-center mb-4 font-bold">   {appName} </h1>
    );
}

export default Header;