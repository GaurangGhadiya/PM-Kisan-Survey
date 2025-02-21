import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/globals.css";

let items = {
    "bootstrap": [
        {
            "id": 1,
            "title": "Photography",
            "body": "Bootstrap Carousel Example",
            "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/v1586799813/kizmelvin/persons_pigeon_nurkq2.jpg",
            "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        },
        {
            "id": 2,
            "title": "City Views",
            "body": "Bootstrap Carousel Example",
            "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/v1587785064/kizmelvin/michael-BcgEo2CNeYA-unsplash_cdaruk.jpg",
            "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        },
        {
            "id": 3,
            "title": "Wild Life",
            "body": "Bootstrap Carousel Example",
            "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/v1586799827/kizmelvin/brownlion_qm8hah.jpg",
            "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        },
        {
            "id": 4,
            "title": "Foods and Culture",
            "body": "Bootstrap Carousel Example",
            "imageUrl": "https://res.cloudinary.com/kizmelvin/image/upload/v1587870308/kizmelvin/edvin-johansson-5AylXcpJn1I-unsplash_lbhgod.jpg",
            "docs": "https://getbootstrap.com/docs/4.0/components/carousel/"
        }
    ],
}


export default function CarouselComponent() {
    const { bootstrap } = items;
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            {bootstrap.map((item) => (
                <Carousel.Item key={item.id} className={styles.itemP} interval={4000}>
                    <img src={item.imageUrl} alt="slides" />
                    {/* <Carousel.Caption className={styles.caption}>
                        <h3>{item.title}</h3>
                        <p>{item.body}</p>
                        <button className="btn btn-danger">Visit Docs</button>
                    </Carousel.Caption> */}
                </Carousel.Item>
            ))}
        </Carousel>
    );
}
