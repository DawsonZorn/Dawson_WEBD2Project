import React from 'react';
import { Link } from '@inertiajs/react';

export default function PagesList({ pages }) {
    return (
        <div>
            <h2 className="text-xl font-semibold">Your Pages</h2>
            <ul>
                {pages.map(page => (
                    <li key={page.id}>
                        <Link href={`/pages/${page.id}`} className="text-blue-600 hover:underline">
                            {page.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}