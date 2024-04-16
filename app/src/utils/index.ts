import bananaSplit from '../assets/banana-split.jpeg';
import briochePainPerdu from '../assets/brioche-pain-perdu.jpeg';
import cakeChoco from '../assets/cake-choco.jpeg';
import cakeFramboise from '../assets/cake-framboise.jpeg';
import eclair from '../assets/eclair.jpeg';
import fondant from '../assets/fondant.jpeg';
import glacesVanille from '../assets/glaces-vanille.jpeg';
import tartePoire from '../assets/tarte-poire.jpeg';

export const images = {
    'fondant': fondant,
    'banana-split': bananaSplit,
    'brioche-pain-perdu': briochePainPerdu,
    'cake-framboise': cakeFramboise,
    'cake-choco': cakeChoco,
    'eclair': eclair,
    'glaces-vanille': glacesVanille,
    'tarte-poire': tartePoire,
}
export const getImageNames = (...imageFileNames: string[]) => {
    return imageFileNames.map(p => p.split('.')[0])
}