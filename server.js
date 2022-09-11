const app = require('./src/app');
const { APP_PORT, APP_HOST } = require('./src/config/config');
const db = require('./src/models/index');

try {
    db.sequelize.authenticate();
} catch (err) {
    console.error('Unable to connect to the database:', err);
}

app.listen(APP_PORT, APP_HOST, () => {
    console.log(`app running http://${APP_HOST}:${APP_PORT}`);
});
