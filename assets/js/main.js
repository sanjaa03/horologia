var satovi=[];

window.onload=function(){
  $.ajax({
    url:"assets/js/proizvodi.json",
    method:"get",
    dataType:"json",
    success:function(data){
      ispisProizvoda(data);
    },
    erorr:function(err){
      console.error(err);
    }
  })
  
  $.ajax({
    url:"assets/js/proizvodi.json",
    method:"get",
    dataType:"json",
    success:function(data){
      satovi=data
      ispisProizvodaSvih(satovi);
      proizvodiLocalStorageSklad("proizvodi",satovi);
    
    },
    erorr:function(err){
      console.error(err);
    }
  })
  $.ajax({
    url:"assets/js/brendovi.json",
    method:"get",
    dataType:"json",
    success:function(data){
      brendovi=data
      ispisForme(brendovi,"brend");
    },
    erorr:function(err){
      console.error(err);
    }
  })
  $.ajax({
    url:"assets/js/kategorije.json",
    method:"get",
    dataType:"json",
    success:function(data){
      polovi=data
      ispisForme(polovi,"pol");
    },
    error:function(err){
      console.error(err);
    }
  })
 $.ajax({
    url:"assets/js/proizvodi.json",
    method:"get",
    dataType:"json",
    success:function(data){
      ispisPunaKorpa(data);
    },
    erorr:function(err){
      console.error(err);
    }
  })

  //ispis broja proizvoda u korpi
  brojProizvodaUKorpi();
  
}


var hamburger = document.querySelector(".hamburger");
var nav_menu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav_menu.classList.toggle("active");
});

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  nav_menu.classList.remove("active");
}));
//ispis menija
/*function ispisMenija(linkovi){
  let ispis="";
  for(let link of linkovi){
     ispis+=`<li class="nav-item">
     <a href="${link.href}" class="nav-link">${link.tekst}</a>
   </li>`
  }
  document.querySelector("#meni").innerHTML=ispis;
}*/


//read more
$(document).ready(function() {
                                          
  $("#aboutBlockTwo").hide();                                                    
   $("#dugmeReadMore").click(function() {
   $("#aboutBlockTwo").toggle(600);                  
   let btn = $(this);
   if(btn.text() == "Read less") {
        btn.text("Read more");
  } else {
        btn.text("Read less");
   }         
   })
   });


//ispis best sellera
function ispisProizvoda(satovi){
  let ispis="";
  for(let sat of satovi){
   if(sat.bestseller){
   ispis+=`<div class="col-12 col-md-6 col-lg-3 mb-4">
   <div class="card">
     <img src="${sat.srcSlika}" class="card-img-top" alt="${sat.naziv}">
     <div class="card-body">
       <h5 class="card-title">${sat.naziv}</h5>
       <div class="cena">${obradaCene(sat.cena)}</div
       <ul>${specifikacijaObrada(sat.specifikacije)}</ul>
     </div>
   </div>
 </div>`
 }
}
  document.querySelector("#prikazProizvoda").innerHTML=ispis;
  
}
//ispis svih proizvoda
 function ispisProizvodaSvih(satovi){

  let ispis="";
   satovi=filterBrend(satovi);
   satovi=filterPol(satovi);
   satovi=sortiranje(satovi);
  if(satovi.length>0){
  for(let sat of satovi){
   ispis+=`<div class="col-12 col-md-6 col-lg-3 mb-4">
   <div class="card">
     <img src="${sat.srcSlika}" class="card-img-top" alt="${sat.naziv}">
     <div class="card-body">
       <h5 class="card-title">${sat.naziv}</h5>
       <div class="cena">${obradaCene(sat.cena)}</div>
       <ul>${specifikacijaObrada(sat.specifikacije)}</ul>
       <button type="button" id="dugmeAdd" class="btna" data-id="${sat.id}">
       ADD TO CART
   </button>
     </div>
   </div>
 </div>`
 }
}
document.querySelector("#prikazProizvodaSvih").innerHTML=ispis;
$('.btna').click(dodajUKorpu);
}
//prover cene
function obradaCene(stara){
  let ispis="";
   if(stara.staraCena != null){
    ispis+=`<del>${stara.staraCena}€</del>
             <span class="aktuelna">${stara.aktuelnaCena}€</span>`
   }
   else{
    ispis+=`
    <p></p>
    <span class="aktuelna">${stara.aktuelnaCena}€</span>`
   }
   return ispis;
}
//obrada specifikacije
function specifikacijaObrada(specif){
  let ispis="";
  for(let s of specif){
    ispis+=`<li><b>·</b> ${s.naziv} : ${s.vrednost}</li>`
  }
  return ispis;
}

//forma za sortiranje
var brendovi=[];
var kategorijePol=[];

var forma="";
function ispisForme(podaci,filter){
  
  if(filter=="brend"){
     forma+=`<h5>Brands:</h5>
     <form id="forma">`;
     for(let p of podaci){
      forma+=`<input type="checkbox" value="${p.id}" name="brendovi" id="brn-${p.id}"/>
      <label for="${p.naziv}">${p.naziv}</label><br/>`
     }
  }
  else if(filter=="pol"){
    forma+=`<h5 class="mt-5">Gender:</h5>
    `;
    for(let p of podaci){
     forma+=`<input type="checkbox" value="${p.id}" name="pol" id="pol-${p.id}"/>
     <label for="${p.naziv}">${p.naziv}</label><br/></form>`
    }
    forma+=`<div class="mt-5">
    <h5>Sort by:</h5>
    <form>
       <select class="form-control" id="ddlSort">
         <option value="0" selected>Sort by:</option>
         <option value="1">Price ascending</option>
         <option value="2">Price descending</option>
         <option value="3">Name A-Z</option>
       </select>
       </form>
    </div>
`
  }
  document.querySelector("#sortiranjeForma").innerHTML=forma;
   filtriranje();
}

var selektovaniBrend=[];
var selektovaniPol=[];

function filtriranje(){
  var poljeBrend=document.getElementsByName("brendovi");
  poljeBrend=Array.from(poljeBrend);
  poljeBrend.forEach(vrsta=>{
    vrsta.addEventListener("change",function(){
     if(this.checked){
      selektovaniBrend.push(vrsta.id.substring(4,(vrsta.id).length));
      ispisProizvodaSvih(satovi);
     }
     else{
      selektovaniBrend.splice(selektovaniBrend.indexOf(vrsta.id),1);
      ispisProizvodaSvih(satovi);
     }
    });
  })

  var poljePol=document.getElementsByName("pol");
  poljePol=Array.from(poljePol);
  poljePol.forEach(vrsta=>{
    vrsta.addEventListener("change",function(){
     if(this.checked){
      selektovaniPol.push(vrsta.id.substring(4,(vrsta.id).length));
      ispisProizvodaSvih(satovi);
     }
     else{
      selektovaniPol.splice(selektovaniPol.indexOf(vrsta.id),1);
      ispisProizvodaSvih(satovi);
     }
    });
  })


  document.querySelector("#ddlSort").addEventListener("change",function(){
    ispisProizvodaSvih(satovi);
  })
}

function filterBrend(proizvodi){
  if(selektovaniBrend.length==0){
    return proizvodi;
  }
 let niz=[];
 for(let i=0;i<proizvodi.length;i++){
  for(let j=0;j<selektovaniBrend.length;j++){
    if(proizvodi[i].brend.includes(selektovaniBrend[j])){
      niz.push(proizvodi[i]);
    }
  }
 }
 return niz;
}

function filterPol(proizvodi){
  if(selektovaniPol.length==0){
    return proizvodi;
  }
 let niz=[];
 for(let i=0;i<proizvodi.length;i++){
  for(let j=0;j<selektovaniPol.length;j++){
    if(proizvodi[i].kategorija.includes(selektovaniPol[j])){
      niz.push(proizvodi[i]);
    }
  }
 }
 return niz;
}

function sortiranje(proizvodi){
  let sortProizvod = [];
  let vred = $("#ddlSort").val();
  if(vred == "0"){
      sortProizvod = proizvodi;
  }
  else{
      sortProizvod = proizvodi.sort(function(a, b){
          if(vred == "1"){
              return a.cena.aktuelnaCena - b.cena.aktuelnaCena;
          }
          if(vred == "2"){
              return b.cena.aktuelnaCena - a.cena.aktuelnaCena;
          }
          if(vred == "3"){
              if(a.naziv < b.naziv){
                  return -1;
              }
              else if(a.naziv > b.naziv){
                  return 1;
              }
              else{
                  return 0;
              }
          }
      })
  }
  return sortProizvod;
}
//kontakt
let taster = document.querySelector("#btnPrijava");
taster.addEventListener("click", obradaForme);

function obradaForme(){
  var brojGresaka = 0;
  let objImePrezime,objEmail, objAdresa,objNapomena;

  objImePrezime = document.querySelector("#tbImePrezime");
  objEmail = document.querySelector("#tbEmail");
  objAdresa = document.querySelector("#tbAdresa");
  objNapomena = document.querySelector("#taNapomena");

  let reImePrezime,reEmail, reAdresa;
  reImePrezime = /^[A-Z][a-z]{2,14}(\s[A-Z][a-z]{2,14})+$/;
  reEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`~-]+@[a-zA-Z0-9-]+(.com)+$/;
  reAdresa = /^(([A-Z][a-z]{1,15}(\.)?)|([1-9][0-9]{0,2}(\.)?))[a-zA-Z0-9\s\/\-]+$/;

  proveraRegularnimIzrazima(reImePrezime, objImePrezime, "First and Last name must start with uppercase!(Example:Ana Johnson)");
  proveraRegularnimIzrazima(reEmail, objEmail, "Email must be in format: something@example.com");
  proveraRegularnimIzrazima(reAdresa, objAdresa, "Address must be in format:");

  function proveraRegularnimIzrazima(regularni, objekat, poruka){
      if(!regularni.test(objekat.value)){
          objekat.nextElementSibling.classList.remove("sakrij");
          objekat.nextElementSibling.innerHTML = poruka;
          objekat.classList.add("crvena-bordura");
          brojGresaka++;
      }
      else{
          objekat.nextElementSibling.classList.add("sakrij");
          objekat.nextElementSibling.innerHTML = "";
          objekat.classList.remove("crvena-bordura");
      }
  }
  if(objNapomena.value.length < 10){
      objNapomena.nextElementSibling.classList.remove("sakrij");
      objNapomena.nextElementSibling.innerHTML = "Note must be at least 10 characters long!";
      objNapomena.classList.add("crvena-bordura");
brojGresaka++;
  }
  else{
      objNapomena.nextElementSibling.classList.add("sakrij");
      objNapomena.nextElementSibling.innerHTML = "";
      objNapomena.classList.remove("crvena-bordura");
  }

  if(brojGresaka == 0){
      let divIspis = document.querySelector("#ispis");
      divIspis.setAttribute("class", "alert alert-success mt-4");

      let formatZaIspis = `Your message is sent!`;

      divIspis.innerHTML = formatZaIspis;

      document.getElementById("forma-prijava").reset();
  }

}



/*setItemLocalStorage skladisti podatke u local storage
function proizvodiLocalStorageSklad(ime,podaci){
  localStorage.setItem(ime,JSON.stringify(podaci));
}
//dohvatanje iz local storage
function uzmiPodatkeLocalStorage(ime){
  return JSON.parse(localStorage.getItem(ime));
}
//dodavanje ukorpu
function dodajUKorpu(){
  let id=$(this).data('id');
  var proizvodiIzKorpe=uzmiPodatkeLocalStorage("proizvodiUKorpi");
  if(proizvodiIzKorpe){
      if(proizvodPostoji()){
         povecajKolicinu();
      }
      else{
          dodajNovProizvod();
          brojProizvodaUKorpi();
      }
  }
  else{
    prviProizvod();
    brojProizvodaUKorpi();
  }

//dodaje u korpu proizvod ako je korpa prazna
  function prviProizvod(){
    let proizvodiNizKorpa=[];
      proizvodiNizKorpa[0]={
        id:id,
        kolicina:1
      };
     proizvodiLocalStorageSklad("proizvodiUKorpi",proizvodiNizKorpa);
  }

  //proverava da li postoji proizvod u korpi
  function proizvodPostoji(){
    return proizvodiIzKorpe.filter(p=>p.id==id).length;
  }
  //povecaj kolicinu
  function povecajKolicinu(){
    let proizvodiIzLocS=uzmiPodatkeLocalStorage("proizvodiUKorpi");
   for(let p in proizvodiIzLocS){
    if(proizvodiIzLocS[p].id==id){
      proizvodiIzLocS[p].kolicina++;
      break;
    }
   }
   proizvodiLocalStorageSklad("proizvodiUKorpi",proizvodiIzLocS);
  }
  //dodaj nov proizvod(dodaj ako ga nema u korpi)
  function dodajNovProizvod(){
    let proizvodiIzLocS=uzmiPodatkeLocalStorage("proizvodiUKorpi");
    proizvodiIzLocS.push({
      id:id,
      kolicina:1
    });
    proizvodiLocalStorageSklad("proizvodiUKorpi",proizvodiIzLocS);
  }
  
}
function brojProizvodaUKorpi(){
  let proizvodiIzKorpeLS=uzmiPodatkeLocalStorage("proizvodiUKorpi");
  if(proizvodiIzKorpeLS!=null){
   let brojProizvoda = proizvodiIzKorpeLS.length;
   $('#brProizvoda').html(`(${brojProizvoda})`)
  }
  else{
    $('#brProizvoda').html(`(0)`);
  }
}


var trenutniURL=window.location.href;
if(trenutniURL.includes("korpa.html")){
   let proizvodiIzLS=uzmiPodatkeLocalStorage("proizvodiUKorpi");
   if(proizvodiIzLS==null){
     ispisPraznaKorpa();
   }
   else{
    ispisPunaKorpa();
   }
}

//ispis za praznu korpu
function ispisPraznaKorpa(){
  let ispis="";
  ispis+=`<div class="praznaKorpa">
       <h1>Your cart is empty!</h1>
  </div>`
  $("#korpa").html(ispis);
}
//ispis za punu korpu
function ispisPunaKorpa(podaci){
  let proizvodiIzLS=uzmiPodatkeLocalStorage("proizvodiUKorpi");
  let proizvodiZaIspisKorpa=[];
  proizvodiZaIspisKorpa=podaci.filter(p=>{
    for(let pro of proizvodiIzLS){
       if(p.id==pro.id){
        p.kolicina=pro.kolicina;
        return true;
       }
    }
    return false;
  });
  ispisiPorudzbinu(proizvodiZaIspisKorpa);
}

//ispis sadrzaja korpe
function ispisiPorudzbinu(pro){
  let ispis="";
  ispis+=`<table class="tabela text-center">
            <thead>
            <th>Product</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Sum</th>
            <th>Delete</th>
            </thead><tbody>`
  for(let p of pro){
    ispis+=`<tr class="border">
         <td class="slikaMala"><img src="${p.srcSlika}" alt="${p.naziv}"/></td>
         <td>${p.naziv}</td>
         <td>${p.cena.aktuelnaCena}€</td>
         <td>${p.kolicina}</td>
         <td>${p.cena.aktuelnaCena*p.kolicina}€</td>
         <td><button type="button" onclick='ukloniIzKorpe(${p.id})' class="obrisi">Delete</button></td>
    </tr>`
  }
  $("#korpa").html(ispis);
}
function cena(c){
  
}

function ukloniIzKorpe(id){
  let proizvodi=uzmiPodatkeLocalStorage("proizvodiUKorpi");
  let neobrisani=proizvodi.filter(p=>p.id !=id );
  proizvodiLocalStorageSklad("proizvodiUKorpi",neobrisani);
  ispisiPorudzbinu(neobrisani);
}
*/
