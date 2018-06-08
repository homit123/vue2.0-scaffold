module.exports = `
* {margin: 0; padding: 0; border: 0}
ul, li {list-style: none;}
a {text-decoration: none; color: black;}
body {background-color: #f0f2f5;}
  /*---滚动条默认显示样式--*/
  ::-webkit-scrollbar-thumb {
   background-color: #cacaca;
   height: 50px;
   outline-offset: -2px;
   outline: 2px solid #fff;
   -webkit-border-radius: 4px;
   
   border: 2px solid #fff;
}
/*---鼠标点击滚动条显示样式--*/
::-webkit-scrollbar-thumb:hover {
   background-color: #4a5b6d;
   height: 50px;
   -webkit-border-radius: 4px;
}
/*---滚动条大小--*/
::-webkit-scrollbar {
   width: 8px;
   height: 8px;
}
/*---滚动框背景样式--*/
::-webkit-scrollbar-track-piece {
   background-color: rgba(0,0,0,0);
   -webkit-border-radius: 0;
}
.appBox {
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    bottom: 0px;
}

:global(.expandMenuActive) {
    color: #333!important;
    background: #f0f2f5;
}

:global(.headerMenuActive) {
    border-bottom: 3px solid #cc5959;
    padding-bottom: 7px;
}

:global(.collapseMenuActive) {
    color: #333!important;
    background: #f0f2f5;
}

:global(.el-card__header) {
    background-color: #f0f6f9;
}

:global(.e-red) {
    color: red;
}
`