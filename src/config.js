const dev = false;
const config = {
  ...(!dev) && { url: process.env.REACT_APP_backend_url },
  ...(dev) && { url: 'https://3001-moccasin-python-crsdks3p.ws-eu23.gitpod.io/api/' }
};
export default config;
