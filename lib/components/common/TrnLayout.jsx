import { Components, getRawComponent, replaceComponent, registerComponent, withDocument, getFragment } from 'meteor/vulcan:core';
import React, { PropTypes, Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
//import { withRouter } from 'react-router'
import Categories from 'meteor/vulcan:categories'
class LayoutWithCategory extends Component {//getRawComponent('Layout') {

  render() {
    const { slug, categoryType, document: category } = this.props

    const cat = !!category ? category : null

    return (
      <div className="wrapper" id="wrapper">

        <Components.HeadTags {...this.props} />

        <Components.UsersProfileCheck {...this.props} />

        <Components.Header {...this.props}/>

         <div className="main">
          <Grid>
            <Row>
              <Col xs={12} md={9} className="main-content">
                <Components.FlashMessages/>

                <Components.Newsletter />

                {this.props.children}
              </Col>
              <Col xs={12} md={3}>
                <Components.TrnSidebar {...this.props}/>
              </Col>
            </Row>
          </Grid>
        </div>

        <Components.Footer {...this.props}/>

      </div>
    )

  }
}

LayoutWithCategory.displayName = "Layout";

const options = {
	collection: Categories,
	queryName: 'categoriesSingleQuerySidebar',
	fragment: getFragment('CategoriesList'),
};

registerComponent('LayoutWithCategory', LayoutWithCategory, withDocument(options) );
