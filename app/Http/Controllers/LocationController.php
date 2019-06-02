<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\LocationService;
use Illuminate\Http\Request;

class LocationController extends BaseController {
    public function getLocations(Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $locationService = new LocationService;
        $result = $locationService->getLocations($requestParams)->wait();

        return response()->json($result);
    }

    public function getLocationById($id, Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $locationService = new LocationService;
        $location = $locationService->getLocationById($id, $requestParams)->wait();
        $result = $this->prepareResponse($location);
        
        return response()->json($result);
    }

    private function fetchRequestParams(Request $request) {
        $requestParams = (object)[];
        $requestParams->page = $request->get('page');
        $requestParams->name = $request->get('name');

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