<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTagRequest;
use App\Http\Resources\TagResource;
use App\Services\TagService;
use App\Traits\ApiResponse;

class TagController extends Controller
{
    use ApiResponse;

    public function __construct(private TagService $tagService) {}

    public function index()
    {
        $tags = $this->tagService->listAll();

        return $this->success(TagResource::collection($tags), "Tags récupérés");
    }

    public function store(StoreTagRequest $request)
    {
        $tag = $this->tagService->create($request->validated());

        return $this->success(new TagResource($tag), "Tag créé", 201);
    }
}
