import * as Watch from 'watch';
import * as Fs from 'fs';
import {Stats} from 'fs';
import BeeQueue = require("bee-queue");

export class WatchFileWatch {
    private static readonly MAX_ENTRIES = 10000;
    private static readonly ROOT = '/home/kow/test';
    private static readonly DONE = '/home/kow/done';
    private static fileNames : string[] = [];
    private static readonly queue = new BeeQueue('file-queue', {redis: {host: 'louie'}});

    public static main() : void {
        new WatchFileWatch().doIt();
    }

    private doIt() : void {
        Watch.watchTree(WatchFileWatch.ROOT, this.handleEvent);
        WatchFileWatch.queue.process<string>((job, done) => {
            console.log('Processing: ' + job.data);
            Fs.rename(job.data, WatchFileWatch.DONE + job.data.slice(WatchFileWatch.ROOT.length), (anError) => {
                if (anError) console.log('In error: ' + anError)
            });
            done(null, job.data);
        });
    }

    private handleEvent(file : any, current : Stats, previous : Stats) : void {
        const keys : string[] = Object.keys(file);
        if ((keys.length > 1) && (typeof file !== 'string')) {
            for (let fileName of keys) {
                const aFile: Stats = file[fileName] as Stats;
                if (aFile.isFile()) {
                    WatchFileWatch.handleSingleEvent(fileName, current, previous);
                }
            }
        } else if (keys.length === 1) {
            // This is the initial directory
        } else {
            WatchFileWatch.handleSingleEvent(file as string, current, previous);
        }
    }

    private static handleSingleEvent(fileName : string, current : Stats, previous : Stats) : void {
        if(previous === null && WatchFileWatch.fileNames.indexOf(fileName) === -1) {
            WatchFileWatch.fileNames.unshift(fileName);
            if (WatchFileWatch.fileNames.length > WatchFileWatch.MAX_ENTRIES) {
                WatchFileWatch.fileNames.pop();
            }
            console.log('Got new file: ' + fileName);
            const job : BeeQueue.Job = WatchFileWatch.queue.createJob(fileName);
            job.setId(fileName).save();
        }
    }
}

WatchFileWatch.main();
