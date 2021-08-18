const createConnection = require("./databaseUse");

mongoose = createConnection();
Message = require("./messageModel")

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('What to do with base? ', (answer) => {
    if (answer == "1") {
        Message.deleteMany({}, function (err, result) {
            if (err) return console.log(err);
            console.log(result);
        });
        rl.close();
    }
    if (answer == "2") {
        rl.question(`Choose messages from which username delete? `, (answer) => {
            Message.deleteMany({username: answer}, function (err, result) {
                if (err) return console.log(err);
                console.log(result);
            });
            rl.close();
        })
    }

});

//1 - clean all Database
//2 - clean all messages from username