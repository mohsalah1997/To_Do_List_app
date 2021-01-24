export default {
  GetLocal: () => JSON.parse(localStorage.getItem('client_data')),
  AddLocal: (obj) => localStorage.setItem('client_data', JSON.stringify(obj)),
  clearLocal: () => localStorage.removeItem('client_data'),
};
