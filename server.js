const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const http = require('http').createServer(app);

require('dotenv').config();
// Express App Config
app.use(cookieParser());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.resolve(__dirname, 'public')));
} else {
	const corsOptions = {
		origin: [
			'http://127.0.0.1:5173',
			'http://127.0.0.1:8080',
			'http://localhost:8080',
			'http://127.0.0.1:3000',
			'http://localhost:3000',
			'http://localhost:3001',
			'http://127.0.0.1:3001/'
		],
		withCredentials: true,
		exposedHeaders: ['set-cookie'],
	};
	app.use(cors(corsOptions));


}

const genreRoutes = require('./api/genres/genres.routes');
app.use('/api/genres', genreRoutes);

const authRoutes = require('./api/auth/auth.routes');
app.use('/api/auth', authRoutes);

const userRoutes = require('./api/user/user.routes');
app.use('/api/user', userRoutes);

const songsRoutes = require('./api/songs/songs.routes');
app.use('/api/songs', songsRoutes);
// const { setupSocketAPI } = require('./services/socket.service');
const albumRoutes = require('./api/album/album.routes');
app.use('/api/albums', albumRoutes);
// routes
// const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
// app.all('*', setupAsyncLocalStorage)

// setupSocketAPI(http);

// Make every server-side-route to match the index.html
// so when requesting http://localhost:3030/index.html/car/123 it will still respond with
// our SPA (single page app) (the index.html file) and allow vue/react-router to take it from there
app.get('/**', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const logger = require('./services/logger.service');
const port = process.env.PORT || 3030;
http.listen(port, () => {
	logger.info('Server is running on port: ' + port);
});
