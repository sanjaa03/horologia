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

  function ispisMenija(linkovi){
     let ispis="";
     for(let link of linkovi){
        ispis+=`<li class="nav-item">
        <a href="${link.href}" class="nav-link">${link.tekst}</a>
      </li>`
     }
     document.querySelector("#meni").innerHTML=ispis;
  }

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
  /*$.ajax({
    url:"assets/js/proizvodi.json",
    method:"get",
    dataType:"json",
    success:function(data){
      ispisProizvodaSvih(data);
    },
    erorr:function(err){
      console.error(err);
    }
  })*/
  
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
function ispisProizvoda(proizvodi){
  let ispis="";
  for(let proizvod of proizvodi){
   if(proizvod.bestseller){
   ispis+=`<div class="col-12 col-md-6 col-lg-3 mb-4">
   <div class="card">
     <img src="${proizvod.srcSlika}" class="card-img-top" alt="${proizvod.naziv}">
     <div class="card-body">
       <h5 class="card-title">${proizvod.naziv}</h5>
       <div class="cena">${obradaCene(proizvod.cena)}</div
       <ul>${specifikacijaObrada(proizvod.specifikacije)}</ul>
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
 /*function ispisProizvodaSvih(proizvodi){
  let ispis="";
  for(let proizvod of proizvodi){
   ispis+=`<div class="col-12 col-md-6 col-lg-3 mb-4">
   <div class="card">
     <img src="${proizvod.srcSlika}" class="card-img-top" alt="${proizvod.naziv}">
     <div class="card-body">
       <h5 class="card-title">${proizvod.naziv}</h5>
      <p> ${obradaCene(proizvod.cena)}</p>
        <ul>${specifikacijaObrada(proizvod.specifikacije)}</ul>
       <button type="button" id="dugmeAdd" class="btna">
       ADD TO CART
   </button>
     </div>
   </div>
 </div>`
 }
document.querySelector("#prikazProizvodaSvih").innerHTML=ispis;
}*/
//prover cene
function obradaCene(stara){
  let ispis="";
   if(stara.staraCena != null){
    ispis+=`<del>${stara.staraCena}</del>
             <span class="aktuelna">${stara.aktuelnaCena}</span>`
   }
   else{
    ispis+=`
    <p></p>
    <span class="aktuelna">${stara.aktuelnaCena}</span>`
   }
   return ispis;
}

function specifikacijaObrada(specif){
  let ispis="";
  for(let s of specif){
    ispis+=`<li><b>·</b> ${s.naziv} : ${s.vrednost}</li>`
  }
  return ispis;
}