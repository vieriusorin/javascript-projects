const browsersync = require('browser-sync');

const config = [
	devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),

    src = 'src/',
    dest = 'dist/',

    html = {
        in: src + '*.html',
        watch: [src + '*.html'],
        out: dest,
        context: {
            devBuild: devBuild
        }
    },

    images = {
        in: src + 'images/*.*',
        out: dest + 'images/'
    },

    imguri = { in : src + 'images/inline/*',
        out: src + 'assets/sass/images/',
        filename: '_datauri.scss',
        namespace: 'icn'
    },

    css = { 
        in : src + 'assets/sass/main.scss',
        watch: [src + 'assets/sass/**/*', '!' + imguri.out + imguri.filename],
        out: dest + 'assets/stylesheets/',
        sassOpts: {
            outputStyle: 'nested',
            imagePath: '../../../images',
            precision: 3,
            errLogToConsole: true
        },
        pleeeaseOpts: {
            autoprefixer: { browsers: ['last 2 versions', '> 2%'] },
            rem: ['16px'],
            pseudoElements: true,
            mqpacker: true
            // minifier: !devBuild
        }
    },

    fonts = { 
        in : src + 'assets/fonts/*.*',
        out: dest + 'assets/fonts/',
    },

    js = { 
        in : [src + 'assets/scripts/**/*.js', src + 'assets/vendors/**/*.js'],
        out: dest + 'assets/scripts/',
        filename: 'main.js'
    },

    sasslint = {
        in: [ src + 'assets/sass/**/*.{sass,scss}'],
        options: {
          bundleExec: true
        }
    },

    syncOpts = {
        server: {
            baseDir: dest,
            index: 'index.html'
        },
        open: 'external',
        notify: false,
        //browser: ['google chrome', 'firefox', 'safari'],
        injectChanges: true
    }
];