import { Components, replaceComponent } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import { withRouter } from 'react-router';

const Layout = (props, context) => {

    const { router: { params: {slug, categoryType}} } = props
    return (

       <Components.LayoutWithCategory slug={slug} categoryType={categoryType} children={props.children}>
         {props.children}
       </Components.LayoutWithCategory>
    )
}

Layout.displayName = 'LayoutCategoryWrapper';

replaceComponent('Layout', Layout, withRouter);
