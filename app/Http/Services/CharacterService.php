<?php 

namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Promise\Promise;


class CharacterService
{
    public function getCharacters($requestParams) {
        $getCharacterDetails = new Promise(
            function() use (&$getCharacterDetails, $requestParams) {
                $client = new Client();
                list($name, $page) = $this->getRequestParams($requestParams);
                $url = "https://rickandmortyapi.com/api/character/?page={$page}&name={$name}";
                $response = $client->get($url);
                $data = json_decode($response->getBody());
                $getCharacterDetails->resolve($data);
            }
        );
        
        return $getCharacterDetails;
    }

    public function getCharacterById($id, $requestParams) {
        $page = (int) $requestParams->page;
        print_r($page, $id);
        
        $getCharacterByIdDetail = new Promise(
            function() use (&$getCharacterByIdDetail, $page, $id) {
                $client = new Client();
                $response = $client->get("https://rickandmortyapi.com/api/character/{$id}/?page={$page}");
                $data = json_decode($response->getBody());
                $getCharacterByIdDetail->resolve($data);
            }
        );
        
        return $getCharacterByIdDetail;
    }

    private function getRequestParams($requestParams) {
        $name = (string) $requestParams->name;
        $page = (int) $requestParams->page;
        return array($name, $page);
    }
}


