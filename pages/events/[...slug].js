import ErrorAlert from "@/components/events/error-alert";
import EventList from "@/components/events/event-list";
import ResultsTitle from "@/components/events/results-title";
import Button from "@/components/ui/button";
import { getFilteredEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import Head from 'next/head';

export default function FilteredEventPage(props) {
    const [loadedEvents, setLoadedEvents] = useState([]);
    const { query } = useRouter();

    const filteredData = query.slug;

    const { data, error } = useSWR(
        "https://next-events-e651e-default-rtdb.asia-southeast1.firebasedatabase.app/events.json",
        (url) => fetch(url).then((res) => res.json())
    );

    useEffect(() => {
        if (data) {
            const events = [];
            for (const key in data) {
                events.push({
                    id: key,
                    ...data[key],
                });
            }
            setLoadedEvents(events);
        }
    }, [data]);

    let pageHeadData;

    if (!loadedEvents) {
        return (
            <>
                {pageHeadData}
                <p className="center">Loading...</p>;
            </>
        );
    }

    const filteredYear = filteredData[0];
    const filteredMonth = filteredData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    pageHeadData = (
        <Head>
            <title>Filtered Events</title>
            <meta name='description' content='filtered events for you!' />
        </Head>
    );

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return (
            <>
                {pageHeadData}
                <ErrorAlert>
                    <p>Invalid filter. Please adjust your values.</p>
                </ErrorAlert>
            </>
        );
    }

    let filteredEvents = loadedEvents.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === numYear &&
            eventDate.getMonth() === numMonth - 1
        );
    });

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                {pageHeadData}
                <ErrorAlert>No events found for chosen filter!</ErrorAlert>
                <div className="center">
                    <Button link={"/events"}>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(numYear, numMonth - 1);

    return (
        <>
            {pageHeadData}

            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </>
    );
}

// export async function getServerSideProps(context) {
//     const { params } = context;

//     const filteredData = params.slug;

//     const filteredYear = filteredData[0];
//     const filteredMonth = filteredData[1];

//     const numYear = +filteredYear;
//     const numMonth = +filteredMonth;

//     if (
//         isNaN(numYear) ||
//         isNaN(numMonth) ||
//         numYear > 2030 ||
//         numYear < 2021 ||
//         numMonth < 1 ||
//         numMonth > 12
//     ) {
//         return {
//             props: {
//                 hasError: true
//             },
//             // notFound: true,
//             /* redirect: {
//                 destination: '/error'
//             } */
//         };
//     }

//     const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

//     return {
//         props: {
//             events: filteredEvents,
//             date: {
//                 numMonth,
//                 numYear,
//             },
//         },
//     };
// }
