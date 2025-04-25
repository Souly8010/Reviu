import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Menu, MenuItem } from '@mui/material';
import TranslateIcon from '@mui/icons-material/Translate';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import './LanguageSwitcher.css';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  const getLanguageFlag = (code) => {
    switch (code) {
      case 'fr':
        return '🇫🇷';
      case 'en':
        return '🇬🇧';
      case 'nl':
        return '🇳🇱';
      case 'es':
        return '🇪🇸';
      default:
        return '';
    }
  };

  const currentLangCode = i18n.language.substring(0, 2) || 'fr';

  return (
    <div className="language-switcher" data-aos="fade-down" data-aos-duration="3000" data-aos-delay="900">
      <Button
        id="language-button"
        aria-controls={open ? 'language-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        startIcon={<TranslateIcon />}
        sx={{
          color: 'white',
          fontWeight: 'bold',
          textTransform: 'none',
          fontSize: '0.875rem',
          padding: '8px 16px',
          borderRadius: '20px',
          backgroundColor: '#0ea5e9',
          '&:hover': {
            backgroundColor: '#0284c7',
            transform: 'translateY(-2px)',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
          },
          transition: 'all 0.3s ease'
        }}
        className="nav-btn"
      >
        {getLanguageFlag(currentLangCode)} {t(`languages.${currentLangCode}`)}
      </Button>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'language-button',
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            borderRadius: '8px',
            mt: 1
          }
        }}
      >
        <MenuItem onClick={() => changeLanguage('fr')} selected={currentLangCode === 'fr'} sx={{ fontSize: '14px', padding: '8px 16px' }}>
          <span className="language-flag">🇫🇷</span> {t('languages.fr')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('en')} selected={currentLangCode === 'en'} sx={{ fontSize: '14px', padding: '8px 16px' }}>
          <span className="language-flag">🇬🇧</span> {t('languages.en')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('es')} selected={currentLangCode === 'es'} sx={{ fontSize: '14px', padding: '8px 16px' }}>
          <span className="language-flag">🇪🇸</span> {t('languages.es')}
        </MenuItem>
        <MenuItem onClick={() => changeLanguage('nl')} selected={currentLangCode === 'nl'} sx={{ fontSize: '14px', padding: '8px 16px' }}>
          <span className="language-flag">🇳🇱</span> {t('languages.nl')}
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;
