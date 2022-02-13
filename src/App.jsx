import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
function App() {

  const [users, setUsers] = useState([]);
  const url = 'https://reqres.in/api/users?page=1';

  const renderList = (arr) => (
    <ul>
      {arr.map((item) => <li key={uuid()}>{item.first_name}{' '}{item.last_name}<p><img src={item.avatar} /></p><hr /></li>)}
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
        setUsers(response.data.data);
      } catch (e) {
        if (axios.isCancel(e)) {
          // axios request cancelled
          return;
        }
      }
    })();
    // on unmount, cancel source's token from network request
    return () => source.cancel();
  }, []);

  return (
    <main>
      <h2>CancelToken demo</h2>
      {users && users.length > 0 && renderList(users) || 'Loading...'}
    </main>
  );
}

export default App;