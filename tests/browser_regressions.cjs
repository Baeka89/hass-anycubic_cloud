/* Run with ANYCUBIC_PLAYWRIGHT pointing to an installed Playwright module. */
const { chromium } = require(process.env.ANYCUBIC_PLAYWRIGHT || 'playwright');
const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '../custom_components/anycubic_cloud/frontend_panel');
(async () => {
  const browser = await chromium.launch({headless:true});
  try {
    const page = await browser.newPage({timezoneId:'Europe/Berlin'});
    const pageErrors=[];page.on('pageerror',error=>pageErrors.push(error.message));
    await page.setContent('<main id="test"></main>');
    await page.addScriptTag({path:path.join(root,'dist/anycubic-card.js')});
    await page.addScriptTag({path:path.join(root,'dist/anycubic-cloud-panel.js')});
    const result=await page.evaluate(async()=>{
      const calls=[];
      const hass={language:'de',config:{time_zone:'Europe/Berlin'},entities:{},states:{},devices:{},services:{},callService:async(...args)=>{calls.push(args);},localize:key=>key};
      const add=(tag,props)=>{const el=document.createElement(tag);Object.assign(el,props);document.querySelector('#test').append(el);return el;};
      const ent=(id,key,state,attributes={},device='fixture')=>{hass.entities[id]={entity_id:id,translation_key:key,device_id:device};hass.states[id]={entity_id:id,state,attributes};};
      ent('sensor.renamed_nozzle','curr_nozzle_temp','215',{unit_of_measurement:'°C'});
      ent('sensor.renamed_bed','curr_hotbed_temp','60',{unit_of_measurement:'°C'});
      const stats=add('anycubic-printercard-stats-component',{hass,language:'de',printerEntities:hass.entities,monitoredStats:['Hotend','Bed']});await stats.updateComplete;
      ent('sensor.renamed_spools','ace_spools','unavailable',{spool_info:null});
      const settings=add('anycubic-printercard-multicolorbox_modal_settings',{hass,language:'de',printerEntities:hass.entities});await settings.updateComplete;
      const secondaryId='sensor.renamed_secondary_spools';
      const h2={...hass,entities:{[secondaryId]:{entity_id:secondaryId,translation_key:'secondary_ace_spools',device_id:'ace2'}},states:{[secondaryId]:{state:'loaded',attributes:{spool_info:[{material_type:'PETG',color:[0,255,0],status:1,spool_loaded:true}]}}}};
      const card=add('anycubic-printercard-card',{hass:h2,language:'de',selectedPrinterID:'ace2',selectedPrinterDevice:{id:'ace2',name:'ACE 2',model:'ACE Pro Multi-Color Box',manufacturer:'Anycubic',primary_config_entry:'entry'},monitoredStats:[]});await card.updateComplete;
      const drying=card.shadowRoot.querySelector('anycubic-printercard-multicolorbox_modal_drying');
      const secondarySettings=card.shadowRoot.querySelector('anycubic-printercard-multicolorbox_modal_settings');await secondarySettings.updateComplete;
      const printer=add('anycubic-printercard-card',{hass:{...hass,entities:{},states:{}},language:'de',selectedPrinterID:'late',selectedPrinterDevice:{id:'late',name:'Printer',model:'Kobra 3',manufacturer:'Anycubic'},monitoredStats:[]});await printer.updateComplete;
      printer.hass={...hass,entities:{'sensor.late_job':{entity_id:'sensor.late_job',device_id:'late',translation_key:'job_state'}},states:{'sensor.late_job':{state:'printing',attributes:{}}}};await printer.updateComplete;
      ent('button.renamed_pause','print_pause','unknown');
      const printSettings=add('anycubic-printercard-printsettings_modal',{hass,language:'de',printerEntities:hass.entities});await printSettings.updateComplete;
      printSettings._pressHassButton('pause_print');await Promise.resolve();
      return {
        nozzle:stats._entHotendCurrent.state,bed:stats._entBedCurrent.state,
        emptySpools:settings.spoolList.length,
        dryingBox:drying.box_id,settingsBox:secondarySettings.box_id,
        secondaryMaterial:secondarySettings.spoolList[0]?.material_type,
        lateRegistryCount:Object.keys(printer.printerEntities).length,
        buttonCall:calls.at(-1),
        tagsRegistered:!!customElements.get('anycubic-card') && !!customElements.get('anycubic-cloud-panel'),
      };
    });
    assert.equal(result.nozzle,'215');assert.equal(result.bed,'60');
    assert.equal(result.emptySpools,0);assert.equal(result.dryingBox,1);assert.equal(result.settingsBox,1);
    assert.equal(result.secondaryMaterial,'PETG');assert.equal(result.lateRegistryCount,1);
    assert.deepEqual(result.buttonCall,['button','press',{entity_id:'button.renamed_pause'}]);
    assert.equal(result.tagsRegistered,true);assert.deepEqual(pageErrors,[]);
    console.log(JSON.stringify({status:'passed',result,pageErrors},null,2));
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exitCode=1;});
