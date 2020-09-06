<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class apiController extends Controller
{
    public function getView(){
        return view('view_filmes');
    }

    public function getApi(Request $request){

<<<<<<< Updated upstream
        // cod 1 CARREGA AS CATEGORIAS DO MENU
        // cod 2 CARREGA LISTA DE ACORDO COM CRITERIO DIGITADO PELO USUARIO
        // cod 4 BUSCA OS GENEROS

        if($request->cod == 1):
            
            $qry_str = "?api_key=4ec327e462149c3710d63be84b81cf4f&language=pt-BR";
            $ch = curl_init('https://api.themoviedb.org/3/genre/movie/list'.$qry_str);   
            
        elseif($request->cod == 2): 

            $qry_str = "?api_key=4ec327e462149c3710d63be84b81cf4f&sort_by=title.asc&language=pt-BR&query=".$request->criterio;
            $ch = curl_init('https://api.themoviedb.org/3/search/movie'.$qry_str);

        elseif($request->cod == 3): 

            if(!empty($request->genre)){
                $genre = "&with_genres=".$request->genre;
            }else{
                $genre = "";
            }

            $qry_str = "?api_key=4ec327e462149c3710d63be84b81cf4f&language=pt-BR&sort_by=title.asc&include_adult=false&include_video=false&page=".$request->page.$genre;
            $ch = curl_init('https://api.themoviedb.org/3/discover/movie'.$qry_str);

        elseif($request->cod == 4): 

            $qry_str = '?api_key=4ec327e462149c3710d63be84b81cf4f&language=pt-BR';
            $ch = curl_init('https://api.themoviedb.org/3/genre/movie/list'.$qry_str);  

        endif;
        
        // CHAMADA API
            curl_setopt($ch, CURLOPT_HTTPGET, true);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response_json = curl_exec($ch);
            curl_close($ch);
            $response=json_decode($response_json, true);

            return response()->json([
                'dados'=>$response,
                'url'=>$qry_str
            ]);
=======
        $qry_str = "?api_key=4ec327e462149c3710d63be84b81cf4f&sort_by=title.asc&language=pt-BR&query=".$request->criterio;
        $ch = curl_init('https://api.themoviedb.org/3/search/movie'.$qry_str);
        curl_setopt($ch, CURLOPT_HTTPGET, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response_json = curl_exec($ch);
        curl_close($ch);
        $response=json_decode($response_json, true);

        return response()->json([
            'dados'=>$response
        ]);
>>>>>>> Stashed changes
          
    }
}
