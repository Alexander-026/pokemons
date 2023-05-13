import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"
import { keys } from "../../config/keys"

const baseQuery = fetchBaseQuery({
  baseUrl: keys.baseUrl,
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
  reducerPath: "splitApi",
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
