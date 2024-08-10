<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Page;
use Illuminate\Http\Request;

class CommentController extends Controller
{

    public function index(): Response
    {
        return Inertia::render('Pages/Index', [
            'Pages' => Page::with('user:id,name')->latest()->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:255',
        ]);

        $request->user()->pages()->create($validated);  // Assuming the `pages` relationship exists

        return redirect(route('Pages.index'));
    }

    public function create(Request $request) {
        // Validate the request
        $validated = $request->validate([
            'page_id' => 'nullable',
            'user_id' => 'nullable',
            'message' => 'required|string|max:255',
        ]);

        $comment = Comment::create($validated);
        $comment = Comment::with('user')->find($comment->id);
        return response()->json($comment, 200);
    }

    
    public function update(Request $request, Comment $comment): RedirectResponse
    {
        // Authorize the user to update the comment
        Gate::authorize('update', $comment);

        // Validate the request
        $validated = $request->validate([
            'message' => 'required|string|max:255',
            'id' => 'nullable',
            'user_id' => 'nullable',
            'page_id' => 'nullable',
        ]);

        if(isset($validated['id'])){
            
        // Update the comment
        $comment->update($validated);

        // Redirect back to the previous page or a specific route
        return redirect()->back()->with('success', 'Comment updated successfully.');
        }
        
    }

    public function destroy($page): RedirectResponse
    {
        $page = Page::findOrFail($page);
        Gate::authorize('delete', $page);

        $page->delete();

        return redirect(route('Pages.index'));
    }

    

}
