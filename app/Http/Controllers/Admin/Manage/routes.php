<?php

use App\Http\Controllers\Admin\Manage\User\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('manage')->as('manage.')->middleware('auth')
    ->group(function ($route) {

        $route->prefix('users')->as('users.')->controller(UserController::class)->group(function ($route) {
            $route->get('/', 'index')->name('index');
            $route->post('/update-status', 'updateStatus')->name('update_status');
        });
    });
