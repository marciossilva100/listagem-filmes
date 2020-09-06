// FUNCAO QUE RETORNA OS GENEROS
function getGenre($id){
        
    var genres = [
        {
        "id": 28,
        "name": "Ação"
    },
    {
        "id": 12,
        "name": "Aventura"
    },
    {
        "id": 16,
        "name": "Animação"
    },
    {
        "id": 35,
        "name": "Comédia"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentário"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Família"
    },
    {
        "id": 14,
        "name": "Fantasia"
    },
    {
        "id": 36,
        "name": "História"
    },
    {
        "id": 27,
        "name": "Terror"
    },
    {
        "id": 10402,
        "name": "Música"
    },
    {
        "id": 9648,
        "name": "Mistério"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Ficção científica"
    },
    {
        "id": 10770,
        "name": "Cinema TV"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "Guerra"
    },
    {
        "id": 37,
        "name": "Faroeste"
    }
    
    ];
    i = 0;
    while(i<genres.length){
        if($id == genres[i].id){
            var genero = genres[i].name;
            break;
        }
                   i++;
    }
    console.log($id);
     
    return genero;
}

// FUNCAO QUE RETORNA O FILME DIGITADO PELO USUARIO
function busca(criterio){
    $.ajax({
        url:'list-movies?cod=2',
        type:'POST',
        data:'criterio='+criterio,
        dataType:'json',
        success: function(result){
            // obj = JSON.parse(result);
            // console.log(result.dados[0].original_title);
            console.log(result.dados.results);
            
            html = "";
            for($i=0;$i<result.dados.results.length;$i++){
                if(codGenre == ''){
                    codGenero = result.dados.results[$i].genre_ids[0];
                    generoText = getGenre(codGenero);
                }else{
                    
                    generoText = getGenre(codGenre);
                }

                // data_release = result.dados.results[$i].release_date.replace("-","/");
                    data_release = result.dados.results[$i].release_date.substr(0, 10).split('-').reverse().join('/');

                    // titulo = result.dados.results[$i].title.replace('&','#')
                    titulo = result.dados.results[$i].title.replace('#','^')

                // CONSTROI O HTML PARA A LISTA
                html += '<div class="col-md-6">';
                html +='<div class="card mb-3" style="max-width: 540px;">';
                html +='<div class="row no-gutters">';
                html +='<div class="col-md-4">';
                html +='<a href="detalhe-movie?poster='+result.dados.results[$i].poster_path+'&title='+titulo+'&overview='+result.dados.results[$i].overview+'&genero='+generoText+'&data='+data_release+'"><img src="https://image.tmdb.org/t/p/w500'+result.dados.results[$i].poster_path+'" class="card-img" alt="..."></a>';
                html +='</div>';
                html +='<div class="col-md-8">';
                html +='<div class="card-body">';
                html +='<h5 class="card-title h3">'+titulo+'</h5>';
                html +='<p class="card-text">'+result.dados.results[$i].overview.replace(/^(.{190}[^\s]*).*/, "$1")+'<a href="detalhe-movie?poster='+result.dados.results[$i].poster_path+'&title='+titulo+'&overview='+result.dados.results[$i].overview+'&genero='+generoText+'&data='+data_release+'">...leia mais</a></p>';
                html +='<strong><p class="card-text ">'+generoText+'</p></strong>';
                html +='<p class="card-text"><small class="text-muted">Lançamento em '+data_release+'</small></p>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
                html +='</div>';
            
            }          

            $('#box-movies').html(html); 
 
        },
        error: function(result){  
            console.log('erro no console 2');
        }
    });
}

// FUNCAO PARA PAGINACAO
function carregarPaginacao(genero,pagina){

    if(genero == '' || genero == 0){
            genero = '';
    }
    $(document).on("click", ".page a,.first,.last", function () {
        pagina = $(this).text();
        console.log(pagina);

        if(pagina == "First") pagina = 1;
        if(pagina == "Last") pagina = 500;
        // genero = '&with_genres=28';
        carregarMovies(genero,pagina);
    });

    $('.list-group').paginathing({
        perPage: 5,
        limitPagination: 9,
        containerClass: 'panel-footer',
        pageNumbers: true
    });

}

// FUNCAO PARA LISTAR OS FILMES NA PAGINA
function carregarMovies(genero,pagina){

    if(genero == '' || genero == 0){
        genero = '';
        codGenre = genero;
    }else{
        codGenre = genero;
        // genero = '&with_genres='+genero;
    }
        console.log('aqui '+pagina+' e '+genero)
    // return false

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });
    $.ajax({
        url:'list-movies?&cod=3&page='+pagina+'&genre='+genero,
        type:'POST',
        dataType:'json',
        success: function(result){

            console.log(result.dados.results[0].original_title+' foi aqui');          
            console.log(result.url+' foi aqui');          
            html = "";
                for($i=0;$i<result.dados.results.length;$i++){
                    if(codGenre == ''){
                        codGenero = result.dados.results[$i].genre_ids[0];
                        generoText = getGenre(codGenero);
                    }else{
                        
                        generoText = getGenre(codGenre);
                    }
                    data_release = result.dados.results[$i].release_date.substr(0, 10).split('-').reverse().join('/');
                    // titulo = result.dados.results[$i].title
                    titulo = result.dados.results[$i].title.replace('#','^')

                    // CONSTROI O HTML
                    html += '<div class="col-md-6">';
                    html +='<div class="card mb-3" style="max-width: 540px;">';
                    html +='<div class="row no-gutters">';
                    html +='<div class="col-md-4">';
                    html +='<a href="detalhe-movie?poster='+result.dados.results[$i].poster_path+'&title='+titulo+'&overview='+result.dados.results[$i].overview+'&genero='+generoText+'&data='+data_release+'"><img src="https://image.tmdb.org/t/p/w500'+result.dados.results[$i].poster_path+'" class="card-img" alt="..."></a>';
                    html +='</div>';
                    html +='<div class="col-md-8">';
                    html +='<div class="card-body">';
                    html +='<h5 class="card-title h3">'+result.dados.results[$i].title+'</h5>';
                    html +='<p class="card-text">'+result.dados.results[$i].overview.replace(/^(.{190}[^\s]*).*/, "$1")+'<a href="detalhe-movie?poster='+result.dados.results[$i].poster_path+'&title='+titulo+'&overview='+result.dados.results[$i].overview+'&genero='+generoText+'&data='+data_release+'">...leia mais</a></p>';
                    html +='<strong><p class="card-text ">'+generoText+'</p></strong>';
                    html +='<p class="card-text"><small class="text-muted">Lançamento em '+data_release+' </small></p>';
                    html +='</div>';
                    html +='</div>';
                    html +='</div>';
                    html +='</div>';
                    html +='</div>';
            
                }          

            $('#box-movies').html(html); 
 
        },
            error: function(result){  
                console.log('erro no console 3');
            }
        });
}    

valor = '';
pagina = '1';
carregarMovies(valor,pagina);
carregarPaginacao(valor,pagina);

$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
    }
});

//   CARREGA AS CATEGORIAS NO MENU
$.ajax({
    url:'list-movies?cod=1',
    type:'POST',
    dataType:'json',
    success: function(result){
        console.log(result.dados)
        html = '<a class="dropdown-item option-movie" href="#" valor="0">Todos</a>';
        for($i=0;$i<result.dados.genres.length;$i++){
            // html += '<option value="'+result.genres[$i].id+'">'+result.genres[$i].name+'</option>';
            html += '<a class="dropdown-item option-movie" href="#" valor="'+result.dados.genres[$i].id+'">'+result.dados.genres[$i].name+'</a>';

        }          
        
        $('#drop-cat').html(html); 
        // $('#filter-movie').html(html); 
        
    },
    error: function(result){

        console.log('erro no console');
    }
});

// CHAMA A FUNCAO PARA FAZER A BUSCA 
$('#btn-busca').click(function(){
    criterio = $('#busca').val();
    busca(criterio);
});   

// CATEGORIAS DO MENU
$(document).on("click", ".option-movie", function () {
    $('#pagination').empty();
    $('.panel-footer').remove();
    valor = $(this).attr('valor');
    console.log('o valor é'+valor)
    valorText = $(this).text();        
    pagina = 1;
    carregarMovies(valor,pagina);
    carregarPaginacao(valor,pagina);
});

// recarrega a pagina
$('#menu-home').click(function(){
    window.location.reload(true)
})
