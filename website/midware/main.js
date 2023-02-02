const socket = io("http://localhost:5000");
let c = -1;

socket.on("gtp", (text)=>{
    // let o = document.getElementById('res');
    console.log("recieved text");
    // o.innerHTML = text;
    document.getElementById("output").innerHTML = text;
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
    sessionStorage.setItem('i', instructions.value);
    sessionStorage.setItem('c', codeblock.value);
    
    socket.emit("m", {i: instructions.value, c: codeblock.value});
    document.getElementById("output").innerHTML = "Generating response..."
}


//pull history array from sessionStorage and display for history.html
function addPrompts(){
    hList = JSON.parse(sessionStorage.getItem('history'));
    hList.forEach(e => {
        let curI = document.createTextNode("Instructions: " + e.i);
        let curC = document.createTextNode("Code: " + e.c);
        let curO = document.createTextNode("Output: " + e.o);
        let curs = [curI, curC, curO];

        let pI = document.createElement("p");
        let pC = document.createElement("p");
        let pO = document.createElement("p");

        
        let prompts = [pI, pC, pO];
        let c = -1;
        prompts.forEach(p => {
            p.className = "p" + (++c+1);
            p.style = "white-space: pre-line";
            p.appendChild(curs[c]);
            document.getElementById("promptList").appendChild(p);
        })
        document.getElementById("promptList").appendChild(document.createElement("br"));
        let outputs = document.getElementsByClassName("p3");
        for(let i = 0; i < outputs.length; i++){
            outputs[i].addEventListener('click', copyText);
        }
        console.log(outputs)
    })
}

function copyText(){ 
    if(this.innerHTML == ""){
        return;
    }
    navigator.clipboard.writeText(this.innerHTML);
    alert("Output copied to clipboard.")
}

function copyOutput(){
    document.getElementById("output").addEventListener('click', copyText);
}