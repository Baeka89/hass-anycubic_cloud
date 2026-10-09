const path=require('node:path'),assert=require('node:assert/strict');
const {chromium}=require(process.env.ANYCUBIC_PLAYWRIGHT||'playwright');
(async()=>{
 const browser=await chromium.launch({headless:true});
 try{
  const page=await browser.newPage();await page.setContent('<main></main>');
  await page.evaluate(()=>{
   customElements.define('ha-service-control',class extends HTMLElement{});
   customElements.define('ha-progress-button',class extends HTMLElement{actionSuccess(){}actionError(){}});
  });
  await page.addScriptTag({path:path.resolve(__dirname,'../custom_components/anycubic_cloud/frontend_panel/dist/anycubic-cloud-panel.js')});
  const result=await page.evaluate(async()=>{
   const calls=[];let release;
   const devices=Object.fromEntries(['A','B'].map(id=>[id,{id,manufacturer:'Anycubic',model:'Kobra 2',name:`Printer ${id}`,primary_config_entry:'account',connections:[],identifiers:[],serial_number:id==='A'?'7':'8'}]));
   const h={language:'en',config:{time_zone:'UTC'},devices,entities:{},states:{},services:{},localize:k=>k,
    callService:(domain,service,data)=>{calls.push({domain,service,data:{...data}});return new Promise(r=>{release=r;});}};
   const panel=document.createElement('anycubic-cloud-panel');Object.assign(panel,{hass:h,route:{prefix:'/anycubic-cloud',path:'/A/print-no_cloud_save'},panel:{config:{}},narrow:false});
   document.querySelector('main').append(panel);
   const view=async()=>{await panel.updateComplete;await panel.updateComplete;const e=panel.shadowRoot.querySelector('anycubic-view-print-no_cloud_save');await e.updateComplete;await e.updateComplete;return e;};
   const first=await view();
   first._scriptDataChanged({detail:{value:{data:{device_id:'A',config_entry:'account',uploaded_gcode_file:'offline'}}}});
   panel.route={prefix:'/anycubic-cloud',path:'/missing/print-no_cloud_save'};
   const invalid=await view();invalid.shadowRoot.querySelector('ha-progress-button').click();await Promise.resolve();
   const blockedInitial=calls.length===0&&!invalid._scriptData.data.device_id;
   invalid._scriptDataChanged({detail:{value:{data:{device_id:'A',printer_id:7,config_entry:'old',uploaded_gcode_file:'offline'}}}});
   await invalid.updateComplete;invalid.shadowRoot.querySelector('ha-progress-button').click();await Promise.resolve();
   const blockedLate=calls.length===0&&!invalid._scriptData.data.device_id;
   panel.route={prefix:'/anycubic-cloud',path:'/B/print-no_cloud_save'};const valid=await view();
   valid._scriptDataChanged({detail:{value:{data:{device_id:'A',printer_id:7,config_entry:'old',uploaded_gcode_file:'offline'}}}});
   await valid.updateComplete;
   const button=valid.shadowRoot.querySelector('ha-progress-button');button.click();button.click();await Promise.resolve();
   const whilePending=calls.length;release();await Promise.resolve();await Promise.resolve();await valid.updateComplete;
   const progressCleared=valid._buttonProgress===false;
   panel.remove();return{blockedInitial,blockedLate,whilePending,progressCleared,calls};
  });
  assert.equal(result.blockedInitial,true);assert.equal(result.blockedLate,true);
  assert.equal(result.whilePending,1);assert.equal(result.progressCleared,true);
  assert.equal(result.calls[0].data.device_id,'B');assert.equal(result.calls[0].data.config_entry,'account');
  assert.equal('printer_id' in result.calls[0].data,false);
  console.log('Deep audit browser: invalid target, stale form events, valid switch and duplicate clicks passed');console.log(JSON.stringify(result));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
