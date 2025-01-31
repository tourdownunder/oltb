import LayerManager from "../core/managers/LayerManager";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import Stamen from 'ol/source/Stamen';
import { XYZ } from 'ol/source';

LayerManager.addMapLayers([
    {
        name: 'Open Street Map',
        layer: new TileLayer({
            source: new OSM(),
            visible: true
        })
    }, {
        name: 'ArcGIS World Topo',
        layer: new TileLayer({
            source: new XYZ({
                attributions: 'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                url:'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            }),
            visible: false
        })
    }, {
        name: 'Stamen Watercolor',
        layer: new TileLayer({
            maxZoom: 12,
            source: new Stamen({
                layer: 'watercolor',
                attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.',
            }),
            visible: false
        })
    }, {
        name: 'Stamen Terrain',
        layer: new TileLayer({
            maxZoom: 12,
            source: new Stamen({
                layer: 'terrain',
                attributions: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
            }),
            visible: false
        })
    }
], true);