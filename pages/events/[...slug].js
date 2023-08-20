import ErrorAlert from "@/components/events/error-alert";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import React, { Fragment } from "react";

export default function FilteredEventPage() {
    const { query } = useRouter();

    const filteredData = query.slug;

    if (!filteredData) {
        return <p className="center">Loading...</p>;
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return (
            <ErrorAlert>
                <p>Invalid filter. Please adjust your values.</p>
            </ErrorAlert>
        );
    }

    const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>No events found for chosen filter!</ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <div>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </div>
    );
}
