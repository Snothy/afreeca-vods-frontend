const dev = false;
exports.config = {
  ...(!dev) && {url: 'https://afreeca-backend.herokuapp.com/api/'},
  ...(dev) && {url: 'http://localhost:3001/api/'}
}