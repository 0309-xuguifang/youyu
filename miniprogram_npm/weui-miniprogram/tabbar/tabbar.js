var globalThis=this,self=this;module.exports=require("../_commons/0.js")([{ids:[20],modules:{10:function(t,e,s){t.exports=s(109)},109:function(t,e){Component({options:{addGlobalClass:!0},properties:{extClass:{type:String,value:""},list:{type:Array,value:[]},current:{type:Number,value:0}},methods:{tabChange:function(t){var e=t.currentTarget.dataset.index;e!==this.data.current&&(this.setData({current:e}),this.triggerEvent("change",{index:e,item:this.data.list[e]}))}}})}},entries:[[10,0]]}]);