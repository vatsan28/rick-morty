<?php 

namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Promise\Promise;


class CharacterService
{
    public function getCharacters() {
        
        $getCharacterDetails = new Promise(
            function() use (&$getCharacterDetails) {
                $client = new Client();
                $response = $client->get("https://rickandmortyapi.com/api/character");
                $data = json_decode($response->getBody());
                $getCharacterDetails->resolve($data);
            }
        );
        
        return $getCharacterDetails;
    }
}


