import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Components, registerComponent, Utils } from 'meteor/nova:core';

const CommentHelpModal = (props) => {


  return (
    <div className="sidebar-card">
      <div className="commentHelp-close" onClick={props.closeModal}><Components.Icon name="times" /></div>

        <div className="sidebar-card-header">
          <FormattedMessage id="commentHelp.title" />
        </div>
        <div className="sidebar-card-divider"></div>
        <div className="sidebar-card-body">
          <div className="commentHelp-item"><span className="commentHelp-command">*text* or _text*</span><span className="commentHelp-result">Italics</span></div>
          <div className="commentHelp-item"><span className="commentHelp-command">**text** or __text**</span><span className="commentHelp-result">Bold</span></div>
          <div className="commentHelp-item"><span className="commentHelp-command">*item</span><span className="commentHelp-result">Unordered List</span></div>
          <div className="commentHelp-item"><span className="commentHelp-command">1. Item</span><span className="commentHelp-result">Ordered List</span></div>
          <div className="commentHelp-item"><span className="commentHelp-command">![Alt text](www.source.com)</span><span className="commentHelp-result">Images</span></div>
          <div className="commentHelp-item"><span className="commentHelp-command">[Alt text](www.website.com)</span><span className="commentHelp-result">Link</span></div>
          <div className="sidebar-card-divider"></div>
          <div className="commentHelp-item"><a href="http://www.webpagefx.com/tools/emoji-cheat-sheet/" target="_blank"><FormattedMessage id="commentHelp.availEmoji" /></a></div>
        </div>

    </div>
  )
}

CommentHelpModal.propTypes = {
  closeModal: React.PropTypes.func,
}

CommentHelpModal.displayName = 'CommentHelpModal'
registerComponent('CommentHelpModal', CommentHelpModal)
