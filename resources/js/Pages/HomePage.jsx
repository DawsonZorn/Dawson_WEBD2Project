import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Homepage({ auth }) {
    const Layout = auth.user ? AuthenticatedLayout : GuestLayout;

    return (
        <Layout user={auth.user}>
            <Head title="Homepage" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="text-center">
                                <ApplicationLogo className="mx-auto h-24 w-auto" />
                                <h1 className="text-4xl font-bold mt-4">Welcome to Winnipeg's Bayern Munich Fan Club</h1>
                                <p className="mt-2 text-lg text-gray-600">Enjoy your stay!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}