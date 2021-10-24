const METHOD_SELECTION = {
  NO: undefined,
  YES: 'create',
}

module.exports = {
  promptRouteMethods: {
    message: 'Select all CRUD Association Endpoints you would like to generate:',
    type: 'table',
    name: 'selectedMethods',
    columns: [
      {
        name: 'NO',
        value: METHOD_SELECTION.NO,
      },
      {
        name: 'YES',
        value: METHOD_SELECTION.YES,
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
        name: 'UPDATE',
        value: 'update',
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
  METHOD_SELECTION,
}
