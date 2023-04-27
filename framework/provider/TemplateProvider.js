const Facades = require('../facades/Facades');
const ServiceProvider = require('./ServiceProvider');
const TemplateEngineAbstract = require('../template/TemplateEngineAbstract');
const ArtTemplate = require('../template/ArtTemplate');
const PugTemplate = require('../template/PugTemplate');

class TemplateProvider extends ServiceProvider {
    /**
     *
     */
    register() {
        const config = Facades.config.get("templateEngine")
        switch (config?.default) {
            case 'art': {
                Facades.template = new ArtTemplate();
                break;
            }
            case 'pug': {
                Facades.template = new PugTemplate();
                break;
            }
            default: {
                Facades.template = new ArtTemplate();
                break;
            }
        }
        Facades.template?.setTemplateDir(config?.dir)
        Facades.template?.setSuffix(config?.suffix)

    }

    /**
     *
     */
    boot() {
    }
}

module.exports = TemplateProvider;
