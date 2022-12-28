import { DOM } from '../../helpers/browser/DOM';
import { SVG_PATHS } from '../../core/icons/GetIcon';
import { ModalBase } from '../../common/modals/ModalBase';
import { isDarkTheme } from '../../helpers/IsDarkTheme';

const ID_PREFIX = 'oltb-marker-modal';
const DEFAULT_OPTIONS = Object.freeze({
    edit: false,
    coordinates: [0, 0],
    name: 'Marker',
    info: '',
    backgroundColor: '#0166A5FF',
    color: '#FFFFFFFF',
    icon: 'GeoPin.Filled',
    onClose: undefined,
    onCreate: undefined,
    onCancel: undefined
});

class MarkerModal extends ModalBase {
    constructor(options = {}) {
        super('Marker configuration', options.onClose);
        this.options = { ...DEFAULT_OPTIONS, ...options };

        // Create textbox for marker name
        const nameWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-m-0'
        });

        nameWrapper.appendChild(DOM.createElement({
            element: 'label', 
            text: 'Name',
            class: 'oltb-label', 
            attributes: {
                for: `${ID_PREFIX}-marker-name`
            }
        }));

        const nameText = DOM.createElement({
            element: 'input', 
            id: `${ID_PREFIX}-marker-name`,
            class: 'oltb-input',
            value: this.options.name,
            attributes: {
                type: 'text'
            }
        });

        nameWrapper.appendChild(nameText);

        // Create textbox for marker info
        const infoWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-mt-0625'
        });

        infoWrapper.appendChild(DOM.createElement({
            element: 'label', 
            text: 'Info text',
            class: 'oltb-label', 
            attributes: {
                for: `${ID_PREFIX}-marker-info`
            }
        }));

        const infoText = DOM.createElement({
            element: 'input', 
            id: `${ID_PREFIX}-marker-info`,
            class: 'oltb-input',
            value: this.options.info,
            attributes: {
                type: 'text',
                placeholder: 'Some information about the marker'
            }
        });

        infoWrapper.appendChild(infoText);

        // Create and populate select element with all icons
        const iconWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-mt-0625'
        });

        iconWrapper.appendChild(DOM.createElement({
            element: 'label', 
            text: 'Icon',
            class: 'oltb-label', 
            attributes: {
                for: `${ID_PREFIX}-icon`
            }
        }));

        const iconSelect = DOM.createElement({
            element: 'select',
            id: `${ID_PREFIX}-icon`, 
            class: 'oltb-select'
        });
 
        for(const path in SVG_PATHS) {
            for(const version in SVG_PATHS[path]) {
                iconSelect.appendChild(
                    DOM.createElement({
                        element: 'option', 
                        text: `${path} (${version})`, 
                        value: `${path}.${version}`
                    }
                ));
            }
        }

        const targetIcon = this.options.icon;

        // Select the GeoPin icon as default
        for(var i = 0; i < iconSelect.length; i++) {
            if(iconSelect[i].value === targetIcon) {
                iconSelect.selectedIndex = i;
                break;
            }
        }
 
        iconWrapper.appendChild(iconSelect);

        // Create textbox for marker latitude
        const latWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-mt-0625'
        });

        latWrapper.appendChild(DOM.createElement({
            element: 'label', 
            text: 'Latitud',
            class: 'oltb-label', 
            attributes: {
                for: `${ID_PREFIX}-marker-lat`
            }
        }));

        const latText = DOM.createElement({
            element: 'input',
            id: `${ID_PREFIX}-marker-lat`,
            class: 'oltb-input',
            value: this.options.coordinates[1],
            attributes: {
                type: 'text'
            }
        });

        latWrapper.appendChild(latText);

        // Create textbox for marker longitude
        const lonWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-mt-0625'
        });

        lonWrapper.appendChild(DOM.createElement({
            element: 'label', 
            text: 'Longitud', 
            class: 'oltb-label',
            attributes: {
                for: `${ID_PREFIX}-marker-lon`
            }
        }));

        const lonText = DOM.createElement({
            element: 'input',
            id: `${ID_PREFIX}-marker-lon`,
            class: 'oltb-input',
            value: this.options.coordinates[0],
            attributes: {
                type: 'text'
            }
        });

        lonWrapper.appendChild(lonText);

        // Create color picker for background
        const backgroundColorWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-mt-0625'
        });

        backgroundColorWrapper.appendChild(DOM.createElement({
            element: 'label', 
            text: 'Background color',
            class: 'oltb-label', 
            attributes: {
                for: `${ID_PREFIX}-marker-background`
            }
        }));

        const backgroundColorInput = DOM.createElement({
            element: 'div',
            id: `${ID_PREFIX}-marker-background`,
            class: 'oltb-color-input oltb-color-tippy',
            attributes: {
                tabindex: 0,
                'data-oltb-color-target': `#${ID_PREFIX}-marker-background`,
                'data-oltb-color': this.options.backgroundColor
            }
        });

        backgroundColorInput.appendChild(DOM.createElement({
            element: 'div',
            style: `background-color: ${this.options.backgroundColor}`,
            class: 'oltb-color-input__inner'
        }));

        backgroundColorWrapper.appendChild(backgroundColorInput);

        // Create color picker for color
        const colorWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-mt-0625' 
        });

        colorWrapper.appendChild(DOM.createElement({
            element: 'label', 
            text: 'Color',
            class: 'oltb-label', 
            attributes: {
                for: `${ID_PREFIX}-marker-color`
            }
        }));

        const colorInput = DOM.createElement({
            element: 'div',
            id: `${ID_PREFIX}-marker-color`,
            class: 'oltb-color-input oltb-color-tippy',
            attributes: {
                tabindex: 0,
                'data-oltb-color-target': `#${ID_PREFIX}-marker-color`,
                'data-oltb-color': this.options.color
            }
        });

        colorInput.appendChild(DOM.createElement({
            element: 'div',
            style: `background-color: ${this.options.color}`,
            class: 'oltb-color-input__inner'
        }));

        colorWrapper.appendChild(colorInput);

        // Create buttons for create and cancel
        const buttonsWrapper = DOM.createElement({
            element: 'div',
            class: 'oltb-d-flex oltb-justify-content-between oltb-mt-15'
        });

        const createButton = DOM.createElement({
            element: 'button', 
            text: `${this.options.edit ? 'Save changes' : 'Create marker'}`, 
            class: 'oltb-dialog__btn oltb-btn oltb-btn--green-mid',
            attributes: {
                type: 'button',
            },
            listeners: {
                'click': () => {
                    const response = {
                        name: nameText.value.trim(),
                        info: infoText.value.trim(),
                        icon: iconSelect.value,
                        latitude: parseFloat(latText.value),
                        longitude: parseFloat(lonText.value),
                        backgroundColor: backgroundColorInput.getAttribute('data-oltb-color'),
                        color: colorInput.getAttribute('data-oltb-color')
                    };
        
                    this.close();
                    typeof this.options.onCreate === 'function' && this.options.onCreate(response);
                }
            }
        });

        const cancelButton = DOM.createElement({
            element: 'button', 
            text: 'Cancel',
            class: `oltb-dialog__btn oltb-btn ${isDarkTheme() ? 'oltb-btn--gray-mid' : 'oltb-btn--gray-dark'}`,
            attributes: {
                type: 'button'
            },
            listeners: {
                'click': () => {
                    this.close();
                    typeof this.options.onCancel === 'function' && this.options.onCancel();
                }
            }
        });

        DOM.appendChildren(buttonsWrapper, [
            cancelButton,
            createButton
        ]);

        const modalContent = DOM.createElement({
            element: 'div',
            class: 'oltb-modal__content'
        });
        
        DOM.appendChildren(modalContent, [
            nameWrapper,
            infoWrapper,
            iconWrapper,
            latWrapper,
            lonWrapper,
            backgroundColorWrapper,
            colorWrapper,
            buttonsWrapper
        ]);

        this.show(modalContent);
    }
}

export { MarkerModal };