import { Components, replaceComponent, getFragment } from 'meteor/vulcan:core';
import Posts from "meteor/vulcan:posts";
import React, { PropTypes, Component } from 'react';
import { intlShape } from 'react-intl';
import _ from 'lodash'

const TrnPostsNewForm = (props, context) => {
  // grab the current query string in the url corresponding to an eventual category (check categoryType & slug from params!)
  const currentCategorySlug = props.router.params.categoryType && props.router.params.slug;
  const trnId = props.trnId ? props.trnId : null

  // populate prefilled props if relevant
  let prefilledProps = null
  if(props.teams && !!currentCategorySlug){ // If team categories are passed, with category slug
    let teams = props.teams
    prefilledProps = {title: props.title, postType: 'match',
      categories: [{slug: currentCategorySlug}, {slug: teams[0].slug}, {slug: teams[1].slug}], trnId: trnId || null}
  }
  else if(!currentCategorySlug && _.size(props.teams) > 2) {  // If no category slug, but 2 teams and a comp category are passed
      let teams = props.teams
      prefilledProps = {title: props.title, postType: 'match',
          categories: [{slug: teams[0].slug}, {slug: teams[1].slug}, {slug: teams[2].slug}], trnId: trnId || null}
  }
  else if(!!currentCategorySlug) {          // If only the category slug is passed
    prefilledProps = {categories: [{slug: currentCategorySlug}], trnId: trnId || null}
  }
  else {prefilledProps = {}}            // No prefilled.


  return (
    <Components.ShowIf
      check={Posts.options.mutations.new.check}
      failureComponent={<Components.UsersAccountForm />}
    >
      <div className="posts-new-form">
        <Components.SmartForm
          collection={Posts}
          mutationFragment={getFragment('PostsPage')}
          successCallback={post => {
            props.closeModal();
            props.router.push({pathname: Posts.getPageUrl(post)});
            props.flash(context.intl.formatMessage({id: "posts.created_message"}), "success");
          }}
          prefilledProps={prefilledProps}
        />
      </div>
    </Components.ShowIf>
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
