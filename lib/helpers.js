import Categories from 'meteor/nova:categories';

Categories.availableTypes = [
  {value: "comp", slug: 'c',label: "Competition"},
  {value: "team", slug: 't',label: "Team"},
  {value: "normal", slug: 'n',label: "General category"},
  // note: player type is disabled for now as not handled by the admin panel
  // {value: "player", label: "Player"},
];
