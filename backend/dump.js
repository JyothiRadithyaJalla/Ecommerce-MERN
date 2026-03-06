const http = require('http');

http.get('http://localhost:4000/allproducts', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const products = JSON.parse(data);
    products.slice(-3).forEach(p => {
      console.log('ID:', p.id);
      console.log('URL:', p.image);
      let dump = '';
      for (let i = 0; i < Math.min(p.image.length, 30); i++) {
        dump += p.image.charCodeAt(i).toString(16) + ' ';
      }
      console.log('DUMP:', dump);
    });
  });
});
