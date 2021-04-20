import { useTranslation } from 'react-i18next';
import './CarCard.css';
import { Vehicle } from '../../../types';

function CarCard({ vehicle }: { vehicle: Vehicle }) {
  const {
    id,
    make,
    model,
    variant,
    img,
    mileage,
    description,
    manufactureDate,
    price,
  } = vehicle;
  const { t } = useTranslation();

  const header = `${manufactureDate.slice(0, 4)}. ${make.name} ${
    model.name
  } ${variant}`;

  function openEditmode() {
    window.location.href = `/#/edit-vehicle?id=${id}`;
  }

  function formatHeader(span: string) {
    if (span.length < 29) return span;
    return `${span.slice(0, 25)}...`;
  }

  function formatDesc(desc: string) {
    if (desc.length < 100) return desc;
    return `${desc.slice(0, 96)}...`;
  }

  return (
    <div className="c-catalog-item-card">
      <h3>{formatHeader(header)}</h3>
      <div className="c-catalog-card-img-container">
        <img src={img} alt="car.img" />
      </div>
      <div className="c-catalog-card-mileage-price-box">
        <span>
          <strong>{t('carCard.mileage')}:</strong> {`${mileage} km`}
        </span>
        <span>
          <strong>{t('carCard.price')}:</strong> {`${price} €`}
        </span>
      </div>
      <div className="c-catalog-card-desc-box">
        <span>{formatDesc(description)}</span>
      </div>
      <div className="c-catalog-card-CTA-box">
        <button onClick={openEditmode} type="button">
          {t('carCard.open')}
        </button>
      </div>
    </div>
  );
}

export default CarCard;
