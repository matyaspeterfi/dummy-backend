class RegistrationService {
  constructor(conn) {
    this.conn = conn;
  }

  checkIfUserNameEmail(input) { // eslint-disable-line
    const user = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (input && user.test(input)) {
      return true;
    }
    return false;
  }

  checkIfPasswordNumLatinLetter(input) { // eslint-disable-line
    const passw = /^[A-Za-z0-9]\w{7,}$/;

    if (input && passw.test(input)) {
      return true;
    }
    return false;
  }

  containsUser(item) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT username, password, firstname, lastname, userroles.role FROM users INNER JOIN userroles ON users.role = userroles.id WHERE username = ?;'
      this.conn.query(query, [item.username], (err, row) => {
        err ? reject(err) : resolve(row);
      });
    });
  }

  roletranslate(item){
    item.role === 'admin' ? item.role = 1 : item.role = 2;
  }

  insertUser(item) {
    this.roletranslate(item);
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (username, password, firstname, lastname, stampnum, title, role, qualification) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';
      this.conn.query(query, [item.username, item.password, item.firstname, item.lastname, item.stampnum, item.title, item.role, item.qualification], (err, row) => {
        err ? reject(err) : resolve(row.insertId);
      });
    });
  }

  async createUser(item) {
    const userData = await this.containsUser(item);
    return new Promise((resolve, reject) => {
      if (!this.checkIfUserNameEmail(item.username) || !this.checkIfPasswordNumLatinLetter(item.password)) {
        reject(new Error(400));
      } else if (item.password !== item.confirmPsw) {
        reject(new Error(400));
      } else if (!userData.length) {
        resolve(this.insertUser(item));
      } else {
        reject(new Error(500));
      }
    });
  }
}

module.exports = RegistrationService;
