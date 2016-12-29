import { Components, getRawComponent, replaceComponent } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import TrnSidebar from './TrnSidebar'

class TrnLayout extends getRawComponent('Layout') {

  render() {

    return (
      <div className="wrapper" id="wrapper">

        <Components.HeadTags />

        <Components.UsersProfileCheck {...this.props} />

        <Components.Header {...this.props}/>

         <div className="main">
          <Grid>
            <Row>
              <Col xs={12} md={9}>
                <Components.FlashMessages/>

                <Components.Newsletter />

                {this.props.children}
              </Col>
              <Col xs={6} md={3}>
            <TrnSidebar/>
              </Col>
            </Row>
          </Grid>
        </div>

        <Components.Footer {...this.props}/>

      </div>
    )

  }
}

TrnLayout.displayName = "Layout";
replaceComponent('Layout', TrnLayout)
