/// <binding AfterBuild='moveNpmToCss, moveNpmToLibs' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    uglify = require("gulp-uglify");

var paths = {
    webroot: "./wwwroot/"
};

paths.js = paths.webroot + "js/**/*.js";
paths.minJs = paths.webroot + "js/**/*.min.js";
paths.css = paths.webroot + "css/**/*.css";
paths.minCss = paths.webroot + "css/**/*.min.css";
paths.concatJsDest = paths.webroot + "js/site.min.js";
paths.concatCssDest = paths.webroot + "css/site.min.css";

gulp.task("clean:js", function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task("clean:css", function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task("clean", ["clean:js", "clean:css"]);

gulp.task("moveNpmToLibs", function(done) {
    gulp.src([
        "node_modules/angular2/bundles/js",
        "node_modules/angular2/bundles/angular2.*.js*",
        "node_modules/angular2/bundles/angular2-polyfills.js",
        "node_modules/angular2/bundles/http.*.js*",
        "node_modules/angular2/bundles/router.*.js*",
        "node_modules/es6-shim/es6-shim.min.js*",
        "node_modules/angular2/es6/dev/src/testing/shims_for_IE.js",
        "node_modules/systemjs/dist/*.*",
        "node_modules/jquery/dist/jquery.*js",
        "node_modules/bootstrap/dist/js/bootstrap*.js",
        "node_modules/rxjs/bundles/Rx.js"
    ]).pipe(gulp.dest("./wwwroot/lib/"));
});

gulp.task("moveNpmToCss", function (done) {
    gulp.src([
        "node_modules/bootstrap/dist/css/bootstrap.min.css",
        "node_modules/bootstrap/dist/css/bootstrap-theme.min.css"
    ]).pipe(gulp.dest("./wwwroot/css/"));
});


gulp.task("min:js", function () {
    return gulp.src([paths.js, "!" + paths.minJs], { base: "." })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest("."));
});

gulp.task("min:css", function () {
    return gulp.src([paths.css, "!" + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest("."));
});

gulp.task("min", ["min:js", "min:css"]);
