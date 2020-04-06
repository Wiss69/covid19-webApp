var app = {

  init: function() {
    // console.log('init');

    // Fonction qui charge les pays
      app.loadCountryList();

    // Fonction qui gere les ecouteurs d'event
    app.initEventListeners();
  },

  loadCountryList: function() {
    
    app.showOverlay();

    axios.get('https://api.covid19api.com/summary')
    .then(function(response) {
      response.data.Countries.forEach(app.handleDisplayCountries);
      console.log(response.data.Global);
      app.handleGlobalInfos(response.data.Global);
      app.hideOverlay();
    })
    .catch(function(error) {
      console.log(error);
    });
  },

  handleGlobalInfos: function(global) {
    console.log(global);
    const infosElement = document.querySelector('.globalInfos');
    const newConfirmed = infosElement.querySelector('.NewConfirmed');
    const newDeaths = infosElement.querySelector('.NewDeaths');
    const newRecovered = infosElement.querySelector('.NewRecovered');
    const totalConfirmed = infosElement.querySelector('.TotalConfirmed');
    const totalDeaths = infosElement.querySelector('.TotalDeaths');
    const totalRecovered = infosElement.querySelector('.TotalRecovered');

    newConfirmed.textContent = global.NewConfirmed;
    newDeaths.textContent = global.NewDeaths;
    newRecovered.textContent = global.NewRecovered;
    totalConfirmed.textContent = global.TotalConfirmed;
    totalDeaths.textContent = global.TotalDeaths;
    totalRecovered.textContent = global.TotalRecovered;
    // console.log(newConfirmed);
  },

  handleDisplayCountries: function(data) {

    // console.log(data);

    // On récupère le template d'un élément de liste de recette
    const countryListItemTemplate = document.getElementById('country-list-item-template');
    // console.log(countryListItemTemplate);

    // Get the content
    const countryListItemTemplateContent = countryListItemTemplate.content;
    
    // Clone the first child
    const countryListItemTemplateContentElement = countryListItemTemplateContent.firstElementChild;
    const countryListItem = countryListItemTemplateContentElement.cloneNode(true);
    
    // console.log(countryListItem);
    const title = countryListItem.querySelector('.countryTitle');
    title.textContent = data.Country;
    countryListItem.dataset.Date = data.Date;
    countryListItem.dataset.Country = data.Country;
    countryListItem.dataset.NewConfirmed = data.NewConfirmed;
    countryListItem.dataset.NewDeaths = data.NewDeaths;
    countryListItem.dataset.NewRecovered = data.NewRecovered;
    countryListItem.dataset.TotalConfirmed = data.TotalConfirmed;
    countryListItem.dataset.TotalDeaths = data.TotalDeaths;
    countryListItem.dataset.TotalRecovered = data.TotalRecovered;

    // Fill the seemodal



    // Add it to the array
    const countryList = document.querySelector('.countries-list');
    countryList.appendChild(countryListItem);

    const showButton = countryListItem.querySelector('.showcountry');
    showButton.addEventListener('click', app.fillSeeModal);

  },

  openShowCountry: function() {
    document.querySelector('.seeCountryModal').classList.add('is-active');
  },
  
  initEventListeners: function() {
    const closeButtons = document.querySelectorAll('.closeModal');
    closeButtons.forEach(button => button.addEventListener('click', app.closeModal));
  },
  
  closeModal: function() {
    document.querySelector('.seeCountryModal').classList.remove('is-active');
  },

  fillSeeModal: function(e) {

    // seeCountryModal
    const countryElement = e.target.closest('.country');
    const seeCountryModal = document.querySelector('.seeCountryModal');
    
        const countryListItemTitle = seeCountryModal.querySelector('.country');
        const countryListItemDate = seeCountryModal.querySelector('.date');
        const countryListItemNewConfirmed = seeCountryModal.querySelector('.newConfirmed');
        const countryListItemNewDeaths = seeCountryModal.querySelector('.newDeaths');
        const countryListItemNewRecovered = seeCountryModal.querySelector('.newRecovered');
        const countryListItemTotalConfirmed = seeCountryModal.querySelector('.totalConfirmed');
        const countryListItemTotalDeaths = seeCountryModal.querySelector('.totalDeaths');
        const countryListItemTotalRecovered = seeCountryModal.querySelector('.totalRecovered');
        
        countryListItemDate.textContent = countryElement.dataset.Date;
        countryListItemTitle.textContent = countryElement.dataset.Country;
        countryListItemNewConfirmed.textContent = countryElement.dataset.NewConfirmed;
        countryListItemNewDeaths.textContent = countryElement.dataset.NewDeaths;
        countryListItemNewRecovered.textContent = countryElement.dataset.NewRecovered;
        countryListItemTotalConfirmed.textContent = countryElement.dataset.TotalConfirmed;
        countryListItemTotalDeaths.textContent = countryElement.dataset.TotalDeaths;
        countryListItemTotalRecovered.textContent = countryElement.dataset.TotalRecovered;

        app.openShowCountry();
  },

  showOverlay: function() {
    console.log('Chargement en cours...');
    const overlay = document.querySelector('.overlay');
    overlay.classList.remove('is-hidden');
  },

  hideOverlay: function() {
    console.log('Chargement terminé !');
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('is-hidden');
  }
};

document.addEventListener('DOMContentLoaded', app.init);

