import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';


export default function Index({ auth, pages, currentSort, currentOrder }) {
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this page?')) {
            destroy(route('pages.destroy', id));
        }
    };

    const handleSort = (sortBy) => {
        const order = currentSort === sortBy && currentOrder === 'asc' ? 'desc' : 'asc';
        window.location.href = route('pages.index', { sort: sortBy, order });
    }

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
                                <Link
                                    href={route('pages.create')}
                                    className="text-blue-500 hover:underline"
                                >
                                    Create New Page
                                </Link>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    onClick={() => handleSort('title')}
                                    className={`font-semibold ${currentSort === 'title' ? 'underline' : ''}`}
                                >
                                    Title {currentSort === 'title' ? (currentOrder === 'asc' ? '↑' : '↓') : ''}
                                </button>
                                <button
                                    onClick={() => handleSort('created_at')}
                                    className={`font-semibold ${currentSort === 'created_at' ? 'underline' : ''}`}
                                >
                                    Created At {currentSort === 'created_at' ? (currentOrder === 'asc' ? '↑' : '↓') : ''}
                                </button>
                                <button
                                    onClick={() => handleSort('updated_at')}
                                    className={`font-semibold ${currentSort === 'updated_at' ? 'underline' : ''}`}
                                >
                                    Updated At {currentSort === 'updated_at' ? (currentOrder === 'asc' ? '↑' : '↓') : ''}
                                </button>
                            </div>
                            {pages.map((page) => (
                                <div key={page.id} className="grid grid-cols-3 gap-4 mb-4 border-b pb-4">
                                    <h3 className="text-lg font-semibold">{page.title}</h3>
                                    <div className="flex space-x-4 mt-2">
                                        <Link
                                            href={route('pages.show', page.id)}
                                            className="text-blue-500 hover:underline"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('pages.edit', page.id)}
                                            className="text-yellow-500 hover:underline"
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
                                    </div>
                                    <div className="mt-2">{new Date(page.created_at).toLocaleDateString()}</div>
                                    <div className="mt-2">{new Date(page.updated_at).toLocaleDateString()}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
