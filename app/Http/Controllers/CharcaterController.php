<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\CharacterService;
use Illuminate\Http\Request;

class CharacterController extends BaseController {
    private $characterService;
    public function __construct(CharacterService $characterService) {
        $this->characterService = $characterService;
    }
    
    public function getCharacters(Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        
        $result = $this->characterService->getCharacters($requestParams);
        
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

    public function getCharacterById($id, Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $characterService = new CharacterService;
        $result = $this->characterService->getCharacterById($id, $requestParams);
        
        try {
            $characters = $result->wait();
            $data = $this->prepareResponse($characters);
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