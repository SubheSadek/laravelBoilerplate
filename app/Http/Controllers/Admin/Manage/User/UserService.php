<?php

namespace App\Http\Controllers\Admin\Manage\User;

use App\Http\Controllers\Admin\Manage\User\Requests\ListRequest;
use App\Http\Controllers\Admin\Manage\User\Requests\UpdateStatusRequest;
use App\Http\Controllers\Admin\Manage\User\Resources\UserResource;
use App\Models\User;
use App\Traits\RequestFormatter;
use App\Utilities\Utility;
use Illuminate\Http\JsonResponse;

class UserService
{
    use RequestFormatter;

    public function getUserList(ListRequest $request): JsonResponse
    {
        $formattedData = $this->formatUserListRequest($request);
        $users = User::withoutAdminUser()->latest('id')
            ->filterBy($formattedData['searchTxt'])
            ->paginate($formattedData['pageSize']);

        return withSuccess($users);
    }

    public function updateUserStatus(array $requestData, int $userId): JsonResponse
    {
        $user = $this->findUserByIdExceptSuperAdmin($userId);

        if ($user->update($requestData)) {
            return withSuccess(new UserResource($user), 'User status updated successfully!');
        }

        return withError('User status update failed', 400);
    }

    public function createUser(array $requestData): JsonResponse
    {
        $user = User::create($requestData);
        return withSuccess(new UserResource($user->refresh()), 'User status updated successfully!');
    }

    public function updateUser(array $requestData, int $userId): JsonResponse
    {
        $user = $this->findUserByIdExceptSuperAdmin($userId);
        $formattedData = $this->formatUpdateRequestData($requestData);
        if ($user->update($formattedData)) {
            return withSuccess(new UserResource($user), 'User updated successfully!');
        }

        return withError('User updated Failed!', 400);
    }

    public function formatUserListRequest(ListRequest $request): array
    {
        return [
            ...$this->formatCommonListRequest($request),
            'status' => $request->string('status') ?? '',
        ];
    }

    public function findUserById(int $userId): ?User
    {
        return User::findOrFail($userId);
    }

    public function findUserByKeyValue(string $key, string $value, string $operator = '='): ?User
    {
        return User::where($key, $operator, $value)->firstOrFail();
    }

    public function findUserByIdExceptSuperAdmin(int $userId): ?User
    {
        return User::notSuperAdmin()->findOrFail($userId);
    }

    public function findUserByKeyValueExceptSuperAdmin(string $key, string $value, string $operator = '='): ?User
    {
        return User::notSuperAdmin()->where($key, $operator, $value)->firstOrFail();
    }

    public function convertUserStatusToTxt(): string
    {
        return implode(',', Utility::ALL_USER_STATUS);
    }

    public function formatUpdateRequestData(array $requestData): array
    {
        if (isset($requestData['password']) && !$requestData['password']) {
            unset($requestData['password']);
        }
        return $requestData;
    }
}
