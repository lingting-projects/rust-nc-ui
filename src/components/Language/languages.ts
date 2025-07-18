const _languages = {
  'zh-CN': {
    key: 'zh-CN',
    lang: 'zh-CN',
    label: '简体中文',
    icon: '🇨🇳',
    title: '语言',
  },
  'en-US': {
    key: 'en-US',
    lang: 'en-US',
    label: 'English',
    icon: '🇺🇸',
    title: 'Language',
  },
  'ar-EG': {
    key: 'ar-EG',
    lang: 'ar-EG',
    label: 'العربية',
    icon: '🇪🇬',
    title: 'لغة',
  },
  'az-AZ': {
    key: 'az-AZ',
    lang: 'az-AZ',
    label: 'Azərbaycan dili',
    icon: '🇦🇿',
    title: 'Dil',
  },
  'bg-BG': {
    key: 'bg-BG',
    lang: 'bg-BG',
    label: 'Български език',
    icon: '🇧🇬',
    title: 'език',
  },
  'bn-BD': {
    key: 'bn-BD',
    lang: 'bn-BD',
    label: 'বাংলা',
    icon: '🇧🇩',
    title: 'ভাষা',
  },
  'ca-ES': {
    key: 'ca-ES',
    lang: 'ca-ES',
    label: 'Catalá',
    icon: '🇨🇦',
    title: 'llengua',
  },
  'cs-CZ': {
    key: 'cs-CZ',
    lang: 'cs-CZ',
    label: 'Čeština',
    icon: '🇨🇿',
    title: 'Jazyk',
  },
  'da-DK': {
    key: 'da-DK',
    lang: 'da-DK',
    label: 'Dansk',
    icon: '🇩🇰',
    title: 'Sprog',
  },
  'de-DE': {
    key: 'de-DE',
    lang: 'de-DE',
    label: 'Deutsch',
    icon: '🇩🇪',
    title: 'Sprache',
  },
  'el-GR': {
    key: 'el-GR',
    lang: 'el-GR',
    label: 'Ελληνικά',
    icon: '🇬🇷',
    title: 'Γλώσσα',
  },
  'en-GB': {
    key: 'en-GB',
    lang: 'en-GB',
    label: 'English',
    icon: '🇬🇧',
    title: 'Language',
  },
  'es-ES': {
    key: 'es-ES',
    lang: 'es-ES',
    label: 'Español',
    icon: '🇪🇸',
    title: 'Idioma',
  },
  'et-EE': {
    key: 'et-EE',
    lang: 'et-EE',
    label: 'Eesti',
    icon: '🇪🇪',
    title: 'Keel',
  },
  'fa-IR': {
    key: 'fa-IR',
    lang: 'fa-IR',
    label: 'فارسی',
    icon: '🇮🇷',
    title: 'زبان',
  },
  'fi-FI': {
    key: 'fi-FI',
    lang: 'fi-FI',
    label: 'Suomi',
    icon: '🇫🇮',
    title: 'Kieli',
  },
  'fr-BE': {
    key: 'fr-BE',
    lang: 'fr-BE',
    label: 'Français',
    icon: '🇧🇪',
    title: 'Langue',
  },
  'fr-FR': {
    key: 'fr-FR',
    lang: 'fr-FR',
    label: 'Français',
    icon: '🇫🇷',
    title: 'Langue',
  },
  'ga-IE': {
    key: 'ga-IE',
    lang: 'ga-IE',
    label: 'Gaeilge',
    icon: '🇮🇪',
    title: 'Teanga',
  },
  'he-IL': {
    key: 'he-IL',
    lang: 'he-IL',
    label: 'עברית',
    icon: '🇮🇱',
    title: 'שפה',
  },
  'hi-IN': {
    key: 'hi-IN',
    lang: 'hi-IN',
    label: 'हिन्दी, हिंदी',
    icon: '🇮🇳',
    title: 'भाषा: हिन्दी',
  },
  'hr-HR': {
    key: 'hr-HR',
    lang: 'hr-HR',
    label: 'Hrvatski jezik',
    icon: '🇭🇷',
    title: 'Jezik',
  },
  'hu-HU': {
    key: 'hu-HU',
    lang: 'hu-HU',
    label: 'Magyar',
    icon: '🇭🇺',
    title: 'Nyelv',
  },
  'hy-AM': {
    key: 'hy-AM',
    lang: 'hu-HU',
    label: 'Հայերեն',
    icon: '🇦🇲',
    title: 'Լեզու',
  },
  'id-ID': {
    key: 'id-ID',
    lang: 'id-ID',
    label: 'Bahasa Indonesia',
    icon: '🇮🇩',
    title: 'Bahasa',
  },
  'it-IT': {
    key: 'it-IT',
    lang: 'it-IT',
    label: 'Italiano',
    icon: '🇮🇹',
    title: 'Linguaggio',
  },
  'is-IS': {
    key: 'is-IS',
    lang: 'is-IS',
    label: 'Íslenska',
    icon: '🇮🇸',
    title: 'Tungumál',
  },
  'ja-JP': {
    key: 'ja-JP',
    lang: 'ja-JP',
    label: '日本語',
    icon: '🇯🇵',
    title: '言語',
  },
  'ku-IQ': {
    key: 'ku-IQ',
    lang: 'ku-IQ',
    label: 'کوردی',
    icon: '🇮🇶',
    title: 'Ziman',
  },
  'kn-IN': {
    key: 'kn-IN',
    lang: 'kn-IN',
    label: 'ಕನ್ನಡ',
    icon: '🇮🇳',
    title: 'ಭಾಷೆ',
  },
  'ko-KR': {
    key: 'ko-KR',
    lang: 'ko-KR',
    label: '한국어',
    icon: '🇰🇷',
    title: '언어',
  },
  'lv-LV': {
    key: 'lv-LV',
    lang: 'lv-LV',
    label: 'Latviešu valoda',
    icon: '🇱🇮',
    title: 'Kalba',
  },
  'mk-MK': {
    key: 'mk-MK',
    lang: 'mk-MK',
    label: 'македонски јазик',
    icon: '🇲🇰',
    title: 'Јазик',
  },
  'mn-MN': {
    key: 'mn-MN',
    lang: 'mn-MN',
    label: 'Монгол хэл',
    icon: '🇲🇳',
    title: 'Хэл',
  },
  'ms-MY': {
    key: 'ms-MY',
    lang: 'ms-MY',
    label: 'بهاس ملايو‎',
    icon: '🇲🇾',
    title: 'Bahasa',
  },
  'nb-NO': {
    key: 'nb-NO',
    lang: 'nb-NO',
    label: 'Norsk',
    icon: '🇳🇴',
    title: 'Språk',
  },
  'ne-NP': {
    key: 'ne-NP',
    lang: 'ne-NP',
    label: 'नेपाली',
    icon: '🇳🇵',
    title: 'भाषा',
  },
  'nl-BE': {
    key: 'nl-BE',
    lang: 'nl-BE',
    label: 'Vlaams',
    icon: '🇧🇪',
    title: 'Taal',
  },
  'nl-NL': {
    key: 'nl-NL',
    lang: 'nl-NL',
    label: 'Nederlands',
    icon: '🇳🇱',
    title: 'Taal',
  },
  'pl-PL': {
    key: 'pl-PL',
    lang: 'pl-PL',
    label: 'Polski',
    icon: '🇵🇱',
    title: 'Język',
  },
  'pt-BR': {
    key: 'pt-BR',
    lang: 'pt-BR',
    label: 'Português',
    icon: '🇧🇷',
    title: 'Idiomas',
  },
  'pt-PT': {
    key: 'pt-PT',
    lang: 'pt-PT',
    label: 'Português',
    icon: '🇵🇹',
    title: 'Idiomas',
  },
  'ro-RO': {
    key: 'ro-RO',
    lang: 'ro-RO',
    label: 'Română',
    icon: '🇷🇴',
    title: 'Limba',
  },
  'ru-RU': {
    key: 'ru-RU',
    lang: 'ru-RU',
    label: 'Русский',
    icon: '🇷🇺',
    title: 'язык',
  },
  'sk-SK': {
    key: 'sk-SK',
    lang: 'sk-SK',
    label: 'Slovenčina',
    icon: '🇸🇰',
    title: 'Jazyk',
  },
  'sr-RS': {
    key: 'sr-RS',
    lang: 'sr-RS',
    label: 'српски језик',
    icon: '🇸🇷',
    title: 'Језик',
  },
  'sl-SI': {
    key: 'sl-SI',
    lang: 'sl-SI',
    label: 'Slovenščina',
    icon: '🇸🇱',
    title: 'Jezik',
  },
  'sv-SE': {
    key: 'sv-SE',
    lang: 'sv-SE',
    label: 'Svenska',
    icon: '🇸🇪',
    title: 'Språk',
  },
  'ta-IN': {
    key: 'ta-IN',
    lang: 'ta-IN',
    label: 'தமிழ்',
    icon: '🇮🇳',
    title: 'மொழி',
  },
  'th-TH': {
    key: 'th-TH',
    lang: 'th-TH',
    label: 'ไทย',
    icon: '🇹🇭',
    title: 'ภาษา',
  },
  'tr-TR': {
    key: 'tr-TR',
    lang: 'tr-TR',
    label: 'Türkçe',
    icon: '🇹🇷',
    title: 'Dil',
  },
  'uk-UA': {
    key: 'uk-UA',
    lang: 'uk-UA',
    label: 'Українська',
    icon: '🇺🇰',
    title: 'Мова',
  },
  'vi-VN': {
    key: 'vi-VN',
    lang: 'vi-VN',
    label: 'Tiếng Việt',
    icon: '🇻🇳',
    title: 'Ngôn ngữ',
  },
  'zh-TW': {
    key: 'zh-TW',
    lang: 'zh-TW',
    label: '繁體中文',
    icon: '🇭🇰',
    title: '語言',
  },
} as const;

export type LanguageKey = keyof typeof _languages;

export type LanguageType = {
  key: LanguageKey;
  lang: string;
  label: string;
  icon: string;
  title: string;
};

export const languages: Record<string, LanguageType> = _languages;

export const languageKeys = Object.keys(languages);

export const getLanguage = (key: string | LanguageKey): LanguageType => {
  const language = languages[key] as LanguageType;
  return (
    (language as LanguageType) || {
      lang: key,
      label: key,
      icon: '🌐',
      title: key,
    }
  );
};

export const mapLanguage = <V = any>(convert: (language: LanguageType) => V) => {
  const array: V[] = [];

  languageKeys.forEach((key) => {
    const language = getLanguage(key);
    const v = convert(language);
    array.push(v);
  });

  return array;
};

export default languages;
