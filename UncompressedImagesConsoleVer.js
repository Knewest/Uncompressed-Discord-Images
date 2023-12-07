const config = {
	attributes: true,
	childList: true,
	subtree: true,
	attributeFilter: ['src'],
};

const localObserver = new MutationObserver(callback);

function updateGridLayoutClass() {
    const twoByTwoGridElements = document.querySelectorAll('.twoByTwoGrid__47ed7');
    twoByTwoGridElements.forEach(element => {
        element.classList.remove('twoByTwoGrid__47ed7');
        element.classList.add('threeByThreeGrid_d2750c');
        element.style.gridTemplateColumns = "repeat(4, 1fr)";

        addClassToChildren(element, 'oneByTwoSoloItem__42516');
    });

    const threeByThreeGridElements = document.querySelectorAll('.threeByThreeGrid_d2750c');
    threeByThreeGridElements.forEach(element => {
        if (!element.classList.contains('original-threeByThreeGrid')) {
            addClassToChildren(element, 'oneByTwoSoloItem__42516');
        }
    });
}

function addClassToChildren(parentElement, className) {
    const childElements = parentElement.children;
    for (let i = 0; i < childElements.length; i++) {
        childElements[i].classList.add(className);
    }
}

function adjustHeightBasedOnNearestVerticalResolution() {
    const elementsToAdjust = document.querySelectorAll('.clickableWrapper__64072, .loadingOverlay__4d818');
    elementsToAdjust.forEach(element => {
        let nearestGridItem = element.closest('.oneByTwoGridItem_fc18a9, .oneByTwoGrid__44b90.oneByTwoLayoutThreeGrid__5ec2c .oneByTwoSoloItem__42516, .twoByOneGridItem__3d797, .oneByOneGrid__02495.oneByOneGridMosaic_afe3ca, .threeByThreeGrid_d2750c .oneByTwoSoloItem__42516, .oneByTwoGrid__44b90 .oneByTwoGridItem_fc18a9'); // Killing myself if Discord changes how these are named. - Knew
        if (nearestGridItem) {
            element.style.height = `${nearestGridItem.clientHeight}px`;
        }
    });
}

function centerImageBecauseRegularCSSWillNot() {
    const updateImagePositions = document.querySelectorAll('.imageContainer__04362 .lazyImg_dafbb7.processed-image.processed-grid-layout:not(.uncompressedImagesCentered)');

    updateImagePositions.forEach((image) => {
        const container = image.closest('.oneByTwoGridItem_fc18a9, .oneByTwoGrid__44b90.oneByTwoLayoutThreeGrid__5ec2c .oneByTwoSoloItem__42516, .oneByTwoSoloItem__42516, .twoByOneGridItem__3d797, .oneByTwoSoloItem__42516, .oneByOneGrid__02495.oneByOneGridMosaic_afe3ca, .threeByThreeGrid_d2750c .oneByTwoSoloItem__42516, .oneByTwoGrid__44b90 .oneByTwoGridItem_fc18a9');
        if (container && image) {
            const containerHeight = container.clientHeight;
            const originalImageHeight = image.clientHeight;
            const imageWidth = image.clientWidth;

            if (imageWidth > originalImageHeight) {

                const scaleFactor = containerHeight / originalImageHeight;
                image.style.transform = `scale(${scaleFactor})`;
                image.style.transformOrigin = 'top';
                image.offsetHeight;

                const scaledImageHeight = originalImageHeight * scaleFactor;
                const translateY = (containerHeight - scaledImageHeight) / 2;
                image.style.transform += ` translateY(${translateY}px)`;

            } else {
                const translateY = (containerHeight - originalImageHeight) / 2;
                image.style.transform = `translateY(${translateY}px)`;
                image.style.transformOrigin = 'center';
            }
            image.classList.add('uncompressedImagesCentered');
        }
    });
    setTimeout(adjustHeightBasedOnNearestVerticalResolution, 200);
}

function centerImageUponWindowResize() {
	const updateImagePositions = document.querySelectorAll('.imageContainer__04362 .lazyImg_dafbb7.processed-image.processed-grid-layout .uncompressedImagesCentered');

    updateImagePositions.forEach((image) => {
        const container = image.closest('.oneByTwoGridItem_fc18a9, .oneByTwoGrid__44b90.oneByTwoLayoutThreeGrid__5ec2c .oneByTwoSoloItem__42516, .oneByTwoSoloItem__42516, .twoByOneGridItem__3d797, .oneByTwoSoloItem__42516, .oneByOneGrid__02495.oneByOneGridMosaic_afe3ca, .threeByThreeGrid_d2750c .oneByTwoSoloItem__42516, .oneByTwoGrid__44b90 .oneByTwoGridItem_fc18a9');
        if (container && image) {
            const containerHeight = container.clientHeight;
            const originalImageHeight = image.clientHeight;
            const imageWidth = image.clientWidth;

            if (imageWidth > originalImageHeight) {

                const scaleFactor = containerHeight / originalImageHeight;
                image.style.transform = `scale(${scaleFactor})`;
                image.style.transformOrigin = 'top';
                image.offsetHeight;

                const scaledImageHeight = originalImageHeight * scaleFactor;
                const translateY = (containerHeight - scaledImageHeight) / 2;
                image.style.transform += ` translateY(${translateY}px)`;

            } else {
                const translateY = (containerHeight - originalImageHeight) / 2;
                image.style.transform = `translateY(${translateY}px)`;
                image.style.transformOrigin = 'center';
            }
        }
    });
    setTimeout(adjustHeightBasedOnNearestVerticalResolution, 200);
}

function enhanceAvatarQuality() {
	const avatarURLs = document.querySelectorAll(
	'img.avatar__08316[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar), img.avatar__991e2[src^="https://cdn.discordapp.com/avatars"]:not(.processed-avatar)'
	);
	avatarURLs.forEach((image) => {
		let newSrc = image.src.replace(/\?size=\d*/, '');
		if (!newSrc.includes('?quality=lossless')) {
			newSrc += '?quality=lossless';
		}
		image.src = newSrc;
		image.classList.add('processed-avatar');
	});
}

function imagesExternalLinks() {
	const imgElements = document.querySelectorAll('img');
	imgElements.forEach(img => {
		const externalLink = /^(https:\/\/images-ext-\d+\.discordapp\.net\/external\/[^\/]+\/https\/[^?]+)\?.+$/;
		const match = img.src.match(externalLink);
		if (match) {
			img.src = match[1] + '?';
			img.classList.add('processed-external-link');
		}
	});
}

function enhanceIconQuality() {
	const iconURLs = document.querySelectorAll(
	'img.icon__0cbed[src^="https://cdn.discordapp.com/icons/"]:not(.processed-icon)'
	);
	iconURLs.forEach((image) => {
		let newSrc = image.src.replace(/\?size=\d*/, '');
		if (!newSrc.includes('?quality=lossless')) {
			newSrc += '?quality=lossless';
		}
		image.src = newSrc;
		image.classList.add('processed-icon');
	});
}

const SELECTOR_IMG_SRC = '.zoomLens_uOK8xV img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .layerContainer_d5a653 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .imageContainer__04362 img[src^="https://media.discordapp.net/attachments"]:not(.processed-image), .vc-imgzoom-lens img[src^="https://media.discordapp.net/attachments"]:not(.processed-image)';

function convertMediaToCDN() {
	const mediaURLs = document.querySelectorAll(SELECTOR_IMG_SRC);
		mediaURLs.forEach((image) => {
			if (!image.classList.contains('gif__2aa16') && !image.nextElementSibling?.classList.contains('video__4c052')) {
				image.src = image.src.replace(
					'https://media.discordapp.net/attachments',
					'https://cdn.discordapp.com/attachments'
				);
				image.classList.add('processed-image');
			}
		});
	}

function replaceURLs() {
	const messages = document.querySelectorAll('.container_dbadf5');
		messages.forEach((message) => {
		const images = message.querySelectorAll('.imageDetails_1t6Zms');
			if (images.length === 1) {
				const image = images[0];
				image.style.display = 'inline-table';
				image.style.transform = 'translateX(5px) translateY(-0px)';
				image.style.lineHeight = 'unset';
				
				const parent = image.closest('.imageContent__24964.embedWrapper_c143d9.attachmentContentContainer_e8d7a1.attachmentContentItem_ef9fc2');
	if (parent) {
		parent.appendChild(image);
	}
	} else if (images.length > 1) {
			images.forEach((image) => {
				image.style.display = 'none';
			});
	}
});

function processImage() {
	const mediaURLs = document.querySelectorAll(SELECTOR_IMG_SRC);
	mediaURLs.forEach((image, index) => {
		if (!image.classList.contains('processed-image') && !image.src.includes('.gif')) {
			const newSrc = image.src.replace(
				'https://media.discordapp.net/attachments',
				'https://cdn.discordapp.com/attachments'
			);

			const offscreenImage = new Image();
			offscreenImage.src = newSrc;
			offscreenImage.onload = function() {
				try {
					const aspectRatio = offscreenImage.naturalWidth / offscreenImage.naturalHeight;
					const maxWidth = image.closest('.imageWrapper_fd6587').clientWidth;
					const maxHeight = image.closest('.imageWrapper_fd6587').clientHeight;
					let width = offscreenImage.naturalWidth;
					let height = offscreenImage.naturalHeight;

					if (width > maxWidth) {
						width = maxWidth;
						height = width / aspectRatio;
					}

					if (height > maxHeight) {
						height = maxHeight;
						width = height * aspectRatio;
					}

					image.src = newSrc;
					image.style.width = `${width}px`;

					image.classList.add('processed-image');
				} catch (error) {
					console.error("Uncompressed Images - Error processing image:", error);
				}
			};
		}
	});
}

let imagesSingle = document.querySelectorAll('.container_dbadf5 .lazyImg_dafbb7.processed-image.processed-single-layout');
imagesSingle.forEach((image) => {
	image.addEventListener('load', function () {
	const classElement = image.closest('.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-single-layout');
	if (classElement && image.naturalWidth > image.naturalHeight) {
		classElement.classList.add('auto-width-single');
	}		
	});
});

let imagesGrid = document.querySelectorAll('.container_dbadf5 .lazyImg_dafbb7.processed-image.processed-grid-layout');
imagesGrid.forEach((image) => {
	image.addEventListener('load', function () {
	const classElement = image.closest('.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-grid-layout');
	if (classElement && image.naturalHeight > image.naturalWidth) {
		classElement.classList.add('auto-width-grid');
	}		
	});
});
}

this.resizeListener = window.addEventListener('resize', debounce(centerImageUponWindowResize, 100));

function processImageSrc() {
convertMediaToCDN();
replaceURLs();
checkForGridLayout();
updateGridLayoutClass();
setTimeout(centerImageBecauseRegularCSSWillNot, 1000);
}

function callback(mutationsList, observer) {
	for (const mutation of mutationsList) {
		if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
			const addedImages = Array.from(mutation.addedNodes).flatMap((node) =>
			node.querySelectorAll
			? Array.from(node.querySelectorAll(SELECTOR_IMG_SRC))
			: []
		);

		addedImages.forEach((image) => {
			if (!image.src.includes('.gif')) {
				setImmediate(processImageSrc);
			}
		});
		} else if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
			if (!mutation.target.src.includes('.gif')) {
				processImageSrc();
				enhanceAvatarQuality();
				enhanceIconQuality();
				imagesExternalLinks();
			}
		}
	}
}

function checkForGridLayout() {
	const messages = document.querySelectorAll('.container_dbadf5');
	messages.forEach((message) => {
		const elements = message.querySelectorAll('.lazyImg_dafbb7, .imageContainer__04362, .lazyImgContainer__68fa8, .imageWrapper_fd6587, .imageContent__24964');
		const imageElements = message.querySelectorAll('.lazyImg_dafbb7');
		if (imageElements.length > 1) {
		elements.forEach((element) => {
			element.classList.remove('processed-single-layout');
			element.classList.add('processed-grid-layout');
		});
		} else if (imageElements.length === 1) {
		elements.forEach((element) => {
			element.classList.remove('processed-grid-layout');
			element.classList.add('processed-single-layout');
		});
		}
	});
	}

function createUncompressedImagesCSSStyle() {
const style = document.createElement('style');
style.textContent = `
	.altText__6dd8b {
		margin: .25rem 0 -0.15rem !important;
		line-height: 17px !important;
	}

	.mediaAttachmentsContainer_edba75 {

	}

	.auto-width-single {
		width: auto !important;
		height: auto !important;
		max-width: 550px !important;
	}		
	
	.auto-width-single img {
		max-height: 350px !important;
	}

	.auto-width-grid {
		height: auto !important;
		max-width: 550px !important;
	}		
	
	.auto-width-grid img {

	}

	.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-single-layout {
		
	}
	
	.clickableWrapper__64072 {
		height: none !important;
	}
	
	.carouselModal_c0d5b7.zoomedCarouselModalRoot__1e2da.root_a28985.fullscreenOnMobile__96797 {
		display: flex !important;
		justify-content: center !important;
		align-items: center !important;
	}

	.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-grid-layout {
		display: -webkit-box !important;
	}
	
	.imageContent__24964.embedWrapper_c143d9.attachmentContentContainer_e8d7a1.attachmentContentItem_ef9fc2.processed-single-layout {
		height: auto !important;
		width: auto !important;
		max-width: 550px !important;		
	}

	.imageWrapper_fd6587.embedWrapper_c143d9.lazyImg_dafbb7.attachmentContentItem_ef9fc2.processed-single-layout {
		
	}

	.imageDetailsAdded_sda9Fa .imageWrapper_fd6587 {
		height: 100% !important;
	}

	.imageDetails_1t6Zms {
		margin: 0.15rem 0 0rem !important;
	}

	.lazyImg_dafbb7.processed-image.processed-grid-layout {
		aspect-ratio: unset !important;
		display: grid !important;
		object-fit: cover !important;
	}
	
	.lazyImg_dafbb7.processed-image.processed-single-layout {

	}	

	.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-grid-layout {
		max-width: 100% !important;
	}
	
	.imageWrapper_fd6587.imageZoom_ceab9d.clickable_dc48ac.lazyImgContainer__68fa8.processed-single-layout {
		height: 100% !important;
	}
	
	.cursorPointer_B3uwDA {
		transform: translateY(2px) !important;
	}

	.spoilerContent__37bfa.spoilerContainer_b653f1 {
		background-color: rgba(255, 255, 255, 0);
	}

	.loadingOverlay__4d818 {
		aspect-ratio: unset !important;
	}

	.threeByThreeGrid_d2750c .lazyImgContainer__68fa8, .threeByThreeGrid_d2750c .lazyImg_dafbb7 {

	}

	.lazyImg_dafbb7.processed-image.processed-grid-layout {
		min-height: auto !important;
	}

	.oneByTwoGrid__44b90 .attachmentContentContainer_e8d7a1, .oneByTwoGrid__44b90 .lazyImg_dafbb7 {
		height: unset !important;
	}
`;
document.head.appendChild(style);
return style;
}

function modifyImageUtilitiesCSSRule() {
    var styleElement = document.getElementById("ImageUtilitiesCSS");

    if (styleElement) {
        var cssText = styleElement.textContent;

        var oldRule = ".imageDetailsAdded_sda9Fa .imageWrapper_fd6587 {border-radius: 8px !important;height: calc(100% - 1rem - 16px) !important;max-height: unset !important;margin-left: unset !important;}";
        var newRule = ".imageDetailsAdded_sda9Fa .imageWrapper_fd6587 {border-radius: 8px !important;height: calc(100% - 1rem - 16px);max-height: unset !important;margin-left: unset !important;}";

        cssText = cssText.replace(oldRule, newRule);

        styleElement.textContent = cssText;
    } else {
		// console.error("Uncompressed Images Error: Style element with ID 'ImageUtilitiesCSS' not found.");
    }
}

function runMutation() {
	convertMediaToCDN();
	replaceURLs();
	enhanceAvatarQuality();
	enhanceIconQuality();
	imagesExternalLinks();
	setTimeout(modifyImageUtilitiesCSSRule, 4000);
	localObserver.observe(document, config);
}

runMutation();

if (!this.UncompressedImagesCSSStyle) {
	this.UncompressedImagesCSSStyle = createUncompressedImagesCSSStyle();
}

this.mutationObserver = localObserver;

/**
* Version 3.21 of 'Uncompressed Images'
* Copyright (Boost Software License 1.0) 2023-2023 Knew
* Link to plugin: https://github.com/Knewest/uncompressed-discord-images
* Support server: https://discord.gg/NqqqzajfK4
*/
