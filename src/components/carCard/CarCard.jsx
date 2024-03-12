import styles from './CarCard.module.css';

function CarCard({ car }) {
    const titleHandler = (brand, model) => (`${brand} ${model}`);                                       // Add title on each card

    const priceHandler = (price) => (`${price.toLocaleString().replace(/,/g, ' ')} BGN`);               // Format current price   

    return (
        <figure className={styles.figure}>
            <div className={styles.figure__image}>
                <img src={car.mainPhoto
                    ? car.mainPhoto
                    : "/assets/logoLogin.svg"} alt={titleHandler(car.brand, car.model)}
                />
            </div>

            <figcaption className={styles.figcaption}>
                <p>{titleHandler(car.brand, car.model)}</p>
                <p>{priceHandler(car.price)}</p>
            </figcaption>
        </figure>
    );
}

export default CarCard;