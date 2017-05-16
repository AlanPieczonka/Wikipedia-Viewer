console.log("JS file works!");

let input = document.getElementsByTagName('input')[0];
const buttonSearch = document.getElementsByClassName('button-search')[0];
let inputValue = '';
let html1 = '';
let href = '';

buttonSearch.addEventListener("click", function(){
        
    search();
 
});

input.addEventListener("keyup", function(e){
    
    if(e.keyCode == 13){
            search();
    }

});

    


function search(){ 
    if($(".results").find("div")){
        
        console.log(".results div exists, remove it");
        
        $(".results").find("div").remove(); //prevents having a stack of divs 
        ajaxCall(input.value);
        input.select(); 
        
    }   
};


function ajaxCall(searchValue){  
        $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+ searchValue + '&limit=6&suggest=1&redirects=return&callback=ttt',
        jsonp: "callback",
        dataType: "jsonp",
        success: function( data ) {
            console.log(data);
              for(let j=0; j<data[2].length; j++){
                  href = '<p><a href="' + data[3][j] + '">'+ data[3][j] +'</a></p>';
                  console.log("href " + href);
                  html1  =  '<div>' + '<h2>' + data[1][j] + '</h2>' + '<p>' + data[2][j] + '</p>' + href +  '</div>';
                  console.log(html1);
                  $(".results").append(html1);
                }
        },
        
        error: function(){
        alert("Error!");
    }
        
    });
};