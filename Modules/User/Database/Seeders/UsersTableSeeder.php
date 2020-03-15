<?php

namespace Modules\User\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Modules\User\Entities\User;
use Modules\Core\Entities\Group;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Create Admin User
        $adminData = User::create([
            'name' => 'Admin',
            'email' => 'admin@safcsp.com',
            'password' => bcrypt('password123'),
        ]);
        $adminData->syncRoles('Admin');
        $adminData->groups()->sync(Group::all());

        // Create Random users
        factory(User::class, 70)->create()->each(function($u) {
            $u->syncRoles('User');
            $u->groups()->sync(Group::all()->random(rand(1,2))->pluck('id'));
        });

    }
}
