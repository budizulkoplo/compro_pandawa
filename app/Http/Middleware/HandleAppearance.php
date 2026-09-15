<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleAppearance
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $isAdmin = $request->is('admin*') || $request->is('setting*');

        // Force light theme for non-admin pages
        if (!$isAdmin) {
            $appearance = 'light';
        } else {
            $appearance = $request->cookie('appearance') ?? 'system';
        }

        View::share('appearance', $appearance);

        return $next($request);
    }
}
