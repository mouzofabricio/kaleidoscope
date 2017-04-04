import gulp from "gulp"
import gulpLoadPlugins from "gulp-load-plugins"
import rimraf from "rimraf"
import webpack from "webpack"
import broswerSync from "browser-sync"
import runSequence from "run-sequence"
import minimist from "minimist"

let $ = gulpLoadPlugins(),
    bs = broswerSync.create();


// Environment variables
let knownOptions = {
  string: "env",
  default: {
    env: process.env.NODE_ENV || "development"
  }
};

let options = minimist(process.argv.slice(2), knownOptions),
    isProduction = options.env === "production";

global.isProduction = isProduction;



/**
 * =======================================================
 * $ gulp bs
 * =======================================================
 */
gulp.task("bs", (cb) => {
  bs.init({
    notify: false,
    server: {
      baseDir: "./dist"
    }
  });
  cb();
});



/**
 * =======================================================
 * $ gulp bs:reload
 * =======================================================
 */
gulp.task("bs:reload", (cb) => {
  bs.reload();
  cb();
});



/**
 * =======================================================
 * $ gulp clean
 * =======================================================
 */
gulp.task("clean", (cb) => {
  rimraf("./dist", cb);
});



/**
 * =======================================================
 * $ gulp copy-assets
 * =======================================================
 */
gulp.task("copy-assets", () => {
  return gulp.src(["./assets/**/*"], {base: "./assets/"})
  .pipe(gulp.dest("./dist"))
  .pipe(bs.stream());
});


/**
 * =======================================================
 * $ gulp html
 * =======================================================
 */
gulp.task("html", () => {
  return gulp.src(["./src/**/*.html"])
  .pipe(gulp.dest("./dist"))
  .pipe(bs.stream());
});


/**
 * =======================================================
 * $ gulp webpack
 * =======================================================
 */
gulp.task("webpack", (cb) => {
  webpack(require("./webpack.config.babel.js"), (err, stats) => {
    if( err ) throw new $.util.PluginError("webpack", err);
    $.util.log("[webpack]", stats.toString());
    bs.reload();
    cb();
  });
});



/**
 * =======================================================
 * $ gulp uglify
 * =======================================================
 */
gulp.task("uglify", () => {
  return gulp.src("./dist/js/**/*.js")
  .pipe($.uglify({preserveComments: "some"}))
  .pipe(gulp.dest("./dist/js"))
  .pipe(bs.stream());
});



/**
 * =======================================================
 * $ gulp sass
 * =======================================================
 */
gulp.task("sass", () => {
  let params = {
    outputStyle: isProduction ? "compressed" : "expanded"
  };

  return gulp.src("./src/sass/**/*.scss")
  .pipe($.plumber())
  .pipe($.sass.sync(params).on("error", $.sass.logError))
  .pipe($.autoprefixer({
    browsers: [
      "last 4 versions",
      "ie 9",
      "iOS 6",
      "Android 4"
    ]
  }))
  .pipe(gulp.dest("./dist/css"))
  .pipe(bs.stream());
});



/**
 * =======================================================
 * $ gulp build
 * =======================================================
 */
gulp.task("build", (cb) => {
  runSequence(
    "clean",
    "copy-assets",
    ["webpack", "sass", "html"],
    "uglify",
    cb
  );
});



/**
 * =======================================================
 * $ gulp watch
 * =======================================================
 */
gulp.task("watch", (cb) => {
  runSequence(
    "build",
    "bs",
    () => {
      $.watch("./assets/**/*", () => {
        gulp.start("copy-assets");
      });

      $.watch("./src/**/*", () => {
        gulp.start("html");
      });

      $.watch("./src/js/**/*", () => {
        gulp.start("webpack");
      });

      $.watch("./src/sass/**/*", () => {
        gulp.start("sass");
      });

      cb();
    }
  );
});



/**
 * =======================================================
 * $ gulp (start watch)
 * =======================================================
 */
gulp.task("default", () => {
  gulp.start("watch");
});