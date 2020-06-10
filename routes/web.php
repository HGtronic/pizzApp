<?php

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

Route::get('/', 'HomeController@index');
Route::get('/get-products', 'HomeController@get_products');
Route::post('/post-order', 'HomeController@post_order');


Route::group(['prefix' => '/cart'], function () {
    Route::get('index', 'CartController@index')->name('cart_index');
});

