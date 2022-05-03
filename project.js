window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempraturBeskrivning = document.querySelector('.tempratur-beskrivning');
    let tempraturGrader = document.querySelector('.tempratur-grader');
    let platsTidszon = document.querySelector('.plats-tidszon');
    let tempraturSektion = document.querySelector('.tempratur');
    const tempraturSpan = document.querySelector('.tempratur span');
    
    //const token = process.env.API_KEY;
    
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
          long = position.coords.longitude;
          lat = position.coords.latitude;
         
          

          //const proxy = 'https://cors-anywhere.herokuapp.com/';
          const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=fa2a1784752c0b4e8594c75297543cae`;
          //const virus = "https://dontclickiamavirus.herokuapp.com/weather"

          fetch(api)
          .then(response => {
              return response.json();
            })
            .then(data => {               
                const {temp} = data.main;
                const {description, main} = data.weather[0];
                let tempratur = temp - 273.15;
                //Set DOM Elements from the API
                tempraturGrader.textContent = Math.round(tempratur);
                tempraturBeskrivning.textContent = description;
                platsTidszon.textContent = data.name;
                
                //Formula for Celvin/Celcius/Faharenheit
                let fahrenheit = (tempratur * 9/5) + 32; 
                let kelvin = temp;
                
                //Set icon
                

                //Byt tempratur till Celsius/Kelvin/Faharenheit
                 tempraturSektion.addEventListener('click', () =>{
                     if(tempraturSpan.textContent === "°C"){
                         tempraturSpan.textContent = "°F";
                         tempraturGrader.textContent = Math.round(fahrenheit);
                     }else if(tempraturSpan.textContent === "°F"){
                        tempraturSpan.textContent = "Kelvin";
                        tempraturGrader.textContent = Math.round(kelvin);
                     }else{
                        tempraturSpan.textContent = "°C";
                        tempraturGrader.textContent = Math.round(tempratur);
                     }
                 });

                var icons = new Skycons({"color": "white"});
                var time = new Date();
                time = time.getHours();
                var htmlToAdd = '';
                
                switch (main.toLowerCase()) {
                    case "clouds":
                        if (time >= 19 || time <= 4) {
                            htmlToAdd = '<canvas id="partly-cloudy-night" width="175" height="175"></canvas>';
                            icons.add("skycons", Skycons.PARTLY_CLOUDY_NIGHT);
                        } else {
                            htmlToAdd = '<canvas id="cloudy" width="175" height="175"></canvas>';
                            icons.add("skycons", Skycons.CLOUDY);
                        }
                        
                        break;
                    case "rain":
                        htmlToAdd = '<canvas id="rain" width="175" height="175"></canvas>';
                        icons.add("skycons", Skycons.RAIN);
                        break;
                    case "snow":
                        htmlToAdd = '<canvas id="snow" width="175" height="175"></canvas>';
                        icons.add("skycons", Skycons.SNOW);
                        break;
                    case "clear":
                        if (time >= 19 || time <= 4) {
                            htmlToAdd = '<canvas id="clear-night" width="175" height="175"></canvas>';
                            icons.add("skycons", Skycons.CLEAR_NIGHT);
                        } else {
                            htmlToAdd = '<canvas id="clear-day" width="175" height="175"></canvas>';
                            icons.add("skycons", Skycons.CLEAR_DAY);
                        }
                        break;
               default:
                    htmlToAdd = '<canvas id="rain" width="175" height="175"></canvas>';
                    icons.add("skycons", Skycons.RAIN);
               }
               
               icons.play(); 
        
            }) 

     });


    }else {
        platsTidszon.textContent = "Kunde inte hitta plats! Kontrollera platsbehörigheter.";
        //h1.textContent = "Kunde inte hitta plats! Kontrollera plats behörigheter.";
    };
}); 