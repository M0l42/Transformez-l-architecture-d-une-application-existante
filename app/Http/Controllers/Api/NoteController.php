<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\NoteResource;
use App\Services\NoteService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    use ApiResponse;

    public function __construct(private NoteService $noteService) {}

    public function index(Request $request)
    {
        $userId = $request->user()->id;
        $notes = $this->noteService->listForUser($userId);

        return $this->success(NoteResource::collection($notes), "Notes récupérées");
    }
}
