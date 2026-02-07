const express = require('express');
const router = express.Router();
const passport = require('passport');
const {generateToken} = require('../utils/tokengenerator');

//@route GET /api/oauth/google
//@desc Initiate Google OAuth2 authentication
//@access Public
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'],session: false }));

//@route GET /api/oauth/google/callback
//@desc Google OAuth2 callback
//@access Public
router.get('/google/callback', 
    passport.authenticate('google', { 
        failureRedirect: `${process.env.CLIENT_URL}/login?error=google_auth_failed`, session: false }),
         (req, res) => {
            try{
                const token = generateToken(req.user._id);
                const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}`;
                res.redirect(redirectUrl);
            }catch(err)
            {
                res.redirect(`${process.env.CLIENT_URL}/login?error=token_generation_failed`);
            }
        }
    );

    //@route GET /api/oauth/facebook
    //@desc Initiate Facebook OAuth2 authentication
    //@access Public
    router.get('/facebook', passport.authenticate('facebook', { scope: ['email'], session: false }));


//@route GET /api/oauth/facebook/callback
//@desc Facebook OAuth2 callback
//@access Public
router.get('/facebook/callback', 
    passport.authenticate('facebook', { 
        failureRedirect: `${process.env.CLIENT_URL}/login?error=facebook_auth_failed`, session: false }),
            (req, res) => {
                try{
                    const token = generateToken(req.user._id);
                    const redirectUrl = `${process.env.CLIENT_URL}/auth/callback?token=${token}`; 
                      res.redirect(redirectUrl);
                }catch(err)
                {
                    res.redirect(`${process.env.CLIENT_URL}/login?error=token_generation_failed`);
                }
            }
    );

    
module.exports = router;