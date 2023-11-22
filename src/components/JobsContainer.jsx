import styled from "styled-components";
import { useAllJobsContext } from "../page/AllJobs";

export default function JobsContainer() {
  const { jobs } = useAllJobsContext();
  return (
    <Wrapper>
      <h5>job{jobs.length > 1 && "s"} found</h5>
      <div className="jobs">
        {jobs.map((job) => (
          <h3 key={job._id}>{job.company}</h3>
        ))}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
    margin-bottom: 1.5rem;
  }
  .jobs {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
  }
  @media (min-width: 1120px) {
    .jobs {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }
  }
`;
