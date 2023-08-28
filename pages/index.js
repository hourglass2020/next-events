import EventList from '@/components/events/event-list';
import { getFeaturedEvents } from '@/helpers/api-util';
import Head from 'next/head';

export default function HomePage(props) {
    const { events } = props;

    return (
        <div>
            <Head>
                <title>NextJS Events</title>
                <meta name='description' content="Find a lot of events here!" />
            </Head>
            <EventList items={events} />
        </div>
    )
}


export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return {
        props: {
            events: featuredEvents
        },
        revalidate: 1800
    }
}