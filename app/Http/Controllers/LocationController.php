<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\LocationService;
use Illuminate\Http\Request;

class LocationController extends BaseController {
    private $LocationService;
    public function __construct(LocationService $locationService) {
        $this->locationService = $locationService;
    }
    public function getLocations(Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $result = $this->locationService->getLocations($requestParams);

        try {
            $data = $result->wait();
            return response()->json($data);
        } catch (\GuzzleHttp\Promise\RejectionException $e){
            if ($e->getReason() == 404) {
                return response()->json("No data found.", 404);
            }else{
                return response()->json($e->getReason());
            };
        }
    }

    public function getLocationById($id, Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $result = $this->locationService->getLocationById($id, $requestParams);
        
        try {
            $locations = $result->wait();
            $data = $this->prepareResponse($locations);
            return response()->json($data);
        } catch (\GuzzleHttp\Promise\RejectionException $e){
            if ($e->getReason() == 404) {
                return response()->json("No data found.", 404);
            }else{
                return response()->json($e->getReason());
            };
        }
    }

    private function fetchRequestParams(Request $request) {
        $requestParams = (object)[];
        $requestParams->page = $request->get('page');
        $requestParams->name = $request->get('name');
        $requestParams->type = $request->get('type');
        $requestParams->dimension = $request->get('dimension');
        
        return $requestParams;
    }

    private function prepareResponse($location) {
        $response = (object)[];
        $info = (object) [];
        $info->count = 1;
        $info->pages = 1;
        $info->next = "";
        $info->prev = "";
        $results = (array) [$location];
        $response->info = $info;
        $response->results = $results;
        return $response;
    }
}