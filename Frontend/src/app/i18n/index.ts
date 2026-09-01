import { LocalePack } from "./locale-pack.interface";
import { EnglishUSPack } from "./en-us";
import { JapanesePack } from "./jp";
import { RussianPack } from "./ru";

export * from './locale-pack.interface';
export * from './language.service';

// Central dynamic registry matrix [index]
export const DictionaryMatrix: Record<string, LocalePack> = {
    'en-us': EnglishUSPack,
    'jp': JapanesePack,
    'ru': RussianPack
};