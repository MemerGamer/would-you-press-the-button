import { useTranslation } from 'react-i18next';

export function Disclaimer() {
    const { t } = useTranslation();

    return (
        <section className="mt-10 rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <h2 className="text-xl font-semibold">{t('disclaimer.title')}</h2>
            <p className="mt-2 text-neutral-300">
                {t('disclaimer.main')}
            </p>
            <p className="mt-2 text-neutral-300">
                {t('disclaimer.warning')}
            </p>
            <p className="mt-2 text-neutral-400 text-sm">
                {t('disclaimer.tip')}
            </p>
        </section>
    )
}