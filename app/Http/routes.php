<?php

use React\Promise\Deferred;
/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', 'Controller@index');
$router->get('/character/', 'CharacterController@getCharacters');
$router->get('/character/{id}', 'CharacterController@getCharacterById');
$router->get('/location/', 'LocationController@getLocations');
$router->get('/location/{id}', 'LocationController@getLocationById');
$router->get('/episode/', 'EpisodeController@getEpisodes');
$router->get('/episode/{id}', 'EpisodeController@getEpisodeById');
