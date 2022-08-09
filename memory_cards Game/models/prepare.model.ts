import { ICard } from "./card.model";


export interface IPrepare {
    cards?: ICard[];
    selectedCard_1?: ICard;
    selectedCard_2?: ICard;
    selectedIndex_1?: number;
    selectedIndex_2?: number;
    progress?: number;
    flipAudio?: HTMLAudioElement;
    goodAudio?: HTMLAudioElement;
}