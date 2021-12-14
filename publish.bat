@echo off
npm version patch && ^
cd "%cd%\projects\ng-as" && ^
npm version patch && ^
cd "%cd%" && ^
npm run build ng-as --prod && ^
copy /y "%cd%\README.md" "%cd%\dist\ng-as\README.md" && ^
copy /y "%cd%\LICENSE" "%cd%\dist\ng-as\LICENSE" && ^
cd "%cd%\dist\ng-as" && ^
npm publish --ignore-scripts && ^
cd "%cd%"
pause