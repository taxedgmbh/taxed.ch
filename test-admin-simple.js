// Simple test to check if admin panel loads
const http = require('http');

console.log('Testing admin panel at http://localhost:5173/admin...\n');

http.get('http://localhost:5173/admin', (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('✅ Admin panel is accessible');
    console.log('Status Code:', res.statusCode);
    console.log('Content-Type:', res.headers['content-type']);
    console.log('\nChecking for key elements:');
    console.log('- Has HTML:', data.includes('<html'));
    console.log('- Has title:', data.includes('<title>'));
    console.log('- Has Vite script:', data.includes('/@vite/client'));
    console.log('- Has main script:', data.includes('src/main'));

    if (res.statusCode === 200 && data.includes('<html')) {
      console.log('\n✅ Admin panel HTML is loading correctly!');
      console.log('\nℹ️  Open http://localhost:5173/admin in your browser to see it');
    } else {
      console.log('\n❌ There might be an issue');
    }
  });
}).on('error', (err) => {
  console.error('❌ Error:', err.message);
  console.log('\nℹ️  Make sure the dev server is running: npm run dev');
});
