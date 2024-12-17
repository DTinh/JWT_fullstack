import React, { useState, useEffect } from 'react'
import { getUserAccount } from '../services/apiServices';

const UserContext = React.createContext(null);
const UserProvider = ({ children }) => {
    // User is the name of the "data" that gets stored in context
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(userDefault);

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false })
    };

    // Logout updates the user data to default
    const logout = () => {
        setUser((user) => ({
            name: '',
            auth: false,
        }));
    };
    const fetchUser = async () => {
        let res = await getUserAccount();
        if (res && res.errCode === 0) {
            let groupWithRoles = res.data.groupWithRoles;
            let email = res.data.email;
            let username = res.data.username;
            let token = res.data.access_token;
            let data = {
                isAuthenticated: true,
                token,
                account: {
                    groupWithRoles, email, username
                },
                isLoading: false
            }
            setTimeout(() => {
                setUser(data);
            }, 1 * 1000)

        } else {
            setUser({ ...userDefault, isLoading: false })
        }
    }
    useEffect(() => {
        if (window.location.pathname !== '/' || window.location.pathname !== '/login') {
            fetchUser();
        }
    }, [])
    return (
        <UserContext.Provider value={{ user, loginContext, logout }}>
            {children}
        </UserContext.Provider>
    );
}

export { UserContext, UserProvider };