const fs = require("fs");
const path = require('path');
const glob = require("glob");
const { validate } = require('schema-utils');

class UnusedModulesPlugin {
    static defaultOptions = {
        filePath: 'unused.json',
        pattern: '**/*.js',
        root: __dirname,
        ignore: ['docs/**', 'node_modules/**', '.idea/**', 'unused-modules-plugin.js', 'webpack.config.js']
    };

    #options = {};
    #files = [];
    #modules = [];

    constructor(options = {}) {
        this.validate(options);
        this.#options = Object.assign(this.constructor.defaultOptions, options);
    }

    validate(options) {
        const schema = {
            type: 'object',
            properties: {
                pattern: {
                    type: 'string',
                    description: 'Search mask'
                },
                ignore: {
                    type: 'array',
                    description: 'Ignore masks'
                },
                modulesSearchPath: {
                    type: 'string',
                    description: 'Path to search root'
                },
                filePath: {
                    type: 'string',
                    description: 'Path to output file'
                },
                root: {
                    type: 'string',
                    description: 'Path to project root'
                },
                enableLogs: {
                    type: 'boolean',
                    description: 'Enable logging to console'
                },
            },
        };
        return validate(schema, options, {
            name: this.constructor.name,
            baseDataPath: 'options',
        });
    }

    grabFiles(cb) {
        glob(this.#options.pattern, {
            ignore: this.#options.ignore,
            cwd: this.#options.modulesSearchPath,
            nodir: true,
            absolute: true
        }, function(er, files) {
            cb(er, files);
        });
    }

    writeFile() {
        const difference = JSON.stringify(this.#files.filter(module => !this.#modules.includes(module)).map(modulePath => path.relative(this.#options.root, modulePath)));
        fs.writeFile(this.#options.filePath, difference, (err) => {
            if (err) {
                throw err;
            }
            if (difference) {
                console.log('Unused modules saved to ' + this.#options.filePath);
            }
        });
    }

    apply(compiler) {
        compiler.hooks.beforeRun.tapAsync(
            this.constructor.name,
            (compilation, callback) => {
                if (this.#options.enableLogs) {
                    console.log('Gathering modules from FS...');
                }
                this.grabFiles((er, files) => {
                    if (er) {
                        console.error( er );
                    }
                    if (this.#options.enableLogs) {
                        console.log('Modules from FS', files);
                    }
                    this.#files = files;
                });
                callback();
            }
        );
        compiler.hooks.done.tap(
            this.constructor.name,
            (stats) => {
                this.#modules = Array.from(stats.compilation.modules).map((module)=>module.resourceResolveData?.path).filter((path) => {return !!path});
                if (this.#options.enableLogs) {
                    console.log('Modules used in bundle:', this.#modules);
                }
                this.writeFile();
            }
        );
    }
}

module.exports = UnusedModulesPlugin;