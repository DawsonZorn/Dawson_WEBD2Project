import React from 'react';
import { Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DOMPurify from 'dompurify';

export default function Show({ auth, page }) {
    const sanitizedContent = DOMPurify.sanitize(page.content);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{page.title}</h2>}
        >
            <Head title={page.title} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
                            {page.image_url && (
                                <img src={page.image_url} alt={page.title} className="mt-4 rounded-md shadow-md" />
                            )}
                            <div className="mt-4">
                                <Link href={route('pages.index')}>
                                    Go Back to Page List
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
