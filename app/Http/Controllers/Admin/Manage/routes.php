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

        $route->prefix('user')->as('user.')->controller(UserController::class)->group(function ($route) {
            $route->get('/', 'index')->name('index');
            $route->post('/store', 'store')->name('store');
            $route->put('/update/{userId}', 'update')->name('update');
            $route->delete('/delete/{userId}', 'delete')->name('delete');
            $route->delete('/update-status', 'updateStatus')->name('update_status');
        });
    });
