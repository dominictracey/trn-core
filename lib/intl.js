import { addStrings } from 'meteor/vulcan:core';

addStrings('en', {
  "forms.submit": "Submit",

  "posts.color": "Color", // add a new one (collection.field: "Label")
  "posts.postType": "Post Type",
  "posts.trnId": "TRN Id",
  "trn.matchThread": "[Match Thread] ",

  // note: profile key? shouldn't it be better 'users.xxKarma'?
  "profile.totalPostsKarma": "Post Karma: {totalKarmaValue}",
  "profile.noPostsKarma": "No Post Karma yet.",
  "profile.totalCommentsKarma": "Comment Karma: {totalKarmaValue}",
  "profile.noCommentsKarma": "No Comment Karma yet.",

  "categories.manage": "Manage categories",
  "categories.order": "Weighting factor (desc order)",
  "categories.visible": "Category visible (show to client)",
  "categories.type": "Category Type",
  "categories.trnId": "The Rugby Net Id",
  "categories.abbr": "ABBR",
  "categories.attachedTeams": "Competition's Teams",

  "teamMatchStats.legend": "CV: Conversions made/attempts, PT: Penalties made/attempts, DG: Drop goals made/attempts, "+
  "K: Kicks from hand, P: Passes, C: Runs/Meters Run, Poss: Possession, Terr: Territory, CB: Clean breaks, "+
  "DB: Defenders Beaten, OL: Offloads, R: Rucks won/attempt, M: Mauls won/attempt, TOC: Turnovers conceded, "+
  "T: Tackles made/missed, S: Scrums won/attempt, LO: Lineouts won/thrown, PC: Penalties Conceded, YC: Yellow cards, "+
  "RC: Red cards",

  "playerMatchStats.legend": "T: Tries, TA: Try assists, PTS: Points, K: Kicks, P: Passes, R: Runs, MR: Meters run, " +
    "CB: Clean breaks, DB: Defenders beaten, O: Offloads, TC: Turnovers, TM: Tackles made, MT: Missed Tackles, LW: Lineouts won, "+
    "PC: Penalties conceded, YC: Yellow cards, RC: Red cards, Time: Time played",

  "trn.welcomeBanner": "Welcome!",

  "users.trophies": "Trophies you've earned",
  "users.no_trophies": "You don't have any trophies yet.",
  "trophies.manage": "Manage trophies",

  "wires.submit_feedback": "Submit feedback",
  "wires.created_message": "Thanks for your feedback! 🙌 It will help us provide you a better experience!",
  "wires.reaction": "What do you think?",

  "commentHelp.title": "Formatting Help",
  "commentHelp.availEmoji": "Emojis available",

})
