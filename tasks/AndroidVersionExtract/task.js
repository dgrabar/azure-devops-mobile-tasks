"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var tl = require("azure-pipelines-task-lib/task");
var sam = require("samchon-framework");
var fs = require("fs");
var util_1 = require("util");
var VERSION_NAME = 'VERSION_NAME';
var VERSION_CODE = 'VERSION_CODE';
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var tool, sourcePath, xmlString, xml, versionName, versionCode;
        return __generator(this, function (_a) {
            try {
                tool = void 0;
                sourcePath = tl.getInput("pathToAndroidManifest");
                // requires parameters
                if (util_1.isNullOrUndefined(sourcePath)) {
                    throw new Error("[!] Missing required input: pathToAndroidManifest");
                }
                else {
                    console.log('Android manifest: ' + sourcePath);
                }
                if (!fs.existsSync(sourcePath)) {
                    tl.error("The file path for the AndroidManifest.xml does not exist or is not found: " + sourcePath);
                    process.exit(1);
                }
                tl.debug("Running task with " + sourcePath);
                xmlString = fs.readFileSync(sourcePath, 'utf8');
                xml = new sam.library.XML(xmlString);
                console.log("Has versionName: " + xml.hasProperty("android:versionName")); // true
                versionName = xml.getProperty("android:versionName");
                console.log("versionName: " + versionName);
                tl.debug("versionName: " + versionName);
                console.log("Has versionCode: " + xml.hasProperty("android:versionCode")); // true
                versionCode = xml.getProperty("android:versionCode");
                console.log("versionCode: " + versionCode);
                tl.debug("versionCode: " + versionCode);
                tl.setVariable(VERSION_NAME, versionName);
                tl.setVariable(VERSION_CODE, versionCode);
                tl.debug("Version name:" + tl.getVariable(VERSION_NAME));
                tl.debug("Version code:" + tl.getVariable(VERSION_CODE));
                console.log("Successfully extracted versionCode: " + tl.getVariable(VERSION_CODE) + " and versionName: " + tl.getVariable(VERSION_NAME));
                tl.setResult(tl.TaskResult.Succeeded, "Successfully extracted versionCode: " + tl.getVariable(VERSION_CODE) + " and versionName: " + tl.getVariable(VERSION_NAME));
            }
            catch (err) {
                tl.setResult(tl.TaskResult.Failed, err.message);
            }
            return [2 /*return*/];
        });
    });
}
run();
