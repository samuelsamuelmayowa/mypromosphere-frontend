import { useState, useEffect } from 'react'
import axios from 'axios';

const PersonalInfo = () => {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("")
  const [language, setLanguage] = useState("")
  console.log(language)
  const changeLanguage = (e) => {
    setLanguage(e.target.value)
  }
  const changeCountry = (e) => {
    setCountry(e.target.value)
  }

  const url = "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json";

  const fetchCountry = async (url) => {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setCountries(data);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    fetchCountry(url);
  }, []);

  const newCountry = [...new Set(countries.map((item) => item.country))];

  return (
    <div>
      {/* text  */}
      <article className="jost">
        <h1 className="font-700 md:text-xl text-xl">Personal Information</h1>
        <p className="max-w-lg my-2 text-xs md:text-base">
          Edit your basic personal info to improve recommendations. This
          information is private and won’t show up in your public profile
        </p>
      </article>

      <div className="mt-2">
        <form>
          <div>
            <label htmlFor="birthDate" className='font-700 jost'>BirthDate</label> <br />
            <input
              type="text"
              className={`bg-slate-100 dark:bg-DARKBG mt-3 w-full focus:outline-none p-2 text-[1rem] rounded-md`}
              placeholder="MM-DD-YY"
            />
             {/* <Calendar onChange={onChange} value={value} /> */}
          </div>
        </form>
      </div>
      {/*radio input*/}
      <article className="mt-2">
        <h3 className='font-700'>Gender</h3>
        <form action="" className="mt-4 flex gap-x-4  ">
          {/* input-1  */}
          <div className="flex items-center gap-x-3 ">
            <label htmlFor="Male" className="">
              Male
            </label>
            <input type="radio" id="male" name="gender" className="" />
          </div>
          {/* input-2  */}
          <div className="flex items-center gap-x-3 ">
            <label htmlFor="Female">Female</label>
            <input type="radio" id="female" name="gender" />
          </div>
          {/* input-3  */}
          <div className="flex items-center gap-x-3 ">
            <label htmlFor="Non-Binary">Non-Binary</label>
            <input type="radio" id="non-binary" name="gender" />
          </div>
        </form>
      </article>
      {/*radio input */}

      {/* country  */}
      <article className="mt-4">
        {/* country */}
        <div>
          <h3 className='font-700'>Country/Region</h3>
          {/* country input  */}
          <form className="mt-0">
            <div>
              <select
                id="countries"
                name="countries"
                placeholder="Select Country"
                className={`focus:outline focus:outline-2 focus:outline-purple bg-slate-100 dark:bg-DARKBG dark:placeholder:text-smallTextDark mt-3 focus:outline-none p-2 text-[1rem] rounded-md w-full`}
                value={country}
                onChange={changeCountry}
              >
                <option value="Select Country">Select Country</option>
                {newCountry.map(function (item, index) {
                  return (
                    <option value={item} className="text-slate-600" key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
          {/* end of country input  */}
        </div>
        {/*end of country */}
      </article>

      {/*Language */}
      <article className="mt-4">
        {/* country */}
        <div>
          <h3 className='font-700'>Language</h3>
          {/* country input  */}
          <form className="mt-0">
            <div>
              <select
                id="countries"
                name="countries"
                placeholder="Select Country"
                className={`bg-slate-100 dark:bg-DARKBG focus:outline focus:outline-2 focus:outline-purple dark:placeholder:text-smallTextDark mt-3 focus:outline-none p-2 text-[1rem] rounded-md w-full`}
                value={language}
                onChange={changeLanguage}
              >
                <option value="Select Country">Select Language</option>
                {language.map(function (item, index) {
                  return (
                    <option value={item} className="text-slate-600" key={index}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
          </form>
        </div>
      </article>
    </div>
  );
}

export default PersonalInfo