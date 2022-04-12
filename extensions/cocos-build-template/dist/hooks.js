"use strict";var __awaiter=this&&this.__awaiter||function(e,o,t,n){return new(t||(t=Promise))(function(s,r){function i(e){try{f(n.next(e))}catch(e){r(e)}}function a(e){try{f(n.throw(e))}catch(e){r(e)}}function f(e){var o;e.done?s(e.value):(o=e.value,o instanceof t?o:new t(function(e){e(o)})).then(i,a)}f((n=n.apply(e,o||[])).next())})};Object.defineProperty(exports,"__esModule",{value:!0}),exports.unload=exports.onAfterBuild=exports.onAfterCompressSettings=exports.onBeforeCompressSettings=exports.onBeforeBuild=exports.load=exports.throwError=void 0;const PACKAGE_NAME="cocos-build-template";function log(...e){return console.log(`[${PACKAGE_NAME}] `,...e)}let allAssets=[];function load(){return __awaiter(this,void 0,void 0,function*(){console.log(`[${PACKAGE_NAME}] Load cocos plugin example in builder.`),allAssets=yield Editor.Message.request("asset-db","query-assets")})}function onBeforeBuild(e){return __awaiter(this,void 0,void 0,function*(){log(`${PACKAGE_NAME}.webTestOption`,"onBeforeBuild")})}function onBeforeCompressSettings(e,o){return __awaiter(this,void 0,void 0,function*(){e.packages[PACKAGE_NAME].webTestOption&&console.debug("webTestOption",!0),console.debug("get settings test",o.settings)})}function onAfterCompressSettings(e,o){return __awaiter(this,void 0,void 0,function*(){console.log("webTestOption","onAfterCompressSettings")})}function onAfterBuild(e,o){return __awaiter(this,void 0,void 0,function*(){const e={spritFrameInAtlas:"e6051d21-3520-4f57-b64f-def4a253ea6d@f9941",image:"d0dfd703-d223-4042-9f5a-3ab00eaeee15",imageInAtlas:"e6051d21-3520-4f57-b64f-def4a253ea6d",spritAtlas:"8406879a-fc95-47ef-a774-342c5775b5c1",script:"e9bf6dd3-f2b4-499f-b791-37b7677ecaeb",ttf:"e54fdf85-29fd-43c6-a077-244e8fac5bb2",gltf:"84db66ec-643f-4e78-b06c-3af1ac7a4871",scene:"08488aea-19c5-45ad-8dda-b09d8fe70f4f"};for(const t of Object.keys(e)){const n=e[t];console.debug(`containsAsset of ${t}`,o.containsAsset(n)),console.debug(`getAssetPathInfo of ${t}`,o.getAssetPathInfo(n)),console.debug(`getRawAssetPaths of ${t}`,o.getRawAssetPaths(n)),console.debug(`getJsonPathInfo of ${t}`,o.getJsonPathInfo(n))}})}function unload(){console.log(`[${PACKAGE_NAME}] Unload cocos plugin example in builder.`)}exports.throwError=!0,exports.load=load,exports.onBeforeBuild=onBeforeBuild,exports.onBeforeCompressSettings=onBeforeCompressSettings,exports.onAfterCompressSettings=onAfterCompressSettings,exports.onAfterBuild=onAfterBuild,exports.unload=unload;