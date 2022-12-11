import { version } from '../../../../package.json';

const CONFIG = {
    version: version,
    locale: 'en-us',
    scrollDistance: 100,
    rem: 16,
    localStorage: {
        key: 'oltb-state'
    },
    projection: {
        default: 'EPSG:3857',
        wgs84: 'EPSG:4326'
    },
    overlayOffset: {
        horizontal: 0,
        vertical: -8
    },
    deviceWidth: {
        xs: '0',
        sm: '576',
        md: '768',
        lg: '992',
        xl: '1200',
        xxl: '1400'
    },
    animationDuration: {
        slow: 450,
        normal: 350,
        fast: 250
    }
};

export default CONFIG;