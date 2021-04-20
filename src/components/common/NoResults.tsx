import { observer } from 'mobx-react-lite';
import { useTranslation } from 'react-i18next';
import { useCarsDataStore } from '../../StoreProvider';
import Spinner from './Spinner';
import './NoResults.css';

const NoResults = observer(() => {
  const { t } = useTranslation();
  const { isLoading } = useCarsDataStore();

  function resetDemo() {
    localStorage.clear();
    window.location.reload();
  }

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="c-noResults-container">
      <div className="c-noResults-inner-container">
        <span>{t('noResultsComponent.header')}</span>
        <button onClick={resetDemo} type="submit">
          {t('noResultsComponent.resetBtn')}
        </button>
      </div>
    </div>
  );
});

export default NoResults;
