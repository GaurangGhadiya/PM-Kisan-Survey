// customProvider.js
import axios from 'axios';

const customProvider = () => {
    return {
        async signIn({ username, password }) {
            try {
                // Make a request to your server's authentication endpoint
                // const response = await axios.post('http://himstaging1.hp.gov.in/urban-dept/signIn', {
                //     username,
                //     password,
                // });

                // const user = response.data; // User data from your server

                if (user) {
                    return Promise.resolve(user);
                } else {
                    return Promise.resolve(null); // Authentication failed
                }
            } catch (error) {
                console.error('Authentication error:', error);
                return Promise.resolve(null); // Handle error and return null for failed authentication
            }
        },
        // Other methods as needed
    };
};

export default customProvider;
