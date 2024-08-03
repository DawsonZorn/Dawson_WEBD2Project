import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';

export default function Edit({ auth, page }) {
    const { data, setData, put, processing, errors } = useForm({
        title: page.title || '',
        content: page.content || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('pages.update', page.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Edit Page</h2>}
        >
            <Head title="Edit Page" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <form onSubmit={submit}>
                                <div className="mb-4">
                                    <label htmlFor="title" className="block text-gray-700">Title</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="content" className="block text-gray-700">Content</label>
                                    <textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        required
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>
                                <PrimaryButton className="mt-4" disabled={processing}>
                                    Update Page
                                </PrimaryButton>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
