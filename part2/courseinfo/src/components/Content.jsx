import Part from './Part';

const Content = ({ parts }) => {
  const total = parts.reduce((acc, curr) => acc + curr.exercises, 0);

  return (
    <div>
      {parts.map((part) => (
        <Part name={part.name} exercise={part.exercises} key={part.id} />
      ))}
      <Part name='Total' exercise={total} />
    </div>
  );
};

export default Content;
