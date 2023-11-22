import { createContext, useContext } from "react";
import { JobsContainer, SearchContainer } from "../components";
import { useLoaderData } from "react-router-dom";

const AllJobsContext = createContext();

export default function AllJobs() {
  const data = useLoaderData();
  return (
    <AllJobsContext.Provider value={data}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
}

export const useAllJobsContext = () => useContext(AllJobsContext);
