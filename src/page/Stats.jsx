import { useLoaderData } from "react-router-dom";
import { ChartsContainer, StatsContainer } from "../components";

export default function Stats() {
  const { defaultStats, monthlyApplications } = useLoaderData();
  return (
    <>
      <StatsContainer defaultStats={defaultStats} />
      {monthlyApplications?.length > 0 && (
        <ChartsContainer data={monthlyApplications} />
      )}
    </>
  );
}
