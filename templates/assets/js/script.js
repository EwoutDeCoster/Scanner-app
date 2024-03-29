
function reactToEnterKey() {
  let ean = document.getElementById("ean");
  ean.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("knop").click();
      ean.select();
    }
  });
}

function zoekartikel() {
  let ean = document.getElementById("ean").value;
  console.log("klik")
  fetch(`http://127.0.0.1:80/search?barcode=${ean}`)
  .then((res) => res.json())
  .then((data) => {
    /*iterate over data.artikels*/

      try {
        document.getElementById("onbekend").style.display = "none";
        flag = false;
        let naam = data.x_studio_label70
        let prijs = String(data.x_studio_verkoopprijs)
        prijs = prijs.replace(".", ",")
        // only 2 decimals
        prijs = prijs.substring(0, prijs.indexOf(",") + 3);
        
        let stock = data.x_studio_aanwezige_voorraad
        if (data.image_512){
          document.getElementById("foto").src = "data:image/jpeg;charset=utf-8;base64,"+data.image_512;
        } else { 
          document.getElementById("foto").src = "https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png?format=webp&v=1530129081";
          document.getElementById("foto").style.width = "300px";
        }

        document.getElementById("naam").innerHTML = naam;
        document.getElementById("prijs").value = `€ ${prijs}`;
        stock < 2 ? document.getElementById("laatste").style.display = "block" : document.getElementById("laatste").style.display = "none";
    console.log(data);
      document.getElementById("artikel").style.display = "block";
      } catch (error) {
        document.getElementById("onbekend").style.display = "block";
      }
      /**call hideArtikel after 20 seconds */
      setTimeout(() => {
        hideArtikel();
      }, 10000);

  })
  .catch((err) => {
    console.log(err);
    onbekendeBarcode();
  });
  /**/
}

function hideArtikel() {
  document.getElementById("artikel").style.display = "none";
}

function onbekendeBarcode() {
  hideArtikel();
  document.getElementById("onbekend").style.display = "block";
  setTimeout(() => {
    document.getElementById("onbekend").style.display = "none";
  }, 3000);
}

function init() {
    hideArtikel();
    console.log("init");
    reactToEnterKey();
    document.getElementById("knop").addEventListener("click", () => zoekartikel(document.getElementById("knop").value));
    document.getElementById("ean").select();

}

window.onload = init;