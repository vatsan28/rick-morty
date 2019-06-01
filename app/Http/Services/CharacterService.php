<?php 

namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Promise\Promise;


class CharacterService
{
    public function getCharacters($page) {
        // print_r($page);
        $getCharacterDetails = new Promise(
            function() use (&$getCharacterDetails, $page) {
                $client = new Client();
                $response = $client->get("https://rickandmortyapi.com/api/character/?page={$page}");
                $data = json_decode($response->getBody());
                $getCharacterDetails->resolve($data);
            }
        );
        
        return $getCharacterDetails;
    }
}


