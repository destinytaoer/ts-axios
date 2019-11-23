#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo "Enter release version: "
read VERSION
# -p 表示后面接一个提示符
# -n 1 表示最终只能有一个字符作为有效的读入
# -r 表示禁止反斜线的转义功能
read -p "Release $VERSION - are you sure? (y/n)" -n 1 -r # 读取的值会给到下面的 REPLY 变量
echo # 表示另起一行
if [[$REPLY =~ ^[Y/y]$ ]]
then
  echo "Releasing $VERSION..."

  # commit
  git add -A
  git commit -m "[build] $VERSION"
  npm version $VERSION --message "[release] $VERSION"
  git push origin master

  # publish
  npm publish
fi