let currentPage = 1;
const getListings = async (page = 1) => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/houses", {
      params: {
        page: page,
        per_page: 6,
      },
    });

    const listings = response.data.houses;


    const propertyCardsContainer = document.querySelector(".listing");
    const totalText = document.querySelector(".total-result");
  // propertyCardsContainer.innerHTML = ""
  totalText.textContent = `${response.data.total_houses } Results Found`
    CreateHouse(listings, propertyCardsContainer);
  } catch (error) {
    console.error(error);
  }
};

const loadMore = async () => {
  currentPage++;
  await getListings(currentPage);
};

document.querySelector(".btn.style1").addEventListener("click", loadMore);

const CreateHouse = (listings = [], propertyCardsContainer) => {
  const url = new URL(window.location.href).pathname;
  listings.forEach((listing, index) => {
    const col = document.createElement("div");
    url === "/" || url === "/index.html"
      ? col.classList.add("col-xl-4", "col-lg-6", "col-md-6")
      : col.classList.add("col-lg-6", "col-md-6");

    const propertyCard = document.createElement("div");
    propertyCard.classList.add("property-card", "style2");

    // Create property-img-slider (you'll need to handle image URLs dynamically)
    const imgSlider = document.createElement("div");
    imgSlider.classList.add("property-img-slider", "owl-carousel");

    const imagesToDisplay = listing?.propertyDetails?.images.slice(0, 3);

    imagesToDisplay.forEach((image) => {
      const img = document.createElement("img");
      img.src = image;
      img.alt = `Property Image`;
      imgSlider.appendChild(img);
    });

    propertyCard.appendChild(imgSlider);

    const propertyInfo = document.createElement("div");
    propertyInfo.classList.add("property-info");

    const statusWrap = document.createElement("div");
    statusWrap.classList.add("property-status-wrap");
    const status = document.createElement("span");
    status.classList.add("property-status");
    status.textContent = "For Sale"; // Assuming 'status' is a property in your listing object
    statusWrap.appendChild(status);
    const price = document.createElement("p");
    price.classList.add("property-price");
    price.textContent = `C$ ${listing?.propertyDetails?.price.toLocaleString()}`;

    price.innerHTML += "/<span>annual</span>";

    statusWrap.appendChild(price);
    propertyInfo.appendChild(statusWrap);

    const title = document.createElement("h3");
    const titleLink = document.createElement("a");
    titleLink.href = `/listing-details.html?query=${listing.propertyDetails["propertyId"]}`; // Update with dynamic URL if needed
    titleLink.textContent = listing.title; // Assuming 'title' is a property in your listing object
    title.appendChild(titleLink);
    propertyInfo.appendChild(title);

    const location = document.createElement("p");
    const locationIcon = document.createElement("i");
    locationIcon.classList.add("flaticon-location");
    location.appendChild(locationIcon);
    location.appendChild(document.createTextNode(listing.address)); // Assuming 'address' is a property in your listing object
    propertyInfo.appendChild(location);

    const metaInfo = document.createElement("ul");
    metaInfo.classList.add("property-metainfo", "list-style");

    const bedrooms = document.createElement("li");
    const bedroomsIcon = document.createElement("i");
    bedroomsIcon.classList.add("flaticon-double-bed");
    bedrooms.appendChild(bedroomsIcon);
    bedrooms.appendChild(
      document.createTextNode(` ${listing?.propertyDetails?.bedrooms}`)
    );
    metaInfo.appendChild(bedrooms);

    const bathrooms = document.createElement("li");
    const bathroomsIcon = document.createElement("i");
    bathroomsIcon.classList.add("flaticon-bath-tub");
    bathrooms.appendChild(bathroomsIcon);
    bathrooms.appendChild(
      document.createTextNode(` ${listing?.propertyDetails?.bathrooms}`)
    );
    metaInfo.appendChild(bathrooms);

    const sqft = document.createElement("li");
    const sqftIcon = document.createElement("i");
    sqftIcon.classList.add("flaticon-square");
    sqft.appendChild(sqftIcon);
    sqft.appendChild(document.createTextNode(` ${listing?.Sqft} sqft`));
    metaInfo.appendChild(sqft);

    propertyInfo.appendChild(metaInfo);

    propertyCard.appendChild(imgSlider);
    propertyCard.appendChild(propertyInfo);

    col.appendChild(propertyCard);

    propertyCardsContainer.appendChild(col);
  });

  $(".property-img-slider").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false, // Remove dot navigation
    navText: [
      "<i class='ri-arrow-left-s-line'></i>",
      "<i class='ri-arrow-right-s-line'></i>",
    ],
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
};

async function filterHouses() {
  // const {start:min_distance,end:max_distance} = getRange(document.getElementById("amount_one").value);
  const keywords = document.getElementById("keywords").value;
  const category = document.getElementById("category").value;
  const region = document.getElementById("region").value;
  const city = document.getElementById("city").value;
  const type = document.getElementById("type").value;
  const location = document.getElementById("location").value;
  const min_rooms = 1;
  const max_rooms = Number(document.getElementById("rooms").value) || 1;
  const min_baths = 1;
  const max_baths = Number(document.getElementById("bath").value) || 1;
  const { start: min_price, end: max_price } = getRange(
    document.getElementById("price_range").value
  );

  let response = await axios.get("http://127.0.0.1:5000/houses/filter", {
    params: {
      page: 1,
      per_page: 7,
      keywords,
      category,
      region,
      min_baths,
      max_baths,
      city,
      min_rooms,
      max_rooms,
      // min_distance, max_distance,
      type,
      location,
      min_price,
      max_price,
    },
  });
  const propertyCardsContainer = document.querySelector(".filter-response");
  const totalText = document.querySelector(".total-result");
  propertyCardsContainer.innerHTML = ""
  totalText.textContent = `${response.data.total_houses } Results Found`
  CreateHouse(response.data.houses,propertyCardsContainer)

}

function getRange(range) {
  const matches = range.match(/\d+/g);

  if (matches) {
    const [start, end] = matches.map(Number); // Convert to numbers
    console.log("Start:", start);
    console.log("End:", end);
    return { start, end };
  } else {
    console.log("No numbers found.");
    return {
      start: "",
      end: "",
    };
  }
}

window.onload = function () {
  getListings();

  const filterButton = document.querySelector(".btn-filter");

  filterButton.addEventListener("click", (event) => {
    event.preventDefault();
    filterHouses();
  });
};
