import React from 'react';
import {Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {Components, replaceComponent} from 'meteor/nova:core';
import Categories from 'meteor/nova:categories';

const TrnCategoriesList = ({loading, results: categories = [], router, typeFilter}, context) => {

	const currentCategorySlug = router.params.categoryType && router.params.slug;

	// categories may be filtered by type
	if (typeFilter) {
		categories = categories.filter(cat => typeFilter.includes(cat.type));
	}

	// add "Home" as a fake category at the beginning of the list
	categories.unshift({
		_id: 1, // placeholder
		name: 'Home',
	});

	return (
		<div className="categories-list-container">
			<Nav className="categories-list">
				{
					categories && categories.length ? categories.map((category, index) => {

							// index route that should redirect to /
							const pathname = category._id !== 1 ? Categories.getUrl(category) : '/';

							return (
								<LinkContainer
									className="category-list-item"
									key={index}
									to={{pathname}}
								>
									<NavItem>
										{currentCategorySlug && currentCategorySlug === category.slug ?
											<Components.Icon name="voted"/> : null}
										{category.name}
									</NavItem>
								</LinkContainer>
							)
						}) : null
				}
			</Nav>
			<Nav className="categories-list-dropdown">
				{
					<NavDropdown title="Categories" id="categories-dropdown">
						{
							categories && categories.length ? categories.map((category, index) => {
									// index route that should redirect to /
									const pathname = category._id !== 1 ? Categories.getUrl(category) : '/';
									return (
										<LinkContainer
											className="category-list-item"
											key={'dropdown' + index}
											to={{pathname}}
										>
											<MenuItem>
												{currentCategorySlug && currentCategorySlug === category.slug ?
													<Components.Icon name="voted"/> : null}
												{category.name}
											</MenuItem>
										</LinkContainer>
									)
								}) : null
						}
					</NavDropdown>
				}
			</Nav>
		</div>
	);

}

replaceComponent('CategoriesList', TrnCategoriesList);
