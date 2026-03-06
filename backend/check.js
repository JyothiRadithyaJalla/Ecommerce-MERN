fetch('http://localhost:4000/allproducts')
  .then(res => res.json())
  .then(data => {
    data.slice(-5).forEach(p => console.log(JSON.stringify(p.image)));
  });
