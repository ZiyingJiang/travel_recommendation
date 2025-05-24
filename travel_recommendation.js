const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const result = document.getElementById("displayPane");

btnSearch.addEventListener('click', Search);
btnClear.addEventListener('click', Clear);

function Search(){

    //read the keyword in lowercase and trim it 
    const keyword = document.getElementById('KeywordInput').value.toLowerCase().trim();
 

    // Clear previous results
    result.innerHTML = '';
    const recommendationList = document.createElement('ul');

    //fetch the json 
    fetch('travelRecommendation_api.json')
    .then(response => response.json())
    .then(data => {
        switch (keyword) {
            case "country":
                data.countries.forEach(country => {
                    country.cities.forEach(city=> {
                        addListItem(city, recommendationList);
                    });
                });
                break;
            case "countries":
                data.countries.forEach(country => {
                    country.cities.forEach(city => {
                        addListItem(city, recommendationList);
                    });
                });
                break;
            case "temple":
                data.temples.forEach(temple => {
                    addListItem(temple, recommendationList);
                });
                break;
            case "temples":
                data.temples.forEach(temple => {
                    addListItem(temple, recommendationList);
                });
                break;
            case "beach":
                data.beaches.forEach(beach => {
                    addListItem(beach, recommendationList);
                });
                break;
            case "beaches":
                data.beaches.forEach(beach => {
                    addListItem(beach, recommendationList);
                });
                break;
            default:
                result.innerHTML = `<p>No travel recommendations found for "${keyword}".</p>`;
                return;
        }
        
        // display list
        if (recommendationList.children.length > 0) {
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
    result.innerHTML ='';
}

function addListItem(item, list){
    // Create list item 
    const liItem = document.createElement('li');
    const itemDiv = document.createElement ('div');
    itemDiv.classList.add('recommendation'); // Optional: for CSS styling

    const img = document.createElement('img');
    img.src = item.imageUrl || '';
    img.alt = item.name || '';

    const name = document.createElement('h4');
    name.textContent = item.name;

    const descpt = document.createElement('p');
    descpt.textContent = item.description;

    itemDiv.appendChild(img);
    itemDiv.appendChild(name);
    itemDiv.appendChild(descpt);
    liItem.appendChild(itemDiv);
    list.appendChild(liItem);
}

