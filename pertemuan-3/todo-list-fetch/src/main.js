const BASE_URL_API = "https://v1.appbackend.io/v1/rows/mgVIYOMkqtFO";

async function getData(){
  try {
    const response = await fetch(BASE_URL_API);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetch data : " +  error)
  }
}

async function main() {
  const container = document.getElementById("container");
  try {
    const data = await getData();

    data.data.forEach((item) => {
      const titleElement = document.createElement("h1");
      const contentElement = document.createElement("p")
  
  
      titleElement.textContent = item.title;
      contentElement.textContent = item.content;

      titleElement.classList.add("text-2xl")
      contentElement.classList.add("font-normal", "text-gray-600");

      container.appendChild(titleElement);
      container.appendChild(contentElement);
    });
  } catch (error) {
    const msg = document.createElement("p");
    msg.textContent = error;
    msg.classList.add("font-normal")
    container.appendChild(msg);
    console.log("Error get Data")
  }
}


main();



const titleInput = document.getElementById("input-title");
const contentInput = document.getElementById("input-content")
const submit = document.getElementById("btn-submit")

submit.addEventListener("click", async() => {
  const title = titleInput.value;
  const content = contentInput.value;
  try {
    const result = await fetch(BASE_URL_API, {
      method : "POST",
      headers : {
        'Content-type' : 'application/json'
      },
      body : JSON.stringify([{title, content}])
    });
  } catch (error) {
    console.log("error add data" + error);
  }

  window.location.reload();
})








