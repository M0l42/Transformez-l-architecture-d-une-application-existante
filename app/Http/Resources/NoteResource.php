<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NoteResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        /**
         * Transform the resource into an array representation.
         *
         * @return array<string, mixed>
         */
        return [
            'id' => $this->id,
            'tag' => [
                'id' => $this->tag->id,
                'name' => $this->tag->name,
            ],
            'text' => $this->text,
        ];
    }
}
