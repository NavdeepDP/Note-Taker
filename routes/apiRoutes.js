// ===============================================================================
// LOAD DATA
// ===============================================================================

var notesDb = require("../db/db.json");

var fs = require("fs");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // ---------------------------------------------------------------------------

    app.get("/api/notes", function (req, res) {

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    data: null,
                    message: "Unable to retrieve notes"
                });

            }

            res.json({
                error: true,
                data: JSON.parse(data),
                message: "Successfully retrieved notes"
            });
        });
    });

    // API POST Requests
    // Below code handles when a user saves a note and thus submits data to the server.
    // ---------------------------------------------------------------------------

    app.post("/api/notes", function (req, res) {

        console.log(req.body);

        if (!req.body.title) {
            return res.status(400).json({
                error: true,
                data: null,
                message: "Invalid Note. Please format and save it again"
            });
        }

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    data: null,
                    message: "Unable to retrieve notes"
                });
            }

            let notes = JSON.parse(data);          
            // push the new note
            notes.push(req.body);
            // assign unique ids
            notes = notes.map((note, i) => {
                note.id = i + 1
                return note
              });

            fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        data: null,
                        message: "Unable to retrieve notes"
                    });
                }

                res.json({
                    error: false,
                    data: notes,
                    message: "Successfully added new note"
                });
            });
        });
    });

    // ---------------------------------------------------------------------------
    app.delete("/api/notes/:id", function (req, res) {

        console.log(req.params.id);

        fs.readFile("./db/db.json","utf-8", (err, data) => {
            if (err) {
                return res.status(500).json({
                    error: true,
                    data: null,
                    message: "Unable to retrieve notes"
                });
            }

            let notes = JSON.parse(data);

            notes.splice(req.params.id - 1, 1);

            notes = notes.map((note, i) => {
                note.id = i + 1
                return note
              });


            fs.writeFile("./db/db.json", JSON.stringify(notes), function (err) {
                if (err) {
                    return res.status(500).json({
                        error: true,
                        data: null,
                        message: "Unable to retrieve notes"
                    });
                }

                res.json({ ok: true });
            });
        });


       
    });
};
