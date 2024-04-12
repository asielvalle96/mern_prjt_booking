// I create the errors that are not made by a catch sentence. See into "auth.controller.js/login".
export default function createError (status, message) {
  const err = new Error()
  err.status = status
  err.message = message
  return err
}
