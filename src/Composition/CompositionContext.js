/**
* Copyright (C) 2014 TheSoftwareCo-oP
*/



define(['Composition/CompositeView',
        'UI/ViewSupplier',
        'UI/UIContext',
        'UI/TypedModelContext',
        'Video/VideoContext',
        'File/FileContext',
        'Video/VideoView',
        'File/URLView',
        'node-uuid',
        'backboneLocalstorage',
        'backbone'],
function(CompositeView,
         ViewSupplier,
         UIContext,
         TypedModelContext,
         VideoContext,
         FileContext,
         VideoView,
         URLView,
         uuid,
         BackboneLocalstorage,
         Backbone) {

    function CompositeContext() {}

    CompositionContext.prototype.run = function(element, document) {
        var compositeView = new CompositeView();

        
        //Get a ModelView
        //Add it to the Composition
        
        
