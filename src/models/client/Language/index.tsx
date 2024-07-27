import itFlag from "@/assets/images/flags/it.png";
import enFlag from "@/assets/images/flags/gb.png";
import { Locales } from "@/models/common/Translation";

export interface ILanguage {
  value: Locales;
  label: string;
  icon: string;
}

export class Language implements ILanguage {
  value: Locales;
  label: string;
  icon: string;

  constructor(obj: ILanguage) {
    Object.assign(this, obj);
  }

  static getFlagIconByLanguageValue(languageValue: Locales): string {
    switch (languageValue) {
      case Locales.EN:
        return enFlag.src;
      case Locales.IT:
        return itFlag.src;
    }
  }

  static getLanguageNameByLanguageValue(languageValue: Locales): string {
    switch (languageValue) {
      case Locales.EN:
        return "English";
      case Locales.IT:
        return "Italian";
    }
  }
}
