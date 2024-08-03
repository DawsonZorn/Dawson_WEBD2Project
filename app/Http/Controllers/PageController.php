<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::all();
        return Inertia::render('Pages/Index', ['pages' => $pages]);
    }

    public function create()
    {
        return Inertia::render('Pages/Create');
    }


    public function edit($id)
{
    $page = Page::findOrFail($id);
    return Inertia::render('Pages/EditPage', ['page' => $page]);
}

public function update(Request $request, $id)
{
    $page = Page::findOrFail($id);
    $page->update($request->validate([
        'title' => 'required|string|max:255',
        'content' => 'required|string',
    ]));

    return redirect()->route('Pages.show', $page->id);
}

public function destroy($id)
{
    //$page = Page::findOrFail($id);
    $page->delete();
    return redirect()->route('Pages.index');
}

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required',
        ]);

        Page::create($request->all());

        return redirect()->route('Pages.index');
    }

    public function show(Page $page)
    {
        return Inertia::render('Pages/Show', ['page' => $page]);
    }
}


