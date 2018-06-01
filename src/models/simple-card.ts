export namespace Cards{

    export class CardL{
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

    export class SimpleCard {
        code: number;
        version: string;
        name: string;
        alter_ego: string;
        type: string;
        initial_energy: number;
        extra_energy: number;
        shield: number;
        affiliation: string;
        alignments: string[];
        action: string;
        action_text: string;
        errata: string;
        faqs: string;
        permanent_text: string;
        ev_text: string;
        id: string;
        card_list: CardL[];
    }
}