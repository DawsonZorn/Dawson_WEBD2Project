<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index(Request $request)
{
    $sortBy = $request->input('sort', 'created_at');
    $sortOrder = $request->input('order', 'desc');

    // Fetch pages with sorting
    $pages = Page::with('comments')
        ->orderBy($sortBy, $sortOrder)
        ->get();

    return Inertia::render('Pages/Index', [
        'pages' => $pages,
        'currentSort' => $sortBy,
        'currentOrder' => $sortOrder,
        'comments' => $pages->map->comments,
    ]);
}

    public function create()
    {
        return Inertia::render('Pages/Create');
    }


    public function edit($id)
{
    $page = Page::findOrFail($id);
    return Inertia::render('Pages/Edit', ['page' => $page]);
}

public function update(Request $request, $id)
{
    $page = Page::findOrFail($id);
    $page->update($request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]));

    return redirect()->route('pages.index', $page->id);
}

public function destroy($id)
{
    $page = Page::findOrFail($id);
    $page->delete();
    return redirect()->route('pages.index')->with('success', 'Page deleted.');
}

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
        ]);

        Page::create($request->all());

        return redirect()->route('pages.index');
    }

    public function show(Page $page)
    {
        $page->load('comments.user');
        return Inertia::render('Pages/Show', ['page' => $page]);
    }
}


