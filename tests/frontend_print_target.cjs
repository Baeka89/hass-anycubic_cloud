/* Test actual print-controller callbacks without a browser or HA services. */
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),Module=require('node:module');
const root=path.resolve(__dirname,'../custom_components/anycubic_cloud/frontend_panel');
const ts=require(path.join(root,'node_modules/typescript'));
const originalLoad=Module._load;
class LitAdapter {willUpdate(){}}
Module._load=function(name,parent,isMain){
 if(name==='lit')return{LitElement:LitAdapter,css:()=>'',html:()=>'',nothing:null};
 if(name==='lit/decorators.js')return{property:()=>()=>{},state:()=>()=>{}};
 if(name==='@mdi/js')return{mdiPlay:''};
 if(name==='./styles')return{commonPrintStyle:''};
 if(name==='../../../localize/localize')return{localize:key=>key};
 if(name==='../../fire_haptic')return{fireHaptic:()=>{}};
 if(name==='../../load-ha-elements')return{loadHaServiceControl:async()=>{}};
 return originalLoad.call(this,name,parent,isMain);
};
require.extensions['.ts']=(module,file)=>module._compile(ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.CommonJS,experimentalDecorators:true,useDefineForClassFields:false}}).outputText,file);
const {AnycubicViewPrintBase}=require(path.join(root,'src/views/print/view-print-base.ts'));
Module._load=originalLoad;
(async()=>{
 const view=new AnycubicViewPrintBase();const calls=[];let release;
 view._serviceName='print_and_upload_no_cloud_save';
 view.hass={callService:(domain,service,data)=>{calls.push({domain,service,data});return new Promise(r=>{release=r;});}};
 const event={stopPropagation(){},currentTarget:{actionSuccess(){},actionError(){}}};
 view.selectedPrinterID='A';view.selectedPrinterDevice={id:'A',primary_config_entry:'account'};
 view.willUpdate(new Map([['selectedPrinterDevice',undefined]]));
 view._scriptDataChanged({detail:{value:{data:{uploaded_gcode_file:'offline'}}}});
 view.selectedPrinterID='missing';view.selectedPrinterDevice=undefined;
 view.willUpdate(new Map([['selectedPrinterID','A'],['selectedPrinterDevice',{}]]));
 assert.equal(view._scriptData.data.device_id,undefined);view._runScript(event);assert.equal(calls.length,0);
 view._scriptDataChanged({detail:{value:{data:{device_id:'A',printer_id:7,config_entry:'old'}}}});
 view._runScript(event);assert.equal(calls.length,0);assert.equal(view._scriptData.data.device_id,undefined);
 view.selectedPrinterID='B';view.selectedPrinterDevice={id:'B',primary_config_entry:'account'};
 view.willUpdate(new Map([['selectedPrinterDevice',undefined]]));
 view._scriptDataChanged({detail:{value:{data:{device_id:'A',printer_id:7,config_entry:'old',uploaded_gcode_file:'offline'}}}});
 view._runScript(event);view._runScript(event);assert.equal(calls.length,1);
 assert.equal(calls[0].data.device_id,'B');assert.equal(calls[0].data.config_entry,'account');assert.equal('printer_id' in calls[0].data,false);
 release();await Promise.resolve();await Promise.resolve();assert.equal(view._buttonProgress,false);
 console.log('Actual print callbacks passed: invalid target, stale form data, valid switch, duplicate clicks and completion');
})().catch(e=>{console.error(e);process.exitCode=1;});
