/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var choroplethAttrs = require('../choropleth/attributes');
var colorScaleAttrs = require('../../components/colorscale/attributes');
var hovertemplateAttrs = require('../../plots/template_attributes').hovertemplateAttrs;
var baseAttrs = require('../../plots/attributes');
var extendFlat = require('../../lib/extend').extendFlat;

module.exports = extendFlat({
    locations: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets which features found in *geojson* to plot using',
            'their feature `id` field.'
        ].join(' ')
    },

    // TODO
    // Maybe start with only one value (that we could name e.g. 'geojson-id'),
    // but eventually:
    // - we could also support for our own dist/topojson/*
    // - some people might want `geojson-properties-name` to map data arrays to
    //   GeoJSON features
    // locationmode: choroplethAttrs.locationmode,

    z: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the color values.'
    },

    // TODO maybe we could also set a "key" to dig out values out of the
    // GeoJSON feature `properties` fields?

    geojson: {
        valType: 'any',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the GeoJSON data associated with this trace.',
            'Can be set as a valid GeoJSON object or as URL string',
            'Note that we only accept GeoJSON of type *FeatureCollection* and *Feature*',
            'with geometries of type *Polygon* and *MultiPolygon*.'
        ].join(' ')
    },

    // TODO agree on name / behaviour
    //
    // 'below' is used currently for layout.mapbox.layers,
    // even though it's not very plotly-esque.
    //
    // Note also, that the mapbox-gl style don't all have the same layers,
    // see https://codepen.io/etpinard/pen/ydVMwM for full list
    below: {
        valType: 'string',
        role: 'info',
        editType: 'plot',
        description: [
            'Determines if the choropleth polygons will be inserted',
            'before the layer with the specified ID.',
            'By default, choroplethmapbox traces are placed above the water layers.',
            'If set to \'\',',
            'the layer will be inserted above every existing layer.'
        ].join(' ')
    },

    text: choroplethAttrs.text,
    hovertext: choroplethAttrs.hovertext,

    marker: {
        line: {
            color: extendFlat({}, choroplethAttrs.marker.line.color, {editType: 'plot'}),
            width: extendFlat({}, choroplethAttrs.marker.line.width, {editType: 'plot'}),
            editType: 'calc'
        },
        // TODO maybe having a dflt less than 1, together with `below:''` would be better?
        opacity: extendFlat({}, choroplethAttrs.marker.opacity, {editType: 'plot'}),
        editType: 'calc'
    },

    selected: {
        marker: {
            opacity: extendFlat({}, choroplethAttrs.selected.marker.opacity, {editType: 'plot'}),
            editType: 'plot'
        },
        editType: 'plot'
    },
    unselected: {
        marker: {
            opacity: extendFlat({}, choroplethAttrs.unselected.marker.opacity, {editType: 'plot'}),
            editType: 'plot'
        },
        editType: 'plot'
    },

    hoverinfo: choroplethAttrs.hoverinfo,
    hovertemplate: hovertemplateAttrs({}, {keys: ['properties']}),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
},

    colorScaleAttrs('', {
        cLetter: 'z',
        editTypeOverride: 'calc'
    })
);
