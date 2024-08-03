<?php

namespace App\Http\Controllers;

use App\Models\Dawson;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class DawsonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('Dawsons/Index', [
            'Dawsons' => Dawson::with('user:id,name')->latest()->get(),

        ]);

    }

//     public function players()
// {
//     $comments = Comment::all(); // Adjust this to retrieve comments as needed
//     return Inertia::render('Players', [
//         'comments' => $comments,
//     ]);
// }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([

            'message' => 'required|string|max:255',
            

        ]);
        $request->user()->dawsons()->create($validated);

        return redirect(route('Dawsons.index'));
    }

    /**
     * Display the specified resource.
     */
    public function show(Dawson $dawson)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Dawson $dawson)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    //public function update(Request $request, Dawson $dawson): RedirectResponse
    public function update(Request $request, $dawson): RedirectResponse
    {   
        $dawson = Dawson::findOrFail($dawson);
        Gate::authorize('update', $dawson);

 

        $validated = $request->validate([

            'message' => 'required|string|max:255',

        ]);

 

        $dawson->update($validated);

 

        return redirect(route('Dawsons.index'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($dawson): RedirectResponse
    {
        $dawson = Dawson::findOrFail($dawson);
        Gate::authorize('delete', $dawson);

        $dawson->delete();

        return redirect(route('Dawsons.index'));
       
    }
}
