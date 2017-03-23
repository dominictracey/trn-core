import React from 'react';

import { FormattedMessage } from 'react-intl';
import { Components, registerComponent, Utils } from 'meteor/nova:core';

const CommentHelpModal = (props) => {


  return (
    <div className="commentHelp-modal">


        <div className="commentHelp-card">
          {/* ---- Card Body ---- */}
          <div className="commentHelp-body">
            {/* ---- Card Header ---- */}
            <div className="commentHelp-header"><div className="commentHelp-close" onClick={props.closeModal}><Components.Icon name="times" /></div><FormattedMessage id="commentHelp.title" /></div>
            {/* ---- Card Items ---- */}
            <div className="commentHelp-item"><span className="commentHelp-result itemHeader">Style</span><span className="commentHelp-command itemHeader">Markdown</span></div>
            <div className="commentHelp-item"><span className="commentHelp-result i">Italics</span><span className="commentHelp-command">*text*</span></div>
            <div className="commentHelp-item"><span className="commentHelp-result b">Bold</span><span className="commentHelp-command">**text**</span></div>
            <div className="commentHelp-item">
              <span className="commentHelp-result">Unordered List
                <ul>
                  <li>Loosehead</li>
                  <li>Hooker</li>
                </ul>
              </span>
              <span className="commentHelp-command"><br/>*Loosehead <br/>*Hooker</span>
            </div>
            <div className="commentHelp-item">
              <span className="commentHelp-result">Ordered List
                <ol>
                  <li>Tighthead</li>
                  <li>Prop</li>
                </ol>
              </span>
              <span className="commentHelp-command"><br/>1. Tighthead <br/>2. Prop</span>
            </div>
            <div className="commentHelp-item"><span className="commentHelp-result">Images</span><span className="commentHelp-command">![Alt text](www.source.com)</span></div>
            <div className="commentHelp-item"><span className="commentHelp-result">Link</span><span className="commentHelp-command">[Alt text](www.website.com)</span></div>
            <div className="commentHelp-item">
              <span className="commentHelp-result">
                |# | Name | Rating | Last |
                <br/>|----|------|:---------:|:-----------:|
                <br/>|1. | Jonathan Davies | (1173) | (1)|
                <br/>|2.  | Gael Fickou |(1070) |(4)|
              </span>
              <span className="commentHelp-command">
                <strong>#  Name    Rating  Last</strong>
                <br/>1. Jonathan Davies  (1173)  (1)
                <br/>2. Gael Fickou      (1070)  (4)
              </span>
            </div>

            {/* ---- Card Footer? ---- */}
            <div className="commentHelp-footer"><a href="http://www.webpagefx.com/tools/emoji-cheat-sheet/" target="_blank"><FormattedMessage id="commentHelp.availEmoji" /></a></div>

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
