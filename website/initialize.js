const express = require('express');
const app = express();
const path = require('path');

//app.use(express.static(__dirname + '/home.html')); // html
app.use(express.static(path.join(__dirname, "midware"))); // js, css, images


const server = app.listen(process.env.PORT || 5000);

// sendFile will go here
app.get('/', function(req, res) {
    //res.send("sup");
    res.sendFile(path.join(__dirname, '/home.html'));
});

app.post('/filter.html', function(req, res) {
    res.sendFile(path.join(__dirname, '/filter.html'));
});
  
const io = require('socket.io')(server);
io.on('connection', function(socket){
    console.log('a user connected');
});

/*
const { Configuration, OpenAIApi } = require("openai");

let OPENAI_API_KEY="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";

const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);

let p = 
`#the following function will do as follows: take the head of a linked list, reverse it, and return the new head.

    public ListNode reverseList(ListNode head) {
        if(head == null || head.next == null) return head;

        ListNode newHead = reverseList(head.next);
        ListNode next = head.next;
        return newHead;
    }

#identify if the code above works as intended. Report any possible inefficiencies, better implementations in terms of space/time complexity, or optimizations. Explain the inefficiencies in great detail.`



let a = "take the head of a linked list, reverse it, and return the new head.";

let c =     
    `public ListNode reverseList(ListNode head) {
    if(head == null || head.next == null) return head;

    ListNode newHead = reverseList(head.next);
    ListNode next = head.next;
    next.next = head;
    return newHead;
}`;

let result = "#the following function will do as follows: " + a + "\n\n" + c + "\n" + "\n" + "#identify if the code above works as intended. Report any possible inefficiencies, better implementations that improve space/time complexity, or optimizations. Explain these in great detail.";


async function runCompletion () {
    const completion = await openai.createCompletion({
      model: "code-davinci-002",
      prompt: p,
      temperature: 0,
      max_tokens: 610,
      top_p: 1,
      frequency_penalty: 0.6,
      presence_penalty: 0.2,
      best_of: 1,
    });
    let out = completion.data.choices[0].text;
    document.getElementById('out').innerHTML = out;
    console.log(completion.data.choices[0].text);
}

runCompletion();
*/