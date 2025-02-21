import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

const checkCookies = (context) => {
    const userName = context.req
        ? Cookies.get('farmer_database_userName', { headers: context.req.headers })
        : Cookies.get('farmer_database_userName');
    const ulb = context.req ? Cookies.get('farmer_database_ulb', { headers: context.req.headers }) : Cookies.get('farmer_database_ulb');
    return { userName, ulb };
};

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router = useRouter();

        useEffect(() => {
            const { userName, ulb } = checkCookies({ req: typeof window === 'undefined' ? ctx.req : undefined });
            // Check if cookies are available, and if not, redirect to the login page
            if ((!userName && !router.pathname.includes('/login')) || !ulb) {
                router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    // Set a display name for the returned component (useful for debugging and error handling)
    AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

    return AuthComponent;
};

export default withAuth;