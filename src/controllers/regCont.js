class RegistrationController {
  constructor(registrationService, getRoleFromToken) {
    this.registrationService = registrationService;
    this.getRoleFromToken = getRoleFromToken;
    this.register = this.register.bind(this);
  }

  register(req, res) {
    if (this.getRoleFromToken(req) === "admin") {
      this.registrationService.createUser(req.body)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(err.message).json(`Error: ${err.message}`));
    } else {
      res.status(401).json('Error: Unauthorised request');
    }
  }
}

module.exports = RegistrationController;