var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
var portNo = process.env.PORT || 80;
var dbAddress = process.env['NEO4J_URL'] ||
                process.env['GRAPHENEDB_URL'] ||
                'http://localhost:7474';

var db = require("seraph")(dbAddress);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(logger('dev'));

app.post('/user', function(req, res) {
    if (req.body) {
        db.find({facebookId: req.body.facebookId}, function(err, node) {
            if (err) {
                res.json({error: err});
                throw err;
            } else {
                if (node.length === 0) {
                    db.save(req.body, 'Person', function(err, node) {
                        if (err) {
                            res.json({error: err});
                            throw err;
                        }
                        res.json(node);
                    });
                } else {
                    res.json(node[0]);
                }
            }
        });
    }
});

app.get('/user', function(req, res) {
    var facebookUserId = req.query.facebookId;
    var cypherQuery = 'MATCH (user:Person {facebookId: {facebookId}}) RETURN user';
    db.query(cypherQuery, {facebookId: facebookUserId}, function(err, result) {
        if (err) {
            res.json({error: err});
            throw err;
        }
        res.json(result[0]);
    });
});

// Expects a body of the format {facebookId: 'XXXXX', reviewContent: 'XXXXXX'}
app.post('/review', function(req, res) {
    if (req.body) {
        db.save({reviewContent: req.body.reviewContent}, 'Review', function(err, reviewNode) {
            if (err) {
                res.json({error: err});
                throw err;
            }

            db.find({facebookId: req.body.facebookId}, function(err, userNode) {
                if (err) {
                    res.json({error: err});
                    throw err;
                }

                if (userNode.length > 0) {
                    db.relate(userNode[0].id, 'wrote_review', reviewNode.id, function(err, relationShip) {
                        if (err) {
                            res.json({error: err});
                        }
                        res.json(relationShip);
                    });
                } else {
                    res.json({error: "Relationship cannot be created"});
                }
            });
        });
    }
});

app.get('/suggestedFriends', function(req, res) {
    var facebookUserId = req.query.facebookId;
    var cypherQuery = 'MATCH (user:Person), (otherUsers:Person) WHERE user.facebookId = {facebookId} AND user <> otherUsers AND NOT (user) - [:friend_of] -> (otherUsers) RETURN otherUsers';
    db.query(cypherQuery, {facebookId: facebookUserId}, function(err, result) {
        if (err) {
            res.json({error: err});
            throw err;
        }
        res.json(result);
    });
});

app.post('/addFriend', function(req, res) {
    if (req.body) {
        var facebookIdOfFriend = req.body.facebookIdOfFriend;
        var facebookIdOfMe = req.body.facebookIdOfMe;

        db.find({facebookId: facebookIdOfFriend}, function(err, friendNode) {
            if (err) {
                res.json({error: err});
                throw err;
            }

            db.find({facebookId: facebookIdOfMe}, function(err, myNode) {
                if (err) {
                    res.json({error: err});
                    throw err;
                }

                db.relate(myNode[0].id, 'friend_of', friendNode[0].id, function(err, relationShip) {
                    if (err) {
                        res.json({error: err});
                        throw err;
                    }
                    res.json(relationShip);
                });
            });
        });
    }
});

app.get('/getFriends', function(req, res) {
    var facebookUserId = req.query.facebookId;
    var cypherQuery = 'MATCH (:Person {facebookId: {facebookId}}) - [:friend_of] -> (friend:Person) RETURN friend';
    db.query(cypherQuery, {facebookId: facebookUserId}, function(err, result) {
        if (err) {
            res.json({error: err});
            throw err;
        }
        res.json(result);
    });
});

app.get('/getFriendsReviews', function(req, res) {
    var facebookUserId = req.query.facebookId;
    var cypherQuery = 'MATCH (me:Person {facebookId: {facebookId}}) - [:friend_of] -> (friend:Person) - [:wrote_review] -> (review:Review) RETURN review, friend';
    db.query(cypherQuery, {facebookId: facebookUserId}, function(err, result) {
        if (err) {
            res.json({error: err});
            throw err;
        }
        res.json(result);
    });
});

app.get('/userReviews', function(req, res) {
    var facebookUserId = req.query.facebookId;
    var cypherQuery = 'MATCH (friend:Person {facebookId: {facebookId}}) - [:wrote_review] -> (review:Review) RETURN review, friend';
    db.query(cypherQuery, {facebookId: facebookUserId}, function(err, result) {
        if (err) {
            res.json({error: err});
            throw err;
        }
        res.json(result);
    });
});

app.listen(portNo);
console.log("Server listening at Port:" + portNo);
