// 1 - Import Gulp
const gulp = require("gulp");

// 2 - Import Concat
const concat = require("gulp-concat");

// 3 - Import Auto Prefixer
const autoprefixer = require("gulp-autoprefixer");

// 4 - Import Sass
const sass = require("gulp-sass")(require("sass"));

// 5 - Import Pug
const pug = require("gulp-pug");

// 6 - Import Live Reload
const livereload = require("gulp-livereload");

// 7 - Import Source Maps
const sourcemaps = require("gulp-sourcemaps");

// 8 - Import Uglify
const uglify = require("gulp-uglify");

// 9 - Import Notify
const notify = require("gulp-notify");

// 10 - Import Babel
const babel = require("gulp-babel");

// 11 - Import Zip
const zip = require("gulp-zip");

// 12 - Import Vinyl Ftp
const ftp = require("vinyl-ftp");

// 13 - Import Type Script
// const ts = require("gulp-typescript");

// 14 - Import Webp
const webp = require("gulp-webp");

// 15 - Import
// 16 - Import
// 17 - Import
// 18 - Import
// 19 - Import

// ===== Task Html =====
gulp.task("html", function () {
  return gulp
    .src("project/pug/*.pug")
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest("dist"))
    .pipe(livereload())
    .pipe(notify("Html Task Is Done"));
});

// ===== Task Scss  =====
gulp.task("scss", function () {
  return gulp
    .src("project/css/scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 versions"))
    .pipe(concat("style.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload())
    .pipe(notify("Scss Task Is Done"));
});

// ===== Task Libs Css =====
gulp.task("libs-css", function () {
  return gulp
    .src("project/libs-css/**/*")
    .pipe(gulp.dest("dist/css/libs"))
    .pipe(livereload())
    .pipe(notify("Libs Css Task Is Done"));
});

// ===== Task Js =====
gulp.task("js", function () {
  return gulp
    .src("project/js/**/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(sourcemaps.init())
    .pipe(concat("script.js"))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/js"))
    .pipe(notify("Js Task Is Done"))
    .pipe(livereload());
});

// ===== Task Ts =====
gulp.task("ts", function () {
  return (
    gulp
      .src("project/ts/**/*.ts")
      .pipe(
        ts({
          // 9 قم بتمكين الإبلاغ عن الخطأ عن التعبيرات والإعلانات بنوع
          // 9 'any' type.
          // 9 Enable error reporting for expressions and declarations with an implied 'any' type.
          noImplicitAny: true,
          // 9 إزالة التعليقات في ملف
          // 9 JavaScript
          // 9 Remove Comments In File Javascript
          removeComments: false,
          // 9 خريطة المصدر للملف
          // 9 JavaScript
          // 9 Source Map For File Javascript
          sourceMap: true,
          // 9 سوف تحقق من جميع مسارات التعليمات البرمجية في
          // 9 Function
          // 9 لضمان إرجاع قيمة
          // 9 Will Check All Code Paths In A Function To Ensure They Return A Value
          noImplicitReturns: true,
          // 9 الإبلاغ عن الأخطاء عن المتغيرات المحلية غير المستخدمة
          // 9 Report Errors On Unused Local Variables
          noUnusedLocals: true,
          // 9 الإبلاغ عن الأخطاء على
          // 9 Parameters
          // 9 غير المستخدمة في
          // 9 Function .
          // 9 Report Errors On Unused Parameters In Functions.
          noUnusedParameters: false,
          // 9 قم بتعطيل الإبلاغ عن الخطأ للحصول على رمز لا يمكن الوصول إليها
          // 9 Disable error reporting for unreachable code
          allowUnreachableCode: false,
          // outFile: "../js/testTs1.js",
          outFile: "output.js",
          // outFile: "output.js",
          // outFile: "output.js",
        })
      )
      .pipe(
        babel({
          presets: ["@babel/preset-env"],
        })
      )
      // .pipe(flatten())
      // .pipe(sourcemaps.init())
      .pipe(concat("scriptTsToJs.js"))
      .pipe(uglify())
      // .pipe(sourcemaps.write("."))
      .pipe(gulp.dest("dist/js"))
      .pipe(notify("Ts Task Is Done"))
      .pipe(livereload())
  );
});

// ===== Task Libs Js =====
gulp.task("libs-js", function () {
  return gulp
    .src("project/libs-js/**/*")
    .pipe(gulp.dest("dist/js/libs"))
    .pipe(livereload())
    .pipe(notify("Libs js Task Is Done"));
});

// ===== Task Images Compress =====
gulp.task("compressImages", function () {
  return gulp
    .src("project/images/**/*")

    .pipe(webp())
    .pipe(gulp.dest("dist/images"));
});

// ===== Task Zpi Compress =====
gulp.task("compress", function () {
  return gulp
    .src("dist/**/*")
    .pipe(zip("website.zip"))
    .pipe(gulp.dest("."))
    .pipe(notify("Files Is Compressed To Zip "));
});

// ===== Task Ftp =====
gulp.task("deploy", function () {
  var conn = ftp.create({
    host: "ftpupload.net",
    user: "epiz_29431807",
    password: "vz5QI9xYpD",
    parallel: 10,
  });

  return (
    gulp
      .src(["dist/**/*.*"], { base: ".", buffer: false })
      // .pipe(conn.newer("/public_html"))
      // .pipe(conn.newer("/htdocs/output"))
      .pipe(conn.newer("/htdocs"))
      //   .pipe(conn.dest("/public_html"))
      // .pipe(conn.dest("/htdocs/output"))
      .pipe(conn.dest("/htdocs"))

      .pipe(livereload())
      .pipe(notify("Files Is Upload To Host "))
  );
});

// ===== Task Watch =====
gulp.task("watch", function () {
  require("./server.js");
  livereload.listen();
  // = Html
  gulp.watch("project/pug/**/*.pug", gulp.series("html"));
  // = Css
  gulp.watch("project/css/scss/**/*.scss", gulp.series("scss"));
  gulp.watch("project/libs-css/**/*", gulp.series("libs-css"));
  // = Javascript
  gulp.watch("project/js/**/*.js", gulp.series("js"));
  // gulp.watch("project/ts/**\/*.ts", gulp.series("ts"));
  gulp.watch("project/libs-js/**/*", gulp.series("libs-js"));
  // = Images
  gulp.watch("project/images/**/*", gulp.series("compressImages"));
  // = Zip
  gulp.watch("dist/**/*.*", gulp.series("compress"));
  // = Upload
  // gulp.watch("dist/**\/*.*", gulp.series("deploy"));
});
// = Default
gulp.task("default", gulp.series("watch"));

// To Run
// => gulp watch
