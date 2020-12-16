const middleware = {}

middleware['authentification'] = require('../middleware/authentification.js')
middleware['authentification'] = middleware['authentification'].default || middleware['authentification']

export default middleware
