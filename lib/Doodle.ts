import * as Fs from 'fs';

export class Doodle {
    public static main() : void {
        Fs.watch('/home/kow/test', {}, (eventType: string, fileName: string) => {
            if(fileName) {
                console.log(fileName + ', did ' + eventType);
            }
        })
    }
}

Doodle.main();