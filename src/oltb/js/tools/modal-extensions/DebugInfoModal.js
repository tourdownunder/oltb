import DOM from '../../helpers/browser/DOM';
import Toast from '../../common/Toast';
import ModalBase from '../../common/modals/ModalBase';
import { copyToClipboard } from '../../helpers/browser/CopyToClipboard';

class DebugInfoModal extends ModalBase {
    constructor(options = {}) {
        super('Debug information', options.onClose);

        const textArea = DOM.createElement({
            element: 'textarea', 
            value: JSON.stringify(options.information, undefined, 4),
            class: 'oltb-input oltb-thin-scrollbars',
            attributes: {
                rows: 15,
                cols: 100,
                spellcheck: 'false'
            }
        });

        const copyButton = DOM.createElement({
            element: 'button',
            text: 'Copy debug info',
            class: 'oltb-btn oltb-btn--green-mid oltb-mt-1',
            attributes: {
                type: 'button'
            },
            listeners: {
                'click': async () => {
                    copyToClipboard(textArea.value)
                        .then(() => {
                            Toast.success({text: 'Debug info copied to clipboard', autoremove: 4000});
                        })
                        .catch((error) => {
                            console.error('Error copying debug info', error);
                            Toast.error({text: 'Failed to copy debug info'});
                        });
                }
            }
        });

        const logFullMapButton = DOM.createElement({
            element: 'button',
            text: 'Log map object',
            class: 'oltb-btn oltb-btn--green-mid oltb-mt-1 oltb-ml-0625',
            attributes: {
                type: 'button'
            },
            listeners: {
                'click': () => {
                    console.log(options.map);
                    Toast.success({text: 'Map object logged to console (F12)', autoremove: 4000});
                }
            }
        });
        
        const buttonWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-modal__button-wrapper'
        }); 

        DOM.appendChildren(buttonWrapper, [
            copyButton, 
            logFullMapButton
        ]);

        // Add all DOM elements to the modalContent
        const modalContent = DOM.createElement({
            element: 'div',
            class: 'oltb-modal__content oltb-flex-content-center' 
        });
        
        DOM.appendChildren(modalContent, [
            textArea, 
            buttonWrapper
        ]);
        
        this.show(modalContent);
    }
}

export default DebugInfoModal;