// games-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;


  // Define cardSchema to be used in const game
  const cardSchema = new mongooseClient.Schema({
    symbol: { type: String, required: true },
    visible: { type: Boolean, default: false },
    won: { type: Boolean, default: false },
  });

  // Define playerSchema to be used in const game
  const playerSchema = new mongooseClient.Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users'},
    hand: {cardSchema},
    score: {type: Number}
  });

  /* All the things I can think of for this game
  Set some defaults like turn 0 and started false */
  const games = new mongooseClient.Schema({
    text: { type: String, required: false },
    cards: [cardSchema],
    players: [playerSchema],
    turn: { type: Number, default: 0 }, // player index
    started: { type: Boolean, default: false },
    winnerId: { type: Schema.Types.ObjectId, ref: 'users' },
    userId: { type: Schema.Types.ObjectId, ref: 'users' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('games', games);
};
