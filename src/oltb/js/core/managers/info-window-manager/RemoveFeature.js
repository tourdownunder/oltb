import { Dialog } from '../../../common/Dialog';
import { EVENTS } from '../../../helpers/constants/Events';
import { LayerManager } from '../LayerManager';

const removeFeature = function(InfoWindowManager, feature) {
    Dialog.confirm({
        text: 'Do you want to delete this marker?',
        onConfirm: () => {
            LayerManager.removeFeatureFromLayer(feature);

            this.hideOverlay();

            // Dispatch event to trigger callback
            window.dispatchEvent(new CustomEvent(EVENTS.Custom.FeatureRemoved, {
                detail: {
                    feature: feature
                }
            }));
        }
    });
}

export { removeFeature };