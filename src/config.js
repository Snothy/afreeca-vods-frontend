const dev = false;
const config = {
  ...(!dev) && { url: process.env.REACT_APP_backend_url },
  ...(dev) && { url: 'http://127.0.0.1:3001/api/' }
};
export default config;
