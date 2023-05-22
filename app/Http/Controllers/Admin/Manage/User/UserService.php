<?php

namespace App\Http\Controllers\Admin\Manage\User;

use App\Http\Controllers\Admin\Manage\User\Requests\UserListRequest;
use App\Models\User;
use App\Traits\RequestFormatter;
use Illuminate\Http\JsonResponse;

class UserService
{
    use RequestFormatter;
    public function getUserList(UserListRequest $request): JsonResponse
    {
        $formattedData = $this->formatUserListRequest($request);
        $users = User::withoutAdminUser()->paginate($formattedData['pageSize']);
        return withSuccess($users);
    }

    public function formatUserListRequest(UserListRequest $request): array
    {
        return [
            ...$this->formatCommonListRequest($request),
            'status' => $request->string('status') ?? '',
        ];
    }
}
