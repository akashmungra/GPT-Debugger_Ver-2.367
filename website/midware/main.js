/*
document.getElementById('button').onclick = function(){
    document.getElementById('out').innerHTML = "123";
}
*/
function debug(){
    console.log("buttonClicked")
    let instructions = document.getElementById('instructions');
    let codeblock = document.getElementById('codeblock');
    if(instructions.value == "" || codeblock.value == ""){
        alert("Please enter text in both boxes");
        return;
    }
    document.getElementById('result').innerHTML = instructions.value + " " + codeblock.value;
    sessionStorage.setItem("instructions", instructions.value);
    sessionStorage.setItem("code", codeblock.value);
}