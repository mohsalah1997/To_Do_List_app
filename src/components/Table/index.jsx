import React, { useState } from 'react';
import './style.css';
import StorageData from '../../utils/LocalStorage';
import SweetAlert from '../../utils/SweetAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faArrowRight,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';

let newData = [];
let checkData = {};
const Table = ({ data, changeData }) => {
  const [page, setPage] = useState(0);
  const [newFirstName, setNewFirstName] = useState();
  const [newLastName, setNewLastName] = useState();
  const [newAge, setNewAge] = useState();
  const [editAble, setEditAble] = useState();
  const [checkAll, setCheckAll] = useState(false);
  const [checkBox, setCheckBox] = useState({});

  // console.log(checkBox);

  // console.log(Object.values(checkBox));

  const icon = (sortedColumn, type) =>
    type === 'up' ? (
      <FontAwesomeIcon
        className="Sorting__icon"
        icon={faSortUp}
        color="white"
        onClick={() => setSorted(sortedColumn, type)}
      />
    ) : (
      <FontAwesomeIcon
        className="Sorting__icon"
        icon={faSortDown}
        color="white"
        onClick={() => setSorted(sortedColumn, type)}
      />
    );

  const handelDelete = (deleteId) => {
    console.log(deleteId);
    SweetAlert.ConfirmWithAlert(() => {
      newData = data.filter(({ id }) => id !== deleteId);
      changeData(newData);
      StorageData.AddLocal(newData);
    }, 'warning');
  };

  const setSorted = (sortedColumn, type) => {
    const comparer = (a, b) => {
      if (sortedColumn === 'firstName' || sortedColumn === 'LastName') {
        if (type === 'up') {
          return a[sortedColumn].localeCompare(b[sortedColumn]);
        } else return b[sortedColumn].localeCompare(a[sortedColumn]);
      } else {
        console.log(sortedColumn);
        if (type === 'down') {
          return Number(a[sortedColumn]) > Number(b[sortedColumn]) ? 1 : -1;
        } else {
          return Number(a[sortedColumn]) < Number(b[sortedColumn]) ? 1 : -1;
        }
      }
    };

    changeData([...data].sort(comparer));
  };

  const handelEdit = (idEdit) => {
    newData = data.map((val) => {
      if (val.id === idEdit) {
        return {
          id: val.id,
          firstName: newFirstName,
          LastName: newLastName,
          age: newAge,
        };
      }
      return val;
    });
    changeData(newData);
    setEditAble();
  };
  return (
    <>
      <table className="table__todo">
        <tr>
          <th>
            {' '}
            <input
              type="checkbox"
              id="select-all"
              onChange={() => setCheckAll(!checkAll)}
            />
          </th>
          <th>num </th>
          <th>
            <div className="Th__Sorting">
              first name
              <div className="Sorting">
                {icon('firstName', 'up')}
                {icon('firstName', 'down')}
              </div>
            </div>
          </th>
          <th>
            <div className="Th__Sorting">
              last name
              <div className="Sorting">
                {icon('LastName', 'up')}
                {icon('LastName', 'down')}
              </div>
            </div>
          </th>
          <th>
            <div className="Th__Sorting">
              age
              <div className="Sorting">
                {icon('age', 'up')}
                {icon('age', 'down')}
              </div>
            </div>
          </th>
          <th className="th__operations">operations</th>
        </tr>

        {data &&
          data.map(
            ({ id, firstName, LastName, age }, index) =>
              index >= page &&
              index <= page + 6 &&
              (editAble === id ? (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkAll || checkBox[index]}
                      id={index}
                      name="row"
                      value="bike"
                      onChange={() =>
                        setCheckBox({
                          ...checkBox,
                          [index]: !checkBox[index],
                        })
                      }
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    <input
                      className="edit__input"
                      type="text"
                      value={newFirstName}
                      onChange={({ target: { value } }) =>
                        setNewFirstName(value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      className="edit__input"
                      type="text"
                      value={newLastName}
                      onChange={({ target: { value } }) =>
                        setNewLastName(value)
                      }
                    />
                  </td>

                  <td>
                    <input
                      className="edit__input"
                      type="number"
                      value={newAge}
                      onChange={({ target: { value } }) => setNewAge(value)}
                    />
                  </td>

                  <td>
                    <button
                      onClick={() => handelEdit(id)}
                      className="update__btn"
                    >
                      update
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  <td>
                    <input
                      type="checkbox"
                      checked={checkAll || checkBox[index]}
                      id={index}
                      name="row"
                      value="bike"
                      onChange={() =>
                        setCheckBox({
                          ...checkBox,
                          [index]: !checkBox[index],
                        })
                      }
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>{firstName}</td>
                  <td> {LastName}</td>
                  <td>{age}</td>
                  <td>
                    <button
                      onClick={() =>
                        setEditAble(id) ||
                        setNewFirstName(firstName) ||
                        setNewLastName(LastName) ||
                        setNewAge(age)
                      }
                      className="table__todo__edit__btn"
                    >
                      edit
                    </button>
                    <button
                      onClick={() => handelDelete(id)}
                      className="table__todo__delete__btn"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))
          )}
        <tr>
          <td>
            <button
              onClick={() =>
                // console.log(Object.values(checkBox))
                {
                  checkData = checkBox.map(() => {
                    if (Object.values(checkBox) === true) {
                      return Object.keys(checkBox);
                    }
                  });
                  console.log(checkData);
                }
              }
              className="table__todo__delete__btn"
            >
              delete
            </button>
          </td>
        </tr>
      </table>

      <div className="footer__icon">
        <FontAwesomeIcon
          className="arrow__icon"
          icon={faArrowLeft}
          color="#4CAF50"
          size="2x"
          onClick={() => page > 0 && setPage(page - 7)}
        />
        <FontAwesomeIcon
          className="arrow__icon"
          icon={faArrowRight}
          color="#4CAF50"
          size="2x"
          onClick={() => page + 7 < data.length && setPage(page + 7)}
        />
      </div>
    </>
  );
};
export default Table;
