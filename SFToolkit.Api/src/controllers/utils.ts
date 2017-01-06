/**
  Returns a function that will write the result as a JSON to the response
*/
export function ok(res){
  return (data) => {
    res.json(data);
  };
};

/**
  Depending on the error type, will perform the following:

  Object was not found - 404 Not Found
  Invalid or missing input parameter - 400 Bad request
  Not enough privileges - 401 Unauthorized
  Unknown error - 500 Internal server error
*/
export function fail(res){
  return (error) => {
    console.log(error);
    res.sendStatus(404).end();
  };
};

export function autoPopulateAllFields(schema) {
    var paths = '';
    schema.eachPath(function process(pathname, schemaType) {
        if (pathname=='_id') return;
        if (schemaType.options.ref)
            paths += ' ' + pathname;
    });

    schema.pre('find', handler);
    schema.pre('findOne', handler);

    function handler(next) {
        this.populate(paths);
        next();
    }
}