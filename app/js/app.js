let app = {

  apiBaseUrl: 'https://api.covid19api.com/',


    init: function() {
        console.log('coucou !');

        // LOAD COUNTRIES
        app.loadCountries();

        // Event listeners
        app.eventListeners();
    
    },

    eventListeners: function() {
        
             // Fermer modal
             const seeInfosModal = document.querySelector('.SeeInfosModal');
             const returnButtons = seeInfosModal.querySelectorAll('.return');
            //  console.log(returnButtons);
             returnButtons.forEach(button => button.addEventListener('click', app.closeSeeInfosModal));
        
    },

    loadCountries: function() {
        // charge tous les pays
        axios.get(app.apiBaseUrl + 'countries')
        .then(function(response) {
            // console.log(response.data);
            response.data.forEach(app.displayCountries);
            // response.data.forEach(app.confirmedCasesByCountry);
        })
        .catch(function(error) {
            console.log(error)
        });
    },
        
    // Display countries
    displayCountries: function(country) {
        
        // console.log(country);
        if(country.Country != ''){
            const myList = document.getElementById('content');
            const button = myList.querySelector('button');
            var buttonNode = button.cloneNode(true);
            buttonNode.dataset.slug =  country.Slug;
            buttonNode.innerHTML = country.Country;
            myList.appendChild(buttonNode);
        }

        buttonNode.addEventListener('click', app.handleDisplayData);

    },

    handleDisplayData: function(e) {

        e.preventDefault();
        // console.log(e.target.dataset.slug);
        const countrySlug = e.target.dataset.slug;

        //https://api.covid19api.com/dayone/country/south-africa/status/confirmed

        let confirmed = 'https://api.covid19api.com/dayone/country/' + countrySlug + '/status/confirmed';
        let recovered = 'https://api.covid19api.com/dayone/country/' + countrySlug + '/status/recovered';
        let deaths = 'https://api.covid19api.com/dayone/country/' + countrySlug + '/status/deaths';

        const confirmedRequest = axios.get(confirmed);
        const recoveredRequest = axios.get(recovered);
        const deathsRequest = axios.get(deaths);

        axios
            .all([confirmedRequest, recoveredRequest, deathsRequest])
            .then(
                axios.spread((confirmed, recovered, deaths) => {
                    // return confirmed, recovered, deaths; 
                    app.fillSeeInfosModal(confirmed.data, recovered.data, deaths.data);                   
                })
            )
            // Don't work if I send datas with then ???
            // .then(app.fillSeeInfosModal(confirmed, recovered, deaths))

            // open the modal
            .then(app.openSeeInfosModal)
            .catch(function(error) {
                console.log(error);
            });      
    },

    fillSeeInfosModal: function (confirmed, recovered, deaths) {

        console.log('confirmed : ', confirmed);
        console.log('recovered : ', recovered);
        console.log('deaths : ',  deaths);

        if (confirmed.length > 0 && recovered.length > 0 && deaths.length > 0) {

            // Array last element
            const lastElementInConfirmedArray = confirmed[confirmed.length - 1];
            const lastElementInRecoveredArray = recovered[recovered.length - 1];
            const lastElementInDeathsArray = deaths[deaths.length - 1];
            
            // // // Cases Value
            const casesConfirmed = lastElementInConfirmedArray.Cases;
            const casesRecovered = lastElementInRecoveredArray.Cases;
            const casesDeaths = lastElementInDeathsArray.Cases;
            
            console.log('confirmed : ', casesConfirmed);
            console.log('recovered : ', casesRecovered);
            console.log('deaths : ',  casesDeaths);

            // Select modal element
            const SeeInfosModal = document.querySelector('.SeeInfosModal');

            // Select each fields
            const confirmedCasesElement = SeeInfosModal.querySelector('.case-confirmed');
            const deathCasesElement = SeeInfosModal.querySelector('.case-deaths');
            const recoveredCasesElement = SeeInfosModal.querySelector('.case-recovered');
            
            // Filling each fields
              
            

            var maxConfirmedCases = 0;
            
            // foreach sur tableau
            confirmed.forEach(function(data) {
    
                // console.log(data.Cases)
                var caseNumber = data.Cases;
    
                if (caseNumber > maxConfirmedCases) {
                    maxConfirmedCases = data.Cases;
                }
            });
            console.log(maxConfirmedCases);
            confirmedCasesElement.textContent = maxConfirmedCases; 

            var maxDeathsCases = 0;
            deaths.forEach(function(data) {
                if(data.Cases > maxDeathsCases) {
                    maxDeathsCases = data.Cases;
                }
            })
            console.log(maxDeathsCases);
            deathCasesElement.textContent = maxDeathsCases;

            var maxRecoveredCases = 0;
            deaths.forEach(function(data) {
                if(data.Cases > maxRecoveredCases) {
                    maxRecoveredCases = data.Cases;
                }
            })
            console.log(maxRecoveredCases);
            recoveredCasesElement.textContent = maxRecoveredCases;

        }
        
        if(confirmed.length == 0) {
            // Select modal element
            const SeeInfosModal = document.querySelector('.SeeInfosModal');
            // Select each fields
            const confirmedCasesElement = SeeInfosModal.querySelector('.case-confirmed');
            // Fill fields with 0
            confirmedCasesElement.textContent = '0';   
        }
        if(recovered.length == 0) {
            // Select modal element
            const SeeInfosModal = document.querySelector('.SeeInfosModal');
            // Select each fields
            const recoveredCasesElement = SeeInfosModal.querySelector('.case-recovered');
            // Fill fields with 0
            recoveredCasesElement.textContent = '0';
        }
        if(deaths.length == 0) {
            // Select modal element
            const SeeInfosModal = document.querySelector('.SeeInfosModal');
            // Select each fields
            const deathsCasesElement = SeeInfosModal.querySelector('.case-deaths');
            // Fill fields with 0
            deathsCasesElement.textContent = '0';
        }
        
    },

    openSeeInfosModal: function() {
        document.querySelector('.SeeInfosModal').classList.add('is-active');
    },

    closeSeeInfosModal: function() {
        document.querySelector('.SeeInfosModal').classList.remove('is-active');
    }
};

document.addEventListener('DOMContentLoaded', app.init);
