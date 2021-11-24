import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const eventsApi = createApi({
  reducerPath: "events",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://us-central1-sustainathon-dev.cloudfunctions.net",
  }),
  endpoints: (builder) => ({
    getForm: builder.query({
      query: (id) => `sustainathonV3-1/form/schema?eventId=${id}`,
    }),
    getEvents: builder.query({
      query: () => `sustainathonEvents`,
    }),
    getEvent: builder.query({
      query: (id) => `sustainathonEventDetails?id=${id}`,
    }),
    getEventChallenges: builder.query({
      query: (id) => `fetchChallenges?id=${id}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEventsQuery,
  useGetEventQuery,
  useGetEventChallengesQuery,
  useGetFormQuery
} = eventsApi;
