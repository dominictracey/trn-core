import Categories from 'meteor/nova:categories';

Categories.availableTypes = [
  {value: "comp", label: "Competition"},
  {value: "team", label: "Team"},
  {value: "normal", label: "General category"},
  // note: player type is disabled for now as not handled by the admin panel
  // {value: "player", label: "Player"},
];
