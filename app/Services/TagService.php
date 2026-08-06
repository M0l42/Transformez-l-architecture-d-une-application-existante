<?php

namespace App\Services;

use App\Models\Tag;

class TagService
{
    public function listAll()
    {
        return Tag::all();
    }

    public function create(array $data)
    {
        return Tag::create([
            'name' => $data['name'],
        ]);
    }
}
