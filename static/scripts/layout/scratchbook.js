define(["mvc/ui/ui-frames"],function(a){var b=Backbone.View.extend({el_main:"body",active:!1,button_active:null,button_load:null,initialize:function(b){b=b||{};var d=this;this.frames=new a.View({visible:!1}),this.button_active=new c({icon:"fa-th",tooltip:"Enable/Disable Scratchbook",onclick:function(){d._activate()},onunload:function(){return d.frames.length()>0?"You opened "+d.frames.length()+" frame(s) which will be lost.":void 0}}),this.button_load=new c({icon:"fa-eye",tooltip:"Show/Hide Scratchbook",onclick:function(){d.frames.visible?d.frames.hide():d.frames.show()},with_number:!0}),b.masthead&&(b.masthead.append(this.button_active),b.masthead.append(this.button_load)),this.setElement(this.frames.$el),$(this.el_main).append(this.$el),this.frames.setOnChange(function(){d._refresh()}),this._refresh()},add_dataset:function(a){var b=this;require(["mvc/dataset/data"],function(c){var d=new c.Dataset({id:a});$.when(d.fetch()).then(function(){var a={title:d.get("name")},e=_.find(["tabular","interval"],function(a){return-1!==d.get("data_type").indexOf(a)});if(e){var f=new c.TabularDataset(d.toJSON());_.extend(a,{type:"other",content:function(a){c.createTabularDatasetChunkedView({model:f,parent_elt:a,embedded:!0,height:"100%"})}})}else _.extend(a,{type:"url",content:galaxy_config.root+"datasets/"+d.id+"/display/?preview=True"});b.add(a)})})},add_trackster_viz:function(a){var b=this;require(["viz/visualization","viz/trackster"],function(c,d){var e=new c.Visualization({id:a});$.when(e.fetch()).then(function(){var a=new d.TracksterUI(galaxy_config.root),c={title:e.get("name"),type:"other",content:function(b){var c={container:b,name:e.get("title"),id:e.id,dbkey:e.get("dbkey"),stand_alone:!1},d=e.get("latest_revision"),f=d.config.view.drawables;_.each(f,function(a){a.dataset={hda_ldda:a.hda_ldda,id:a.dataset_id}}),view=a.create_visualization(c,d.config.viewport,d.config.view.drawables,d.config.bookmarks,!1)}};b.add(c)})})},add:function(a){if("_blank"==a.target)return void window.open(a.content);if("_top"==a.target||"_parent"==a.target||"_self"==a.target)return void(window.location=a.content);if(this.active)this.frames.add(a);else{var b=$(window.parent.document).find("#galaxy_main");if("galaxy_main"==a.target||"center"==a.target)if(0===b.length){var c=a.content;c+=-1==c.indexOf("?")?"?":"&",c+="use_panels=True",window.location=c}else b.attr("src",a.content);else window.location=a.content}},_activate:function(){this.active?(this.active=!1,this.button_active.untoggle(),this.frames.hide()):(this.active=!0,this.button_active.toggle())},_refresh:function(){this.button_load.number(this.frames.length()),0===this.frames.length()?this.button_load.hide():this.button_load.show(),this.frames.visible?this.button_load.toggle():this.button_load.untoggle()}}),c=Backbone.View.extend({options:{id:"",icon:"fa-cog",tooltip:"",with_number:!1,onclick:function(){alert("clicked")},onunload:null,visible:!0},location:"iconbar",initialize:function(a){a&&(this.options=_.defaults(a,this.options)),this.setElement($(this._template(this.options)));var b=this;$(this.el).find(".icon").tooltip({title:this.options.tooltip,placement:"bottom"}).on("mouseup",b.options.onclick),this.options.visible||this.hide()},show:function(){$(this.el).css({visibility:"visible"})},hide:function(){$(this.el).css({visibility:"hidden"})},icon:function(a){$(this.el).find(".icon").removeClass(this.options.icon).addClass(a),this.options.icon=a},toggle:function(){$(this.el).addClass("toggle")},untoggle:function(){$(this.el).removeClass("toggle")},number:function(a){$(this.el).find(".number").text(a)},_template:function(a){var b='<div id="'+a.id+'" class="symbol"><div class="icon fa fa-2x '+a.icon+'"></div>';return a.with_number&&(b+='<div class="number"></div>'),b+="</div>"}});return{GalaxyFrame:b,GalaxyMastheadIcon:c}});
//# sourceMappingURL=../../maps/layout/scratchbook.js.map