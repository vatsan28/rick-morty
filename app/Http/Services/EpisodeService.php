<?php 

namespace App\Http\Services;

use \App\Http\APIClient;
use GuzzleHttp\Promise\Promise;


class EpisodeService
{
    private $apiClient;

    public function __construct() {
        $this->apiClient = new APIClient("episode");
    }

    public function getEpisodes($requestParams) {
        $getEpisodeDetails = new Promise(
            function() use (&$getEpisodeDetails, $requestParams) {
                $queryParams = (object) [];
                $queryParams->params = ["name", "episode", "page"];
                $queryParams->name = $requestParams->name;
                $queryParams->episode = $requestParams->code;
                $queryParams->page = $requestParams->page;

                $response = $this->apiClient->getData($queryParams);
                $this->apiClient->parseResponse($response, $getEpisodeDetails);
            }
        );
        
        return $getEpisodeDetails;
    }

    public function getEpisodeById($id, $requestParams) {
        $page = (int) $requestParams->page;
        
        $getEpisodeByIdDetail = new Promise(
            function() use (&$getEpisodeByIdDetail, $page, $id) {
                $requestParams = (object) [];
                $requestParams->params = ["page"];
                $requestParams->id = $id;
                $requestParams->page = $page;
                
                $response = $this->apiClient->getData($requestParams);
                $this->apiClient->parseResponse($response, $getEpisodeByIdDetail);
            }
        );
        
        return $getEpisodeByIdDetail;
    }
}
