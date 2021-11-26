const dev = false;
export default config =  {
  ...(!dev) && {url: process.env.REACT_APP_backend_url},
  ...(dev) && {url: 'http://localhost:3001/api/'}
}