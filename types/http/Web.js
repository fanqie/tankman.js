// @ts-nocheck
const Koa = require("koa");
const os = require("os");
const cluster = require("cluster");
const Facades = require("../facades/Facades");
// const helmet = require("helmet");
const { koaBody } = require('koa-body');
const path = require("path");
const fs = require("fs");
const cors = require('@koa/cors');
module.exports = class Web extends Koa {
    constructor(options) {
        super(options);
        this.tempPath = path.join(process.cwd(), 'storage/.temp/');
    }
    Run(port, func, config) {
        const clusterConfig = config;
        if (cluster.isMaster && clusterConfig.enabled) {
            /**
             * Clusters of Tankman.js processes can be used to run multiple instances of http-server that can distribute workloads among their application threads.
             * The cluster module allows easy creation of child processes that all share server ports.
             */
            const cpuNums = os.cpus().length;
            const max = clusterConfig.process_max_count > cpuNums ? cpuNums : clusterConfig.process_max_count;
            for (let i = 0; i < max; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker) => {
                Facades.Log.WarnHttp(`worker ${worker.process.pid} died`);
            });
            Facades.Log.InfoHttp(`server run in port=${port}`);
            Facades.Log.InfoHttp(`web url=http://127.0.0.1:${port}`);
            Facades.Log.InfoHttp(`start worker count${max}`);
            if (!fs.existsSync(this.tempPath)) {
                fs.mkdirSync(this.tempPath);
            }
        }
        else {
            this.listen(port);
            this.use(koaBody({
                multipart: true,
                formidable: {
                    uploadDir: path.join(this.tempPath + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()),
                    keepExtensions: true,
                    maxFieldsSize: 2 * 1024 * 1024,
                    onError: (err) => {
                        console.log(err);
                    }
                }
            }));
            this.use(cors({}));
            this.on('error', err => {
                Facades.Log.ErrorHttp(`server error: ${err.message}`);
                console.error(err);
            });
            func(process.pid);
        }
    }
};
