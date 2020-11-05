'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var snapshot_1 = require("./snapshot");
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var require_header_1 = __importDefault(require("require-header"));
if (process.env.HTTP_HEADER) {
    //Only allow requests from GAE Cron service if HTTP_HEADER is set to 'X-Appengine-Cron'
    app.use(require_header_1.default(process.env.HTTP_HEADER));
}
app.get('/create_snapshots', function (req, res) {
    var recMessage = "Snapshot creation request received at " + new Date().toISOString();
    console.log(recMessage);
    snapshot_1.createSnapshots(req.query.tag ? req.query.tag.toString() : null)
        .then(function (vms) {
        var procMessage = "VMs to process: " + vms;
        res.send(recMessage + '\n' + procMessage).end();
    })
        .catch(function (err) {
        res.status(500).send("Error: " + err.message);
    });
});
app.get('/purge_snapshots', function (req, res) {
    //days should allow only integers greater than or equal to 0 and defaults to 7
    var days = req.query.days && Number.isInteger(parseInt(req.query.days.toString())) ? Math.abs(parseInt(req.query.days.toString())) : 7;
    var recMessage = "Snapshot purge request received to delete snapshots older than " + days + " day(s) at " + new Date().toISOString();
    console.log(recMessage);
    snapshot_1.purgeSnapshots(days)
        .then(function (snaps) {
        var procMessage = "Snapshots to process: " + snaps;
        res.send(recMessage + '\n' + procMessage).end();
    })
        .catch(function (err) {
        res.status(500).send("Error: " + err.message);
    });
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log("App listening on port " + PORT);
    console.log('Press Ctrl+C to quit.');
});
