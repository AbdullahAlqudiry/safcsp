<?php

namespace Modules\Reports\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\User\Entities\User;
use Modules\Core\Entities\Group;
use Modules\Reports\Entities\Document;

class Report extends Model
{
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'title', 'content', 'tags'
    ];

    protected $appends = [
        'can_edit', 'can_delete'
    ];


    // Override the boot method to delete users, doucments when deleting the group
    protected static function boot() {
        parent::boot();
    
        static::deleting(function($report) {
            $documents = $report->documents()->get();
            foreach($documents as $document) {


            }
            $report->documents()->delete();
        });
    }

    // Scopes
    /**
     * get available reports for current user
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function scopeAvailableReports($query, $user) {
        if($user->can('reports_view_all_reports')) {
            return $query;
        }

        $groupIDs = $user->groups()->pluck('group_id');
        return $query->whereHas('groups', function($query) use ($groupIDs) {
            return $query->whereIn('group_id', $groupIDs);
        });
    }

    /**
     * Search scope
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            return $query->where('title', 'LIKE', '%'. $search .'%')
                        ->orWhere('content', 'LIKE', '%'. $search .'%')
                        ->orWhere('tags', 'LIKE', '%'. $search .'%')
                        ->orWhereHas('user', function($query) use ($search) {
                            return $query->where('name', 'LIKE', '%'. $search .'%');
                        });
        });
    }

    // Attributes

    /**
     * Can user edit report?
     */
    public function getCanEditAttribute()
    {
        if(!auth()->user()->can('reports_edit_reports')){
            return false;
        }
        return auth()->user()->can('reports_view_all_reports') || auth()->user()->id == $this->user_id;
    }

    /**
     * Can user delete report?
     */
    public function getCanDeleteAttribute()
    {
        if(!auth()->user()->can('reports_edit_reports')) {
            return false;
        }
           
        return auth()->user()->can('reports_view_all_reports') || auth()->user()->id == $this->user_id;
    }

    // Realtions
    
    /**
     * Get use
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get Groups Of report
     */
    public function groups()
    {
        return $this->belongsToMany(Group::class, 'group_reports');
    }

    /**
     * Get documents of report
     */
    public function documents()
    {
        return $this->hasMany(Document::class);
    }


    // Functions

    /**
     * Create new user 
     */
    public static function createNewReport($request) {
        $reportData = auth()->user()->reports()->create($request->only('title', 'content', 'tags'));
        $reportData->groups()->attach($request->group_ids);
        return $reportData;
    }

}
