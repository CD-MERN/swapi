import { useEffect, useState } from "react"
import axios from 'axios'
function Search() {
  const [list, setList] = useState([]);
  const [resource, setResource] = useState({});
  const [identifier, setIdentifier] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    getList()
  }, []);
  const capitalCase = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
  const getList = () => {
    return axios.get('https://swapi.dev/api/').then((response) => {
      let list = [];
      const data = response.data;
      for (const key in data) {
        list.push({ key: key, name: capitalCase(key), url: data[key] })
      }
      setList(list)
      if (list.length) {
        setResource(list[0])
      }
    });
  };
  const handleResource = (select) => {
    const idx = select.target.value;
    setResource(list[idx]);
  }

  const handleIdentifier = (e) => {
    resetData()
    const id = e.target.value;
    if (id > 0) {
      setIdentifier(id);
    } else {
      setIdentifier(1);
    }
  }
  const resetData = () => {
    setData({})
  }
  const getApiResource = async (url) => {
    let data = {}
    await axios
      .get(url)
      .then((response) => {
        data = {
          type: 'success',
          payload: response.data
        }
      })
      .catch(() => {
        data = {
          type: 'error',
          payload: null
        }

      });
    return data;
  }
  const search = async () => {

    if (!resource || !identifier) {
      alert('check form inputs');
      return;
    }

    const base_url = resource.url + '/' + identifier;
    let data = await getApiResource(base_url);
    setData(data);
    if (resource.key === 'people' && data.type === 'success') {
      const homeworld = await getApiResource(data.payload.homeworld);
      data.payload.home = homeworld.payload;
      setData(data)
    }

  }
  return (

    <>
      <div className='row align-items-center justify-content-between mb-5'>
        <div className='col-md-6'>
          <div className="form-floating">
            <select className="form-select" onChange={handleResource}>
              {list.map((item, idx) => (
                <option value={idx} key={idx}>{item.name}</option>
              ))}
            </select>
            <label >Select any resource</label>
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-floating">
            <input type="number" className="form-control" min="1" value={identifier} onInput={handleIdentifier} />
            <label >Identifier</label>
          </div>
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary" onClick={search}>Search</button>
        </div>
      </div>
      {
        data.type === 'success' &&
        <div className="result">
          <p className="fs-1 text-center">Result for resource</p>
          <ul className="list-group mb-3">
            {Object.keys(data.payload).map((key, index) => (
              index <= 7 && <li key={key} className="list-group-item">{key} : {data.payload[key]}</li>
            ))}

          </ul>

          {
            data.payload.home &&
            <div>
              <p className="fs-3 text-center">Homeworld</p>
              <ul className="list-group">
                {Object.keys(data.payload.home).map((key, index) => (
                  index <= 7 && <li key={key} className="list-group-item">{key} : {data.payload.home[key]}</li>
                ))}

              </ul>
            </div>
          }

        </div>
      }

      {
        data.type === 'error' &&
        <div className="text-center">
          <img className="border rounded p-5" src="404.jpg" width="400" alt="error.jpg"></img>
          <p className="fs-2 text-decoration-underline" style={{ color: 'brown' }}>Estos no son los droides que está buscando</p>
        </div>
      }

    </>

  )
}

export default Search