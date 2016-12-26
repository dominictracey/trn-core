/*
This file centralizes all our custom component overrides.
*/

import Telescope from 'meteor/nova:lib';

import TrnLogo from "./components/TrnLogo.jsx";
//import CustomNewsletter from "./components/CustomNewsletter.jsx";
import TrnPostsItem from "./components/TrnPostsItem";
import CompetitionBar from "./components/CompetitionBar"
import CompetitionCategory from './components/CompetitionCategory'
import TrnPostsPage from './components/TrnPostsPage'
import TrnLayout from './components/TrnLayout'
import CategoriesNewFormPrefilled from './components/admin/CategoriesNewFormPrefilled'

Telescope.components.Logo = TrnLogo
//Telescope.components.Newsletter = CustomNewsletter
//Telescope.components.CategoriesList = CompetitionBar
Telescope.components.CategoriesNewForm = CategoriesNewFormPrefilled
Telescope.components.Category = CompetitionCategory
Telescope.components.PostsPage = TrnPostsPage
Telescope.components.Layout = TrnLayout
Telescope.components.PostsItem = TrnPostsItem
