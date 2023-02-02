let magicCards = [];
let magicForm = null;

let contador = 0;
const $ = (selector) => document.querySelector(selector);
const $BoosterDraf = $("#BoosterDraf");
const $countFetchs = $("#countFetchs");
const $GetB = $("#GetB");
const $SaveB = $("#SaveB");
const $ClearB = $("#ClearB");
const $TarjetasB = $("#TarjetasB");
const $CheckDeck = $("#CheckDeck");
const $Save = $("#Save");
const $Load = $("#Load");
const $Clear = $("#Clear");
const $TarjetasD = $("#TarjetasD");
const $modal = $("#modal");

$Clear.addEventListener("click", () => {
  magicCards = [];
  TarjetasD.innerHTML = "";
});
//mostrar data
$GetB.addEventListener("click", async (e) => {
  e.preventDefault();
  TarjetasB.innerHTML = "";
  $modal.style.display = "block";
  let _commonCards = {};
  let _uncommonCards = {};
  let _rareCards = {};
  let _landCards = {};
  let _mythicCards = {};
  let _rareOrMyth = {};
  if (contador < 4) {
    contador++;
    $countFetchs.innerHTML = `Contador de clic: ${contador}`;
  } else if (contador === 4) {
    $countFetchs.innerHTML = `Contador de clic: ${contador}`;
    setTimeout(() => {
      contador = 0;
      $countFetchs.innerHTML = `Contador de clic: ${contador}`;
    }, 1000);
  }
  _commonCards = await obtainCommonCard();
  console.log(_commonCards);
  _uncommonCards = await obtainUncommonCard();
  console.log(_uncommonCards);
  
  _landCards = await obtainLandCard();
  console.log(_landCards);


  if (contador == 4) {
    _rareOrMyth = await obtainMythicCard();
  } else {
    _rareOrMyth = await obtainRareCard();
  }
  if (_landCards !== "")  {
    $modal.style.display = "none";
  }

  magicCards = [
    ..._commonCards,
    ..._uncommonCards,
    ..._rareOrMyth,
    ..._landCards,
  ];
  console.log(magicCards);
});
//guardar data
$SaveB.addEventListener("click", (e) => {
  if (magicCards.length === 0) {
    alert("No hay cartas para guardar");
  } else {
    magicCards.map((el, index) => {
      renderMagicCardD(magicCards[index]);
    });
  }
  console.log(magicCards);
});
//limpiar data
$ClearB.addEventListener("click", async (e) => {
  TarjetasB.innerHTML = `
       <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
               <article class="emptyCard">
                   <figure><img src="./assets/images/mtg_back.png" alt=""></figure>
               </article>
       `;
});

$Save.addEventListener("click", (e) => {
  download(JSON.stringify(magicCards), "Cards.json", "text/plain");
});

function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}
const obtainCommonCard = async () => {
  let _magicCard = [];

  for (let i = 0; i <= 9; i++) {
    _magicCard[i] = await fetchRandomCard("common");
    renderMagicCard(_magicCard[i]);
  }

  return _magicCard;
};

const obtainUncommonCard = async () => {
  let _magicCard = [];

  for (let i = 0; i <= 2; i++) {
    _magicCard[i] = await fetchRandomCard("uncommon");
    renderMagicCard(_magicCard[i]);
  }
  return _magicCard;
};

const obtainRareCard = async () => {
  let _magicCard = [];

  for (let i = 0; i < 1; i++) {
    _magicCard[i] = await fetchRandomCard("rare");
    renderMagicCard(_magicCard[i]);
  }
  return _magicCard;
};

const obtainMythicCard = async () => {
  let _magicCard = [];
    
    for(let i= 0; i<1; i++){
        _magicCard[i] = await fetchRandomCard("mythic");
        renderMagicCard(_magicCard[i]);
    }
    return _magicCard;
};

const obtainLandCard = async () => {
  let _magicCard = [];
    
    for(let i= 0; i<1; i++){
        _magicCard[i] = await fetchRandomCardByType();
        renderMagicCard(_magicCard[i]);
    }
    return _magicCard;
};

const castResponsePersonaje = (datos) => {
  return {
    id: datos.id,
    name: datos.name,
    rarity: datos.rarity,
    cartImg: datos.image_uris.normal,
  };
};

const fetchRandomCard = async (rarity) => {
  let data = null;

  const response = await fetch(
    `https://api.scryfall.com/cards/random?q=r:${rarity}`
  );
  const _data = await response.json();
  data = castResponsePersonaje(_data);
  return data;
};

const fetchRandomCardByType = async () => {
  let data = null;
  const response = await fetch(
    `https://api.scryfall.com/cards/random?q=t:land`
  );
  const _data = await response.json();
  data = castResponsePersonaje(_data);
  return data;
};

const createMagicCard = (card) => {
  const content = `
    <figure >
    <img  src=${card.cartImg} alt="Card image">
    </figure>
    `;

  const _article = document.createElement("article");
  _article.innerHTML = content;

  return _article;
};

const renderMagicCard = (card) => {
  TarjetasB.appendChild(createMagicCard(card));
};

const renderMagicCardD = (card) => {
  TarjetasD.appendChild(createMagicCard(card));
};

const downloadObjectAsJson = ({ exportObj, exportName }) => {
  console.log(exportObj);
  var dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement("a");
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};