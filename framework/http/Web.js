// @ts-nocheck
const Koa = require("koa")
const os = require("os");

const cluster = require("cluster");
const Facades = require("../facades/Facades");
module.exports = class Web extends Koa {
    constructor(options) {
        super(options);
    }

    Run(port, func) {
        const clusterConfig = Facades.Config.Get("cluster", {
            enabled: true,
            process_max_count: 128
        })
        if (cluster.isMaster && clusterConfig.enabled) {
            /**
             * Clusters of Tankman.js processes can be used to run multiple instances of http-server that can distribute workloads among their application threads.
             * The cluster module allows easy creation of child processes that all share server ports.
             */
            const cpuNums = os.cpus().length;
            const max = clusterConfig.process_max_count > cpuNums ? cpuNums : clusterConfig.process_max_count
            for (let i = 0; i < max; i++) {
                cluster.fork();
            }
            cluster.on('exit', (worker) => {
                Facades.Log.WarnHttp(`worker ${worker.process.pid} died`);
            });
            Facades.Log.InfoHttp(`server run in port=${port}`);
            Facades.Log.InfoHttp(`web url=http://127.0.0.1:${port}`);
            Facades.Log.InfoHttp(`start worker count${max}`)

        } else {

            this.listen(port);

            this.on('error', err => {
                Facades.Log.ErrorHttp(`server error: ${err.message}`);
                console.error(err)
            });
            func(process.pid)
        }

    }
}
