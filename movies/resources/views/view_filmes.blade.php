@extends('layout.layout')

@section('style')
<link rel="stylesheet" type="text/css" href="style/style.css" />
@endsection


@section('conteudo')
    <div class="container">
        <div id="header" class="row">
         
        </div>
        <div class="row">
            <div class="col-md-12" style="padding: inherit">

                <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#" id="menu-home">Home</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                      <ul class="navbar-nav">
                        
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle text-light" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categoria
                          </a>
                          <div class="dropdown-menu" id="drop-cat" aria-labelledby="navbarDropdownMenuLink">
                          </div>
                        </li>
                      </ul>
                    </div>
                    <form action="javascript:void(0)" class="form-inline">
                        <input class="form-control mr-sm-2" id="busca" type="search" placeholder="Buscar filme" aria-label="Search">
                        <button class="btn btn-success my-2 my-sm-0" id="btn-busca" type="submit">Buscar</button>
                      </form>
                </nav>

            </div>
        </div>
        <div class="row" id="box-movies"></div>

        <div class="row">
            {{-- <select class="custom-select" id="filter-movie"></select> --}}
        </div>
        <div class="row list-group" id="pagination"></div>
    </div>
@endsection

@section('script')
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
<script src="js/pagination/paginathing.js"></script>
<script src="js/listagem-filmes.js"></script>
@endsection