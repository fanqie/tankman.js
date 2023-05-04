const Facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
// const TemplateEngineAbstract = require('../template/TemplateEngineAbstract');
const ArtTemplate = require('../template/ArtTemplate');
const PugTemplate = require('../template/PugTemplate');

class ViewProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        const config = Facades.config.get("view")
        switch (config?.default) {
            case 'art': {
                Facades.view = new ArtTemplate();
                break;
            }
            case 'pug': {
                Facades.view = new PugTemplate();
                break;
            }
            default: {
                Facades.view = new ArtTemplate();
                break;
            }
        }
        Facades.view?.setTemplateDir(config?.dir)
        Facades.view?.setSuffix(config?.suffix)

    }

    /**
     *
     */
    boot() {
    }
}

module.exports = ViewProvider;
