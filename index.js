const express = require('express');

// let key$dirs = {
//     '/': './server/',
//     '/htdocs': './htdocs/',
//     '/build': './build/',

//     '/test': [
//         './a/',
//         './b/',
//         './c/',
//     ],
// };

module.exports = {

    use(app, key$dirs) {
        if (!key$dirs) {
            return;
        }

        //静态目录。
        let list = Object.keys(key$dirs).map((key) => {
            let dirs = key$dirs[key];

            if (!Array.isArray(dirs)) {
                dirs = [dirs];
            }

            //确保 key 以 `/` 开头。
            if (!key.startsWith('/')) {
                key = '/' + key;
            }

            //多个静态目录可以映射到同一个虚拟目录。
            //即一个虚拟目录可以映射多个静态目录。
            //访问静态资源文件时，express.static() 中间件函数会根据目录的添加顺序查找所需的文件。
            dirs.forEach((dir) => {
                app.use(key, express.static(dir));
            });

            return key;
        });

        return list;

    },
};