import React from "react";
import "./styles.css";
import {
  differenceInDays,
  differenceInSeconds,
  intervalToDuration
} from "date-fns";
import styled from "styled-components";
import Confetti from 'react-confetti'

const Wrapper = styled.div`
  background-color: white;
  padding: 30px;
  margin: 0;
  font-family: "Roboto";
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  color: #1e5d84;

  @media (min-width: 500px) {
    height: 100vh;
    justify-content: center;
    padding: 0;
  }
`;

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: 50px;
`;

const CountdownWrapper = styled.div`
  display: flex;
  padding: 10px;
  border-radius: 10px;
  flex-direction: column;

  @media (min-width: 500px) {
    flex-direction: row;
  }
`;

const CountdownItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 60px;
  margin-bottom: 20px;
  background: #e66c55;
  color: white;
  padding: 10px;
  border-radius: 10px;
  min-width: 120px;
  min-height: 120px;
  font-weight: 800;

  @media (min-width: 500px) {
    margin-right: 20px;
    margin-bottom: 0;
  }

  span {
    font-size: 25px;
    font-weight: 400;
  }
`;

export default function App() {
  const [date, setDate] = React.useState(new Date());
  const rudiesLaunchDate = new Date("March 15, 2021 10:00:00");

  React.useEffect(() => {
    setTimeout(() => {
      setDate(new Date());
    }, 1000);
  }, [date]);

  const interval = intervalToDuration({
    start: date,
    end: rudiesLaunchDate
  });

  const countdown = {
    days: differenceInDays(rudiesLaunchDate, date),
    hours: interval.hours,
    minutes: interval.minutes,
    seconds: interval.seconds
  };

  return (
    <Wrapper className="App">
      <Confetti
        run={differenceInSeconds(rudiesLaunchDate, date) <= 0}
        colors={[
          '#1e5d84',
          '#ffe180',
          '#f2c4c4',
          '#e66c55',
          '#94b8d1',
          '#fbf8e9',
          '#f9ecec',
          '#f5c5bc',
        ]}
        numberOfPieces={500}
      />
      {
        differenceInSeconds(rudiesLaunchDate, date) > 0
          ? (
            <Title>Rudie's goes live in....</Title>
          ) : (
            <Title>Rudies Kitchen is... Live! <span aria-label='tada' role='img'>🎉</span></Title>
          )
      }
      <CountdownWrapper>
        {differenceInSeconds(rudiesLaunchDate, date) > 0 ? (
          <React.Fragment>
            <CountdownItem>
              {countdown.days}
              <span>{countdown.days === 1 ? "Day" : "Days"}</span>
            </CountdownItem>
            <CountdownItem>
              {countdown.hours}
              <span>{countdown.hours === 1 ? 'Hour' : `Hours`}</span>
            </CountdownItem>
            <CountdownItem>
              {countdown.minutes}
              <span>{countdown.minutes === 1 ? `Minute` : `Minutes`}</span>
            </CountdownItem>
            <CountdownItem>
              {countdown.seconds}
              <span>{countdown.seconds === 1 ? "Second" : "Seconds"}</span>
            </CountdownItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <CountdownItem>
              { 0 }
              <span>{"Days"}</span>
            </CountdownItem>
            <CountdownItem>
              { 0 }
              <span>{`Hours`}</span>
            </CountdownItem>
            <CountdownItem>
              { 0 }
              <span>{`Minutes`}</span>
            </CountdownItem>
            <CountdownItem>
              { 0 }
              <span>{"Seconds"}</span>
            </CountdownItem>
          </React.Fragment>
        )}
      </CountdownWrapper>
    </Wrapper>
  );
}
