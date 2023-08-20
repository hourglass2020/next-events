import React, { Fragment } from 'react'
import { useRouter } from 'next/router';
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from '@/dummy-data'

export default function AllEventsPage() {
    const router = useRouter();

    const events = getAllEvents();

    function findEventHandler(year, month) {
        router.push(`/events/${year}/${month}`)
    }

    return (
        <Fragment>
            <EventsSearch onSearch={findEventHandler} />
            <EventList items={events} />
        </Fragment>
    )
}
