const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');
const list = [];
const result = document.getElmentByID("displayPane");

function Search(){

    //read the keyword in lowercase and trim it and  
    const keyword = trim(document.getElementById('KeywordInput').value.toLowerCase());
    const recommendationList = document.createElement('ul');

    //fetch the json 
    fetch('travelRecommandation_api.json')
    .then(response => response.json())
    .then(data => {
        //add an empty ul in the displayPane
        result.appendChild(recommendationList);
        
        //reiterate country to search for match
         data.forEach(country =>{
            var recFlag = false;
            //compare the keyword with each country's info, if match, raise the recommendation flag
            var countryName = country.name.toLowerCase();
            if (countryName === keyword) {
                recFlag = true;
            }
            else {
                country.cities.forEach(city=>{
                    var cityName = city.name.toLowerCase();
                    var cityDescription = city.description.toLowerCase();
                    if (isSubset(cityName, keyword) | isSubset(cityDescription, keyword)) {
                        recFlag = true;
                    }
                })
            };

            //if any match, add the country to the display list
            if (recFlag) {
                var liItem = document.createElement('li');
                var itemDiv = document.createElement ('div');
                var img = document.createElement('img');
                var name = document.createElement('h4');
                var descpt = document.createElement('p');
                img.src = country.cities.imageUrl;
                name.textContent = country.cities.name;
                descpt.textContent = country.cities.description;
                itemDiv.appendChild(img);
                itemDiv.appendChild(name);
                itemDiv.appendChild(descpt);
                liItem.appendChild(itemDiv);
                recommendationList.appendChild(liItem);
            }
        })
    })
    .catch(error => {
        console.error('Error fetching travel recommendations:', error);
        result.innerHTML = `<p>Failed to fetch travel recommendations. Please try again.</p>`;
      });
}

function Clear(){}

btnSearch.addEventListener('click', Search);
btnClear.addEventListener('click', Clear);