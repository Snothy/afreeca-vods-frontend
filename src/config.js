const dev = false;
const config = {
  ...(!dev) && { url: process.env.REACT_APP_backend_url },
  ...(dev) && { url: 'http://localhost:3001/api/' }
};
export default config;
