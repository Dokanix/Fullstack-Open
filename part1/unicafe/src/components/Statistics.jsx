import Statistic from './Statistic';

const Statistics = ({ good, neutral, bad }) => {
  let all = good + neutral + bad;

  const renderStatistics = () => {
    if (good || neutral || bad) {
      return (
        <table>
          <Statistic count={good}>Good</Statistic>
          <Statistic count={neutral}>Neutral</Statistic>
          <Statistic count={bad}>Bad</Statistic>
          <Statistic count={all}>All</Statistic>
          <Statistic count={(good - bad) / all}>Average</Statistic>
          <Statistic count={good / all}>Positive</Statistic>
        </table>
      );
    }

    return <div>No feedback given</div>;
  };

  return (
    <div>
      <h2>Statistics</h2>
      {renderStatistics()}
    </div>
  );
};

export default Statistics;
