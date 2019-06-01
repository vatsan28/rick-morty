<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\CharacterService;

class CharacterController extends BaseController {
    public function getCharacters() {
        $characterService = new CharacterService;
        
        $result = $characterService->getCharacters()->wait();
        return response()->json($result);
    }
}