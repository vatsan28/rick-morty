<?php 

namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Promise\Promise;


class LocationService
{
    public function getLocations($requestParams) {
        $getLocationDetails = new Promise(
            function() use (&$getLocationDetails, $requestParams) {
                $client = new Client();
                list($name, $page) = $this->getRequestParams($requestParams);
                $url = "https://rickandmortyapi.com/api/location/?page={$page}&name={$name}";
                $response = $client->get($url);
                $data = json_decode($response->getBody());
                $getLocationDetails->resolve($data);
            }
        );
        
        return $getLocationDetails;
    }

    public function getCharacterById($id, $requestParams) {
        $page = (int) $requestParams->page;
        print_r($page, $id);
        
        $getLocationByIdDetail = new Promise(
            function() use (&$getLocationByIdDetail, $page, $id) {
                $client = new Client();
                $response = $client->get("https://rickandmortyapi.com/api/location/{$id}/?page={$page}");
                $data = json_decode($response->getBody());
                $getLocationByIdDetail->resolve($data);
            }
        );
        
        return $getLocationByIdDetail;
    }

    private function getRequestParams($requestParams) {
        $name = (string) $requestParams->name;
        $page = (int) $requestParams->page;
        return array($name, $page);
    }
}


