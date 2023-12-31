import { Form, Link } from "react-router-dom";
import styled from "styled-components";

import { FormRow, FormRowSelect, SubmitBtn } from ".";
import {
  JOB_SORT_BY,
  JOB_STATUS,
  JOB_TYPE,
} from "../../server/utils/constance";

export default function SearchContainer() {
  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">search form</h5>

        <div className="form-center">
          <FormRow type="search" name="search" />
          <FormRowSelect
            labelText="job status"
            name="status"
            list={["all", ...Object.values(JOB_STATUS)]}
          />
          <FormRowSelect
            labelText="job type"
            name="type"
            list={["all", ...Object.values(JOB_TYPE)]}
          />
          <FormRowSelect name="sort" list={[...Object.values(JOB_SORT_BY)]} />
          <SubmitBtn formBtn />
          <Link to="/dashboard" className="btn form-btn delete-btn">
            Reset Search Values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border-radius: var(--border-radius);
  width: 100%;
  background: var(--background-secondary-color);
  padding: 3rem 2rem 4rem;
  .form-title {
    margin-bottom: 2rem;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 1rem;
  }
  .form-btn {
    align-self: end;
    margin-top: 1rem;
    display: grid;
    place-items: center;
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
`;
