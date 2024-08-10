import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Comments from '@/Components/Comments';

export default function Edit({ auth, page }) {
    const { data, setData, put, processing, errors } = useForm({
        title: page.title,
        content: page.content,
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
                        <div className="p-6">
                            <form onSubmit={submit}>
                                <div>
                                    <label htmlFor="title">Title</label>
                                    <input
                                        id="title"
                                        type="text"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.title} className="mt-2" />
                                </div>

                                <div className="mt-4">
                                    <label htmlFor="content">Content</label>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={data.content}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setData('content', data);
                                        }}
                                        className="mt-1 block w-full"
                                    />
                                    <InputError message={errors.content} className="mt-2" />
                                </div>

                                <PrimaryButton className="mt-4" disabled={processing}>
                                    Update
                                </PrimaryButton>
                            </form>
                            <a href={route('pages.index')} className="text-blue-500 hover:underline mt-4 block">
                                Go Back
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
