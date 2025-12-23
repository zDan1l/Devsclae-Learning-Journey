const BASE_URL = "https://v1.appbackend.io/v1/rows/mgVIYOMkqtFO";

async function getData(){
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

async function main(){
    const result = await getData();

    result.data.forEach((item) => {
        const container = document.getElementById("todos");
        const titleElement = document.createElement("h1");
        const contentElement = document.createElement("p");

        titleElement.textContent = item.title;
        contentElement.textContent = item.content;
        container.appendChild(titleElement);
        container.appendChild(contentElement);
    })
}
main();

const errorContainer = document.getElementById("error");
const titleInput = document.querySelector(".title");
const contentInput = document.querySelector(".content"); 
const btn = document.getElementById("btn-submit");

btn.addEventListener("click", async () => {
    const title = titleInput.value;
    const content = contentInput.value;
    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify([{ title, content }])
        })
    } catch (error) {
        errorContainer.textContent = "Error submitting data";
    }

    window.location.reload();
});