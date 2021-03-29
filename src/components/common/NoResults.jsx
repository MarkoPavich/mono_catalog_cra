import React from 'react';
import { withNamespaces } from 'react-i18next';
import './NoResults.css';

function NoResults({ t }) {
  function resetDemo() {
    localStorage.clear();
    window.location.reload();
  }

  return (
    <div className="c-noResults-container">
      <div className="c-noResults-inner-container">
        <span>{t('noResultsComponent.header')}</span>
        <button onClick={resetDemo} type="submit">
          {t('noResultsComponent.resetBtn')}
        </button>
      </div>
    </div>
  );
}

export default withNamespaces()(NoResults);
