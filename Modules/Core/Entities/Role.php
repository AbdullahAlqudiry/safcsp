<?php

namespace Modules\Core\Entities;

use Spatie\Permission\Models\Role as SpatieRole;

class Role extends SpatieRole
{

    protected $fillable = [
        'guard_name', 'name'
    ];

    // Scopes
    /**
     * Search scope
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            return $query->where('name', 'LIKE', '%'. $search .'%');
        });
    }

    // Funcions 

    /**
     * Create new group 
     */
    public static function createNewRole($request) {
        $request->merge([
            'guard_name' => 'web',
        ]);
        return self::create($request->only('guard_name', 'name'));
    }
}
