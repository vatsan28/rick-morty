<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use App\Http\Services\CharacterService;
use Illuminate\Http\Request;

class CharacterController extends BaseController {
    public function getCharacters(Request $request) {
        $page = $request->get('page');
        $characterService = new CharacterService;
        
        $result = $characterService->getCharacters($page)->wait();
        return response()->json($result);
    }
}