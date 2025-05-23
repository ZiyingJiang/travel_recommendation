const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const result = document.getElementById("displayPane");

function Search(){

    //read the keyword in lowercase and trim it and  
    const keyword = document.getElementById('KeywordInput').value.toLowerCase().trim();
    
    // Clear previous results
    result.innerHTML = '';
    const recommendationList = document.createElement('ul');

    //fetch the json 
    fetch('travelRecommandation_api.json')
    .then(response => response.json())
    .then(data => {
        //add an empty ul in the displayPane
        result.appendChild(recommendationList);
        
        //reiterate country to search for match
        data.countries.forEach(country =>{
            //reiterate cities to search for match
            country.cities.forEach(city=>{
                const cityName = city.name.toLowerCase();
                const cityDescription = city.description.toLowerCase();
                
                if (cityName.includes(keyword) || cityDescription.inclues(keyword)) {
                    // Create list item for each matching city
                    const liItem = document.createElement('li');
                    const itemDiv = document.createElement ('div');
                    itemDiv.classList.add('recommendation'); // Optional: for CSS styling

                    const img = document.createElement('img');
                    img.src = country.cities.imageUrl;
                    img.alt = country.cities.name;

                    const name = document.createElement('h4');
                    name.textContent = country.cities.name;

                    const descpt = document.createElement('p');
                    descpt.textContent = country.cities.description;

                    itemDiv.appendChild(img);
                    itemDiv.appendChild(name);
                    itemDiv.appendChild(descpt);
                    liItem.appendChild(itemDiv);
                    recommendationList.appendChild(liItem);
                }
            });
        });
        // If no match found
        if (recommendationList.children.length === 0) {
            result.innerHTML = `<p>No travel recommendations found for "${keyword}".</p>`;
        } else {
            result.appendChild(recommendationList);
        }
    })
    .catch(error => {
        console.error('Error fetching travel recommendations:', error);
        result.innerHTML = `<p>Failed to fetch travel recommendations. Please try again.</p>`;
      });
}

function Clear(){
    document.getElementById('KeywordInput').value = '';
    result.value ='';
}

btnSearch.addEventListener('click', Search);
btnClear.addEventListener('click', Clear);