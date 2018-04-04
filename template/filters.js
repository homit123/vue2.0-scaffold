module.exports = `// 时间格式化
export function dateFormate (d, pattern) {
    if(!d || d=="") return "";
     if(typeof(d) == "string") {
       // ISO时间 要减去8小时
       if(d.indexOf("T") != -1) {
         let nTime = new Date(d).getTime() - 8*3600*1000;
         d = new Date(nTime);
       }
       else {
         d = new Date(d);
       }
     }
     pattern = pattern || "yyyy-mm-dd HH:MM";
     let str = "";
     str = pattern.replace("yyyy", d.getFullYear());
     str = str.replace("mm", d.getMonth() < 9? '0' + (d.getMonth() + 1) : d.getMonth()+1);
     str = str.replace("dd", d.getDate() < 10? '0' + d.getDate() : d.getDate());
     str = str.replace("HH", d.getHours() < 10? '0' + d.getHours() : d.getHours());
     str = str.replace("MM", d.getMinutes() < 10? '0' + d.getMinutes() : d.getMinutes());
     str = str.replace("ss", d.getSeconds() < 10? '0' + d.getSeconds() : d.getSeconds());
     return str;
   }
   
`