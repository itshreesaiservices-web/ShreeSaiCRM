import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';
 
// Can be imported from a shared config
const locales = ['en', 'mr', 'hi'];
 
export default getRequestConfig(async ({locale, requestLocale}: any) => {
  // Support both older and newer versions of next-intl
  const resolvedLocale = await requestLocale || locale || 'en';
  const finalLocale = locales.includes(resolvedLocale as any) ? resolvedLocale : 'en';
 
  return {
    locale: finalLocale,
    messages: (await import(`../messages/${finalLocale}.json`)).default
  };
});
