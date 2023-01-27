const socket = io("http://localhost:5000");
let hList;

//recieves output data from socket and displays it on home.html
//stores output/input data for history.html
socket.on("gtp", (text)=>{
    console.log("recieved text");

    hList = JSON.parse(sessionStorage.getItem('history'));
    hList.push({
        i: sessionStorage.getItem('i'),
        c: sessionStorage.getItem('c'),
        o: text
    });
    console.log(hList);
    sessionStorage.setItem('history', JSON.stringify(hList));
    console.log(sessionStorage.getItem('history'));
    document.getElementById("output").innerHTML = text;
});


//helper function for below
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

//called in main.js to handle tabs
function callTabs(){
    document.getElementById('codeblock').addEventListener('keydown', handleTabs);
    document.getElementById('instructions').addEventListener('keydown', handleTabs);
}

//send input information through the socket
function debug(){
    console.log("buttonClicked")
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
    console.log(hList);
    hList.forEach(e => {
        let curI = document.createTextNode("Instructions: " + e.i);
        let curC = document.createTextNode("Code: " + e.c);
        let curO = document.createTextNode("Output: " + e.o);
        curs = [curI, curC, curO];

        let pI = document.createElement("p");
        let pC = document.createElement("p");
        let pO = document.createElement("p");

        
        let prompts = [pI, pC, pO];
        let c = -1;
        prompts.forEach(p => {
            console.log("Loop #", c+2);
            p.className = "p" + (++c+1);
            console.log(p === prompts[c+1]);
            console.log("p.className:", p.className);
            p.style = "white-space: pre-line";
            p.appendChild(curs[c]);
            document.getElementById("promptList").appendChild(p);
        })
        
        /*
        document.getElementById("promptList").appendChild(pI);
        document.getElementById("promptList").appendChild(pC);
        document.getElementById("promptList").appendChild(pO);
        */
        document.getElementById("promptList").appendChild(document.createElement("br"))
    
    })
}
