import { useState, useEffect } from "react"
import axios from 'axios'
import { useParams } from "react-router";
function People() {
  const [data, setData] = useState({});
  const { id } = useParams();

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

    const base_url = 'https://swapi.dev/api/people/' + id;
    let data = await getApiResource(base_url);
    if(data.type === 'success'){
      const homeworld = await getApiResource(data.payload.homeworld);
      data.payload.home = homeworld.payload;
    }
    setData(data)

  }

  useEffect(() => {
    search()
  }, []);
  
  return (

    <>
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

export default People