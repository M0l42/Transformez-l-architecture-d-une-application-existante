<?php

namespace App\Http\Controllers;

use App\Services\AuthService;
use Illuminate\Contracts\View\View;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function __invoke(Request $request): View
    {
        $apiToken = $request->session()->get('spa_token');

        if (! $apiToken) {
            $apiToken = $this->authService->issueSpaToken($request->user());
            $request->session()->put('spa_token', $apiToken);
        }

        return view('dashboard', ['apiToken' => $apiToken]);
    }
}
