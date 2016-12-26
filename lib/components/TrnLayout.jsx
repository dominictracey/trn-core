import Telescope from 'meteor/nova:lib';
import React, { PropTypes, Component } from 'react';
import { FlashContainer } from "meteor/nova:core";
import { Grid, Row, Col } from 'react-bootstrap'
import TrnSidebar from './TrnSidebar'

class TrnLayout extends Telescope.components.Layout {

  render() {

    return (
      <div className="wrapper" id="wrapper">

        <Telescope.components.HeadTags />

        <Telescope.components.UsersProfileCheck {...this.props} />

        <Telescope.components.Header {...this.props}/>

        <div className="main">
          <Grid>
            <Row>
              <Col xs={12} md={9}>
                <FlashContainer component={Telescope.components.FlashMessages}/>

                <Telescope.components.Newsletter />

                {this.props.children}
              </Col>
              <Col xs={6} md={3}>
                <TrnSidebar/>
              </Col>
            </Row>
          </Grid>
        </div>

        <Telescope.components.Footer {...this.props}/>

      </div>
    )

  }
}

TrnLayout.displayName = "Layout";

module.exports = TrnLayout;
