
$(document).ready(function(){
    $("#movieForm").submit(function(event){
        event.preventDefault()

        var title = $("#inputTitre").val()
        title = title.charAt(0).toUpperCase() + title.slice(1);
        var year = $("#inputAnnée").val()         
        
        var result = ""

        //https://omdbapi.com/?apikey=5b522634&t=${title}&${season}&Episode=1&${year}

        $.ajax({
            method:'GET',
            url:`https://www.omdbapi.com/?apikey=5b522634&t=${title}&y=${year}`,
            success:function(data){
                console.log(data);

                result =`
                <div>
                    <img src="${data.Poster}" class="img-thumnail" width="250" height="250"/>
                </div>
                <div class = "movie-info">    
                    <h3>${data.Title}</h3>
                    <h3>${data.Year}</h3>
                </div>        
                `;
                $("#result").html(result)
            }
        })   
    })
})
