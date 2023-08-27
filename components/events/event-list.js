import EventItem from "./event-item";

import styles from "./event-list.module.css";

function EventList(props) {
    const { items } = props;

    return (
        <ul className={styles.list}>
            {items.map((item) => (
                <EventItem
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    location={item.location}
                    image={item.image}
                    date={item.date}
                />
            ))}
        </ul>
    );
}

export default EventList;
