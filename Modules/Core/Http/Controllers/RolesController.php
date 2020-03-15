<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Authorizable;
use Modules\Core\Http\Requests\CreateNewRoleRequest;
use Modules\Core\Entities\Role;
use Modules\Core\Entities\Permission;

class RolesController extends Controller
{
    use Authorizable;

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        $rolesData = Role::search($request->search)->select('id', 'name')->get();
        return response()->json($rolesData);
    }


    /**
     * Create
     * @param Request $request
     * @return Response
     */
    public function create(Request $request)
    {
        $permissionsData = Permission::select('id', 'label')->get();
        return response()->json($permissionsData);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(CreateNewRoleRequest $request)
    {
        $roleData = Role::createNewRole($request);
        $roleData->syncPermissions($request->permissions_ids);
        return response()->json('success');
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $roleData = Role::with('permissions')->findOrFail($id);
        return response()->json($roleData);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(CreateNewRoleRequest $request, $id)
    {
        $roleData = Role::findOrFail($id);
        $roleData->update($request->only('name'));
        $roleData->syncPermissions($request->permissions_ids);
        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $roleData = Role::findOrFail($id);
        $roleData->delete();
        return response()->json('success');
    }

}
