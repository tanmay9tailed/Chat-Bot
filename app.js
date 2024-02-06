// console.log("hello")
const textarea = document.querySelector("textarea");
const sendBtn = document.getElementById("send-btn");
const chatBox = document.querySelector(".chatbox");

textarea.addEventListener("input", function () {
  if (textarea.value.trim() !== "") {
    sendBtn.style.visibility = "visible";
  } else {
    sendBtn.style.visibility = "hidden";
  }
});

let userMsg;
const API_KEY = "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";

const createChatli = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.className = `chat ${className}`;
  let chatContent =
    className === "outgoing"
      ? `<p>${message}</p>
    <span><img src="./svg/picofme (1).png" alt="" class="mypic"></span>`
      : ` <span class="material-symbols-outlined">smart_toy</span>
    <p>${message}</p>`;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

const generateResponse = (incomingChatli) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = incomingChatli.querySelector("p");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMsg }],
    }),
  };
  fetch(API_URL, requestOptions).then((res) => res.json()).then((data) => {
        console.log(data)
      messageElement.textContent = data.choices[0].message.content

    })
    .catch((error) => {
      console.log(error);
      messageElement.textContent = "Oops! somthing went wrong"
})
};

function handleChat() {
  userMsg = textarea.value.trim();
  if (!userMsg) {
    return;
  }

  chatBox.appendChild(createChatli(userMsg, "outgoing"));
  chatBox.scrollTo(0, chatBox.scrollHeight)

  setTimeout(() => {
    const incomingChatli = createChatli("Thinking.... ", "incoming");
    chatBox.appendChild(incomingChatli);
    chatBox.scrollTo(0, chatBox.scrollHeight)
    
    generateResponse(incomingChatli);
  }, 500);

  textarea.value = ''
}

sendBtn.addEventListener("click", () => handleChat());

const chatToggler = document.querySelector(".chat-togglers")
chatToggler.addEventListener('click',() => {
    document.querySelector('body').classList.toggle('toggler')
})
document.querySelector(".close-btn").addEventListener('click',() => {
    document.querySelector('body').classList.toggle('toggler')
})
document.querySelector("button").addEventListener('click',() => {
    document.querySelector('body').classList.add('toggler')
})