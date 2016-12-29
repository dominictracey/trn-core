import { Components, getRawComponent, replaceComponent } from 'meteor/nova:core';
import React, { PropTypes, Component } from 'react';
import Categories from "meteor/nova:categories";
import SmartForm from "meteor/nova:forms";
import { connect } from 'react-redux'

//class CategoriesNewFormPrefilled  extends getRawComponent('CategoriesNewForm') {
 const CategoriesNewFormPrefilled = (props, context) => {
  // componentWillMount() {
  //   this.context.addToAutofilledValues({
  //     name: 'fucker',
  //   })
  // }
  //
  // render() {
    const { category } = props

    // this.context.addToAutofilledValues({
    //     name: 'fucker',
    //   })
    return (
      <div className="categories-new-form">
        <SmartForm
          collection={Categories}
          queryToUpdate="categoriesListQuery"
          successCallback={category => {
            context.closeCallback();
            props.flash("Category created.", "success");
          }}
        />
      </div>
    )
    }

    CategoriesNewFormPrefilled.displayName = "CategoriesNewForm";

    CategoriesNewFormPrefilled.contextTypes = {
    closeCallback: React.PropTypes.func,
    };
//     return (
//       <div className="categories-new-form">
//       <SmartForm
//         document={category}
//         collection={Categories}
//         methodName="categories.new"
//         successCallback={(category)=>{
//           context.messages.flash("Category created.", "success");
//         }}
//       />
//       </div>
//     )
//   // }
// }

// class CategoriesNewFormPrefilled extends Telescope.components.CategoriesNewForm {
//
//   constructor() {
//     super();
//   }
//
//   render() {
//     const { category } = this.props
//
//     this.context.addToAutofilledValues({
//       name: 'fucker',
//     })
//
//     return (
//       <div className="categories-new-form">
//       <NovaForm
//         document={category}
//         collection={Categories}
//         methodName="categories.new"
//         successCallback={(category)=>{
//           this.context.messages.flash("Category created.", "success");
//         }}
//       />
//       </div>
//     )
//   }
// }

// CategoriesNewFormPrefilled.displayName = "CategoriesNewFormPrefilled";
// //
// // CategoriesNewFormPrefilled.propTypes = {
// //   name: React.PropTypes.string,
// //   category: React.PropTypes.object,
// //   label: React.PropTypes.string
// // }
//
// CategoriesNewFormPrefilled.contextTypes = {
//   currentUser: React.PropTypes.object,
//   messages: React.PropTypes.object,
//   addToAutofilledValues: React.PropTypes.func,
// };
//
// const mapStateToProps = state => {
//   const { entities } = state
//   const { config, comp } = entities
//
//   return {
//     config,
//     comp
//   }
// }

//module.exports = withRouter(CompetitionBar);
// export default CategoriesNewFormPrefilled
replaceComponent('CategoriesNewForm', CategoriesNewFormPrefilled) //, connect(mapStateToProps))
