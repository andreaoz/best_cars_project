import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import Header from '../Header/Header';


const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState();
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("postreview"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let review_url = root_url+`djangoapp/add_review`;
  let carmodels_url = root_url+`djangoapp/get_cars`;

  const postreview = async ()=>{
    let name = sessionStorage.getItem("firstname")+" "+sessionStorage.getItem("lastname");
    //If the first and second name are stores as null, use the username
    if(name.includes("null")) {
      name = sessionStorage.getItem("username");
    }
    if(!model || review === "" || date === "" || year === "" || model === "") {
      alert("All details are mandatory")
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      "name": name,
      "dealership": id,
      "review": review,
      "purchase": true,
      "purchase_date": date,
      "car_make": make_chosen,
      "car_model": model_chosen,
      "car_year": year,
    });

    console.log(jsoninput);
    const res = await fetch(review_url, {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: jsoninput,
  });

  const json = await res.json();
  if (json.status === 200) {
      window.location.href = window.location.origin+"/dealer/"+id;
  }

  }
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      if(dealerobjs.length > 0)
        setDealer(dealerobjs[0])
    }
  }

  const get_cars = async ()=>{
    const res = await fetch(carmodels_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    let carmodelsarr = Array.from(retobj.CarModels)
    setCarmodels(carmodelsarr)
  }
  useEffect(() => {
    get_dealer();
    get_cars();
  },[]);


  return (
    <div className='homepage'>
      <Header/>
      <div  className='review-form-container'>
      <div class="review-form-panel">
      <h1 className='dealer-title'>{dealer.full_name}</h1>

      <textarea id='review' className='review-textarea' onChange={(e) => setReview(e.target.value)}
        placeholder="Share your experience with this dealer... Tell us about the service, quality, and overall experience."
      >
      </textarea>

      <div className='input_field'>
        <label for="purchase-date">Purchase Date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)}/>
      </div>
      <br />
      <div className='input_field'>
      <label for="car-select">Car Make & Model</label>
      <select name="cars" id="cars" onChange={(e) => setModel(e.target.value)}>
      <option value="" selected disabled hidden>Choose Car Make and Model</option>
        {carmodels.map(carmodel => (
            <option value={carmodel.CarMake+" "+carmodel.CarModel}>{carmodel.CarMake} {carmodel.CarModel}</option>
        ))}
      </select>        
      </div >
      <br />
      <div className='input_field'>
        <label for="car-year">Car Year</label>
        <input type="int" onChange={(e) => setYear(e.target.value)} max={2025} min={2015}/>
      </div>
      <br />
      <div>
      <button className='postreview' onClick={postreview}>Post Review</button>
      </div>
      </div>
    </div>
    </div>
  )
}
export default PostReview;
