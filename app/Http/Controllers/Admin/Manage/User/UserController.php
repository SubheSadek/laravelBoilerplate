<?php

namespace App\Http\Controllers\Admin\Manage\User;

use App\Http\Controllers\Admin\Manage\User\Requests\ListRequest;
use App\Http\Controllers\Admin\Manage\User\Requests\UpdateStatusRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

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
}
