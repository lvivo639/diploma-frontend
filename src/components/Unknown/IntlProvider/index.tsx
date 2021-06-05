import React from 'react';
import { IntlProvider as IntlProviderBase } from 'react-intl';
import translations from '../../../common/translations';

// eslint-disable-next-line react/jsx-props-no-spreading
export default function IntlProvider({ ...props }) {
  return (
    <IntlProviderBase
      key="en"
      locale="en"
      messages={translations.en}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}
