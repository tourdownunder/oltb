import { CONFIG } from '../../core/Config';
import { EVENTS } from '../../helpers/constants/Events';
import { easeOut } from 'ol/easing';
import { Control } from 'ol/control';
import { ContextMenu } from '../../common/ContextMenu';
import { StateManager } from '../../core/managers/StateManager';
import { TOOLBAR_ELEMENT } from '../../core/elements/index';
import { SVG_PATHS, getIcon } from '../../core/icons/GetIcon';
import { LOCAL_STORAGE_KEYS } from '../../helpers/constants/LocalStorageKeys';
import { fromLonLat, toLonLat } from 'ol/proj';
import { CoordinateModal } from '../modal-extensions/CoordinateModal';

// This is the same NODE_NAME and PROPS that the map.js file is using
const LOCAL_STORAGE_NODE_NAME = LOCAL_STORAGE_KEYS.MapData;
const LOCAL_STORAGE_DEFAULTS = Object.freeze({
    lon: 18.6435,
    lat: 60.1282,
    zoom: 4,
    rotation: 0
});

const DEFAULT_OPTIONS = Object.freeze({
    focusZoom: 2
});

class HiddenMapNavigationTool extends Control {
    constructor(options = {}) {
        super({
            element: TOOLBAR_ELEMENT
        });

        this.options = { ...DEFAULT_OPTIONS, ...options };
        this.coordinateModal = undefined;

        // Load stored data from localStorage
        const localStorageState = JSON.parse(StateManager.getStateObject(LOCAL_STORAGE_NODE_NAME)) || {};
        this.localStorage = { ...LOCAL_STORAGE_DEFAULTS, ...localStorageState };

        const coordinateIcon = getIcon({
            path: SVG_PATHS.Crosshair.Stroked
        });

        const moveCenterIcon = getIcon({
            path: SVG_PATHS.ArrowsMove.Stroked
        });
        
        const focusHereIcon = getIcon({
            path: SVG_PATHS.AspectRatio.Stroked
        });

        ContextMenu.addItem({
            icon: coordinateIcon,
            name: 'Navigate to coordinate',
            fn: this.onContextMenuCenterAtCoordinate.bind(this)
        })

        ContextMenu.addItem({
            icon: moveCenterIcon, 
            name: 'Center map here', 
            fn: this.onContextMenuCenterMap.bind(this)
        });

        ContextMenu.addItem({
            icon: focusHereIcon, 
            name: 'Focus here', 
            fn: this.onContextMenuFocusHere.bind(this)
        });
        
        ContextMenu.addItem({});

        // Track changes to zoom, paning etc. store in localStorage
        // Must wait until DOM is loaded before the reference to the map can be used
        window.addEventListener(EVENTS.Browser.ContentLoaded, this.onDOMContentLoaded.bind(this));
    }

    onDOMContentLoaded(event) {
        const map = this.getMap();

        if(map) {
            map.on(EVENTS.OpenLayers.MoveEnd, this.onMoveEnd.bind(this));
        }
    }

    onContextMenuCenterAtCoordinate(map, coordinates, target) {
        if(this.coordinateModal) {
            return;
        }

        this.coordinateModal = new CoordinateModal({
            onNavigate: (coordinates) => {
                this.goToView(map, coordinates, map.getView().getZoom());
            },
            onClose: () => {
                this.coordinateModal = undefined;
            }
        });
    }

    onContextMenuCenterMap(map, coordinates, target) {
        this.goToView(map, coordinates, map.getView().getZoom());
    }

    onContextMenuFocusHere(map, coordinates, target) {
        this.goToView(map, coordinates, this.options.focusZoom);
    }

    goToView(map, coordinates, zoom) {
        const view = map.getView();
        
        if(view.getAnimating()) {
            view.cancelAnimations();
        }
    
        view.animate({
            center: fromLonLat(coordinates),
            zoom: zoom,
            duration: CONFIG.AnimationDuration.Normal,
            easing: easeOut
        });
    }

    onMoveEnd(event) {
        const view = this.getMap().getView();
        const center = toLonLat(view.getCenter());

        this.localStorage.lon = center[0];
        this.localStorage.lat = center[1];
        this.localStorage.zoom = view.getZoom();
        this.localStorage.rotation = view.getRotation();

        StateManager.setStateObject(LOCAL_STORAGE_NODE_NAME, JSON.stringify(this.localStorage));
    }
}

export { HiddenMapNavigationTool };