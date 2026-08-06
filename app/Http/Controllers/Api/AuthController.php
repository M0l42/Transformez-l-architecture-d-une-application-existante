<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    use ApiResponse;

    public function __construct(private AuthService $authService) {}

    public function register(RegisterRequest $request)
    {
        $result = $this->authService->register($request->validated());

        return $this->success([
            'token' => $result['token'],
            'user' => new UserResource($result['user']),
        ], "Compte créé", 201);
    }

    public function login(LoginRequest $request)
    {
        $result = $this->authService->attemptLogin($request->validated());

        if (! $result) {
            return $this->error("Identifiants invalides", 401);
        }

        return $this->success([
            'token' => $result['token'],
            'user' => new UserResource($result['user']),
        ], "Connecté");
    }

    public function logout(Request $request)
    {
        $this->authService->logout($request->user());

        return $this->success(null, "Déconnecté");
    }
}
