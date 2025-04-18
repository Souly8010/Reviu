import React, { useState } from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: t('faq.items.0.question'),
      answer: t('faq.items.0.answer')
    },
    {
      question: t('faq.items.1.question'),
      answer: t('faq.items.1.answer')
    },
    {
      question: t('faq.items.2.question'),
      answer: t('faq.items.2.answer')
    },
    {
      question: t('faq.items.3.question'),
      answer: t('faq.items.3.answer')
    },
    {
      question: t('faq.items.4.question'),
      answer: t('faq.items.4.answer')
    },
    {
      question: t('faq.items.5.question'),
      answer: t('faq.items.5.answer')
    },
    {
      question: t('faq.items.6.question'),
      answer: t('faq.items.6.answer')
    },
    {
      question: t('faq.items.7.question'),
      answer: t('faq.items.7.answer')
    },
    {
      question: t('faq.items.8.question'),
      answer: t('faq.items.8.answer')
    },
    {
      question: t('faq.items.9.question'),
      answer: t('faq.items.9.answer')
    }
  ];

  return (
    <section id="faq" style={{ padding: '60px 0'}}>
      <Container maxWidth="md">
        <Typography 
          variant="h3"
          component="h2" 
          align="center" 
          style={{ marginBottom: '30px', color: 'white', fontWeight: 'bold' }}
          data-aos="fade-down"
        >
          {t('faq.title')}
        </Typography>

        <Box>
          {faqItems.map((item, index) => (
            <Paper 
              key={index}
              elevation={3}
              style={{ 
                marginBottom: '12px', 
                background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
              data-aos="fade-up"
              data-aos-delay={(index * 75).toString()}
            >
              <Box 
                onClick={() => handleToggle(index)}
                style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Typography 
                  variant="subtitle1" 
                  style={{ 
                    color: 'white',
                    fontWeight: 500,
                    fontSize: '16px'
                  }}
                >
                  {item.question}
                </Typography>
                <div style={{ 
                  color: '#0ea5e9',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  transform: activeIndex === index ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.3s ease'
                }}>
                  {activeIndex === index ? '×' : '+'}
                </div>
              </Box>
              
              <Box 
                style={{
                  padding: activeIndex === index ? '0px 20px 16px' : '0 20px',
                  maxHeight: activeIndex === index ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'all 0.5s ease',
                  opacity: activeIndex === index ? 1 : 0
                }}
              >
                <Typography 
                  style={{ 
                    color: 'rgba(255, 255, 255, 0.8)',
                    lineHeight: '1.5',
                    fontSize: '14px'
                  }}
                >
                  {item.answer}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default FAQ;
