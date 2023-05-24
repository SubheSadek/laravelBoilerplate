<?php

namespace App\Utilities;

class Utility
{
    const USER_ACTIVE_TXT = 'ACTIVE';
    const USER_BANNED_TXT = 'BANNED';
    const ALL_USER_STATUS = [self::USER_ACTIVE_TXT, self::USER_BANNED_TXT];

    const SUPER_ADMIN_TXT = 'SUPER_ADMIN';
    const ADMIN_TXT = 'SUPER_ADMIN';
    const ADMIN_USER_TYPES = [self::SUPER_ADMIN_TXT, self::ADMIN_TXT];
}
