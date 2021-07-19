import tl = require('azure-pipelines-task-lib/task');
import trm = require('azure-pipelines-task-lib/toolrunner');
import sam = require('samchon-framework');
import fs = require('fs');
import { isNullOrUndefined } from 'util';

const VERSION_NAME: string = 'VERSION_NAME';
const VERSION_CODE: string = 'VERSION_CODE';

async function run() {
    try {
        let tool: trm.ToolRunner;

        let sourcePath: string = tl.getInput("pathToAndroidManifest");

        // requires parameters
        if(isNullOrUndefined(sourcePath))
        {
            throw new Error("[!] Missing required input: pathToAndroidManifest");
        }
        else{
            console.log('Android manifest: ' + sourcePath);
        }

        if (!fs.existsSync(sourcePath)) {
            tl.error(`The file path for the AndroidManifest.xml does not exist or is not found: ${sourcePath}`);
            process.exit(1);
        }

        tl.debug(`Running task with ${sourcePath}`);

        let xmlString: string = fs.readFileSync(sourcePath, 'utf8');
        let xml: sam.library.XML = new sam.library.XML(xmlString);

        console.log("Has versionName: "+ xml.hasProperty("android:versionName") ); // true
        let versionName = xml.getProperty("android:versionName");
        console.log("versionName: " +  versionName);
        tl.debug(`versionName: ${versionName}`);

        console.log("Has versionCode: "+ xml.hasProperty("android:versionCode") ); // true
        let versionCode = xml.getProperty("android:versionCode");
        console.log("versionCode: " +  versionCode);
        tl.debug(`versionCode: ${versionCode}`);

        tl.setVariable(VERSION_NAME, versionName);
        tl.setVariable(VERSION_CODE, versionCode);

        tl.debug(`Version name:` + tl.getVariable(VERSION_NAME));
        tl.debug(`Version code:` + tl.getVariable(VERSION_CODE));

        console.log(`Successfully extracted versionCode: `+ tl.getVariable(VERSION_CODE)+ ` and versionName: ` + tl.getVariable(VERSION_NAME));
        tl.setResult(tl.TaskResult.Succeeded, `Successfully extracted versionCode: `+ tl.getVariable(VERSION_CODE)+ ` and versionName: ` + tl.getVariable(VERSION_NAME));
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();