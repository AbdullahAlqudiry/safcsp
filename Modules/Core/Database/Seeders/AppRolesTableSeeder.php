<?php

namespace Modules\Core\Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class AppRolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();
        
        // Seed permissions
        $permissions = [

            // RolesController
            ['group_key' => 'Admin', 'name' => 'core_view_roles', 'guard_name' => 'web', 'label' => 'View roles'],
            ['group_key' => 'Admin', 'name' => 'core_add_roles', 'guard_name' => 'web', 'label' => 'Add new role'],
            ['group_key' => 'Admin', 'name' => 'core_edit_roles', 'guard_name' => 'web', 'label' => 'Edit role'],
            ['group_key' => 'Admin', 'name' => 'core_delete_roles', 'guard_name' => 'web', 'label' => 'Destroy role'],

            // GroupsController
            ['group_key' => 'Admin', 'name' => 'core_view_groups', 'guard_name' => 'web',  'label' => 'View groups'],
            ['group_key' => 'Admin', 'name' => 'core_add_groups', 'guard_name' => 'web', 'label' => 'Add new group'],
            ['group_key' => 'Admin', 'name' => 'core_edit_groups', 'guard_name' => 'web', 'label' => 'Edit group'],
            ['group_key' => 'Admin', 'name' => 'core_delete_groups', 'guard_name' => 'web', 'label' => 'Destroy group'],
            ['group_key' => 'Admin', 'name' => 'core_delete_user_from_group_groups', 'label' => 'Destroy user from group'],
            
            // UsersController
            ['group_key' => 'Admin', 'name' => 'core_view_users',  'label' => 'View users'],
            ['group_key' => 'Admin', 'name' => 'core_add_users', 'label' => 'Add new user'],
            ['group_key' => 'Admin', 'name' => 'core_edit_users', 'label' => 'Edit user'],
            ['group_key' => 'Admin', 'name' => 'core_delete_users', 'label' => 'Destroy user'],
            ['group_key' => 'Admin', 'name' => 'core_delete_group_from_user_users', 'label' => 'Destroy group from user'],

            // Reports 
            ['group_key' => 'Admin', 'name' => 'reports_view_all_reports',  'label' => 'View all reports in the system'],
            ['group_key' => 'Reports', 'name' => 'reports_view_reports',  'label' => 'View reports'],
            ['group_key' => 'Reports', 'name' => 'reports_add_reports', 'label' => 'Add new report'],
            ['group_key' => 'Reports', 'name' => 'reports_edit_reports', 'label' => 'Edit report'],
            ['group_key' => 'Reports', 'name' => 'reports_delete_reports', 'label' => 'Destroy report'],

        ];

        foreach($permissions as $permission) {
            Permission::create($permission);
        }

        // Seed roles
        $roles = [
            ['name' => 'Admin'],
            ['name' => 'User'],
        ];

        foreach($roles as $r) {
            $role = Role::create(['name' => $r['name']]);

            if($role->name == 'Admin') {
                $role->syncPermissions(Permission::all());
            }
            else {
                $role->syncPermissions(Permission::where('group_key', 'Reports')->get());
            }
        }
    }
}
