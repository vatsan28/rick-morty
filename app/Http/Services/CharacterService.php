<?php 

namespace App\Http\Services;

use \App\Http\APIClient;
use GuzzleHttp\Promise\Promise;


class CharacterService
{
    private $apiClient;

    public function __construct() {
        $this->apiClient = new APIClient("character");
    }

    public function getCharacters($requestParams) {
        $getCharacterDetails = new Promise(
            function() use (&$getCharacterDetails, $requestParams) {
                $queryParams = (object) [];
                $queryParams->params = ["page", "name"];
                $queryParams->page = $requestParams->page;
                $queryParams->name = $requestParams->name;
                
                $response = $this->apiClient->getData($queryParams);
                $this->apiClient->parseResponse($response, $getCharacterDetails);
            }
        );
        return $getCharacterDetails;
    }

    public function getCharacterById($id, $requestParams) {
        $page = (int) $requestParams->page;
        
        $getCharacterByIdDetail = new Promise(
            function() use (&$getCharacterByIdDetail, $page, $id) {
                $requestParams = (object) [];
                $requestParams->params = ["page"];
                $requestParams->id = $id;
                $requestParams->page = $page;
                
                $response = $this->apiClient->getData($requestParams);
                $this->apiClient->parseResponse($response, $getCharacterByIdDetail);
            }
        );
        
        return $getCharacterByIdDetail;
    }
}
