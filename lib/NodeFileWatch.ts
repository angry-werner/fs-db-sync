import * as Fs from 'fs';

export class NodeFileWatch {
    public static main() : void {
        const fileNames : string[] = [];
        Fs.watch('/home/kow/test', {}, (eventType: string, fileName: string) => {
            if(fileName && fileNames.indexOf(fileName) === -1) {
                if (fileNames.length === 1000) {
                    fileNames.pop();
                }
                fileNames.unshift(fileName);
                console.log(fileName + ', did ' + eventType);
            }
        })
    }
}

NodeFileWatch.main();