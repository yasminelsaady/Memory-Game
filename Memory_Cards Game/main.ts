//#region Imports
import { ICard } from "./models/card.model"; 
import { IPrepare } from "./models/prepare.model";
//#endregion

//#region Variables Declaration
const prepare: IPrepare = {
    cards: [],
}
prepare.progress= 0;

prepare.flipAudio = new Audio('./assets/audio/flip.mp3');
prepare.goodAudio = new Audio('./assets/audio/good.mp3');

const numberOfCards= 20;
const tempNumbers= [];
let cardsHtmlContent= '';
//#endregion

//#region Functions Declaration

const getRandomInt = (min,max) => {
    let result: number;
    let exists= true;
    min= Math.ceil(min)
    max= Math.floor(max)
    while (exists) {
        result = Math.floor(Math.random() * (max -min+1)) + min;
        if (!tempNumbers.find (n => n === result.toString())) {
            exists = false;
            tempNumbers.push(result.toString())
        }
    }
    return result;
}
const toggleFlip =(index) =>  {
    const card = prepare.cards[index];
    if(!card.flip && card.clickable) {
        flip(card,index);
        selectCart(card,index);
    }  
}

function flip (card: ICard, index) {
    if (card) {
        card.flip = card.flip === '' ? 'flip' : ''
        document.getElementById(`card-flip-${index}`).classList.value=card.flip;
    }
}

const selectCart = (card: ICard, index: number) => {
    if(!prepare.selectedCard_1) {
        prepare.selectedCard_1= card;
        prepare.selectedIndex_1 = index
    }
    else if (!prepare.selectedCard_2) {
        prepare.selectedCard_2 = card;
        prepare.selectedIndex_2 = index;
    }
    if (prepare.selectedCard_1 && prepare.selectedCard_2) {
        if (prepare.selectedCard_1.src === prepare.selectedCard_2.src) {
            prepare.selectedCard_1.clickable= false;
            prepare.selectedCard_2.clickable= false;
            prepare.selectedCard_1= null;
            prepare.selectedCard_2= null;
            stopAudio(prepare.goodAudio);
            prepare.goodAudio.play();
            changeProgress();
            checkFinish();

        } else {
            setTimeout(()=>{
                stopAudio(prepare.goodAudio);
                flip(prepare.selectedCard_1,prepare.selectedIndex_1)
                flip(prepare.selectedCard_2,prepare.selectedIndex_2)
                prepare.selectedCard_1= null;
                prepare.selectedCard_2= null;
            },1000)
        }
    } 
}
const changeProgress = () => {
    const progress = prepare.cards.filter(card => !card.clickable).length / numberOfCards *100;
    const progressElement = document.getElementById("progress");
    progressElement.style.width= `${progress}%`;
    progressElement.innerHTML= `${progress}%`;
}
const checkFinish = () => {
    if (prepare.cards.filter(card => !card.clickable).length === numberOfCards){
        stopAudio(prepare.goodAudio);
        alert('Pravo .. Game Over!');
    }

}
const stopAudio = (audio) => {
    if (audio && audio.played) {
        audio.pause();
        audio.currentTime = 0;
    }
};
//#endregion

//#region Game Logic

for (let index = 0; index < numberOfCards / 2; index++) {
    prepare.cards.push({
        id: getRandomInt(0, numberOfCards),
        src: `./assets/images/${index}.jpg`,
        flip: '',
        clickable: true,
        index
    });
    prepare.cards.push({
        id: getRandomInt(0, numberOfCards),
        src: `./assets/images/${index}.jpg`,
        flip: '',
        clickable: true,
        index
    });
}

prepare.cards.sort((a, b) => a.id > b.id ? 1 : -1);

prepare.cards.forEach((item, index) => {
    cardsHtmlContent += `
    <span class="col-sm-3 col-lg-2">
        <!-- Card Flip -->
        <div onclick="toggleFlip(${index})" class="card-flip">
            <div id="card-flip-${index}">
                <div class="front">
                    <!-- front content -->
                    <div class="card">
                        <img class="card-image" src="./assets/back.jpg" alt="Loading...">
                        <span class="card-content">${index + 1}</span>
                    </div>
                </div>
                <div class="back">
                    <!-- back content -->
                    <div class="card">
                        <img src="./assets/images/${item.index}.jpg" alt="Image [100%x180]" data-holder-rendered="true"
                            style="height: 120px; width: 100%; display: block;">
                    </div>
                </div>
            </div>
        </div>
        <!-- End Card Flip -->
    </span>
    `;
});

document.getElementById('cards').innerHTML = cardsHtmlContent;
//#endregion