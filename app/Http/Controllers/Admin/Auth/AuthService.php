<?php

namespace App\Http\Controllers\Admin\Auth;

use App\Models\User;
use App\Utilities\Utility;
use Illuminate\Http\JsonResponse;

class AuthService
{
    public function checkAdminAuthorization(string $email): bool
    {
        $user = $this->findUser('email', $email);

        if ($user->status !== Utility::USER_STATUS) {
            return false;
        }
        if (!in_array($user->user_type, Utility::ADMIN_USER_TYPES)) {
            return false;
        }

        return true;
    }

    public function loginAdmin(array $data): JsonResponse
    {
        $isAuthorized = $this->checkAdminAuthorization($data['email']);
        if (!$isAuthorized) {
            return withError('Invalid Credentials', 400);
        }

        if (auth()->attempt($data)) {
            return withSuccess(auth()->user(), 'Login Successful!');
        }

        return withError('Email or password is incorrect', 400);
    }

    public function findUser(string $key, string $value): ?User
    {
        return User::where($key, $value)->firstOrFail();
    }

    public function logoutAdmin(): JsonResponse
    {
        auth()->logout();
        return withSuccess('', 'Logout Successfully!');
    }
}
