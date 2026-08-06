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
        $apiToken = $this->authService->issueSpaToken($request->user(), $request);

        return view('dashboard', ['apiToken' => $apiToken]);
    }
}
