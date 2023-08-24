const Facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const ArtTemplate = require('../template/ArtTemplate');

class ViewProvider extends ServiceProvider {

    register() {
        const config = Facades.config.get("view")
        if (config?.handler) {
            Facades.view = new config.handler();   //auto throw exception when instance fail
        } else {
            Facades.view = new ArtTemplate();
        }
        Facades.view?.setTemplateDir(config?.dir)
        Facades.view?.setEnableFileCache(config?.cache?.enable || false)
        Facades.view?.setMaxLife(config?.cache?.maxLife || '1h')
    }

    /**
     *
     */
    boot() {
        Facades.view.init()
    }
}

module.exports = ViewProvider;
