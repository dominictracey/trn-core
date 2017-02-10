import { addStrings } from 'meteor/nova:core';

addStrings('en', {
  "forms.submit": "Submit",
  
  "posts.color": "Color", // add a new one (collection.field: "Label")
  "posts.postType": "Post Type",
  "posts.trnId": "TRN Id",
  "trn.matchThread": "[Match Thread] ",
  
  "users.upvotedPosts": "{total} posts upvoted",
  "users.upvotedComments": "{total} comments upvoted",

  "categories.manage": "Manage categories",
  "categories.order": "Weighting factor (desc order)",
  "categories.visible": "Category visible (show to client)",
  "categories.type": "Category Type",
  "categories.trnId": "The Rugby Net Id",
  "categories.abbr": "ABBR",
  "categories.attachedTeams": "Competition's Teams",

  "teamMatchStats.legend": "CV: Conversions made/tries, PT: Penalties made/tries, DG: Drop goals made/tries, "+
  "K: Kicks from hand, P: Passes, C: Runs/Meters Run, Poss: Possession, Terr: Territory, CB: Clean breaks, "+
  "DB: Defenders Beaten, OL: Offloads, R: Rucks won/tries, M: Mauls won/tries, TOC: Turnovers conceded, "+
  "T: Tackles made/missed, S: Scrums won/tries, LO: Lineouts won/thrown, PC: Penalties Conceded, YC: Yellow cards, "+
  "RC: Red cards",

  "playerMatchStats.legend": "pos: Position, T: Tries, TA: Try assists, PTS: Points, K: Kicks, P: Passes, R: Runs, MR: Meters run, " +
    "CB: Clean breaks, DB: Defenders beaten, O: Offloads, TC: Turnovers, TM: Tackles made, MT: Missed Tackles, LW: Lineouts won, "+
    "pc: Penalties conceded, yc: Yellow cards, rc: Red cards, time: Time played",

  "trn.welcomeBanner": "Welcome!",
  
  "wires.submit_feedback": "Submit feedback",
  "wires.created_message": "Thanks for your feedback! 🙌 It will help us provide you a better experience!",
  "wires.reaction": "What do you think?",

})
