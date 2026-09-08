import { LocalePack } from "./locale-pack.interface";
import { EnglishUSPack } from "./en-us";
import { JapanesePack } from "./jp";
import { RussianPack } from "./ru";
import { EnglishUKPack } from "./en-gb";
import { PersianPack } from "./fa";

export * from './locale-pack.interface';
export * from './language.service';

// Central dynamic registry matrix [index]
export const DictionaryMatrix: Record<string, LocalePack> = {
    'en-us': EnglishUSPack,
    'jp': JapanesePack,
    'ru': RussianPack,
    'en-gb': EnglishUKPack,
    'fa': PersianPack,
};