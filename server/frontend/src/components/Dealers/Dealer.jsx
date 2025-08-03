import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import Header from '../Header/Header';

const Dealer = () => {

  const [dealer, setDealer] = useState({});
  const [reviews, setReviews] = useState([]);
  const [unreviewed, setUnreviewed] = useState(false);
  const [postReview, setPostReview] = useState(<></>)

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0,curr_url.indexOf("dealer"));
  let params = useParams();
  let id =params.id;
  let dealer_url = root_url+`djangoapp/dealer/${id}`;
  let reviews_url = root_url+`djangoapp/reviews/dealer/${id}`;
  let post_review = root_url+`postreview/${id}`;
  
  const get_dealer = async ()=>{
    const res = await fetch(dealer_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      let dealerobjs = Array.from(retobj.dealer)
      setDealer(dealerobjs[0])
    }
  }

  const get_reviews = async ()=>{
    const res = await fetch(reviews_url, {
      method: "GET"
    });
    const retobj = await res.json();
    
    if(retobj.status === 200) {
      if(retobj.reviews.length > 0){
        setReviews(retobj.reviews)
      } else {
        setUnreviewed(true);
      }
    }
  }

  useEffect(() => {
    get_dealer();
    get_reviews();
    if(sessionStorage.getItem("username")) {

      setPostReview(
        <a href={post_review} className="post-review-link">
             Write a review
        </a>)
      
    }
  },[]);  


return(
  
  <div className='homepage'>
    <Header/>
  <div className='dealerspage'>
  <div className='dealer-container'>
      <div className='dealer-info'>
      <h1 className='dealer-name'>{dealer.full_name}{postReview}</h1>
      <h4  className='dealer-address'>{dealer['city']},{dealer['address']}, Zip - {dealer['zip']}, {dealer['state']} </h4>
      </div>

    <div className="stats-bar">
      <div className="stat-item">
        <i className="fas fa-star"></i>
        <span>{reviews.length} Reviews</span>
      </div>
    </div>

    
      <div className="reviews_panel">
      <h2 className="reviews-title">
        <i className="fas fa-comments"></i>
        Customer Reviews
      </h2>

      {reviews.length === 0 && unreviewed === false ? (
        <div className="loading-text">Loading Reviews....</div>
      ):  unreviewed === true? (
        <div className="no-reviews">
          <i className="fas fa-comment-slash"></i>
          <div>No reviews yet!</div>
          <div style={{fontSize: '0.9rem', marginTop: '0.5rem'}}>
            Be the first to review this dealer
          </div>
        </div>
      ) :(
      reviews.map((review, index) => (
        <div key={index} className='review_panel'>
          <div className='review'>{review.review}</div>
          <div className="reviewer">
            {review.name} <span className="car-info">{review.car_make} {review.car_model} {review.car_year}</span>
          </div>
        </div>
      ))
      )}
    </div>  
  </div>
  </div>
  </div>
)
}

export default Dealer;
