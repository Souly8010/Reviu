import React from 'react';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  
  return (
    <section id="contact">
      <h2>{t('contact.title')}</h2>
      <p>{t('contact.emailQuestion')} <a href="mailto:contact@votresite.com">contact@votresite.com</a></p>
    </section>
  );
};

export default Contact;
