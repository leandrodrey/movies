import {createContext, Dispatch, FC, SetStateAction, useState, PropsWithChildren} from 'react'

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

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
