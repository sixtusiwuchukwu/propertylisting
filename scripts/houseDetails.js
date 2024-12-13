const getHouseInfo = async () => {
    const url = new URL(window.location.href);
    let houseId = url.searchParams.get('query');
  
    try {
      const response = await axios.get(`http://127.0.0.1:5000/house/${houseId}`);
      const houseData = response.data; 
  
      const propertyDetailsContainer = document.querySelector('.property-details');
  
      // Populate the title and meta information
      propertyDetailsContainer.querySelector('.property-title h2').textContent = houseData.title;
      propertyDetailsContainer.querySelector('.property-metainfo li:nth-child(1)').textContent = houseData.address;
      propertyDetailsContainer.querySelector('.property-metainfo li:nth-child(2)').textContent = `${houseData.Sqft} Sqft`;
  
      // Populate the price
      propertyDetailsContainer.querySelector('.property-price').textContent =`C$ ${ houseData?.propertyDetails?.price.toLocaleString()}`;
      // propertyDetailsContainer.querySelector('.property-price').innerHTML += "/<span>annual</span>"; 

  
      // Image
      if (houseData.propertyDetails && houseData.propertyDetails.images && houseData.propertyDetails.images.length > 0) {
        propertyDetailsContainer.querySelector('.property-img img').src = houseData.propertyDetails.images[0]; 
      }
  
      // Status
      propertyDetailsContainer.querySelector('.property-status').textContent = houseData.propertyDetails.propertyStatus;
  
      // Description
      propertyDetailsContainer.querySelector('.property-desc p').textContent = houseData.description;
  
      // Property Details
      propertyDetailsContainer.querySelector('.property-features li:nth-child(1) span').textContent = houseData.propertyDetails.propertyId;
      propertyDetailsContainer.querySelector('.property-features li:nth-child(2) span').textContent = `C$ ${houseData.propertyDetails.price.toLocaleString()}`;
      propertyDetailsContainer.querySelector('.property-features li:nth-child(3) span').textContent = houseData.propertyDetails.bath;
      propertyDetailsContainer.querySelector('.property-features li:nth-child(4) span').textContent = houseData.propertyDetails.propertyType;
      propertyDetailsContainer.querySelector('.property-features li:nth-child(5) span').textContent = houseData.propertyDetails.bedrooms;
      propertyDetailsContainer.querySelector('.property-features li:nth-child(6) span').textContent = houseData.propertyDetails.garages;
      propertyDetailsContainer.querySelector('.property-features li:nth-child(7) span').textContent = houseData.propertyDetails.propertyStatus; 
      propertyDetailsContainer.querySelector('.property-features li:nth-child(8) span').textContent = houseData.propertyDetails.yearBuilt;
  
      // Floor Plan
      propertyDetailsContainer.querySelector('.floor-plan img').src = houseData.floorPlan;
  
      // Property Features
      const airConditioned = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(1)');
      airConditioned.classList.toggle('active', houseData.propertyFeatures.AirConditioned);
      const swimmingPool = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(2)');
      swimmingPool.classList.toggle('active', houseData.propertyFeatures.SwimmingPool);
      const fitnessGym = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(3)');
      fitnessGym.classList.toggle('active', houseData.propertyFeatures.FitnessGym);
      const securityGarage = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(4)');
      securityGarage.classList.toggle('active', houseData.propertyFeatures.SecurityGarage);
      const windowCoverings = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(5)');
      windowCoverings.classList.toggle('active', houseData.propertyFeatures.WindowCoverings);
      const laundry = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(6)');
      laundry.classList.toggle('active', houseData.propertyFeatures.Laundry);
      const parking = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(7)');
      parking.classList.toggle('active', houseData.propertyFeatures.Parking);
      const fireplace = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(8)');
      fireplace.classList.toggle('active', houseData.propertyFeatures.Fireplace);
      const refrigerator = propertyDetailsContainer.querySelector('.property-annuties li:nth-child(9)');
      refrigerator.classList.toggle('active', houseData.propertyFeatures.Refrigerator);
  
    } catch (error) {
      console.error("Error fetching house data:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  };
  
  


const getSimilarHouse = async () => {
    const url = new URL(window.location.href);
    let houseId = url.searchParams.get('query');
  
    try {
      const response = await axios.get(`http://127.0.0.1:5000/houses/similar/${houseId}`);
      const similarHouses = response.data?.similar_houses; 
  
      const similarHousesContainer = document.querySelector('.similar'); 
      similarHousesContainer.innerHTML = ""; // Clear any existing content
  
      similarHouses.forEach((house) => {
        const col = document.createElement('div');
        col.classList.add('col-lg-6', 'col-md-6'); 
  
        const propertyCard = document.createElement('div');
        propertyCard.classList.add('property-card', 'style2');
  
        const imgSlider = document.createElement('div');
        imgSlider.classList.add('property-img-slider', 'owl-carousel');
  
        house.propertyDetails.images.slice(0, 3).forEach((image) => {
          const img = document.createElement('img');
          img.src = image;
          img.alt = "Property Image";
          imgSlider.appendChild(img);
        });
  
        propertyCard.appendChild(imgSlider);
  
        const propertyInfo = document.createElement('div');
        propertyInfo.classList.add('property-info');
  
        const statusWrap = document.createElement('div');
        statusWrap.classList.add('property-status-wrap');
        const status = document.createElement('span');
        status.classList.add('property-status');
        status.textContent = "For Sale"; 
        statusWrap.appendChild(status);
        const price = document.createElement('p');
        price.classList.add('property-price');
        price.textContent = `C$ ${house.propertyDetails.price.toLocaleString()}`; 
        statusWrap.appendChild(price);
        propertyInfo.appendChild(statusWrap);
  
        const title = document.createElement('h3');
        const titleLink = document.createElement('a');
        titleLink.href = `listing-details.html?query=${house.propertyDetails.propertyId}`; // Dynamic URL with propertyId
        titleLink.textContent = house.title; 
        title.appendChild(titleLink);
        propertyInfo.appendChild(title);
  
        const location = document.createElement('p');
        const locationIcon = document.createElement('i');
        locationIcon.classList.add('flaticon-location');
        location.appendChild(locationIcon);
        location.appendChild(document.createTextNode(house.address)); 
        propertyInfo.appendChild(location);
  
        const metaInfo = document.createElement('ul');
        metaInfo.classList.add('property-metainfo', 'list-style');
  
        const bedrooms = document.createElement('li');
        const bedroomsIcon = document.createElement('i');
        bedroomsIcon.classList.add('flaticon-double-bed');
        bedrooms.appendChild(bedroomsIcon);
        bedrooms.appendChild(document.createTextNode(` ${house.propertyDetails.bedrooms}`));
        metaInfo.appendChild(bedrooms);
  
        const bathrooms = document.createElement('li');
        const bathroomsIcon = document.createElement('i');
        bathroomsIcon.classList.add('flaticon-bath-tub');
        bathrooms.appendChild(bathroomsIcon);
        bathrooms.appendChild(document.createTextNode(` ${house.propertyDetails.bathrooms}`));
        metaInfo.appendChild(bathrooms);
  
        const sqft = document.createElement('li');
        const sqftIcon = document.createElement('i');
        sqftIcon.classList.add('flaticon-square');
        sqft.appendChild(sqftIcon);
        sqft.appendChild(document.createTextNode(` ${house.Sqft} sqft`));
        metaInfo.appendChild(sqft);
  
        propertyInfo.appendChild(metaInfo);
  
        propertyCard.appendChild(propertyInfo);
        col.appendChild(propertyCard);
        similarHousesContainer.appendChild(col);
      });
  
      // Initialize Owl Carousel
      $('.property-img-slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        dots: false, 
        navText: [
          "<i class='ri-arrow-left-s-line'></i>",
          "<i class='ri-arrow-right-s-line'></i>" 
        ],
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 1
          },
          1000: {
            items: 1
          }
        }
      });
  
    } catch (error) {
      console.error("Error fetching similar houses:", error);
      // Handle the error (e.g., display an error message to the user)
    }
  };
  

  function requestBooking(button) {
    // Your booking logic here (e.g., API call, form submission)

    // Display success alert
    alert('Booking request submitted successfully!');

    // Optionally, disable the button after successful submission
    button.disabled = true; 
  }


  
  // Attach the event listener to the filter button
 


window.onload = function () {
    getHouseInfo();
    getSimilarHouse();


  };