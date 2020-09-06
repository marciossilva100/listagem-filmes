@extends('layout.layout')

<?php
extract($_GET);
  $title = str_replace("^","#",$title);
?>
@section('conteudo')
<div class="container">
        
    <div class="row" style="margin-top: 100px">
        
        <div class="col-md-2">
            <a href="list-movies" class="btn btn-primary">Retornar</a>
        </div>
        <div class="col-md-8">
        <div class="card mb-6" >
            <div class="row no-gutters">
              <div class="col-md-4">
              <img src="https://image.tmdb.org/t/p/w500{{$poster}}" class="card-img" alt="...">
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">{{$title}}</h5>
                <p class="card-text">{{$overview ?? ''}}</p>
                <p class="card-text"><strong>{{$genero ?? ''}}</strong></p>
                <p class="card-text"><small class="text-muted">Lançamento em {{$data ?? ''}}</small></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2"></div>
    </div>
</div>
@endsection