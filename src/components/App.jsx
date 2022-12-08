import { useState } from 'react';
import GlobalStyles from './GlobalStyles';
import { Application } from './App.styled';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';

export default function App() {
  const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);
  const options = ['good', 'neutral', 'bad'];

  const handleFeedbackChange = event => {
    console.log(event.target.name);
    switch (event.target.name) {
      case 'good':
        setGoodFeedback(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutralFeedback(prevState => prevState + 1);
        break;
      case 'bad':
        setBadFeedback(prevState => prevState + 1);
        break;
      default:
        return;
    }
  };

  const countTotalFeedback = () => goodFeedback + neutralFeedback + badFeedback;

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    const positiveFeedback = goodFeedback;
    let result = null;
    if (totalFeedback > 0) {
      result = Math.ceil((positiveFeedback / totalFeedback) * 100);
    }
    console.log(result);
    return result;
  };

  return (
    <Application>
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={options}
          onLeaveFeedback={handleFeedbackChange}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={goodFeedback}
            neutral={neutralFeedback}
            bad={badFeedback}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
      <GlobalStyles />
    </Application>
  );
}
