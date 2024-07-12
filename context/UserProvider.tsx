import {createContext, Dispatch, FC, SetStateAction, useState, PropsWithChildren, useEffect} from 'react'

interface User {
    token: string;
    user:
        {
            name: string;
            email: string;
        }
}

interface UserContextType {
    user: User | null;
    setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {}
});

const UserProvider: FC<PropsWithChildren> = ({ children }) => {

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            try {
                const parsedUser: User = JSON.parse(storedUserData);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
                localStorage.removeItem('user');
            }
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
