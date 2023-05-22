<?php

//*******************Response Modifier Start************************/

use Illuminate\Http\JsonResponse;

function withSuccess(mixed $data = '', string $message = '', int $status = 200): mixed
{
    return customResponse($data, true, $status, $message);
}

function withError(string $message, int $status, mixed $data = null): mixed
{
    return customResponse($data, false, $status, $message);
}

function customResponse(mixed $data, string $success, int $status, $message = null): JsonResponse
{
    return response()->json([
        'json_data' => $data,
        'success' => (bool) $success,
        'status' => (int) $status,
        'message' => $message,
    ], $status);
}

//*******************Response Modifier End************************/

function AuthUser()
{
    $authUser = auth()->user();
    $currentUser = [
        'name' => $authUser->name,
        'email' => $authUser->email,
        'phone' => $authUser->phone,
    ];

    return json_encode($currentUser);
}
