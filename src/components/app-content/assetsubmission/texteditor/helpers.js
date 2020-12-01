import React from 'react';

export function sortPeopleByLastAndPreferredName(people) {
	const lastNameKey = 'last_name';
	const preferredNameKey = 'preferred_name';
	return people.sort(function(a, b) {
		var x = a[lastNameKey];
		var y = b[lastNameKey];
		// if both last names are same then we will preferred name to sort people.
		if(x == y) {
			x = a[preferredNameKey];
			y = b[preferredNameKey];
		}
		if(x < y) return -1;
		if(x > y) return 1;
		return 0;
	});
}

export function validateFileExtension(file) {
	const exploedFileName = file.name.split('.');
	const extension = exploedFileName[(exploedFileName.length - 1)];
	if(validExtensions().indexOf(extension.toLowerCase()) === -1) {
		return false;
	}
	return true;
}

export function validateFileDuplicacy(file, existingFiles, callback) {
	if(callback) return callback(file.name);
	for (let i = 0; i < existingFiles.length; i++) {
		if(existingFiles[i].name.toLowerCase() === file.name.toLowerCase()) {
			return false;
		}
	}
	return true;
}

export function validExtensions() {
	return ['swf', 'txt', 'tif', 'au', 'dgn', 'bas', 'frm', 'mak', 'voc', 'vrf', 'wav', 'dll', 'wri', 'wmf', 'wpd', 'wrl', 'xml', 'xsl', 'att', 'ctm', 'mcr', 'rlx', 'rls', 'tbr', 'wk4', 'dwg', 'aiff', 'aifc', 'sam', 'asp', 'avi', 'bmp', 'mil', 'ov', 'cvs', 'cfm', 'cfml', 'cgi', 'cgm', 'class', 'css', 'daf', 'rft', 'dib', 'dtd', 'dwf', 'dxf', 'eps', 'xls', 'xlw', 'xlt', 'fm', 'fp3', 'fp4', 'fla', 'pre', 'gif', 'hdml', 'sl', 'htm', 'ai', 'map', 'jar', 'java', 'jhtml', 'jpg', 'js', 'jsp', 'mif', 'bk', 'dwt', 'lbi', 'mod', 'mp3', 'mpg', 'mdb', 'mde', 'mpp', 'mpc', 'mpv', 'doc', 'dot', 'pm6', 'pcl', 'pcx', 'pdf', 'php', 'php3', 'phtml', 'pct', 'png', 'ps', 'asm', 'drw', 'prt', 'mov', 'ra', 'ram', 'ras', 'rm', 'rmm', 'rnx', 'rtf', 'rv', 'scm', 'sgm', 'shtml', 'spl', 'spml', 'stm', 'sun', 'hhf', 'soc', 'ent', 'pen', 'elm', 'fos', 'ptd', 'pro', 'dec', 'atd', 'pcd', 'tga', 'mpg2', 'mp4', 'wmv', 'wma', 'wvx', 'wax', 'asf', 'asx', 'svg', 'sgi', 'sct', 'msg', 'oft', 'bin', 'jnt', 'xsf', 'xsn', 'one', 'onetoc', 'xsd', 'wsdl', 'idl', 'emf', 'emz', 'vsw', 'vsd', 'vss', 'vst', 'mpw', 'mps', 'mpt', 'mht', 'rmh', 'fdf', 'pff', 'bup', 'ifo', 'vob', 'xla', 'dita', 'chm', 'ditamap', 'eml', 'jp2', 'gxf', 'dng', 'rle', 'dv', 'lxf', 'mss', 'eap', 'ump', 'xmi', 'opml', 'mmap', 'mmat', 'mmas', 'docx', 'dotx', 'docm', 'dotm', 'xlsx', 'xltx', 'xlsm', 'xltm', 'xlsb', 'pptx', 'pptm', 'ppsm', 'rf9', 'rf10', 'qxd', 'qxp', 'xtg', 'indd', 'psd', 'incd', 'dcm', 'mxf', 'so', 'pnm', 'wbmp', 'fpx', 'pgm', 'ppm', 'indd', 'incx', 'xfdf', 'smil', 'twb', 'twbx', 'tds', 'tdsx', 'tde', 'tbm', 'tms', 'tps'];
}

export function validateFilesSize(size) {
	// Limit is 2GB i.e 2*10^9 bytes.
	// This check is used because we see file size after division by 1000 instead of 1024.
	// A file of 517568211 bytes size will be seen as 517.6MB instead of 493.6MB (517568211/(1024)^2).
	return size < 2000000000;
}

export function prepareFileError(errors) {
	let error = '';

	if(errors.invalidExtensions.length && errors.invalidExtensions.length === 1) {
		error += `Attachments with extension ${errors.invalidExtensions[0]} is not allowed`;
	} else if(errors.invalidExtensions.length) {
		error += `Attachments with extension(s) ${errors.invalidExtensions.join(', ')} are not allowed`;
	}

	if(error.length && errors.invalidFilesSize.length) {
		error += ' and empty or blank attachments not allowed';
	} else if(!error.length && errors.invalidFilesSize.length) {
		error += 'Empty or blank attachments not allowed';
	}

	if(error.length && errors.duplicateFiles.length) {
		error += ' and duplicate attachments not allowed';
	} else if(!error.length && errors.duplicateFiles.length) {
		error += 'Duplicate attachments not allowed';
	}

	if(error.length && errors.exceededFilesSize.length) {
		error += ' and attachment(s) cannot exceed 2GB limit';
	} else if(!error.length && errors.exceededFilesSize.length) {
		error += 'Attachment(s) cannot exceed 2GB limit';
	}

	return error;
}

export function filterAndValidateFiles(newFiles, existingFiles, existingFilesSize, callbacks = {}) {

	const errors = {
		invalidExtensions: [],
		duplicateFiles: [],
		invalidFilesSize: [],
		exceededFilesSize: []
	},
	filteredFilesName = [],
	filteredFiles = existingFiles;

	let newFilesSize = existingFilesSize;

	for (let i = 0; i < newFiles.length; i++) {
		const filesSize = newFilesSize + newFiles[i].size;
		if(! validateFileExtension(newFiles[i])) {
			const exploedFileName = newFiles[i].name.split('.');
			const extension = exploedFileName[(exploedFileName.length - 1)];
			errors.invalidExtensions.push(`.${extension}`);
		} else if(! newFiles[i].size) {
			errors.invalidFilesSize.push(newFiles[i].name);
		} else if(! validateFileDuplicacy(newFiles[i], existingFiles, callbacks.validateDuplicateFiles)) {
			errors.duplicateFiles.push(newFiles[i].name);
		} else if(! validateFilesSize(filesSize)) {
			errors.exceededFilesSize.push(newFiles[i].name);
		} else {
			newFilesSize = filesSize;
			filteredFilesName.push(newFiles[i].name);
			filteredFiles.push(newFiles[i]);
		}
	}

	return {
		size: newFilesSize,
		list: filteredFiles,
		names: filteredFilesName,
		error: prepareFileError(errors)
	}
}

export function currentDate() {
	const dateObj = new Date();
	const date = (`0${dateObj.getDate()}`).slice(-2);
	const month = (`0${dateObj.getMonth() + 1}`).slice(-2);
	return `${month}/${date}/${dateObj.getFullYear()}`;
}

export function loadingSpinner() {
	return(
		<div style={{textAlign: 'center'}}>
			<img src="assets/images/loader.gif" style={{display: 'inline-block', 'margin': '296.5px 0px'}} />
		</div>
	);
}

export function remainingCharactersLengthComponent(value, maxLength) {
  let remainingChars = maxLength;
  if(value && maxLength) {
    remainingChars = maxLength - value.length;
  }

  if(remainingChars) {
    return <p className="character-count"><span className="info">{remainingChars} characters</span></p>;
  }
  return null;
}

export function moveToTop() {
	window.$('html,body').animate({ scrollTop: 0 }, 'slow');
}

export function disableScroll() {
	window.$('body').css('overflow', 'hidden');
}

export function enableScroll() {
	window.$('body').css('overflow', 'auto');
}

export function hasHTMLEntities(string, allowImplicit = false) {
	const stringWithoutSpace = string.replace(/ /ig, '');
	if(stringWithoutSpace.length !== stringWithoutSpace.replace(/&lt;(.)*&gt;/ig, '').length) {
		return true;
	}
	if( ! allowImplicit && stringWithoutSpace.length !== stringWithoutSpace.replace(/<(.)*>/ig, '').length) {
		return true;
	}
	return false;
}

export function calculateFilesSize(files = []) {
	if(!files) return;
	let size = 0;
	files.forEach((file) => {
		size += file.size;
	});

	return size;
}