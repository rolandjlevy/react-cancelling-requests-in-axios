import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

function App() {

  const [todos, setTodos] = useState({});
  const url = 'https://jsonplaceholder.typicode.com/todos';

  const labels = ['One', 'Two', 'Three', 'Four'];

  const renderList = (arr) => (
    <ul>
      {arr.map(item => <li key={uuid()}>{item.title}</li>)}
    </ul>
  );

  // What problem does CancelToken solve? When we're trying to update state within the callback of a network request after the component has been destroyed

  useEffect(() => {
    // the source variable holds the result of axios.CancelToken.source,
    const source = axios.CancelToken.source();
    (async () => {
      try {
        // send cancelToken - the data containing the source's token
        const response = await axios.get(url, { cancelToken: source.token });
        setTodos(response.data);
      } catch (e) {
        if (axios.isCancel(error)) return;
      }
    })();
    // on unmount, cancel source's token from network request
    return () => source.cancel();
  }, []);

  return (
    <main>
      {todos && todos.length > 0 && renderList(todos)}
    </main>
  );
}

export default App;