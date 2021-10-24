const { SELECTION_METHOD } = require('../constants/selection.method')

module.exports = {
  promptRouteMethods: {
    message: 'Select all CRUD Endpoints you would like to generate:',
    type: 'table',
    name: 'selectedMethods',
    columns: [
      {
        name: 'NONE',
        value: SELECTION_METHOD.NONE,
      },
      {
        name: 'MANY',
        value: SELECTION_METHOD.LIST,
      },
      {
        name: 'ONE',
        value: SELECTION_METHOD.RESOURCE,
      },
      {
        name: 'MANY & ONE',
        value: SELECTION_METHOD.LIST_AND_RESOURCE,
      },
    ],
    rows: [
      {
        name: 'POST',
        value: 'post',
      },
      {
        name: 'GET',
        value: 'get',
      },
      {
        name: 'PUT',
        value: 'put',
      },
      {
        name: 'PATCH',
        value: 'patch',
      },
      {
        name: 'DELETE',
        value: 'delete',
      },
    ],
  },
}
