<?php

namespace App\Http\Controllers\Admin\Manage\User;

use App\Http\Controllers\Admin\Manage\User\Requests\CreateUserRequest;
use App\Http\Controllers\Admin\Manage\User\Requests\ListRequest;
use App\Http\Controllers\Admin\Manage\User\Requests\UpdateStatusRequest;
use App\Http\Controllers\Admin\Manage\User\Requests\UpdateUserRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function __construct(protected UserService $userService)
    {
    }

    public function index(ListRequest $request): JsonResponse
    {
        return $this->userService->getUserList($request);
    }

    public function updateStatus(UpdateStatusRequest $request)
    {
        return $this->userService->updateUserStatus($request);
    }

    public function store(CreateUserRequest $request): JsonResponse
    {
        return $this->userService->createUser($request->validated());
    }

    public function update(UpdateUserRequest $request, $userId): JsonResponse
    {
        return $this->userService->updateUser($request->validated(), $userId);
    }

    public function delete()
    {

    }
}
