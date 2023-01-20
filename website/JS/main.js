/*
document.getElementById('button').onclick = function(){
    document.getElementById('out').innerHTML = "123";

}
//change1
*/
document.getElementById('button').addEventListener("click", display);

function display(){
    let form = document.getElementById('f').elements;
    document.getElementById('out').innerHTML = "BUTTON CLICKED";
}


let myButton = document.getElementById('button');
myButton.style.height = '100px';
myButton.style.width= '100px';
function formHandle(){
    let form = document.getElementById('f').elements;
    for(let i = 1; i < 6; ++i){
        sessionStorage.setItem("item"+i, form[i-1].value);
    }
}
