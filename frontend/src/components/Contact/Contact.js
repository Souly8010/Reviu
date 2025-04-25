import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <section id="contact">
      <h2>{t('contact.title')}</h2>
      <p>{t('contact.emailQuestion')} <a href="mailto:{t('contact.emailAddress')}">{t('contact.emailAddress')}</a></p>
    </section>
  );
};

export default Contact;
