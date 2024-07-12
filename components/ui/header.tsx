'use client'

import {FC, useContext} from 'react';
import Link from 'next/link';
import {UserContext} from '@/context/UserProvider'; // Assuming correct path

const Header: FC = () => {
    const {user} = useContext(UserContext);

    // @ts-ignore
    return (
        <>
            <header className="flex justify-between items-center py-4 px-8">
                <h1 className="text-3xl font-bold">
                    <Link href="/">Mi Netflix</Link>
                </h1>

                {user ? (
                    <>
                        <p>Bienvenido {user.user.name}!!</p>
                        <Link href="/Admin/MovieAdmin">
                            <button className="bg-red-600 text-white px-4 py-2 rounded">
                                Administrar películas
                            </button>
                        </Link>
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
