let p1 = {i: "i1", c: "c1", o: "o1"};
let p2 = {i: "i2", c: "c2", o: "o2"};
let p3 = {i: "i3", c: "c3", o: "o3"};

let hList = [p1,p2,p3]

let prompts = document.getElementById("promptList");

function addPrompts(){
    hList.forEach(e => {
        let curI = document.createTextNode("Instructions: " + e.i);
        let curC = document.createTextNode("Code: " + e.c);
        let curO = document.createTextNode("Output: " + e.o);
        
        let pI = document.createElement("p");
        let pC = document.createElement("p");
        let pO = document.createElement("p");

        pI.className = "p1";
        pC.className = "p2";
        pO.className = "p3";
        
        pI.appendChild(curI);
        pC.appendChild(curC);
        pO.appendChild(curO);
        document.getElementById("promptList").appendChild(pI);
        document.getElementById("promptList").appendChild(pC);
        document.getElementById("promptList").appendChild(pO);
        document.getElementById("promptList").appendChild(document.createElement("br"))

    })
}