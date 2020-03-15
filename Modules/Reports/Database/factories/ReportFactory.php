<?php 

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use Modules\Reports\Entities\Report;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(Report::class, function (Faker $faker) {
    return [
        'user_id' => 1,
        'title' => $faker->sentence(5),
        'content' => $faker->sentence(rand(90, 200)),
    ];
});
