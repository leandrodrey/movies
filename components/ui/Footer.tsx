import React, { FC } from 'react';
import Link from "next/link";

const Footer: FC = () => {
    return (
        <footer className="py-12 px-8 bg-gradient-to-r from-gray-800 to-black text-white">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
                <div className="mb-8 md:mb-0">
                    <h3 className="text-2xl font-bold mb-4">Mi Netflix</h3>
                    <p className="text-gray-400">Disfruta de películas y series ilimitadas.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-2">Explora</h4>
                        <ul className="text-gray-400">
                            <li><Link href="/">Inicio</Link></li>
                            <li>Mi Lista</li>
                            <li>Originales</li>
                            <li>Agregados Recientemente</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Ayuda</h4>
                        <ul className="text-gray-400">
                            <li>Centro de Ayuda</li>
                            <li>Contáctanos</li>
                            <li>Prensa</li>
                            <li>Inversores</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Legal</h4>
                        <ul className="text-gray-400">
                            <li>Términos de Uso</li>
                            <li>Privacidad</li>
                            <li>Preferencias de Cookies</li>
                            <li>Información Corporativa</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
                        <div className="flex space-x-4">
                            {/* Replace these placeholders with your actual social media links */}
                            <a href="#" className="hover:text-red-600">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="#" className="hover:text-red-600">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="#" className="hover:text-red-600">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
                &copy; 2024 Mi Netflix. Todos los derechos reservados.
            </div>
        </footer>
    );
};

export default Footer;
