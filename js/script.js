
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
  fetch("js/data.json")
  .then((res) => res.json())
  .then((data) => {
    /*iterate over data.artikels*/
    data.artikels.forEach((artikel) => {
      if(artikel.ean === ean) {
        let naam = artikel.naam
        let prijs = String(artikel.prijs)
        /*replace . with , in prijs*/
        prijs = prijs.replace(".", ",")
        
        let stock = artikel.stock
        let foto = artikel.foto
        document.getElementById("naam").innerHTML = naam;
        document.getElementById("prijs").value = `€ ${prijs}`;
        document.getElementById("foto").src = foto;
        stock < 2 ? document.getElementById("laatste").style.display = "block" : document.getElementById("laatste").style.display = "none";
      }

      document.getElementById("artikel").style.display = "block";
      /**call hideArtikel after 20 seconds */
      setTimeout(() => {
        hideArtikel();
      }, 10000);



    })
  })
  /**/
}

function hideArtikel() {
  document.getElementById("artikel").style.display = "none";
}

function init() {
    console.log("init");
    reactToEnterKey();
    document.getElementById("knop").addEventListener("click", () => zoekartikel(document.getElementById("knop").value));
    document.getElementById("ean").select();
    hideArtikel();

}

window.onload = init;