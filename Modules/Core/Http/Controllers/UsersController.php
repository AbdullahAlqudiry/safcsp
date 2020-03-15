<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Authorizable;
use Modules\Core\Http\Requests\CreateNewUserRequest;
use Modules\Core\Http\Requests\UpdateUserRequest;
use Modules\User\Entities\User;
use Modules\Core\Entities\Group;
use Modules\Core\Entities\Role;

class UsersController extends Controller
{
    use Authorizable;

    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        $usersData = User::withCount('groups', 'reports')->search($request->search)->paginate(20);
        return response()->json($usersData);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(CreateNewUserRequest $request)
    {
        $userData = User::createNewUser($request);
        return response()->json('success');
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $userData = User::with('groups', 'roles')->findOrFail($id);
        return response()->json($userData);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(UpdateUserRequest $request, $id)
    {
        $userData = User::findOrFail($id);

        if($request->password) {
            $request->merge([
                'password' => bcrypt($request->password),
            ]);
        }
        else {
            $request->merge([
                'password' => $userData->password,
            ]);
        }

        $userData->update($request->only('name', 'password'));
        $userData->roles()->sync($request->role_id);
        $userData->groups()->sync($request->group_ids);

        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $userData = User::findOrFail($id);
        $userData->groups()->sync([]);
        $userData->delete();
        return response()->json('success');
    }

    /**
     * Remove Group From User
     */
    public function removeGroup(Request $request)
    {
        $userData = User::findOrFail($request->id);
        $userData->groups()->detach([$request->group_id]);
        return response()->json('success');
    }

    /**
     * Get groups data
     */
    public function groups(Request $request)
    {
        $groupsData = Group::select('id', 'name')->get();
        return response()->json($groupsData);    
    }

    /**
     * Get roles data
     */
    public function roles(Request $request)
    {
        $rolesData = Role::select('id', 'name')->get();
        return response()->json($rolesData);    
    }
}
