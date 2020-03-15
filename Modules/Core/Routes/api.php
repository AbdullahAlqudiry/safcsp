<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:api'], 'prefix' => 'core', 'as' => 'core.'], function () {

    Route::resource('/roles', 'RolesController');

    Route::resource('/groups', 'GroupsController');
    Route::delete('/groups/remove-user/{id}/{user_id}', 'GroupsController@removeUser')->name('groups.remove-user');

    Route::get('/users/roles', 'UsersController@roles')->name('users.roles');
    Route::get('/users/groups', 'UsersController@groups')->name('users.groups');
    Route::resource('/users', 'UsersController');
    Route::delete('/users/remove-group/{id}/{group_id}', 'UsersController@removeGroup')->name('users.remove-group');

});
