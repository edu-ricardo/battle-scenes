import { Power } from "./power";
import { Cost } from "./cost";

const IMAGE_URL_BASE: string = 'http://battlesystem.com.br/api/containers/cards/download/';

export class CardListItem{
    image: string;
    version: string;
    name: string;
    alter_ego: string;
    illustrators: string;
    rarity: string;
    code: string;
    number: number;
    site_name: string;
    active: boolean;
    id: string;
    cardInfoId: string;
    collectionId: string;
}

export class Card {
    code: number;
    version: string;
    name: string;
    alter_ego: string;
    type: string;
    initial_energy: number;
    extra_energy: number;
    shield: number;
    affiliation: string;
    alignments: Array<string>;
    action: string;
    action_text: string;
    errata: string;
    faqs: string;
    permanent_text: string;
    ev_text: string;
    id: string;
    card_list: Array<CardListItem>;
    main_cardId: string;
    action_power: Power;
    powers: Array<Power>; 
    action_cost: Cost;
    action_types: Array<Power>;
    ImagesUrl: Array<string>;
}

export class CardUtils{
    static getImagesUrl(Card: Card):Array<string>{
        Card.ImagesUrl = new Array<string>();
        Card.card_list.forEach(card => {
            Card.ImagesUrl.push(IMAGE_URL_BASE + card.site_name + '.png');
        });
        return Card.ImagesUrl;
    }
}