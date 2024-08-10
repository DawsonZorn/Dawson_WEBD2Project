import React from 'react';
import { Link } from '@inertiajs/react';

const DefaultLayout = ({ children }) => {
    return (
        <div>
            <header className="bg-gray-800 p-4">
                <div className="container mx-auto">
                    <nav className="flex justify-between items-center">
                        <div>
                            <Link href="/dashboard" className="text-white text-xl font-semibold">Bayern Admin</Link>
                        </div>
                        <div>
                            <Link href="/pages" className="text-white">Posts</Link>
                            <br/>
                            <br/>
                            <Link href="/pages/create" className="text-white">Create page</Link>
                        </div>
                    </nav>
                </div>
            </header>
            <main>
                {children}
            </main>
            {/* <footer className="bg-gray-800 p-4 text-white text-center">
                © 2024 MyApp
            </footer> */}
        </div>
    );
};

export default DefaultLayout;