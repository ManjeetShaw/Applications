const express = require('express');
const router = express.Router();

router.post('/signup', handleUserSignup);

router.post('/login', handleUserLogin);
module.export = router;