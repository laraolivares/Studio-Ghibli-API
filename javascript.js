const boton = document.getElementById("btn");
const cardContainer = document.getElementById("card-container"); 

const stopBtn = document.getElementById("stopBtn");
const playBtn = document.getElementById("playBtn");
const backgroundMusic = document.getElementById("backgroundMusic");

stopBtn.addEventListener("click", () => {
    backgroundMusic.pause(); // Pause the audio
    backgroundMusic.currentTime = 0; // Reset the audio to the beginning
});

playBtn.addEventListener("click", () => {
    backgroundMusic.play(); // Play the audio
});
boton.addEventListener("click", () => {
    fetch("https://ghibli-api-v1.azurewebsites.net/api/v1/movies")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
        })
        .then(data => {
            console.log(data); 
            renderProducts(data.movies); 
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
});

function renderProducts(productsToRender) {
    
    cardContainer.innerHTML = '';

    if (productsToRender.length > 0) {
        const randomIndex = Math.floor(Math.random() * productsToRender.length); // Index random
        const product = productsToRender[randomIndex]; // Para obtener un product random
        

        const card = document.createElement("div");
        card.className = "card mb-3";
        card.id = "card";

        card.innerHTML = `
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="${product.image}" class="img-fluid rounded-start" id="cover" alt="${product.title.en}">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title" id="card-title">${product.title.es}</h5>
                        <p class="card-text"><small class="text-body-secondary" id="original-title">${product.original_title}</small></p>
                        <p class="card-text"><small class="text-body-secondary" id="original-title-r">${product.original_title_romanised}</small></p>
                        <p class="card-text" id="description">${product.description.en}</p>
                        <p class="card-text"><small class="text-body-secondary" id="time">Duración: ${product.running_time} minutos</small></p>
                    </div>
                </div>
            </div>
        `;


        cardContainer.appendChild(card);
    } else {
        const noProductsMessage = document.createElement("p");
        noProductsMessage.innerText = "No products found";
        cardContainer.appendChild(noProductsMessage);
    }
}