module.exports = {
  getRandomId: getRandomId
}

function getRandomId(context, events, done) {
  context.vars['id'] = Math.ceil(Math.random() * 10000000);
  return done();
}