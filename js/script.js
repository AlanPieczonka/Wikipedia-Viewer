console.log("JS file works!");

const buttonSearch = document.getElementsByClassName('button-search')[0];
const input = document.getElementsByTagName('input')[0];

buttonSearch.addEventListener("click", () => {
        
    search();
 
});

input.addEventListener("keyup", (e) => {
    
    if(e.keyCode == 13){
            search();
    }

});

const search = () => { 
    if($(".results").find("div")){
        
        console.log(".results div exists, remove it");
        
        $(".results").find("div").remove(); //prevents having a stack of divs 
        ajaxCall(input.value);
        input.select(); 
        
    }   
};


const ajaxCall = (searchValue) => {  
    
        var html = '';
        let ahref = '';
    
        $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+ searchValue + '&limit=6&suggest=1&redirects=return&callback=ttt',
        jsonp: "callback",
        dataType: "jsonp",
        success: function(data) {
            console.log(data);
            if(data[1].length>=1){
                
                  for(let j=0; j<data[2].length; j++){
                      ahref = '<p><a target="_blank" href="' + data[3][j] + '">'+ data[3][j] +'</a></p>';
                      console.log("href " + ahref);
                      html  =  '<div>' + '<h2>' + data[1][j] + '</h2>' + '<p>' + data[2][j] + '</p>' + ahref +  '</div>';
                      console.log(html);
                      $(".results").append(html);  
                      
                }
            }
            else{
                html = '<div><h2>No results! Try something else!</h2></div>';
                console.log(html);
                $(".results").append(html); 
            }


        },
        
        error: function(){
        alert("Error!");
    }
        
    });
};