<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['user_id', 'page_id', 'message', 'created_at', 'updated_at'];
    use HasFactory;

    public function page()
{
    return $this->belongsTo(Page::class);
}

public function user()
{
    return $this->belongsTo(User::class);
}


}
