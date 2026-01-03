import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Shield, Zap, TrendingUp, Clock, LogOut, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import '../styles/landing.css';
import DarkModeToggle from './DarkModeToggle';
import LanguageSwitcher from './LanguageSwitcher';

export default function LandingPage({ user, setUser }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignInClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setShowDialog(false);
    toast.success(t('toast.logout_success'));
    navigate('/');
  };

  const handleGetStartedClick = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="landing-header-content">
          <div className="landing-logo">
            <FileText className="landing-logo-icon" />
            <Link to="/" className="landing-logo-text">
              {t('app.title')}
            </Link>
          </div>
          
          <div className="landing-header-buttons desktop-nav">
            <div className="language-switcher-wrapper">
              <LanguageSwitcher />
            </div>
            {user ? (
              <>
                <button className="landing-signin-button" onClick={() => navigate('/dashboard')}>
                  {t('nav.return_to_dashboard')}
                </button>
                <button className="landing-contact-button" onClick={() => navigate('/contact')}>
                  {t('nav.contact')}
                </button>
                <div className="dashboard-profile">
                  <button onClick={() => setShowDialog(true)} className="btn-logout">
                    <LogOut size={16} /> {t('auth.logout')}
                  </button>
                </div>
              </>
            ) : (
              <>
                <button className="landing-signin-button" onClick={handleSignInClick}>
                  {t('auth.login')}
                </button>
                <button className="landing-contact-button" onClick={() => navigate('/contact')}>
                  {t('nav.contact')}
                </button>
                <button className="landing-signup-button" onClick={handleSignUpClick}>
                  {t('auth.signup')}
                </button>
              </>
            )}
            <DarkModeToggle />
          </div>

          <button className="mobile-menu-button" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu-overlay" onClick={closeMobileMenu}>
            <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
              <div className="mobile-menu-header">
                <span className="mobile-menu-title">{t('app.title')}</span>
                <button className="mobile-menu-close" onClick={closeMobileMenu}>
                  <X size={20} />
                </button>
              </div>
              
              <div className="mobile-menu-content">
                <div className="mobile-menu-item">
                  <LanguageSwitcher />
                </div>
                
                {user ? (
                  <>
                    <button 
                      className="mobile-menu-btn"
                      onClick={() => {
                        navigate('/dashboard');
                        closeMobileMenu();
                      }}
                    >
                      {t('nav.return_to_dashboard')}
                    </button>
                    <button 
                      className="mobile-menu-btn"
                      onClick={() => {
                        navigate('/contact');
                        closeMobileMenu();
                      }}
                    >
                      {t('nav.contact')}
                    </button>
                    <button 
                      className="mobile-menu-btn mobile-logout-btn"
                      onClick={() => {
                        setShowDialog(true);
                        closeMobileMenu();
                      }}
                    >
                      <LogOut size={16} />
                      {t('auth.logout')}
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      className="mobile-menu-btn"
                      onClick={() => {
                        handleSignInClick();
                        closeMobileMenu();
                      }}
                    >
                      {t('auth.login')}
                    </button>
                    <button 
                      className="mobile-menu-btn"
                      onClick={() => {
                        navigate('/contact');
                        closeMobileMenu();
                      }}
                    >
                      {t('nav.contact')}
                    </button>
                    <button 
                      className="mobile-menu-btn mobile-signup-btn"
                      onClick={() => {
                        handleSignUpClick();
                        closeMobileMenu();
                      }}
                    >
                      {t('auth.signup')}
                    </button>
                  </>
                )}
                
                <div className="mobile-menu-item">
                  <DarkModeToggle />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {showDialog && (
        <div className="overlay-popup" role="dialog" aria-modal="true">
          <div className="overlay-card">
            <div className="overlay-header">
              <LogOut size={18} className="overlay-icon" />
              <div className="overlay-title">{t('auth.logout')}</div>
            </div>
            <div className="overlay-body">
              <div className="overlay-text">
                Are you sure you want to log out?
                <div className="overlay-subtext">You'll need to sign in again to continue.</div>
              </div>
              <div className="overlay-actions">
                <button className="btn-confirm" onClick={handleLogout}>
                  {t('common.yes')}, {t('auth.logout')}
                </button>
                <button className="btn-cancel" onClick={() => setShowDialog(false)}>
                  {t('common.cancel')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="landing-hero-section">
        <div className="landing-hero-content">
          <h1 className="landing-hero-title" data-aos="slide-up-fade" data-aos-delay="100">
            {t('homepage.hero_title')}
            <span className="landing-hero-subtitle animated-float" data-aos="slide-up-fade" data-aos-delay="300">{t('app.subtitle')}</span>
          </h1>
          <p className="landing-hero-description" data-aos="fade-up" data-aos-delay="500">
            {t('homepage.hero_subtitle')}
          </p>
          <div className="landing-hero-button-container" data-aos="zoom-in" data-aos-delay="700">
            <button className="landing-primary-button" onClick={handleGetStartedClick}>
              {user ? t('nav.return_to_dashboard') : t('homepage.get_started')}
            </button>
          </div>
        </div>
      </section>

      <section className="landing-features-section">
        <div className="landing-section-header" data-aos="fade-up">
          <h2 className="landing-section-title">{t('homepage.features_title')}</h2>
          <p className="landing-section-description">
            {t('homepage.platform_desc')}
          </p>
        </div>

        <div className="landing-features-grid">
          <div className="landing-feature-card" data-aos="fade-up" data-aos-delay="100">
            <div className="landing-feature-header">
              <div className="landing-feature-icon landing-zap" data-aos="zoom-in" data-aos-delay="200">
                <Zap className="landing-icon landing-zap animated-float" />
              </div>
              <h3 className="landing-feature-title">{t('homepage.feature_1_title')}</h3>
            </div>
            <p className="landing-feature-description">
              {t('homepage.feature_1_desc')}
            </p>
          </div>

          <div className="landing-feature-card" data-aos="fade-up" data-aos-delay="300">
            <div className="landing-feature-header">
              <div className="landing-feature-icon landing-shield">
                <Shield className="landing-icon landing-shield" />
              </div>
              <h3 className="landing-feature-title">{t('homepage.feature_2_title')}</h3>
            </div>
            <p className="landing-feature-description">
              {t('homepage.feature_2_desc')}
            </p>
          </div>

          <div className="landing-feature-card" data-aos="fade-up" data-aos-delay="500">
            <div className="landing-feature-header">
              <div className="landing-feature-icon landing-trending-up" data-aos="zoom-in" data-aos-delay="550">
                <TrendingUp className="landing-icon landing-trending-up animated-float" />
              </div>
              <h3 className="landing-feature-title">{t('homepage.trend_tracking')}</h3>
            </div>
            <p className="landing-feature-description">
              {t('homepage.trend_tracking_desc')}
            </p>
          </div>

          <div className="landing-feature-card" data-aos="fade-up" data-aos-delay="700">
            <div className="landing-feature-header">
              <div className="landing-feature-icon landing-file-text" data-aos="zoom-in" data-aos-delay="750">
                <FileText className="landing-icon landing-file-text animated-float" />
              </div>
              <h3 className="landing-feature-title">{t('homepage.feature_3_title')}</h3>
            </div>
            <p className="landing-feature-description">
              {t('homepage.feature_3_desc')}
            </p>
          </div>

          <div className="landing-feature-card" data-aos="fade-up" data-aos-delay="900">
            <div className="landing-feature-header">
              <div className="landing-feature-icon landing-clock" data-aos="zoom-in" data-aos-delay="950">
                <Clock className="landing-icon landing-clock animated-float" />
              </div>
              <h3 className="landing-feature-title">{t('homepage.available_247')}</h3>
            </div>
            <p className="landing-feature-description">
              {t('homepage.available_247_desc')}
            </p>
          </div>
        </div>
      </section>

      <section className="landing-how-it-works-section">
        <div className="landing-section-header" data-aos="fade-up">
          <h2 className="landing-section-title" data-aos="fade-up" data-aos-delay="100">{t('homepage.how_it_works')}</h2>
          <p className="landing-section-description" data-aos="fade-up" data-aos-delay="200">{t('homepage.how_it_works_desc')}</p>
        </div>

        <div className="landing-steps-grid">
          <div className="landing-step" data-aos="fade-up" data-aos-delay="300">
            <div className="landing-step-number" data-aos="zoom-in" data-aos-delay="400">
              <span className="landing-step-number-text">1</span>
            </div>
            <h3 className="landing-step-title" data-aos="fade-up" data-aos-delay="450">{t('homepage.step_1_title')}</h3>
            <p className="landing-step-description" data-aos="fade-up" data-aos-delay="500">
              {t('homepage.step_1_desc')}
            </p>
          </div>

          <div className="landing-step" data-aos="fade-up" data-aos-delay="600">
            <div className="landing-step-number" data-aos="zoom-in" data-aos-delay="700">
              <span className="landing-step-number-text">2</span>
            </div>
            <h3 className="landing-step-title" data-aos="fade-up" data-aos-delay="750">{t('homepage.step_2_title')}</h3>
            <p className="landing-step-description" data-aos="fade-up" data-aos-delay="800">
              {t('homepage.step_2_desc')}
            </p>
          </div>

          <div className="landing-step" data-aos="fade-up" data-aos-delay="900">
            <div className="landing-step-number" data-aos="zoom-in" data-aos-delay="1000">
              <span className="landing-step-number-text">3</span>
            </div>
            <h3 className="landing-step-title" data-aos="fade-up" data-aos-delay="1050">{t('homepage.step_3_title')}</h3>
            <p className="landing-step-description" data-aos="fade-up" data-aos-delay="1100">{t('homepage.step_3_desc')}</p>
          </div>
        </div>
      </section>

      <section className="landing-cta-section" data-aos="fade-up">
        <div className="landing-cta-card" data-aos="zoom-in" >
          <h2 className="landing-cta-title" data-aos="fade-up" >{t('homepage.cta_title')}</h2>
          <p className="landing-cta-description" data-aos="fade-up" >
            {t('homepage.cta_desc')}
          </p>
          <div className="landing-cta-button-container" data-aos="zoom-in" >
            <button className="landing-primary-button" onClick={handleGetStartedClick}>
              {user ? t('homepage.continue_dashboard') : t('homepage.start_free')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}