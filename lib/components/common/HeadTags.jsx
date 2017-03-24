import React, { PropTypes, Component } from 'react';
import Helmet from 'react-helmet';
import { registerComponent, Utils, getSetting, Headtags } from 'meteor/vulcan:core';

const HeadTags = props => {

	const url = !!props.url ? props.url : Utils.getSiteUrl();
	const title = !!props.title ? props.title : getSetting("title", "The Rugby Net");
	const description = !!props.description ? props.description : getSetting("tagline");
	const fbAppId = getSetting("fbAppId")
	// default image meta: logo url, else site image defined in settings
	let image = !!getSetting("siteImage") ? getSetting("siteImage"): getSetting("logoUrl");
	// these default values are hardcoded in stock embedly package
	// 200 x 200 is also the minimum size accepted by facebook share
	let imageHeight = !!getSetting("thumbnailHeight") ? getSetting("thumbnailHeight"): 200
	let imageWidth = !!getSetting("thumbnailWidth") ? getSetting("thumbnailWidth"): 200

	// overwrite default image if one is passed as props
	if (!!props.image) {
		image = props.image;
	}

	// add site url base if the image is stored locally
	if (!!image && image.indexOf('//') === -1) {
		image = Utils.getSiteUrl() + image;
	}

	// add <meta /> markup specific to the page rendered
	const meta = Headtags.meta.concat([
		{ charset: "utf-8" },
		{ name: "description", content: description },
		// responsive
		{ name: "viewport", content:"width=device-width, initial-scale=1" },
		// facebook
		{ property: "og:type", content: "article" },
		{ property: "og:url", content: url },
		{ property: "og:image", content: image },
		{ property: "og:image:width", content: imageWidth},
		{ property: "og:image:height", content: imageHeight},
		{ property: "og:title", content: title },
		{ property: "og:description", content: description },
		//twitter
		{ name: "twitter:card", content: "summary" },
		{ name: "twitter:image", content: image },
		{ name: "twitter:title", content: title },
		{ name: "twitter:description", content: description },

		{ name: "fb:app_id", content: fbAppId },
	]);

	// add <link /> markup specific to the page rendered
	const link = Headtags.link.concat([
		{ rel: "canonical", href: url },
		{ rel: "shortcut icon", href: getSetting("faviconUrl", "/img/favicon.ico") }
	]);

	return <Helmet title={title} meta={meta} link={link} script={Headtags.script} />
}

HeadTags.propTypes = {
	url: React.PropTypes.string,
	title: React.PropTypes.string,
	description: React.PropTypes.string,
	image: React.PropTypes.string,
	body: React.PropTypes.string,
};

registerComponent('HeadTags', HeadTags);
