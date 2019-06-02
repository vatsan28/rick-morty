<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\EpisodeService;
use Illuminate\Http\Request;

class EpisodeController extends BaseController {
    public function getEpisodes(Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $episodeService = new EpisodeService;
        $result = $episodeService->getEpisodes($requestParams)->wait();

        return response()->json($result);
    }

    public function getEpisodeById($id, Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $episodeService = new EpisodeService;
        $episode = $episodeService->getEpisodeById($id, $requestParams)->wait();
        $result = $this->prepareResponse($episode);
        
        return response()->json($result);
    }

    private function fetchRequestParams(Request $request) {
        $requestParams = (object)[];
        $requestParams->page = $request->get('page');
        $requestParams->name = $request->get('name');
        $requestParams->code = $request->get('code');

        return $requestParams;
    }

    private function prepareResponse($character) {
        $response = (object)[];
        $info = (object) [];
        $info->count = 1;
        $info->pages = 1;
        $info->next = "";
        $info->prev = "";
        $results = (array) [$character];
        $response->info = $info;
        $response->results = $results;
        return $response;
    }
}