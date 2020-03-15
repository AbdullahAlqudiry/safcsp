<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Modules\User\Entities\User;

class UserAccountTest extends TestCase
{
    
    public function test_check_if_login_work_with_wrong_data()
    {
        $userData = User::first();

        $this->post(route('user.auth.login'), [
            'email' => $userData->email,
            'password' => 'passwor2d',
        ])
        ->assertStatus(422);

    }

    public function test_check_if_login_work_with_correct_data()
    {
        $userData = User::first();

        $this->post(route('user.auth.login'), [
            'email' => $userData->email,
            'password' => 'password',
        ])
        ->assertStatus(200);
    }
}
