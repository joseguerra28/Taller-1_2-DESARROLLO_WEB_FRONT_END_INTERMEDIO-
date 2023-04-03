const form = document.getElementById('form');
const searchInput = document.getElementById('search');

form.addEventListener('submit', e => {
   e.preventDefault();
   const query = searchInput.value;
   const apiKey = 'FVUIwmpYLhg3UCN2NqbqIFVHsKnQeWNfR6CYUEOWiFAr58hPYZF6K0BS';
   const url = `https://api.pexels.com/v1/search?query=${query}&per_page=10`;

   
   fetch(url, {
      headers: {
         Authorization: apiKey
      }
   })
      .then(response => {
         if (!response.ok) {
            throw new Error('Network response was not ok');
         }
         return response.json();
      })
      .then(data => {
         const images = data.photos;
         const cardContainer = document.querySelector('.card-container');
         
         cardContainer.innerHTML = '';

         for (let i = 0; i < images.length; i++) {
            const image = images[i];

            const card = document.createElement('div');
            card.classList.add('card');
            
            const cardImg = document.createElement('img');
            cardImg.classList.add('card-img-top');
            cardImg.src = image.src.medium;
            cardImg.alt = image.url;

            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.textContent = image.photographer;

            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
            cardText.textContent = image.url;

            const cardDate = document.createElement('small');
            cardDate.classList.add('text-muted');

            cardDate.textContent = new Date(image.updated_at).toLocaleString();

            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            card.appendChild(cardImg);
            card.appendChild(cardBody);

            cardContainer.appendChild(card);
         }
      })
      .catch(error => console.error('Error:', error));
})




