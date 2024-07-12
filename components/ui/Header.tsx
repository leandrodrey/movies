'use client'
import {FC, useContext} from 'react';
import Link from 'next/link';
import {UserContext} from '@/context/UserProvider';
import {useRouter} from "next/navigation"; // Assuming correct path

const Header: FC = () => {
    const {user, setUser} = useContext(UserContext);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const logoutResponse = await fetch("https://codo-a-codo-js-api.vercel.app/auth/logout", {
                method: "POST"
            });

            if (logoutResponse.ok) {
                router.push("/");
                localStorage.removeItem("user");
                setUser(null);
            } else {
                console.error("Error al cerrar sesión:", logoutResponse.status);
            }
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    }

    // @ts-ignore
    return (
        <>
            <header className="flex justify-between items-center py-4 px-8">
                <h1 className="text-3xl font-bold">
                    <Link href="/">Mi Netflix</Link>
                </h1>

                {user ? (
                    <>
                        <div className="flex items-center">
                            <p className="mr-1">Bienvenido {user.user.name}!!</p>
                            |
                            <Link className="ml-1 mr-1 text-blue-500 hover:text-blue-700" href="/Admin/MovieAdmin">
                                Administrar películas
                            </Link>
                            |
                            <a href="#" onClick={handleLogout} className="ml-1 text-blue-500 hover:text-blue-700">
                                Logout
                            </a>
                        </div>
                    </>
                ) : (
                    <Link href="/Login">
                        <button className="bg-red-600 text-white px-4 py-2 rounded">
                            Iniciar sesión
                        </button>
                    </Link>
                )}
            </header>
        </>
    );

};

export default Header;
