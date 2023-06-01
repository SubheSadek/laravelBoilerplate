<?php

namespace App\Http\Controllers\Admin\Manage\Admin;

use App\Http\Controllers\Admin\Manage\Admin\Resources\AdminResource;
use App\Http\Controllers\Admin\Manage\User\UserService;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class AdminService
{
    public function __construct(protected UserService $userService)
    {
    }

    public function getAdminList(array $requestData): JsonResponse
    {
        $formattedData = $this->userService->formatUserListRequest($requestData);
        $admins = User::withAdminUser()->latest('id')
            ->with(['role'])
            ->filterBy($formattedData['searchTxt'])
            ->paginate($formattedData['pageSize']);

        return withSuccess($admins);
    }

    public function updateAdminStatus(array $requestData, int $adminId): JsonResponse
    {
        if ($this->userService->updateUserData($requestData, $adminId)) {
            $admin = $this->userService->findUserByIdExceptSuperAdmin($adminId);

            return withSuccess(new AdminResource($admin), 'Admin status updated successfully!');
        }

        return withError('User status update failed');
    }

    public function createAdmin(array $requestData): JsonResponse
    {
        $admin = $this->userService->createNewUser($requestData);

        return withSuccess(new AdminResource($admin->load(['role'])->refresh()), 'Admin created successfully!');
    }

    public function updateAdmin(array $requestData, int $adminId): JsonResponse
    {

        $formattedData = $this->userService->formatUpdateRequestData($requestData);

        if ($this->userService->updateUserData($formattedData, $adminId)) {
            $admin = $this->userService->findUserByIdExceptSuperAdmin($adminId);

            return withSuccess(new AdminResource($admin->load(['role'])), 'Admin updated successfully!');
        }

        return withError('Admin updated Failed!');
    }

    public function deleteAdmin(int $adminId): JsonResponse
    {
        if ($this->userService->deleteUserData($adminId)) {
            return withSuccess('', 'Admin deleted successfully!');
        }

        return withError('Admin deletion failed');
    }
}
