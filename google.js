const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const createAdmin = require('./modal/services/entityServices/admin/createAdmin');
const fetchAdmin = require('./modal/services/entityServices/admin/fetchAdmin');
const logger = require('./config/logger').getLogger();
const _ = require('lodash');

const checkAndCreateAdmin = async (profile) => {
    try {
        const emailId = profile.emails[0].value;
        logger.info(`Check if Admin exists with this ${emailId}`);
        const adminDetails = await fetchAdmin.fetchAdminInternal(emailId);
        if (_.isEmpty(adminDetails)) {
            logger.info(`Creating User`);
            const userInfo = {
                name: profile.displayName,
                emailId: profile.emails[0].value,
            }
            return await createAdmin.createAdminInternal(userInfo);
        }
        logger.info(`Admin already exists, Hence not creating one`);
        return true
    }
    catch (ex) {
        logger.error(ex.message);
        throw new Error(ex.message);
    }
}

// Invoked during gmail Login.
passport.serializeUser((user, done) => {
    console.log(user.emails[0].value)
    done(null, user.emails[0].value);
})
passport.serializeUser((email, done) => {
    console.log(email)
    done(null, email);
})
passport.use(new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
    clientID: '1079001656257-37hssvrvr7sumh9ita08fmkmc14fb4cn.apps.googleusercontent.com',
    clientSecret: 'Hrg-tjxKJR8CIINZZRvVtqcP'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        await checkAndCreateAdmin(profile);
        done(null, profile);
    }
    catch (ex) {
        logger.error(ex.message);
        done(ex.message, null);
    }
}))