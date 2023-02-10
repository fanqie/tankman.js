const Facades = require("../Facades");
const LoadConfiguration = require("./LoadConfigration");
const LoadEnvironmentVariables = require("./LoadEnvironmentVariables")
module.exports = class Environment {
    _Envs = {}
    _Config = {}

    constructor() {
    }

    AllConfig() {
        return this._Config
    }

    AllEnv(name) {
        return this._Envs
    }

    Config(name, v) {
        if (v) {
            this._SetConfig(name, v)
        }
        return this._GetConfig(name)
    }

    _GetConfig(name) {
        return this._Config[name] || null
    }

    _SetConfig(name, v) {
        this._Config[name] = v
    }

    AllEnv(name, v) {
        return this._Envs
    }

    _GetEnv(name) {
        return this._Envs[name] || null
    }

    _SetEnv(name, v) {
        this._Envs[name] = v
    }

    LoadEnv() {
        //Load Environment Variables
        const envs = LoadEnvironmentVariables.Load(Facades.ProcessInfo.Flags.get("--ENV"))
        this._Envs = {...this._Envs, ...envs}

    }

    LoadConfig() {
        const Config = LoadConfiguration.Load(Facades.ProcessInfo.Flags.get("--ConfigDir"))
        this._Config = {...this._Config, ...Config}
    }


}


