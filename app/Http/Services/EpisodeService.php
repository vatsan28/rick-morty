<?php 

namespace App\Http\Services;

use GuzzleHttp\Client;
use GuzzleHttp\Promise\Promise;


class EpisodeService
{
    public function getEpisodes($requestParams) {
        $getEpisodeDetails = new Promise(
            function() use (&$getEpisodeDetails, $requestParams) {
                $client = new Client();
                list($name, $page, $code) = $this->getRequestParams($requestParams);
                $url = "https://rickandmortyapi.com/api/episode/?page={$page}&name={$name}&episode={$code}";
                $response = $client->get($url);
                $data = json_decode($response->getBody());
                $getEpisodeDetails->resolve($data);
            }
        );
        
        return $getEpisodeDetails;
    }

    public function getEpisodeById($id, $requestParams) {
        $page = (int) $requestParams->page;
        print_r($page, $id);
        
        $getEpisodeByIdDetail = new Promise(
            function() use (&$getEpisodeByIdDetail, $page, $id) {
                $client = new Client();
                $response = $client->get("https://rickandmortyapi.com/api/episode/{$id}/?page={$page}");
                $data = json_decode($response->getBody());
                $getEpisodeByIdDetail->resolve($data);
            }
        );
        
        return $getEpisodeByIdDetail;
    }

    private function getRequestParams($requestParams) {
        $name = (string) $requestParams->name;
        $code = (string) $requestParams->code;
        $page = (int) $requestParams->page;
        return array($name, $page, $code);
    }
}


