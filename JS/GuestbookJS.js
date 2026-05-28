function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Thank you to AllProfanity from https://github.com/ayush-jadaun/allprofanity for the advanced profanity checker
import profanity from 'https://cdn.jsdelivr.net/npm/allprofanity/+esm';

import { createClient } from "https://esm.sh/@libsql/client/web";

const client = createClient({
  url: "libsql://guestbook-dasnapplel.aws-us-east-2.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3Nzk5MTAyODUsImlkIjoiMDE5ZTZhZTgtZmEwMS03MmI3LTgzNGEtZjFjMjIyZDdkMDE2IiwicmlkIjoiNTcyNDJjNGUtM2M0NC00ZjIxLThlZjItOWRkYjFmOGQ2NDQzIn0.CYH6xgKdktSum0quruLID9F1cy4KvAYsNUvJsjEiBDkdxvEo2fVDFz_CN38_juMBzD76-7GRu7qY90kGtTUqDA",
});

await client.execute(`
  CREATE TABLE IF NOT EXISTS guestbook (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    message Text NOT NULL
  )
`);

// Load in Messages section
// query data
const result = await client.execute("SELECT * FROM guestbook");
const rows = result.rows; // array of row objects

const commentSection = document.querySelector('.comment-section')
let currSection = null;
let sectionCounter = 0;

// loop that creates pages with 10 messages each
for (let i = rows.length - 1; i>=0; i--) {
    if (sectionCounter%10 == 0) {
        // in css have ::first be visible, rest invisible
        currSection = document.createElement('div');
        currSection.className = 'comment-page';
        commentSection.appendChild(currSection);
    }
    sectionCounter += 1;
    const currMessage = document.createElement('div');
    currMessage.className = 'comment';
    currMessage.innerHTML += '<p class="message">' + rows[i].message +'</p><hr>';
    currMessage.innerHTML += '<p class="username">- '+ rows[i].name +'</p>';
    currSection.appendChild(currMessage);
}



// Submit new Messages code
const submitBtn = document.querySelector('.submitBtn');
let name = document.querySelector('.nameInput');
let message = document.querySelector('.messageInput');
let nameText = document.querySelector('.nameP');
let messageText = document.querySelector('.messageP');
let inputDiv = document.querySelector('.section-content');
let commentInputSection = document.getElementById('Comment');

// Log new Messages
submitBtn.addEventListener('click', async e => {
    const nameValue = name.value;
    const messageValue = message.value;
    let error = false;

    if (!nameValue) {
        nameText.innerHTML = nameText.innerHTML + ' <span style="color: red;">Must enter name</span>';
        error = true;
    }
    if (!messageValue) {
        messageText.innerHTML = messageText.innerHTML + ' <span style="color: red;">Must enter a message</span>';
        error = true;
    }
    if (profanity.check(messageValue)) {
        messageText.innerHTML = messageText.innerHTML + ' <span style="color: red;">Message deemed inappropriate</span>';
        error = true;
    }
    if (profanity.check(nameValue)) {
        nameText.innerHTML = nameText.innerHTML + ' <span style="color: red;">Name deemed inappropriate</span>';
        error = true;
    }
    await sleep(2000);
    nameText.innerHTML = nameText.innerHTML.replace(' <span style="color: red;">Must enter name</span>', '');
    messageText.innerHTML = messageText.innerHTML.replace(' <span style="color: red;">Must enter a message</span>', '');
    messageText.innerHTML = messageText.innerHTML.replace(' <span style="color: red;">Message deemed inappropriate</span>', '');
    nameText.innerHTML = nameText.innerHTML.replace(' <span style="color: red;">Name deemed inappropriate</span>', '');

    if (!error) {
        await client.execute({
            sql: "INSERT INTO guestbook (name, message) VALUES (?, ?)",
            args: [nameValue, messageValue],
        });
        console.log('task success');
        inputDiv.remove();
        commentInputSection.innerHTML += 'Thank You!';
    }
    
})


// Change Page code
let commentPages = document.querySelectorAll('.comment-page');
const pagesLength = commentPages.length;
const prevBtn = document.querySelector('.prevBtn');
const nextBtn = document.querySelector('.nextBtn');
let pageNum = document.querySelector('.message-page-num');
let currpage = 0;

pageNum.innerHTML = currpage + 1 + '/' + pagesLength;

prevBtn.addEventListener('click', e => {
    if (currpage > 0) {
        commentPages[currpage].style.display = 'none';
        currpage -= 1;
        commentPages[currpage].style.display = 'grid';
        pageNum.innerHTML = currpage + 1 + '/' + pagesLength;
    }
})

nextBtn.addEventListener('click', e => {
    if (currpage < pagesLength - 1) { 
        commentPages[currpage].style.display = 'none';
        currpage += 1;
        commentPages[currpage].style.display = 'grid';
        pageNum.innerHTML = currpage + 1 + '/' + pagesLength;
    }
})