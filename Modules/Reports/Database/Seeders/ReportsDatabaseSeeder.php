<?php

namespace Modules\Reports\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Reports\Database\Seeders\ReportsTableSeeder;

class ReportsDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call(ReportsTableSeeder::class);
    }
}
