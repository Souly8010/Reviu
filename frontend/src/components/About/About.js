import React from 'react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  
  return (
    <section id="about">
      <h2>{t('about.title')}</h2>
      
      <div data-aos="fade-up" data-aos-duration="1000">
        <h3 style={{ color: '#0ea5e9', marginBottom: '15px' }}>{t('about.mission.title')}</h3>
        <p dangerouslySetInnerHTML={{ __html: t('about.mission.description') }}></p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        <h3 style={{ color: '#0ea5e9', marginBottom: '15px' }}>{t('about.problem.title')}</h3>
        <p>{t('about.problem.description1')}</p>
        <p>{t('about.problem.description2')}</p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
        <h3 style={{ color: '#0ea5e9', marginBottom: '15px' }}>{t('about.solution.title')}</h3>
        <p>{t('about.solution.description')}</p>
        <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#d1d5db' }}>
          <li>{t('about.solution.list.item1')}</li>
          <li>{t('about.solution.list.item2')}</li>
          <li>{t('about.solution.list.item3')}</li>
          <li>{t('about.solution.list.item4')}</li>
        </ul>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
        <h3 style={{ color: '#0ea5e9', marginBottom: '15px' }}>{t('about.benefits.title')}</h3>
        <p>{t('about.benefits.description')}</p>
        <ul style={{ marginLeft: '20px', marginBottom: '15px', color: '#d1d5db' }}>
          <li>{t('about.benefits.list.item1')}</li>
          <li>{t('about.benefits.list.item2')}</li>
          <li>{t('about.benefits.list.item3')}</li>
          <li>{t('about.benefits.list.item4')}</li>
          <li>{t('about.benefits.list.item5')}</li>
        </ul>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
        <h3 style={{ color: '#0ea5e9', marginBottom: '15px' }}>{t('about.commitment.title')}</h3>
        <p>{t('about.commitment.description1')}</p>
        <p>{t('about.commitment.description2')}</p>
      </div>

      <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000" style={{ marginTop: '20px' }}>
        <p style={{ fontWeight: 'bold', color: '#0ea5e9' }}>
          {t('about.conclusion')}
        </p>
      </div>
    </section>
  );
};

export default About;
