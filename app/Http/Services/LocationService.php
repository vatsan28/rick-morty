<?php 

namespace App\Http\Services;

use \App\Http\APIClient;
use GuzzleHttp\Promise\Promise;


class LocationService
{
    private $apiClient;

    public function __construct() {
        $this->apiClient = new APIClient("location");
    }

    public function getLocations($requestParams) {
        $getLocationDetails = new Promise(
            function() use (&$getLocationDetails, $requestParams) {
                $queryParams = (object) [];
                $queryParams->params = ["page", "name", "type", "dimension"];
                $queryParams->page = $requestParams->page;
                $queryParams->name = $requestParams->name;
                $queryParams->type = $requestParams->type;
                $queryParams->dimension = $requestParams->dimension;
                
                $response = $this->apiClient->getData($queryParams);
                $this->apiClient->parseResponse($response, $getLocationDetails);
            }
        );
        
        return $getLocationDetails;
    }

    public function getLocationById($id, $requestParams) {
        $page = (int) $requestParams->page;
        
        $getLocationByIdDetail = new Promise(
            function() use (&$getLocationByIdDetail, $page, $id) {
                $requestParams = (object) [];
                $requestParams->params = ["page"];
                $requestParams->id = $id;
                $requestParams->page = $page;
                
                $response = $this->apiClient->getData($requestParams);
                $this->apiClient->parseResponse($response, $getLocationByIdDetail);
            }
        );
        
        return $getLocationByIdDetail;
    }
}
