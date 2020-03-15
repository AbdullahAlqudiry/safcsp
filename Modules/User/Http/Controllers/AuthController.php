<?php

namespace Modules\User\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controller;
use Modules\User\Http\Requests\LoginUserRequest;
use Modules\User\Http\Requests\CreateNewUserRequest;

class AuthController extends Controller
{

    /**
     * Login user
     * @param Request $request
     * @return Response
     */
    public function login(LoginUserRequest $request)
    {

        if (auth()->attempt(['email' => $request->email, 'password' => $request->password], false)) {

            $tokenResult = auth()->user()->createToken('Personal Access Token');
            $token = $tokenResult->token;

            return response()->json(['access_token' => $tokenResult->accessToken]);

        } 
        else {
            return response()->json([
                'message' => 'Your Email or Password incorrect',
                'errors' => [
                    'email' => ['Your Email or Password incorrect']
                ]
            ], 422);
        }

    }

    /**
     * Logout user
     * @param Request $request
     * @return Response
     */
    public function logout(Request $request)
    {
        auth()->user()->tokens()->delete();
        return response()->json('success');
    }

}
