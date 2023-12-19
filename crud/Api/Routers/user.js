const express = require('express'); // express ko input kardiya.....
// Enable CORS for all routes
const cors = require('cors');
const app = express();
app.use(express.json());
//validation library
const Joi = require('joi');
const router = express.Router()// 
// yaha andar me hmlog router.  http ka alag alag use karpaye...getrequest.putrequest..postrequest usedkarpaye...
router.get('/', (req, res, next) => {

  conn.query("SELECT * from student_emp", (err, result) => {
    if (err) {
      res.send("not select query")
    } else {
      // console.warn("result",result) 
      res.send(result);
    }


  })// jobhi ap query laga skte hai 



}) //get request ham data chahiye to get ka use karte hai


// Assuming you have a JSON payload in the request body with the data to be inserted.
router.post("/insert", (req, res, next) => {
  const { name, email, password } = req.body;
  ///validation 
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().required(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  let result = schema.validate(req.body)

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return

  }


  // Check if the email exists in the database
  const sql = 'SELECT * FROM student_emp WHERE email = ?';
  conn.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error in email check query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length > 0) {
      // Email already exists in the database
      console.log("Email already exists");
      return res.status(409).json({ error: "Email already registered" });
    } else {
      // Email is not in the database, perform the insert operation
      const insertQuery = 'INSERT INTO student_emp (name, email, password) VALUES (?, ?, ?)';
      conn.query(insertQuery, [name, email, password], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error in insert query:", insertErr);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          // Insert successful
          console.log("Insert successful");
  

 // Fetch entire data from student_emp table
 const selectQuery = 'SELECT * FROM student_emp WHERE id = ?';
 conn.query(selectQuery, (selectErr, selectResult) => {
   if (selectErr) {
     return res.status(500).json({ error: "Internal Server Error" });
   } else {
     // Return the response with the inserted data and the entire data from student_emp table
     return res.status(200).json({
       message: "Insert successful",
       insertedData: {
        
         name: name,
         email: email,
         password: password,
       },
       allData: selectResult,
     });
   }
 });
}

})
        }
      });
    
  });






router.post("/update/:id", (req, res, next) => {
  const { name, email, password } = req.body;
  ///validation 
  const { id } = req.params;
  const schema = Joi.object({
    name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string().email({minDomainSegments:2,
      tids:{
        allow:['com,in']}}),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
  })

  let result = schema.validate(req.body)

  if (result.error) {
    res.status(400).send(result.error.details[0].message)
    return

  }

  // Check if the email exists in the database
  // Check if the email exists in the database
  const sql = 'SELECT * FROM student_emp WHERE email = ?';
  conn.query(sql, [email], (err, result) => {
    if (err) {
      console.error("Error in email check query:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (result.length > 0) {
      // Email already exists in the database
      console.log("Email already exists");
      return res.status(409).json({ error: "Email already registered"});
    } else {
      // Email is not in the database, perform the insert operation
      const sql = `UPDATE student_emp SET name = ?, email= ?, password = ? WHERE id = ? `;
      conn.query(sql, [name, email, password, id], (insertErr, insertResult) => {
        if (insertErr) {
          console.error("Error in insert query:", insertErr);
          return res.status(500).json({ error: "Internal Server Error" });
        } else {
          // Insert successful
          console.log("Insert successful");
          return res.status(200).json({
            message: "Insert successful", insertId: insertResult.insertId,

          });



        }

      });

    }
  });
});




router.delete("/delete/:id", (req, res) => {
  const itemId = req.params.id;
  const sql = 'DELETE FROM student_emp WHERE id = ?';

  conn.query(sql, [itemId], (err, result) => {
    if (err) {
      console.error("Error in delete query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.affectedRows > 0) {
        console.log("Delete successful");
        res.status(200).json({ message: "Delete successful" });
      } else {
        console.log("Item not found");
        res.status(404).json({ error: "Item not found" });
      }
    }
  });
});




// js used kar paye
module.exports = router;