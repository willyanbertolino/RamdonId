import { useState, useEffect } from 'react';
import { values } from './data/ramdonValues';

const getUsedValues = () => {
  let list = localStorage.getItem('randomValuesUsed');
  if (list) {
    return JSON.parse(localStorage.getItem('randomValuesUsed'));
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getUsedValues());
  const [filtered, setFiltered] = useState([]);

  function filteredFunction(arr1, arr2) {
    arr1 = arr1.filter((item) => {
      return !arr2.includes(item);
    });

    return arr1;
  }

  useEffect(() => {
    setFiltered(filteredFunction(values, list));
    localStorage.setItem('randomValuesUsed', JSON.stringify(list));
  }, [list]);

  const handleClick = (e, index) => {
    let item = filtered[index];
    e.target.disabled = true;
    navigator.clipboard.writeText(item);
    alert(`copiado`);
    setList((prev) => [...prev, item]);
  };

  return (
    <div className="container">
      {filtered.map((item, index) => {
        return (
          <button
            key={item}
            className="content"
            type="button"
            onClick={(e) => handleClick(e, index)}
          >
            <p>{item}</p>
          </button>
        );
      })}
    </div>
  );
}

export default App;
