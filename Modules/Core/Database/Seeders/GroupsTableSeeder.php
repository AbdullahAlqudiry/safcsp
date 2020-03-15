<?php

namespace Modules\Core\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\Core\Entities\Group;

class GroupsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        
        $groups = [
            ['name' => 'General'],
            ['name' => 'Saudi Arabia'],
            ['name' => 'US'],
            ['name' => 'UK'],
        ];

        foreach($groups as $group) {
            Group::create([
                'name' => $group['name']
            ]);
        }
    }
}
