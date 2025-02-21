// components/Layout.js
import Head from 'next/head';
import NavBar from './NavBar';

const Layout = ({ children, title }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <header>
                <NavBar />
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
