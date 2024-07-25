<?php

namespace App\Policies;

use App\Models\Dawson;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class DawsonPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Dawson $dawson): bool
    {
        //
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        //
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Dawson $dawson): bool
    {
        return $dawson->user()->is($user);
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Dawson $dawson): bool
    {
        return $this->update($user, $dawson);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Dawson $dawson): bool
    {
        //
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Dawson $dawson): bool
    {
        //
    }
}
