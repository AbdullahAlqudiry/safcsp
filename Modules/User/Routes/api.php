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

Route::group(['prefix' => 'user', 'as' => 'user.'], function () {

    Route::group(['prefix' => 'auth', 'as' => 'auth.'], function () {
        Route::post('/login', 'AuthController@login')->name('login');        
    });


    Route::group(['middleware' => 'auth:api'], function () {

        Route::group(['prefix' => 'auth', 'as' => 'auth.'], function () {
            Route::post('/logout', 'AuthController@logout')->name('logout');
        });

        Route::group(['prefix' => 'my-account', 'as' => 'my-account.'], function () {
            Route::get('/', 'AccountController@index')->name('index');
            Route::put('/', 'AccountController@update')->name('update');
        });

    });

});
