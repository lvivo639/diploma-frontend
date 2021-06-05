import enTranslationMessages from '../translations/en.json';

const formatTranslationMessages = (
  locale: string,
  messages: { [key: string]: string },
): { [key: string]: string } => {
  const defaultLocale = 'en';
  const messageKeys = Object.keys(messages);
  const defaultFormattedMessages =
    locale !== defaultLocale
      ? formatTranslationMessages(defaultLocale, enTranslationMessages)
      : {};

  return messageKeys.reduce((formattedMessages, key) => {
    const isDefaultFormattedMessage =
      !messages[key] && locale !== defaultLocale;
    const formattedMessage = isDefaultFormattedMessage
      ? defaultFormattedMessages[key]
      : messages[key];

    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

const translations = {
  en: formatTranslationMessages('en', enTranslationMessages),
};

export default translations;
