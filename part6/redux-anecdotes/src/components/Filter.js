import { set } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(set(event.target.value));
  };

  return (
    <div>
      <label htmlFor='filter'>Filter</label>
      <input onChange={handleChange} type='text' id='filter' />
    </div>
  );
};

export default Filter;
