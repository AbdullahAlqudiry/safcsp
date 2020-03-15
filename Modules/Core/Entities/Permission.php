<?php

namespace Modules\Core\Entities;

use Spatie\Permission\Models\Permission as SpatiePermission;

class Permission extends SpatiePermission
{

    protected $fillable = [
        'name',
        'label',
        'guard_name',
        'group_key'
    ];

}
