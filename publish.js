// #!/usr/bin/env node
const shell = require('shelljs');
const program = require('commander');
const json = require('./package.json');
const colors = require('colors');

//检查控制台是否以运行 `npm` 开头的命令
if (!shell.which('npm')) {
  //在控制台输出内容
  shell.echo('Sorry, this script requires npm');
  shell.exit(1);
}

const publish = ({ path, tag }) => {
  shell.echo('login ...');

  shell.exec('npm config set user.name admin');
  shell.exec(
    'npm config set //maven.sayweee.net/repository/npm-sayweee/:_authToken=NpmToken.5e425fe7-ac8d-3966-ae3b-f51c56ef4ba1',
  );
  if (path) {
    shell.cd(path);
  }
  shell.echo('publish start ...');
  const comd = `npm publish ${
    tag ? '--tag ' + tag : ''
  } --registry=https://maven.sayweee.net/repository/npm-sayweee/`;
  console.log(comd);
  shell.exec(comd);
  shell.echo('publish end');
};

program
  .version(json.version, '-v', '--version')
  .option('-h, --help', '免登录npm发布工具帮助信息')
  .option('-c, --current [file]', '发布当前目录项目')
  .option('-o, --other <file>', '发布指定目录项目')
  .option('-t, --tag <string>', '发布tag')
  .parse(process.argv);

const options = program.opts();
if (options.help) {
  console.log(`免登录npm发布工具，${colors.red('发布代码文件夹中必须有package.json文件')}`);
  console.log('Examples:');
  console.log(`${colors.green('发布当前目录项目(直接发布源码)')}：npx pub -c`);
  console.log(
    `${colors.green('发布指定目录项目')}: npx pub -o [发布项目路径，一般是打包后的文件夹]`,
  );
}

const tag = options.tag;
if (options.current) {
  publish({ tag });
}
if (options.other) {
  const path = options.other;
  console.log(path);
  // shell.cd(path);
  publish({ path, tag });
}
