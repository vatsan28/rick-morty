<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\CharacterService;
use Illuminate\Http\Request;

class CharacterController extends BaseController {
    public function getCharacters(Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $characterService = new CharacterService;
        $result = $characterService->getCharacters($requestParams)->wait();

        return response()->json($result);
    }

    public function getCharacterById($id, Request $request) {
        $requestParams = $this->fetchRequestParams($request);
        $characterService = new CharacterService;
        $character = $characterService->getCharacterById($id, $requestParams)->wait();
        $result = $this->prepareResponse($character);
        
        return response()->json($result);
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