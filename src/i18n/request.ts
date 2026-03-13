import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

import esMessages from '../../messages/es.json';
import enMessages from '../../messages/en.json';
import ptMessages from '../../messages/pt.json';

const messageMap = {
    es: esMessages,
    en: enMessages,
    pt: ptMessages
};

type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;

    if (!locale || !routing.locales.includes(locale as Locale)) {
        locale = routing.defaultLocale;
    }

    return {
        locale,
        messages: messageMap[locale as keyof typeof messageMap]
    };
});