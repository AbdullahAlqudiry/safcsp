<?php

namespace Modules\Core\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\User\Entities\User;
use Modules\Reports\Entities\Report;

class Group extends Model
{
    protected $fillable = [
        'name'
    ];

    // Override the boot method to delete users, doucments when deleting the group
    protected static function boot() {
        parent::boot();
    
        static::deleting(function($group) {
            $group->users()->detach();
        });
    }

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

    // Realtions

    /**
     * Get Users In Group
     */
    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Get Reports in Group
     */
    public function reports()
    {
        return $this->belongsToMany(Report::class, 'group_reports');
    }

    // Funcions 

    /**
     * Get list of user groups
     */
    public static function availableGroups($user) {
        if($user->can('core_view_groups')) {
            return self::select('id', 'name')->get();
        }
        return $user->groups()->get();
    }

    /**
     * Create new group 
     */
    public static function createNewGroup($request) {
        return self::create($request->only('name'));
    }
}
