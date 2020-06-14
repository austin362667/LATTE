# LATTE

LATTE為一主要採用TypeScript開發的單頁網站應用(全端)。

本文主要聚焦在筆者開發LATTE的 Tech Stack ，以及一路上的 Try and Error 。

>筆者個人網站 [Austin Liu](https://austin362667.github.io/)
```
專案作者：劉立行 
文章作者：劉立行 
專案建立日期：2020/5/21
文章建立日期：2020/6/10
```

## 1 - 前言

本專案採用Deno.js作為後端開發環境。
若您還沒使用過 Deno，建議先看完以下這篇再繼續看本文！

[iThome新聞](https://www.ithome.com.tw/news/137613)

>以下短文節錄自[Deno官網](https://deno.land/)
```
Deno is a simple, modern and secure runtime for JavaScript and TypeScript that uses V8 and is built in Rust.
```

本專案初期大量參考筆者教授陳鍾誠博士之作品

>陳鍾誠的個人網站 [CCC](https://misavo.com/blog/Home)
>
>[POS系統](https://github.com/ccc-js/pos)
>
>[Blog系統](https://github.com/ccc-js/blog6)

## 2 - 工程技術

>Deno

作者為 Ryan Dahl ！

建立在 V8 ， Rust 與 TypeScript 之上。

其目的為解決Node.js的種種問題，如：回呼地獄( callback 函數)，不完全支援 ES Module ，非原生工具過多( babel 、 typescript ..)。
Deno 有較嚴格的沙盒安全機制，套件也沒有集中管理模式，但目前似乎有計畫納入 npm ?
Deno 原生支持 Web API 、 typescript 等，且異步函數只回傳 promise 。
import 使用 URL ，這樣也比較清楚到底引用了甚麼。

>V8 Eengine

Google 開源的 JavaScript 引擎，編譯 JS 語言至電腦能理解的 machine code 。

其效能極優！

>PostgreSQL

此資料庫前身為圖靈獎得主 Michael Stonebraker ，所帶領開發的 Ingres 。


## 3 - 心路歷程

>Pitfall 不穩定

deno的第三方web server套件 oak ，在上傳大型檔案(如圖片等)，會出現 Request Stalled 問題，導致 file system 無法正常讀寫。後來 oak 作者也更新版本使其支援用 form 回傳 file 也包含整個 formData ，並能夠正常讀取。但在這空窗期間，筆者竟然使用第三方提供的暫時解決方案，其作者沒有規劃地更新導致此專案程式碼頻繁地修改，因而消耗了不少時間。

>Pitfall 測試

沒有任何藉口不寫測試。發現 bug 時，不應該急著修改 code ，應該先冷靜仔細審視程式碼，評估需要修正的部分再動作。最理想的方式為寫測試 Testing ，最好是先寫測試再寫其功能( Test-Driven Development )，測試的覆蓋率愈接近100%愈好，每個測試只測一個概念，而且一旦捕捉到 Error 就一定要去看，絕對不能也不行忽略。

>Pitfall 平衡

Work Life Balance 是我一直刻意忽略的觀念，但沒有事情是一蹴可幾的，腳踏實地，有計畫地、技術性地安排工作進度，才合理。時常一杯咖啡接一杯，期待一兩個晚上通霄就有多大的 progress 是不切實際的。雖然有些時候靈感來了，誰也不能阻止我！
