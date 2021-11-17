const dev = false;
export default {
  ...(!dev) && {url: process.env.backend_url},
  ...(dev) && {url: 'http://localhost:3001/api/'}
}