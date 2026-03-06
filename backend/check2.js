const http = require('http');

http.get('http://localhost:4000/allproducts', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const products = JSON.parse(data);
    products.slice(-3).forEach(p => console.log(p.image));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
