import { useRouter } from "next/router";
import Head from 'next/head';

import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import ErrorAlert from "@/components/events/error-alert";
import Button from "@/components/ui/button";
import { getAllEvents, getEventById, getFeaturedEvents } from "@/helpers/api-util";

export default function EventDetailPage(props) {
    const event = props.event;

    if (!event) {
        return (
            <>
                <ErrorAlert>
                    <p>No event found!</p>
                </ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show All Events</Button>
                </div>
            </>
        );
    }

    return (
        <Fragment>
            <Head>
                <title>{event.title}</title>
                <meta name='description' content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                image={event.image}
                imageAlt={event.title}
                date={event.date}
                address={event.location}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
        </Fragment>
    );
}


export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map(event => ({
        params: {
            eventId: event.id
        }
    }))

    return {
        paths: paths,
        fallback: true
    }
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return {
        props: {
            event
        },
        revalidate: 30
    }
}