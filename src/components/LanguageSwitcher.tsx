import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();

    return (
        <div className="flex gap-3">
            <button
                onClick={() => i18n.changeLanguage('en')}
                className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors duration-100 ${i18n.language === 'en'
                    ? 'bg-neutral-700 text-white shadow'
                    : 'text-neutral-400 hover:bg-neutral-800/70'
                    }`}
            >
                EN
            </button>
            <button
                onClick={() => i18n.changeLanguage('hu')}
                className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors duration-100 ${i18n.language === 'hu'
                    ? 'bg-neutral-700 text-white shadow'
                    : 'text-neutral-400 hover:bg-neutral-800/70'
                    }`}
            >
                HU
            </button>
            <button
                onClick={() => i18n.changeLanguage('ro')}
                className={`px-3 py-1.5 rounded text-sm font-semibold transition-colors duration-100 ${i18n.language === 'ro'
                    ? 'bg-neutral-700 text-white shadow'
                    : 'text-neutral-400 hover:bg-neutral-800/70'
                    }`}
            >
                RO
            </button>
        </div>
    );
}