<?php

namespace App\Traits;

trait RequestFormatter
{
    public function formatCommonListRequest(object $request): array
    {
        return [
            'pageSize' => $request->integer('pageSize') ?? 10,
            'page' => $request->integer('page') ?? 1,
            'searchTxt' => $request->string('searchTxt') ?? '',
        ];
    }
}
