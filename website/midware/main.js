const socket = io("http://localhost:5000");
let c = -1;

socket.on("gtp", (text)=>{
    let o = document.getElementById('res');
    console.log("recieved text");
    o.innerHTML = text;
});
function handleTabs(e){
    if (e.key == 'Tab') {
        e.preventDefault();
        var start = this.selectionStart;
        var end = this.selectionEnd;

        // set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) +
        "\t" + this.value.substring(end);

        // put caret at right position again
        this.selectionStart =
        this.selectionEnd = start + 1;
    }
}
document.getElementById('codeblock').addEventListener('keydown', handleTabs);
document.getElementById('instructions').addEventListener('keydown', handleTabs);

function debug(){
    let instructions = document.getElementById('instructions');
    let codeblock = document.getElementById('codeblock');
    if(instructions.value == "" || codeblock.value == ""){
        alert("Please enter text in both boxes");
        return;
    }
    socket.emit("m", {i: instructions.value, c: codeblock.value});

    sessionStorage.setItem("instructions", instructions.value);
    sessionStorage.setItem("code", codeblock.value);
}

socket.on("output", (m)=>{
    if(m <= 2){
        socket.emit("alert", ++m);
        console.log("from server:", "asdf");
    }
});


