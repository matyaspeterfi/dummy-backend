const express = require('express');

const router = express.Router();
//const { conn } = require('../services/connToDB');

const helloWorldController = require('../controllers/hello-world');
const LoginController = require('../controllers/loginCont');
const LoginService = require('../services/loginServ');
const Authentication = require('../services/authServ');
const RegistrationService = require('../services/regServ');
const RegistrationController = require('../controllers/regCont');

//let useddb = conn;
let accTokSec = process.env.ACCESS_TOKEN_SECRET;
let refTokSec = process.env.REFRESH_TOKEN_SECRET;


//const registrationService = new RegistrationService(useddb);
const auth = new Authentication(accTokSec, refTokSec);
//const registrationController = new RegistrationController(registrationService, Authentication.getRoleFromToken);
//const loginService = new LoginService(useddb, registrationService, auth.generateAccessToken, auth.generateRefreshToken);
//const loginController = new LoginController(loginService);


router.get('/helloworld', helloWorldController.helloWorldController);

//router.post('/login', loginController.login);

//router.post('/register', auth.authenticateToken, registrationController.register);

module.exports = router;