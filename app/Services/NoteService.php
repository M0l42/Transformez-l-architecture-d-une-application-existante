<?php

namespace App\Services;

use App\Models\Note;

class NoteService
{
    public function listForUser(int $userId)
    {
        return Note::with('tag')->where('user_id', $userId)->get();
    }
}
