import React, { Fragment } from 'react'
import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/helpers/api-util';
import Head from 'next/head';

export default function AllEventsPage(props) {
    const router = useRouter();

    const { events } = props;

    function findEventHandler(year, month) {
        router.push(`/events/${year}/${month}`)
    }

    return (
        <Fragment>
            <Head>
                <title>NextJS Events</title>
                <meta name='description' content="Find a lot of events here!" />
            </Head>
            <EventsSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </Fragment>
    )
}

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events
        },
        revalidate: 60
    }
}