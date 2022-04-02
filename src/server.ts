import compression from 'compression'
import helmet from 'helmet'

import app from './app'

app.use(helmet()) // set well-known security-related HTTP headers
app.use(compression())

app.disable('x-powered-by')

const server = app.listen(3000, () =>
	console.log('Starting ExpressJS server on Port 3000')
)

export default server
