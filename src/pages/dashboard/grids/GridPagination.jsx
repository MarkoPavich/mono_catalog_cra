import React from 'react';
import { nanoid } from 'nanoid';
import { observer } from 'mobx-react-lite';
import { withNamespaces } from 'react-i18next';
import { useVehiclesStore } from '../../../StoreProvider';

const GridPagination = observer(({ t }) => {
  const {
    vehiclesList,
    currentPage,
    maxPageNumLinks,
    selectPage,
  } = useVehiclesStore();
  const { pages, firstIndexInRange } = vehiclesList;

  // Page links generator function
  function PageLinks() {
    const links = [];

    // Handle page_range jump previous
    if (firstIndexInRange !== 1) {
      links.push(
        <span
          tabIndex={0}
          role="button"
          onKeyDown={() => selectPage(firstIndexInRange - 1)}
          onClick={() => selectPage(firstIndexInRange - 1)}
          key={nanoid()}
        >
          ...
        </span>
      );
    }

    // Generate page links
    for (
      let i = firstIndexInRange;
      i < firstIndexInRange + maxPageNumLinks && i < pages + 1;
      i += 1
    ) {
      links.push(
        <span
          tabIndex={0}
          role="button"
          className={currentPage === i ? 'pagination-page-link-current' : ''}
          onKeyDown={() => selectPage(i)}
          onClick={() => selectPage(i)}
          key={nanoid()}
        >
          {i}
        </span>
      );
    }

    // Handle page_range jump next
    if (firstIndexInRange + maxPageNumLinks < pages + 1) {
      links.push(
        <span
          tabIndex={0}
          role="button"
          onKeyDown={() => selectPage(firstIndexInRange + maxPageNumLinks)}
          onClick={() => selectPage(firstIndexInRange + maxPageNumLinks)}
          key={nanoid()}
        >
          ...
        </span>
      );
    }

    return links; // Export as array
  }

  return (
    <footer className="c-carsGrid-pagination-footer">
      <div className="c-carsGrid-pagination-previous-box">
        {currentPage !== 1 ? (
          <span
            tabIndex={0}
            role="button"
            onKeyDown={() => selectPage(currentPage - 1) /* previous */}
            onClick={() => selectPage(currentPage - 1)}
          >
            {t('pagination.previous')}
          </span>
        ) : (
          <></>
        )}
      </div>
      <div className="c-carsGrid-pagination-nums">
        <PageLinks />
      </div>
      <div className="c-carsGrid-pagination-next-box">
        {currentPage !== pages && pages !== 0 ? (
          <span
            tabIndex={0}
            role="button"
            onKeyDown={() => selectPage(currentPage + 1) /* next */}
            onClick={() => selectPage(currentPage + 1)}
          >
            {t('pagination.next')}
          </span>
        ) : (
          <></>
        )}
      </div>
    </footer>
  );
});

export default withNamespaces()(GridPagination);
