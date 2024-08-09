// resources/js/Pages/Home.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
            <header className="w-full bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <Link
                        href={route('dashboard')}
                        className="text-gray-600 hover:text-gray-900"
                    >
                        Continue as Guest
                    </Link>
                    <ApplicationLogo className="h-8" />
                    <div>
                        <Link href={route('login')} className="text-gray-600 hover:text-gray-900">
                            Login
                        </Link>
                        <Link href={route('register')} className="ml-4 text-gray-600 hover:text-gray-900">
                            Register
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center flex-grow">
                <ApplicationLogo className="h-32 w-32 mb-8" style={{ height: '250px', width: '250px' }}/>
                <h1 className="text-4xl font-bold text-gray-900">Welcome to Winnipeg's Bayern Munich Fan Club</h1>
                <p className="mt-4 text-lg text-gray-700">Join us to stay updated with the latest news and events.</p>
            </main>

            <footer className="w-full bg-white shadow">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-gray-600">
                    &copy; 2024 Winnipeg's Bayern Munich Fan Club. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
