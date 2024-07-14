import React, {ReactNode} from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
    children: ReactNode,
    auth?: unknown
}

const Layout: React.FC<LayoutProps> = ({children}) => {
    let isLogged = localStorage.getItem('isLogged');

    return (
        <>
            <Header isLogged={isLogged}/>
            <main>{children}</main>
            <Footer/>
        </>
    );
};

export default Layout;