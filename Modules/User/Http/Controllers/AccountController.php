<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Requests\UpdateUserAccountRequest;

class AccountController extends Controller
{

    /**
     * Get User Data
     * @param Request $request
     * @return Response
     */
    public function index(Request $request)
    {
        $userData = [
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'role' => $request->user()->roles->first()->name,
            'permissions' => $request->user()->getAllPermissionsNames(),
            'created_at' => $request->user()->created_at,
        ];
        return response()->json($userData, 200);
    }

    /**
     * Update User Account
     * @param Request $request
     * @return Response
     */
    public function update(UpdateUserAccountRequest $request)
    {
        $request->merge([
            'password' => bcrypt($request->password),
        ]);
        $userData = $request->user()->update($request->only('password'));
        return response()->json('success', 200);
    }


}
