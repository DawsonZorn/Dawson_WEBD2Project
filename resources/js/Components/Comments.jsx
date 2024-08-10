import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useForm, usePage } from '@inertiajs/react';

dayjs.extend(relativeTime);

export default function Comments({ pageId, comments }) {
    const { auth } = usePage().props;
    const [editing, setEditing] = useState(false);
    const[currentComment, setCurrentComment] = useState('');

    const handleDelete = async (commentId) =>{
        const response = await fetch(`/comment/${commentId}`, {
            method: 'delete'
        })
    }

    const { data, setData, clearErrors, reset, errors } = useForm({
        message: '',
    });

    const [commentList, setCommentList] = useState(comments);

    const submit = async (e) => {
        e.preventDefault();
        const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
        const response = await fetch('/comment', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": csrfToken
            },
            body: JSON.stringify( {
                'user_id': auth.user.id,
                'page_id': pageId,
                'message': data.message
            })
        })
        if(response.ok){
            const newComment = await response.json()
            setCommentList(prevState => [...prevState, newComment])
        }else {
            // Handle error or non-JSON response
            console.error('Failed to fetch JSON: ', await response.text());
        }
    }
    
       

    return (
        <div className="mt-6">
            <h3 className="text-lg font-semibold">Comments</h3>
            {commentList.map((comment) => (
                <div key={comment.id} className="p-6 flex space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600 -scale-x-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <div className="flex-1">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-gray-800">{comment.user.name}</span>
                                <small className="ml-2 text-sm text-gray-600">{dayjs(comment.created_at).fromNow()}</small>
                                {comment.created_at !== comment.updated_at && <small className="text-sm text-gray-600"> &middot; edited</small>}
                            </div>
                            {comment.user.id === auth.user.id &&
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 4 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                            Edit
                                        </button>
                                        <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => handleDelete(comment.id)}>
                                            Delete
                                        </button>
                                    </Dropdown.Content>
                                </Dropdown>
                            }
                        </div>
                        {editing ?
                            <form onSubmit={submit}>
                                <textarea value={data.message} onChange={e => setCurrentComment( e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                                <InputError message={errors.message} className="mt-2" />
                                <div className="space-x-2">
                                    <PrimaryButton className="mt-4">Save</PrimaryButton>
                                    <button className="mt-4" onClick={() => { setEditing(false); reset(); clearErrors(); }}>Cancel</button>
                                </div>
                            </form> :
                            <p className="mt-4 text-lg text-gray-900">{comment.message}</p>
                        }
                    </div>
                </div>
            ))}
            {/* Add new comment form */}
            <form onSubmit={submit}>
                <textarea value={data.message} onChange={e => setData('message', e.target.value)} placeholder="Add a comment" className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea>
                <InputError message={errors.message} className="mt-2" />
                <PrimaryButton className="mt-4">Comment</PrimaryButton>
            </form>
        </div>
    );
}
