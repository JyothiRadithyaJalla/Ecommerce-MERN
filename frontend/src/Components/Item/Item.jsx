import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
import { currency, backend_url } from '../../App'

const Item = (props) => {
  const resolveImage = (img) => {
    if (!img) return '';
    if (img.startsWith('http')) return img;
    const cleanImg = img.replace(/^\//, ''); // remove leading slash if any
    
    // Ensure we don't duplicate /images/ if backend_url already has it somehow
    const baseUrl = backend_url.endsWith('/') ? backend_url.slice(0, -1) : backend_url;
    
    // Some corrupted DB entries might have the domain embedded without http
    if (cleanImg.includes('onrender.com')) {
       return `https://${cleanImg.replace('https://', '')}`;
    }
    
    return `${baseUrl}/images/${cleanImg}`;
  };
  
  return (
   

    <div className='item'>
      <Link to={`/product/${props.id}`}>
       <img
  onClick={() => window.scrollTo(0,0)}
  src={resolveImage(props.image)}
  alt="products"
/>

      </Link>

      <p>{props.name}</p>

      <div className="item-prices">
        <div className="item-price-new">{currency}{props.new_price}</div>
        <div className="item-price-old">{currency}{props.old_price}</div>
      </div>
    </div>
  )
}

export default Item