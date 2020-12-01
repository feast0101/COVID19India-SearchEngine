import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Core - these two are required :-)
import tinymce from 'tinymce/tinymce';
import 'tinymce/themes/modern/theme';

// Plugins
import 'tinymce/plugins/lists/plugin';
import 'tinymce/plugins/link/plugin';
import 'tinymce/plugins/paste/plugin';

import { hasHTMLEntities } from './helpers.js';

class TextEditor extends Component {

	static REQUIRED = true;
	constructor(props) {
		super(props);
		this.state = {
			isHorizontal: (this.props.align !== undefined && (this.props.align === TextEditor.HORIZONTAL)),
			isPasting: false
		};
		this.handleChanges = this.handleChanges.bind(this);
		this.getRemainingCharactersElement = this.getRemainingCharactersElement.bind(this);
		this.getRemainingCharactersCount = this.getRemainingCharactersCount.bind(this);
		this.getTinymceConfig = this.getTinymceConfig.bind(this);
		this.sanatizeContent = this.sanatizeContent.bind(this);
	}
	getTinymceConfig() {
		return {
			selector: `textarea#${this.props.id}`,
			content_css: ['/tinymce-assets/styles/tinymce-content.min.css'],
			branding: false,
			plugins: ['lists', 'link', 'paste'],
			skin: false,
			menubar: false,
			statusbar: false,
			toolbar: 'bold italic underline link bullist ',
			toolbar_items_size: 'small',
			paste_as_text: true,
			resize: 'false',
			entity_encoding: 'raw',
			elementpath: false,
			forced_root_block: 'p',
			convert_urls: false,
			setup: (editor) => {
				editor.on('change keyup keydown', (event) => {
					if (!this.state.isPasting && this.getRemainingCharactersCount() <= 0 && event.keyCode !== 8) {
						event.preventDefault();
						return;
					}
					const sanatizedContent = this.sanatizeContent(editor.getContent());
					if (sanatizedContent) {
						editor.setContent(sanatizedContent);
						editor.selection.select(editor.getBody(), true);
						editor.selection.collapse(false);
					}
					this.handleChanges(editor.getContent());
				});
				editor.on('PastePreProcess', (event) => {
					this.setState({ isPasting: true });
					if (this.getRemainingCharactersCount(event.content) < 0) {
						event.preventDefault();
					}
					this.setState({ isPasting: false });
				});
			}
		};
	}
	componentDidMount() {
		tinymce.init(this.getTinymceConfig());
	}

	componentWillUnmount() {
		tinymce.remove(`textarea#${this.props.id}`);
		clearInterval(this.state.handleChangesInterval);
	}

	getRemainingCharactersCount(content = null) {
		let remainingChars = this.props.maxLength;
		let value = null;
		if (content !== null && this.props.value.length > 0) {
			value = `${this.props.value} ${content}`;
		} else if (content !== null) {
			value = content;
		} else {
			value = this.props.value;
		}
		if (value && this.props.maxLength) {
			const valueStripped = value.replace(/(<([^>]+)>)/ig, '');
			remainingChars = this.props.maxLength - valueStripped.length;
		}
		return remainingChars;
	}

	getRemainingCharactersElement() {
		const remainingCharsCount = this.getRemainingCharactersCount();
		return //<p className="character-count"><span className="info"></span>{remainingCharsCount}<span className="info"> characters</span></p>;
	}

	updateAnchorHrefValueInContent(href, hrefValue, content) {
		let refreshContent = false
		//Spliting just to handle cases of :// in href value.
		const explodedHrefValue = hrefValue.split('://');
		//The value before ://.
		const protocol = explodedHrefValue[0] ? explodedHrefValue[0] : null;
		//The value after ://.
		const urlPath = explodedHrefValue[1] ? explodedHrefValue[1] : null;

		if (protocol && !urlPath) {
			content = content.replace(`href="${protocol}://"`, `href=""`);
			content = content.replace(`data-mce-href="${protocol}://"`, `data-mce-href=""`);
			refreshContent = true;
		} else if (!protocol && urlPath) {
			content = content.replace(href, `href="http://${urlPath}`);
			content = content.replace(`data-mce-href="://${urlPath}`, `data-mce-href=""`);
			refreshContent = true;
		} else if (!protocol && !urlPath) {
			content = content.replace('href="://"', 'href=""');
			content = content.replace('data-mce-href="://"', 'data-mce-href=""');
			refreshContent = true;
		}

		return {
			value: content,
			refreshContent
		};
	}

	sanatizeContent(content) {
		const hrefValues = content.match(/href="([^"]*)/g);
		if (!hrefValues) return null;
		let needsToUpdateContent = false;
		//Checking all anchors href attribute.
		hrefValues.forEach((href) => {
			let hrefValue = href.split('=')[1].replace('"', '');

			if (hrefValue.length === 0) return;

			// If href value contains html entities then we will enter blank value.
			if (hasHTMLEntities(hrefValue)) {
				needsToUpdateContent = true;
				content = content.replace(`href="${hrefValue.replace('<', '&lt;').replace('>', '&gt;')}"`, `href=""`);
				content = content.replace(`data-mce-href="${hrefValue.replace('<', '&lt;').replace('>', '&gt;')}"`, `data-mce-href=""`);
			}
			//Check whether value starts with mailto: or www:.
			if (hrefValue.toLowerCase().indexOf('mailto:') !== -1 || hrefValue.toLowerCase().startsWith('www.')) return;

			//If value doesn't consist mailto and :// then we will prepend http:// as default protocol.
			if (!needsToUpdateContent && hrefValue.toLowerCase().indexOf('://') === -1) {
				needsToUpdateContent = true;
				hrefValue = `http://${hrefValue}`;
				content = content.replace(href, `href="${hrefValue}`);
			}

			// Handle Special Case.
			if (!needsToUpdateContent) {
				const updatedContent = this.updateAnchorHrefValueInContent(href, hrefValue, content);
				content = updatedContent.value;
				needsToUpdateContent = updatedContent.refreshContent;
			}
		});
		if (!needsToUpdateContent) {
			return null;
		}
		return content;
	}

	handleChanges(content) {
		if (content.localeCompare(this.props.value) !== 0) {
			this.props.onChange(this.props.id, content);
		}
	}

	render() {

		return (
			<div className={this.props.errclassname + " input-block"}>
				<div className="block-left pad-top">
					{/*<label htmlFor={this.props.id}>{this.props.label}{this.props.required ? <span className="required-red"> *</span> : ''}</label>*/}
				</div>
				<div className="block-right">
					{this.getRemainingCharactersElement()}
					<textarea ref="textarea" id={this.props.id} placeholder={this.props.placeholder} className="tinymce-required-input" maxLength={this.props.maxLength}>{this.props.defaultValue}</textarea>
				</div>
				<div className={this.props.error ? 'error-block side-input-error' : 'hide'}>
					<p className="form-error-wrapper"><span className="error-form">{this.props.error}</span></p>
				</div>
			</div>
		);
	}
}

TextEditor.propTypes = {
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
	placeholder: PropTypes.string,
	error: PropTypes.string,
	align: PropTypes.number,
	required: PropTypes.bool,
	maxLength: PropTypes.number,
	value: PropTypes.string
};

export default TextEditor;
