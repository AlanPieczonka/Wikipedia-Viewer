console.log("JS file works!");

const inp = document.getElementsByTagName('input')[0];
const buttonSearch = document.getElementsByClassName('button-search')[0];
let inputValue = '';
let html1 = '';
let href = '';
buttonSearch.addEventListener("click", function(){
    
    inputValue = document.getElementsByTagName('input')[0];
    
    console.log("inputValue = " + inputValue.value);
    
    search(inputValue.value);
    inputValue.select();
    
});

//enter button - the same function 


function search(searchValue){
    
    /*
    var element = document.getElementById("element-id");
element.parentNode.removeChild(element);
*/
    console.log("Find ");
    console.log(searchValue);
    
        $.ajax({
        url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+ searchValue + '&limit=6&suggest=1&redirects=return&callback=ttt',
        jsonp: "callback",
        dataType: "jsonp",
        success: function( data ) {
            console.log(data);
            console.log(data[1].length);
            console.log(data[2].length);
                
              for(let j=0; j<data[2].length; j++){
                  href = '<p><a href="' + data[3][j] + '">'+ data[3][j] +'</a></p>';
                  console.log("href " + href);
                   html1  =  '<div>' + '<h2>' + data[1][j] + '</h2>' + '<p>' + data[2][j] + '</p>' + href +  '</div>';
                  console.log(html1);
                   $(".less").append(html1);
                  
                }
            
            
        },
        
        error: function(){
        alert("Error!");
    }
        
    });
}