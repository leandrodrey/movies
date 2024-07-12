'use client';
import React, {ChangeEvent, FC, FormEvent, useContext, useEffect, useState} from 'react';
import PageTitle from "@/components/ui/PageTitle";
import {useRouter} from "next/navigation";
import {UserContext} from "@/context/UserProvider";

const RegisterPage: FC = () => {

    const router = useRouter();
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            router.push('/');
        }
    }, [user, router]);

    const [formData, setFormData] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        birthdate: '',
        country: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(process.env.NEXT_PUBLIC_BASE_API_URL + '/auth/register', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log('Registro exitoso:', response.json());
                alert('Registro exitoso!');
            } else {
                console.error('Error en el registro:', response.statusText);
                alert('Error en el registro: Inténtalo nuevamente.');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
            alert('Ocurrió un error inesperado. Inténtalo nuevamente más tarde.');
        }
    };

    return (
        <>
            <PageTitle text="Registrarse"/>
            <form onSubmit={handleSubmit} className="max-w-xxl mx-auto p-6 bg-white rounded shadow-md">
                {/* Campo Nombre */}
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Campo Apellido */}
                <div className="mb-4">
                    <label htmlFor="lastname" className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                    <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Campo Email */}
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Campo Contraseña */}
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Campo Fecha de Nacimiento */}
                <div className="mb-4">
                    <label htmlFor="birthdate" className="block text-gray-700 text-sm font-bold mb-2">Fecha de Nacimiento</label>
                    <input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>

                {/* Campo País (Select) */}
                <div className="mb-4">
                    <label htmlFor="country" className="block text-gray-700 text-sm font-bold mb-2">País</label>
                    <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">País</option>
                        <option value="AR">Argentina</option>
                        <option value="BO">Bolivia</option>
                        <option value="BR">Brasil</option>
                        <option value="CH">Chile</option>
                        <option value="CO">Colombia</option>
                        <option value="EC">Ecuador</option>
                        <option value="PY">Paraguay</option>
                        <option value="PE">Perú</option>
                        <option value="UY">Uruguay</option>
                        <option value="VE">Venezuela</option>
                    </select>
                </div>

                {/* Botón de Envío */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Registrarse
                </button>

                {/* Enlace de Ayuda */}
                <a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2">
                    ¿Necesitas ayuda?
                </a>
            </form>
        </>
    );
};

export default RegisterPage;
