'use client'
import React, {FC, FormEvent, useContext, useEffect, useState} from 'react';
import {UserContext} from "@/context/UserProvider";
import {useRouter} from "next/navigation";

const LoginPage: FC = () => {
    const router = useRouter();
    const {user, setUser} = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loginData = {
            email: email,
            password: password
        };

        const loginResponse = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData)
        });

        if (!loginResponse.ok) {
            const errorResponse = await loginResponse.json();
            const errorMessage = errorResponse.error || 'Error logging in';
            console.error('Error:', errorMessage);
        }

        const loginResult = await loginResponse.json();
        console.log(loginResult);
        alert('Usuario logueado: ' + loginResult.user.name);
        localStorage.setItem('user', JSON.stringify(loginResult));
        setUser(loginResult);
        router.push('/');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md w-full">
                <h2 className="text-center text-2xl font-semibold text-gray-800 mb-4">Iniciar Sesión</h2>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Iniciar Sesión
                        </button>
                        <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
