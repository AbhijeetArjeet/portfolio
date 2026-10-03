function validate(schema, source = 'body') {
  return (req, res, next) => {
    try {
      const dataToValidate = req[source];
      const parsed = schema.parse(dataToValidate);
      req[source] = parsed;
      next();
    } catch (err) {
      if (err.errors) {
        const issues = err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }));
        return res.status(400).json({
          error: 'Validation failed',
          details: issues
        });
      }
      return res.status(400).json({ error: 'Malformed request payload' });
    }
  };
}

module.exports = { validate };
