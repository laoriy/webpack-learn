module.exports = function (source) {
  const options = this.getOptions(true)
  const callback = this.async()
  const result = source.replace('hello', 'lsss')
  setTimeout(() => {
    callback(null, result)
  }, 100);
}