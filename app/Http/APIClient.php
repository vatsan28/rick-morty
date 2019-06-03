<?php

namespace App\Http;

use GuzzleHttp\Client;
use GuzzleHttp\Promise\Promise;

class APIClient 
{
    private $resource;
    private $url = "https://rickandmortyapi.com/api";
    private $client;
    public function __construct($resource) {
        $this->client = new Client(['http_errors' => false]);
        $this->resource = $resource;
    }

    /*
    1. Make API call.
    2. Parse Response
    */

    public function getData($params) {
        if (property_exists($params, "id")){
            $id = (int) $params->id;
            $page = (int) $params->page;
            $finalUrl = "{$this->url}/{$this->resource}/{$id}/?page={$page}";
        } else {
            $queryString = $this->getQueryString($params);
            $finalUrl = "{$this->url}/{$this->resource}/{$queryString}";
        }
        $response = $this->client->get($finalUrl);
        return $response;
    }

    public function parseResponse($response ,$promise) {
        $statusCode = $response->getStatusCode();
        $reasonPhrase = $response->getReasonPhrase();
        $body = $response->getBody();

        if ($statusCode == 404) {
            $promise->reject(404);
        } else if ($statusCode == 200) {
            $data = json_decode($response->getBody());
            $promise->resolve($data);
        } else {
            $promise->reject($statusCode);
        }
    }

    private function getQueryString($requestParams) {
        $queryString = "?";
        $params = $requestParams->params;
        foreach ($params as $p) {
            $paramString = "{$p}={$requestParams->$p}&";
            $queryString = $queryString.$paramString;    
        }
        $queryString = (rtrim($queryString, '&'));
        
        return $queryString;
    }
}