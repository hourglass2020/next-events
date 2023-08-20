import { useRouter } from "next/router";

import { getEventById } from "@/dummy-data";
import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventContent from "@/components/event-detail/event-content";
import EventLogistics from "@/components/event-detail/event-logistics";
import ErrorAlert from "@/components/events/error-alert";
import Button from "@/components/ui/button";

export default function EventDetailPage() {
    const { query } = useRouter();
    const event = getEventById(query.eventId);

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
