server.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  let sql = "INSERT INTO users (username, email, password) VALUES (?,?,?)";
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error registering user");
    } else {
      console.log("User registered successfully");
      res.status(200).send("User registered successfully");
    }
  });
});

server.put("/edit", (req, res) => {
  const { id, username, email, password } = req.body;

  let sql =
    "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  db.query(sql, [username, email, password, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error updating user");
    } else {
      console.log("User updated successfully");
      res.status(200).send("User updated successfully");
    }
  });
});

server.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  let sql = "DELETE FROM users WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error deleting user");
    } else {
      console.log("User deleted successfully");
      res.status(200).send("User deleted successfully");
    }
  });
});
