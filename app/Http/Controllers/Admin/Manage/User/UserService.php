<?php

namespace App\Http\Controllers\Admin\Manage\User;

use App\Http\Controllers\Admin\Manage\User\Requests\ListRequest;
use App\Http\Controllers\Admin\Manage\User\Requests\UpdateStatusRequest;
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
        $users = User::withoutAdminUser()
            ->filterBy($formattedData['searchTxt'])
            ->paginate($formattedData['pageSize']);

        return withSuccess($users);
    }

    public function formatUserListRequest(ListRequest $request): array
    {
        return [
            ...$this->formatCommonListRequest($request),
            'status' => $request->string('status') ?? '',
        ];
    }

    public function userFindOrFailBy(string $key, string $value, string $operator = '=', int $id = null): ?User
    {
        return User::where($key, $operator, $value)
            ->when($id, function ($q, $id) {
                return $q->findOrFail($id);
            }, function ($q) {
                return $q->firstOrFail();
            });
    }

    public function updateUserStatus(UpdateStatusRequest $request): JsonResponse
    {
        $user = $this->userFindOrFailBy('status', Utility::SUPER_ADMIN_TXT, '!=', $request->integer('user_id'));
        $formattedData = $this->formatUpdateStatusData($request->validated());
        return withSuccess($formattedData, 'User status updated successfully!');
        if ($user->update($formattedData)) {
            return withSuccess($user, 'User status updated successfully!');
        }
        return withError('User status update failed', 400);
    }

    function formatUpdateStatusData(array $data): array
    {
        return [
            'status' => $data['status'],
        ];
    }

    public function convertUserStatusToTxt(): string
    {
        return implode(',', Utility::ALL_USER_STATUS);
    }
}
