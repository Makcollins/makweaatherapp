const api = {
  key: "800c4e97bf8ff1a4b200a2db397bc8b5",
  base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.location .city');
  if(weather.name === undefined){
    return( city.innerHTML = `<span> City not found</span>`)
  }
  else{
    city.innerHTML = `<span> Weather in</span> ${weather.name}`;
  
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;
  
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML =`<img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}.png" alt="weather icon"></img> ${weather.weather[0].main}`;
  
    let humidity = document.querySelector('.current .humidity');
    humidity.innerHTML = `<span>Humidity:<span> ${weather.main.humidity}<span>%</span> `
  
    let  wind = document.querySelector('.current .wind');
    wind.innerHTML =`<span>Wind speed:</span> ${weather.wind.speed} <span>km/h</span>`;
  }
  }
// --------------------------------------------------------------------------------------------------
  const input = document.querySelector('#myInput');
  const suggestions = document.querySelector('.suggestions ul'); 

  const countries = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Central Arfrican Republic","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cuba","Curacao","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauro","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","North Korea","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States of America","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
  
  function search(str) {
    let results = [];
    const val = str.toLowerCase();
  
    for (i = 0; i < countries.length; i++) {
      if (countries[i].toLowerCase().indexOf(val) > -1) {
        results.push(countries[i]);
      }
    }
  
    return results;
  }
  
  function searchHandler(e) {
    const inputVal = e.currentTarget.value;
    let results = [];
    if (inputVal.length > 0) {
      results = search(inputVal);
    }
    showSuggestions(results, inputVal);
  }
  
  function showSuggestions(results, inputVal) {
      
      suggestions.innerHTML = '';
  
    if (results.length > 0) {
      for (i = 0; i < results.length; i++) {
        let item = results[i];
   
        const match = item.match(new RegExp(inputVal, 'i'));
        item = item.replace(match[0], `<strong>${match[0]}</strong>`);
        suggestions.innerHTML += `<li>${item}</li>`;
      }
      suggestions.classList.add('has-suggestions');
    } else {
      results = [];
      suggestions.innerHTML = '';
      suggestions.classList.remove('has-suggestions');
    }
  }
  
  function useSuggestion(e) {
    input.value = e.target.innerText;
    input.focus();
    suggestions.innerHTML = '';
    suggestions.classList.remove('has-suggestions');
  }
  
  input.addEventListener('keyup', searchHandler);
  suggestions.addEventListener('click', useSuggestion);