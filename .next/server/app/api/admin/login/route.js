/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/admin/login/route";
exports.ids = ["app/api/admin/login/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_a_gemini_antigravity_scratch_paju_printing_center_src_app_api_admin_login_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./src/app/api/admin/login/route.ts */ \"(rsc)/./src/app/api/admin/login/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/admin/login/route\",\n        pathname: \"/api/admin/login\",\n        filename: \"route\",\n        bundlePath: \"app/api/admin/login/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\a\\\\.gemini\\\\antigravity\\\\scratch\\\\paju-printing-center\\\\src\\\\app\\\\api\\\\admin\\\\login\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_a_gemini_antigravity_scratch_paju_printing_center_src_app_api_admin_login_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZG1pbiUyRmxvZ2luJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhZG1pbiUyRmxvZ2luJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYWRtaW4lMkZsb2dpbiUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNhJTVDLmdlbWluaSU1Q2FudGlncmF2aXR5JTVDc2NyYXRjaCU1Q3BhanUtcHJpbnRpbmctY2VudGVyJTVDc3JjJTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1DJTNBJTVDVXNlcnMlNUNhJTVDLmdlbWluaSU1Q2FudGlncmF2aXR5JTVDc2NyYXRjaCU1Q3BhanUtcHJpbnRpbmctY2VudGVyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUN3RDtBQUNySTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcVXNlcnNcXFxcYVxcXFwuZ2VtaW5pXFxcXGFudGlncmF2aXR5XFxcXHNjcmF0Y2hcXFxccGFqdS1wcmludGluZy1jZW50ZXJcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcbG9naW5cXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FkbWluL2xvZ2luL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWRtaW4vbG9naW5cIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2FkbWluL2xvZ2luL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcVXNlcnNcXFxcYVxcXFwuZ2VtaW5pXFxcXGFudGlncmF2aXR5XFxcXHNjcmF0Y2hcXFxccGFqdS1wcmludGluZy1jZW50ZXJcXFxcc3JjXFxcXGFwcFxcXFxhcGlcXFxcYWRtaW5cXFxcbG9naW5cXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./src/app/api/admin/login/route.ts":
/*!******************************************!*\
  !*** ./src/app/api/admin/login/route.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   DELETE: () => (/* binding */ DELETE),\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./src/lib/auth.ts\");\n\n\nasync function POST(request) {\n    try {\n        const { password } = await request.json();\n        const success = await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.loginAdmin)(password);\n        if (success) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                success: true\n            });\n        } else {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: 'Invalid password'\n            }, {\n                status: 401\n            });\n        }\n    } catch (error) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: 'Server error'\n        }, {\n            status: 500\n        });\n    }\n}\nasync function DELETE() {\n    await (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.logoutAdmin)();\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n        success: true\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvYXBwL2FwaS9hZG1pbi9sb2dpbi9yb3V0ZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQTJDO0FBQ1U7QUFFOUMsZUFBZUcsS0FBS0MsT0FBZ0I7SUFDekMsSUFBSTtRQUNGLE1BQU0sRUFBRUMsUUFBUSxFQUFFLEdBQUcsTUFBTUQsUUFBUUUsSUFBSTtRQUN2QyxNQUFNQyxVQUFVLE1BQU1OLHFEQUFVQSxDQUFDSTtRQUVqQyxJQUFJRSxTQUFTO1lBQ1gsT0FBT1AscURBQVlBLENBQUNNLElBQUksQ0FBQztnQkFBRUMsU0FBUztZQUFLO1FBQzNDLE9BQU87WUFDTCxPQUFPUCxxREFBWUEsQ0FBQ00sSUFBSSxDQUFDO2dCQUFFRSxPQUFPO1lBQW1CLEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUN4RTtJQUNGLEVBQUUsT0FBT0QsT0FBTztRQUNkLE9BQU9SLHFEQUFZQSxDQUFDTSxJQUFJLENBQUM7WUFBRUUsT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BFO0FBQ0Y7QUFFTyxlQUFlQztJQUNwQixNQUFNUixzREFBV0E7SUFDakIsT0FBT0YscURBQVlBLENBQUNNLElBQUksQ0FBQztRQUFFQyxTQUFTO0lBQUs7QUFDM0MiLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcYVxcLmdlbWluaVxcYW50aWdyYXZpdHlcXHNjcmF0Y2hcXHBhanUtcHJpbnRpbmctY2VudGVyXFxzcmNcXGFwcFxcYXBpXFxhZG1pblxcbG9naW5cXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCB7IGxvZ2luQWRtaW4sIGxvZ291dEFkbWluIH0gZnJvbSAnQC9saWIvYXV0aCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCB7IHBhc3N3b3JkIH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKTtcbiAgICBjb25zdCBzdWNjZXNzID0gYXdhaXQgbG9naW5BZG1pbihwYXNzd29yZCk7XG4gICAgXG4gICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiAnSW52YWxpZCBwYXNzd29yZCcgfSwgeyBzdGF0dXM6IDQwMSB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6ICdTZXJ2ZXIgZXJyb3InIH0sIHsgc3RhdHVzOiA1MDAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIERFTEVURSgpIHtcbiAgYXdhaXQgbG9nb3V0QWRtaW4oKTtcbiAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc3VjY2VzczogdHJ1ZSB9KTtcbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJsb2dpbkFkbWluIiwibG9nb3V0QWRtaW4iLCJQT1NUIiwicmVxdWVzdCIsInBhc3N3b3JkIiwianNvbiIsInN1Y2Nlc3MiLCJlcnJvciIsInN0YXR1cyIsIkRFTEVURSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./src/app/api/admin/login/route.ts\n");

/***/ }),

/***/ "(rsc)/./src/lib/auth.ts":
/*!*************************!*\
  !*** ./src/lib/auth.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   isAuthenticated: () => (/* binding */ isAuthenticated),\n/* harmony export */   loginAdmin: () => (/* binding */ loginAdmin),\n/* harmony export */   logoutAdmin: () => (/* binding */ logoutAdmin)\n/* harmony export */ });\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/webapi/jwt/sign.js\");\n/* harmony import */ var jose__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jose */ \"(rsc)/./node_modules/jose/dist/webapi/jwt/verify.js\");\n\n\nconst JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_JWT_SECRET || 'paju-printing-center-secret-key-2024');\nasync function loginAdmin(password) {\n    const adminPassword = process.env.ADMIN_PASSWORD || 'admin1234'; // Default for dev\n    if (password === adminPassword) {\n        const token = await new jose__WEBPACK_IMPORTED_MODULE_1__.SignJWT({\n            role: 'admin'\n        }).setProtectedHeader({\n            alg: 'HS256'\n        }).setIssuedAt().setExpirationTime('2h') // Session expires in 2 hours\n        .sign(JWT_SECRET);\n        (await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)()).set('admin_token', token, {\n            httpOnly: true,\n            secure: \"development\" === 'production',\n            sameSite: 'lax',\n            path: '/'\n        });\n        return true;\n    }\n    return false;\n}\nasync function logoutAdmin() {\n    (await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)()).delete('admin_token');\n}\nasync function isAuthenticated() {\n    const token = (await (0,next_headers__WEBPACK_IMPORTED_MODULE_0__.cookies)()).get('admin_token')?.value;\n    if (!token) return false;\n    try {\n        await (0,jose__WEBPACK_IMPORTED_MODULE_2__.jwtVerify)(token, JWT_SECRET);\n        return true;\n    } catch (error) {\n        return false;\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9zcmMvbGliL2F1dGgudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXVDO0FBQ0c7QUFFMUMsTUFBTUcsYUFBYSxJQUFJQyxjQUFjQyxNQUFNLENBQ3pDQyxRQUFRQyxHQUFHLENBQUNDLGdCQUFnQixJQUFJO0FBRzNCLGVBQWVDLFdBQVdDLFFBQWdCO0lBQy9DLE1BQU1DLGdCQUFnQkwsUUFBUUMsR0FBRyxDQUFDSyxjQUFjLElBQUksYUFBYSxrQkFBa0I7SUFFbkYsSUFBSUYsYUFBYUMsZUFBZTtRQUM5QixNQUFNRSxRQUFRLE1BQU0sSUFBSVoseUNBQU9BLENBQUM7WUFBRWEsTUFBTTtRQUFRLEdBQzdDQyxrQkFBa0IsQ0FBQztZQUFFQyxLQUFLO1FBQVEsR0FDbENDLFdBQVcsR0FDWEMsaUJBQWlCLENBQUMsTUFBTSw2QkFBNkI7U0FDckRDLElBQUksQ0FBQ2hCO1FBRVAsT0FBTUgscURBQU9BLEVBQUMsRUFBR29CLEdBQUcsQ0FBQyxlQUFlUCxPQUFPO1lBQzFDUSxVQUFVO1lBQ1ZDLFFBQVFoQixrQkFBeUI7WUFDakNpQixVQUFVO1lBQ1ZDLE1BQU07UUFDUjtRQUNBLE9BQU87SUFDVDtJQUNBLE9BQU87QUFDVDtBQUVPLGVBQWVDO0lBQ25CLE9BQU16QixxREFBT0EsRUFBQyxFQUFHMEIsTUFBTSxDQUFDO0FBQzNCO0FBRU8sZUFBZUM7SUFDcEIsTUFBTWQsUUFBUSxDQUFDLE1BQU1iLHFEQUFPQSxFQUFDLEVBQUc0QixHQUFHLENBQUMsZ0JBQWdCQztJQUNwRCxJQUFJLENBQUNoQixPQUFPLE9BQU87SUFFbkIsSUFBSTtRQUNGLE1BQU1YLCtDQUFTQSxDQUFDVyxPQUFPVjtRQUN2QixPQUFPO0lBQ1QsRUFBRSxPQUFPMkIsT0FBTztRQUNkLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJDOlxcVXNlcnNcXGFcXC5nZW1pbmlcXGFudGlncmF2aXR5XFxzY3JhdGNoXFxwYWp1LXByaW50aW5nLWNlbnRlclxcc3JjXFxsaWJcXGF1dGgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29va2llcyB9IGZyb20gJ25leHQvaGVhZGVycyc7XG5pbXBvcnQgeyBTaWduSldULCBqd3RWZXJpZnkgfSBmcm9tICdqb3NlJztcblxuY29uc3QgSldUX1NFQ1JFVCA9IG5ldyBUZXh0RW5jb2RlcigpLmVuY29kZShcbiAgcHJvY2Vzcy5lbnYuQURNSU5fSldUX1NFQ1JFVCB8fCAncGFqdS1wcmludGluZy1jZW50ZXItc2VjcmV0LWtleS0yMDI0J1xuKTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvZ2luQWRtaW4ocGFzc3dvcmQ6IHN0cmluZykge1xuICBjb25zdCBhZG1pblBhc3N3b3JkID0gcHJvY2Vzcy5lbnYuQURNSU5fUEFTU1dPUkQgfHwgJ2FkbWluMTIzNCc7IC8vIERlZmF1bHQgZm9yIGRldlxuICBcbiAgaWYgKHBhc3N3b3JkID09PSBhZG1pblBhc3N3b3JkKSB7XG4gICAgY29uc3QgdG9rZW4gPSBhd2FpdCBuZXcgU2lnbkpXVCh7IHJvbGU6ICdhZG1pbicgfSlcbiAgICAgIC5zZXRQcm90ZWN0ZWRIZWFkZXIoeyBhbGc6ICdIUzI1NicgfSlcbiAgICAgIC5zZXRJc3N1ZWRBdCgpXG4gICAgICAuc2V0RXhwaXJhdGlvblRpbWUoJzJoJykgLy8gU2Vzc2lvbiBleHBpcmVzIGluIDIgaG91cnNcbiAgICAgIC5zaWduKEpXVF9TRUNSRVQpO1xuICAgIFxuICAgIChhd2FpdCBjb29raWVzKCkpLnNldCgnYWRtaW5fdG9rZW4nLCB0b2tlbiwge1xuICAgICAgaHR0cE9ubHk6IHRydWUsXG4gICAgICBzZWN1cmU6IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicsXG4gICAgICBzYW1lU2l0ZTogJ2xheCcsXG4gICAgICBwYXRoOiAnLycsXG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9nb3V0QWRtaW4oKSB7XG4gIChhd2FpdCBjb29raWVzKCkpLmRlbGV0ZSgnYWRtaW5fdG9rZW4nKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGlzQXV0aGVudGljYXRlZCgpIHtcbiAgY29uc3QgdG9rZW4gPSAoYXdhaXQgY29va2llcygpKS5nZXQoJ2FkbWluX3Rva2VuJyk/LnZhbHVlO1xuICBpZiAoIXRva2VuKSByZXR1cm4gZmFsc2U7XG4gIFxuICB0cnkge1xuICAgIGF3YWl0IGp3dFZlcmlmeSh0b2tlbiwgSldUX1NFQ1JFVCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXSwibmFtZXMiOlsiY29va2llcyIsIlNpZ25KV1QiLCJqd3RWZXJpZnkiLCJKV1RfU0VDUkVUIiwiVGV4dEVuY29kZXIiLCJlbmNvZGUiLCJwcm9jZXNzIiwiZW52IiwiQURNSU5fSldUX1NFQ1JFVCIsImxvZ2luQWRtaW4iLCJwYXNzd29yZCIsImFkbWluUGFzc3dvcmQiLCJBRE1JTl9QQVNTV09SRCIsInRva2VuIiwicm9sZSIsInNldFByb3RlY3RlZEhlYWRlciIsImFsZyIsInNldElzc3VlZEF0Iiwic2V0RXhwaXJhdGlvblRpbWUiLCJzaWduIiwic2V0IiwiaHR0cE9ubHkiLCJzZWN1cmUiLCJzYW1lU2l0ZSIsInBhdGgiLCJsb2dvdXRBZG1pbiIsImRlbGV0ZSIsImlzQXV0aGVudGljYXRlZCIsImdldCIsInZhbHVlIiwiZXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./src/lib/auth.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/jose"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fadmin%2Flogin%2Froute&page=%2Fapi%2Fadmin%2Flogin%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fadmin%2Flogin%2Froute.ts&appDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center%5Csrc%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Ca%5C.gemini%5Cantigravity%5Cscratch%5Cpaju-printing-center&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();