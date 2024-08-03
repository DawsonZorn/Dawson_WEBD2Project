import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Index({ auth, pages }) {

    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this page?')) {
            destroy(route('pages.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Pages</h2>}
        >
            <Head title="Pages" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="mb-4">
                                <PrimaryButton>
                                <Link
                                    href={route('pages.create')}>
                                    Create New Page
                                </Link>
                                </PrimaryButton>
                            </div>
                            <div className="grid grid-cols-8 gap-4">
                                <div className="font-semibold">Title</div>
                                <div className="font-semibold">Actions</div>
                            </div>
                                    {pages.map((page) => (
                                        <tr key={page.id}>
                                            <td className="py-2">{page.title}</td>
                                            <td className="py-2">
                                                <Link
                                                    href={route('pages.show', page.id)}
                                                    className="text-blue-500 hover:underline mr-4"
                                                >
                                                    View
                                                </Link>
                                                <Link
                                                    href={route('pages.edit', page.id)}
                                                    className="text-yellow-500 hover:underline mr-4"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(page.id)}
                                                    className="text-red-500 hover:underline"
                                                    disabled={processing}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}