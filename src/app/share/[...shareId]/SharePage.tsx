'use client';
import WebsiteDetailsPage from '../../(main)/websites/[websiteId]/WebsiteDetailsPage';
import { useShareToken } from 'components/hooks';
import Page from 'components/layout/Page';
import Header from './Header';
import Footer from './Footer';
import styles from './SharePage.module.css';
import { WebsiteProvider } from 'app/(main)/websites/[websiteId]/WebsiteProvider';
import { useEffect } from 'react';
import { useTheme } from 'components/hooks';

export default function SharePage({ shareId }) {
  const { shareToken, isLoading } = useShareToken(shareId);
  const { saveTheme } = useTheme();

  useEffect(() => {
    if (window.self !== window.top) {
      document.documentElement.setAttribute('data-iframe', '');
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', ({ matches }) => {
          if (matches) {
            saveTheme('dark');
          } else {
            saveTheme('light');
          }
        });
    }
  }, []);

  if (isLoading || !shareToken) {
    return null;
  }

  return (
    <div className={styles.container}>
      <Page>
        <Header />
        <WebsiteProvider websiteId={shareToken.websiteId}>
          <WebsiteDetailsPage websiteId={shareToken.websiteId} />
        </WebsiteProvider>
        <Footer />
      </Page>
    </div>
  );
}
