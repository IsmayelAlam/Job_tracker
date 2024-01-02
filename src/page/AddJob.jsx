import { Form } from "react-router-dom";
import styled from "styled-components";
import { FormRow, FormRowSelect, SubmitBtn } from "../components";
import { JOB_STATUS, JOB_TYPE } from "../../server/utils/constance";

export default function AddJob() {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <h4 className="form-title">add job</h4>
        <div className="form-center">
          <FormRow type="text" name="company" />
          <FormRow type="text" name="position" />
          <FormRow type="text" labelText="location" name="location" />
          <FormRow type="url" labelText="job post link" name="link" />
          <FormRowSelect name="status" list={Object.values(JOB_STATUS)} />
          <FormRowSelect name="type" list={Object.values(JOB_TYPE)} />
          <SubmitBtn formBtn={"form-btn"} />
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
    margin-bottom: 2rem;
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
