const Notification = ({ message }) => {
  const style = {
    border: '2px solid green',
    color: 'green',
  };

  if (!message) {
    return null;
  }

  return <div style={style}>{message}</div>;
};

export default Notification;
