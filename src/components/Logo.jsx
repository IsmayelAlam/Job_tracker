import styled from "styled-components";
import logo from "/logo.svg";

export default function Logo() {
  return (
    <Wrapper className="logo">
      <img src={logo} alt="job tracker logo" className="logoImg" />
      <span className="text">Job Tracker</span>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .text {
    color: #2cb1bc;
    margin: 0 auto;
    font-weight: 700;
    font-size: 24px;
    line-height: 1;
  }
  @media (max-width: 550px) {
    .logoImg {
      width: 32px;
      height: 32px;
    }
    .text {
      font-size: 16px;
    }
  }
`;
