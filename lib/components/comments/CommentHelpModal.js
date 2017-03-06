import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Components, registerComponent, Utils } from 'meteor/nova:core';

const CommentHelpModal = (props) => {


  return (
    <div className="commentHelp-modal">
      <div className="commentHelp-close" onClick={props.closeModal}><Components.Icon name="times" /></div>

        <div className="commentHelp-card">
          <div className="sidebar-card-header">
            <FormattedMessage id="commentHelp.title" />
          </div>

          <div className="sidebar-card-body">
            <div className="commentHelp-item"><span className="commentHelp-result">Italics</span><span className="commentHelp-command">*text*</span></div>
            <div className="commentHelp-item"><span className="commentHelp-result">Bold</span><span className="commentHelp-command">**text**</span></div>
            <div className="commentHelp-item">
              <span className="commentHelp-result">Unordered List
                <ul>
                  <li>item1</li>
                  <li>item2</li>
                </ul>
              </span>
              <span className="commentHelp-command">*item</span>
            </div>
            <div className="commentHelp-item">
              <span className="commentHelp-result">Ordered List
                <ol>
                  <li>item1</li>
                  <li>item2</li>
                </ol>
              </span>
              <span className="commentHelp-command">1. Item</span>
            </div>
            <div className="commentHelp-item"><span className="commentHelp-result">Images</span><span className="commentHelp-command">![Alt text](www.source.com)</span></div>
            <div className="commentHelp-item"><span className="commentHelp-result">Link</span><span className="commentHelp-command">[Alt text](www.website.com)</span></div>
            <div className="sidebar-card-divider"></div>
            <div className="commentHelp-item"><a href="http://www.webpagefx.com/tools/emoji-cheat-sheet/" target="_blank"><FormattedMessage id="commentHelp.availEmoji" /></a></div>
          </div>
        </div>
    </div>
  )
}

CommentHelpModal.propTypes = {
  closeModal: React.PropTypes.func,
}

CommentHelpModal.displayName = 'CommentHelpModal'
registerComponent('CommentHelpModal', CommentHelpModal)
