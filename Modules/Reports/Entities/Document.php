<?php

namespace Modules\Reports\Entities;

use Illuminate\Database\Eloquent\Model;
use Modules\Reports\Entities\Report;

class Document extends Model
{
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'report_id', 'document_path', 'document_name'
    ];


    // Realtions

    /**
     * Get report of document
     */
    public function report()
    {
        return $this->belongsTo(Report::class);
    }
}
