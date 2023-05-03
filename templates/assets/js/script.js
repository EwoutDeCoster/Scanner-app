
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
  /* fetch data.json object */
  console.log("klik")
  fetch(`http://127.0.0.1:8080/search?barcode=${ean}`)
  .then((res) => res.json())
  .then((data) => {
    /*iterate over data.artikels*/

      try {
        document.getElementById("onbekend").style.display = "none";
        flag = false;
        let naam = data.x_studio_label70
        let prijs = String(data.x_studio_verkoopprijs)
        prijs = prijs.replace(".", ",")
        
        let stock = data.x_studio_aanwezige_voorraad
        let foto = data.image_512
        document.getElementById("naam").innerHTML = naam;
        document.getElementById("prijs").value = `€ ${prijs}`;
        document.getElementById("foto").src = "data:image/jpeg;charset=utf-8;base64,"+foto;
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




    flag ? onbekendeBarcode() : null;
  })
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