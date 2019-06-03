<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\EpisodeService;
use Illuminate\Http\Request;

class EpisodeController extends BaseController {
    private $EpisodeService;
    public function __construct(EpisodeService $episodeService) {
        $this->episodeService = $episodeService;
    }

    public function getEpisodes(Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $result = $this->episodeService->getEpisodes($requestParams);

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

    public function getEpisodeById($id, Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $result = $this->episodeService->getEpisodeById($id, $requestParams);
        
        try {
            $episodes = $result->wait();
            $data = $this->prepareResponse($episodes);
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