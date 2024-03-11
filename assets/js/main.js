var satovi=[];

window.onload=function(){
  $.ajax({
    url:"assets/js/menu.json",
    method:"get",
    dataType:"json",
    success:function(data){
      ispisMenija(data);
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
function ispisMenija(linkovi){
  let ispis="";
  for(let link of linkovi){
     ispis+=`<li class="nav-item">
     <a href="${link.href}" class="nav-link">${link.tekst}</a>
   </li>`
  }
  document.querySelector("#meni").innerHTML=ispis;
}


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
       <button type="button" id="dugmeAdd" class="btna">
       ADD TO CART
   </button>
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
   console.log(satovi);
  if(satovi.length>0){
  for(let sat of satovi){
   ispis+=`<div class="col-12 col-md-6 col-lg-3 mb-4">
   <div class="card">
     <img src="${sat.srcSlika}" class="card-img-top" alt="${sat.naziv}">
     <div class="card-body">
       <h5 class="card-title">${sat.naziv}</h5>
       <div class="cena">${obradaCene(sat.cena)}</div>
       <ul>${specifikacijaObrada(sat.specifikacije)}</ul>
       <button type="button" id="dugmeAdd" class="btna">
       ADD TO CART
   </button>
     </div>
   </div>
 </div>`
 }
}
document.querySelector("#prikazProizvodaSvih").innerHTML=ispis;
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
  console.log(sortProizvod);
  return sortProizvod;
}


