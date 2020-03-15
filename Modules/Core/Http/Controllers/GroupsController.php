<?php

namespace Modules\Core\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Traits\Authorizable;
use Modules\Core\Http\Requests\CreateNewGroupRequest;
use Modules\Core\Entities\Group;

class GroupsController extends Controller
{
    use Authorizable;
    
    /**
     * Display a listing of the resource.
     * @return Response
     */
    public function index(Request $request)
    {
        $groupsData = Group::withCount('users', 'reports')->search($request->search)->paginate(20);
        return response()->json($groupsData);
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Response
     */
    public function store(CreateNewGroupRequest $request)
    {
        $userData = Group::createNewGroup($request);
        return response()->json('success');
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Response
     */
    public function show($id)
    {
        $groupData = Group::with('users')->findOrFail($id);
        return response()->json($groupData);
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Response
     */
    public function update(CreateNewGroupRequest $request, $id)
    {
        $groupData = Group::findOrFail($id);
        $groupData->update($request->only('name'));
        return response()->json('success');
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Response
     */
    public function destroy($id)
    {
        $groupData = Group::findOrFail($id);
        $groupData->users()->sync([]);
        $groupData->reports()->delete();
        $groupData->reports()->sync([]);
        $groupData->delete();
        return response()->json('success');
    }

    /**
     * Remove User From Group
     */
    public function removeUser(Request $request)
    {
        $groupData = Group::findOrFail($request->id);
        $groupData->users()->detach([$request->user_id]);
        return response()->json('success');
    }

}
