<?php

namespace Modules\User\Entities;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Modules\Core\Entities\Group;
use Modules\Reports\Entities\Report;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    protected $appends = [
        'current_role'
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
            return $query->where('name', 'LIKE', '%'. $search .'%')
                        ->orWhere('email', 'LIKE', '%'. $search .'%')
                        ->orWhereHas('roles', function ($query) use ($search) {
                            $query->where('roles.name', 'LIKE', '%'. $search .'%');
                        });
        });
    }

    // Attributes

    /**
     * Get user role
     */
    public function getCurrentRoleAttribute()
    {
        return optional($this->roles->first())->name;
    }

    // Realtions

    /**
     * Get Groups Of user
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_user');
    }
    
    /**
     * Get reports of user
     */
    public function reports()
    {
        return $this->hasMany(Report::class);
    }

    // Functions

    /**
     * Get All permissions of user
     */
    public function getAllPermissionsNames() 
    {
        $permissionsName = [];
        foreach($this->getAllPermissions() as $permission) {
            $permissionsName[$permission->name] = $permission->name;
        }
        return $permissionsName;
    }

    /**
     * Create new user 
     */
    public static function createNewUser($request) {
        
        $request->merge([
            'password' => bcrypt($request->password),
        ]);
        
        $userData = self::create($request->only('name', 'email', 'password'));
        $userData->roles()->sync($request->role_id);
        $userData->groups()->attach($request->group_ids);

        return $userData;
    }

}
