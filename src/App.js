import React, { useState } from 'react';
import InputText from './components/TextInput';
import StorageData from './utils/LocalStorage';

import SweetAlert from './utils/SweetAlert';
import './App.css';
import Table from './components/Table';

const App = () => {
  const [firstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [data, setData] = useState(StorageData.GetLocal() || []);

  const handelClick = () => {
    if (!firstName || !LastName || !age) {
      SweetAlert.GetAlert('Check data please', 'OK', 'Error!');
    } else {
      setData([
        ...data,
        {
          id: data.length > 0 ? data[data.length - 1].id + 1 : 0,
          firstName,
          LastName,
          age,
        },
      ]);

      StorageData.AddLocal([
        ...data,
        {
          id: data.length > 0 ? data[data.length - 1].id + 1 : 0,
          firstName,
          LastName,
          age,
        },
      ]);
    }
  };

  return (
    <div className="container">
      <div className="container__form">
        <InputText
          placeholder="enter first name "
          value={firstName}
          change={setFirstName}
        />
        <InputText
          placeholder="enter last name "
          value={LastName}
          change={setLastName}
        />
        <InputText
          type="number"
          placeholder="enter age "
          value={age}
          change={setAge}
        />
        <button className="form__layout__button" onClick={() => handelClick()}>
          submit
        </button>
      </div>
      <Table data={data} changeData={(newData) => setData(newData)} />
    </div>
  );
};

export default App;
