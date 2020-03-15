<?php

namespace Modules\Reports\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Core\Entities\Group;
use Modules\Reports\Entities\Report;

class ReportsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Random reports
        factory(Report::class, 260)->create()->each(function($r) {
            $r->groups()->sync(Group::all()->random(rand(1,2))->pluck('id'));
        });

    }
}
