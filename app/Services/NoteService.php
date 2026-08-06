<?php

namespace App\Services;

use App\Models\Note;

class NoteService
{
    public function listForUser(int $userId)
    {
        return Note::with('tag')->where('user_id', $userId)->get();
    }

    public function createForUser(int $userId, array $data)
    {
        $note = Note::create([
            'user_id' => $userId,
            'tag_id' => $data['tag_id'],
            'text' => $data['text'],
        ]);
        $note->load('tag');
        return $note;
    }

    public function deleteForUser(int $userId, int $noteId): void
    {
        $note = Note::where('user_id', $userId)->where('id', $noteId)->firstOrFail();
        $note->delete();
    }
}
