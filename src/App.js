import React, { useEffect, useState } from "react"
import { FormControl, Paper, TextField, Select } from "@mui/material"
import './style.css'

import Axios from "axios";


function App() {

  const [text, setText] = useState(1);
  const [text2, setText2] = useState(1)
  const [country, setCountry] = useState([])
  const [country2, setCountry2] = useState([])
  const [value, setValue] = useState(1)
  const [value2, setValue2] = useState(1)


  useEffect(() => {
    getdata();
  }, [])

  async function getdata() {
    const result = await Axios.get("http://data.fixer.io/api/latest?access_key=0a051b5d1b8da6b642c6e01291d11256");

    console.log(result.data);

    setCountry(result.data.rates)
    setCountry2(result.data.rates)
  }

  function convert(e) {
    e.preventDefault();
    let num = (value2 / value) * text;
    setText2(num)

  }

  return (

    <div className="App">
      <Paper className="paper">
        <h2>Currency Converter</h2>
        <form onSubmit={convert}>
          <div>
            <h3>From</h3>
            <TextField variant="outlined" value={text || ""} onChange={(e) => setText(e.target.value)} autoComplete="off" />
            <FormControl variant="outlined" className="dropdown" onChange={(e) => setValue(e.target.value)}>
              <Select native>
                {/* <option>currency</option> */}

                {Object.keys(country).map((value, index) =>
                  <option key={index} value={country[value]}>{value}</option>)}
              </Select>
            </FormControl>
          </div>
          <div>
            <h3>To</h3>
            <TextField variant="outlined" value={text2 || ""} onChange={(e) => setText2(e.target.value)} autoComplete="off" />
            <FormControl variant="outlined" className="dropdown" onChange={(e) => setValue2(e.target.value)}>
              <Select native>
                {/* <option>currency</option> */}

                {Object.keys(country2).map((value, index) =>
                  <option key={index} value={country[value]}>{value}</option>)}
              </Select>
            </FormControl>
          </div>

          <button className="btn" type="submit" variant="contained">
            Convert
          </button>
        </form>
      </Paper>
    </div>
  );
}

export default App;
