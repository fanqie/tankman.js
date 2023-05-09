// @ts-nocheck
const Koa = require('koa2');
const os = require('os');

const cluster = require('cluster');
const Facades = require('../facades/Facades');
// const helmet = require("helmet");
const {koaBody} = require('koa-body');
const path = require('path');
const fs = require('fs');

class Web extends Koa {
    uploadPath = path.join(process.cwd(), 'storage/upload/');
    staticFolder;

    constructor(options) {
        super(options);
    }

    static(folder = './public') {
        this.staticFolder = path.isAbsolute(folder) ? folder : path.join(process.cwd(), folder || 'public');
    }

    /**
     * @param  {HttpContext} httpCtx
     * @return {boolean}
     */
    renderStatic(httpCtx) {
        if (httpCtx.request.getPathName() === '/') {
            return false;
        }
        const requestPath = path.join(this.staticFolder, httpCtx.request.getPathName());
        if (fs.existsSync(requestPath)) {
            httpCtx.response.writeStatic(requestPath);
            return true;
            // process.abort()
        }
        return false;
    }

    run(port, func, config) {
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
                Facades.log.warnHttp(`worker ${worker.process.pid} died`);
            });
            if(clusterConfig.enabled){
                this.printSuccess(port,max)
            }
            if (!fs.existsSync(this.uploadPath)) {
                fs.mkdirSync(this.uploadPath);
            }
        } else {
            this.listen(port);
            this.setBody();

            this.on('error', (err) => {
                Facades.log.errorHttp(`server error: ${err.message}`);
                console.error(err);
            });
            func(process.pid);
            if(!clusterConfig.enabled){
                this.printSuccess(port)
            }

        }
    }

    printSuccess(port, max = 1) {
        Facades.log.infoHttp(`server run in port=${port}`);
        Facades.log.infoHttp(`web url=http://127.0.0.1:${port}`);
        if(max>1){
            Facades.log.infoHttp(`start worker count：${max}`);
        }
    }

    setBody() {
        const toadyName = new Date().getFullYear() + '' + (new Date().getMonth() + 1) + new Date().getDate();
        const historyList = fs.readdirSync(this.uploadPath);
        let i = 0;
        while (i < historyList.length) {
            if (historyList[i] < toadyName) {
                fs.rmSync(path.join(this.uploadPath + historyList[i]), {recursive: true});
            }
            i++;
            break;
        }
        const uploadDir = path.join(this.uploadPath + toadyName);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, {recursive: true});
        }

        this.use(koaBody({
            multipart: true,
            formidable: {
                uploadDir: uploadDir, // 存储路径
                keepExtensions: true,
                maxFieldsSize: 2 * 1024 * 1024,
                onError: (err) => {
                    console.log(err);
                },
            },
        }));
    }
}

module.exports = Web;
