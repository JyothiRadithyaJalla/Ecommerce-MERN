const http = require('http');

http.get('http://localhost:4000/allproducts', (resp) => {
  let data = '';
  resp.on('data', (chunk) => { data += chunk; });
  resp.on('end', () => {
    const products = JSON.parse(data);
    const p = products.find(x => x.image && x.image.includes('177279484315'));
    if (p) {
      console.log('ID:', p.id);
      console.log('URL:', p.image);
      let dump = '';
      for (let i = 0; i < Math.min(p.image.length, 60); i++) {
        dump += p.image.charCodeAt(i).toString(16) + ' ';
      }
      console.log('DUMP:', dump);
    } else {
      console.log('Not found');
    }
  });
});
