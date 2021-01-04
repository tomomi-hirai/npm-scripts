const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');

// copy タスクで public に出力された画像に対して圧縮をかける
(async () => {
  const files = await imagemin(['public/assets/img/**/*.{jpg,png,gif,svg}'], {
    plugins: [
      imageminMozjpeg({ quality: 80 }),
      imageminPngquant({ quality: [0.65, 0.8] }),
      imageminGifsicle(),
      imageminSvgo()
    ]
    // replaceOutputDir: output => {
    //   return output.replace(/src\//, 'public/');
    // }
  });
  // console.log(files);
  // console.log('Images optimized');
})();