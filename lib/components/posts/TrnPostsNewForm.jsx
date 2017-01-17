import { Components, replaceComponent, getRawComponent } from 'meteor/nova:core';
import SmartForm from "meteor/nova:forms";
import { ShowIf } from 'meteor/nova:core';
import Posts from "meteor/nova:posts";
import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';

const TrnPostsNewForm = (props, context) => {
  // grab the current query string in the url corresponding to an eventual category
  // note: props.router.location.query will never be undefined (react-router/withRouter spec)
  const currentCategorySlug = props.router.location.query && props.router.location.query.cat;

  // populate prefilled props if relevant
  const prefilledProps = !!currentCategorySlug ? {categories: [{slug: currentCategorySlug}]}: {};
  
  return (
    <ShowIf
      check={Posts.options.mutations.new.check}
      failureComponent={<Components.UsersAccountForm />}
    >
      <div className="posts-new-form">
        <SmartForm
          collection={Posts}
          mutationFragment={getRawComponent('PostsPage').fragment}
          successCallback={post => {
            props.closeModal();
            props.router.push({pathname: Posts.getPageUrl(post)});
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
          prefilledProps={prefilledProps}
        />
      </div>
    </ShowIf>
  );
};

TrnPostsNewForm.propTypes = {
  closeModal: React.PropTypes.func,
  router: React.PropTypes.object,
  flash: React.PropTypes.func,
}

TrnPostsNewForm.contextTypes = {
  closeCallback: React.PropTypes.func,
  intl: intlShape
};

TrnPostsNewForm.displayName = "TrnPostsNewForm";

replaceComponent('PostsNewForm', TrnPostsNewForm);
